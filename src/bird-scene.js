import { Box3, DirectionalLight, HemisphereLight, MathUtils, PerspectiveCamera, Scene, Spherical, Vector3, WebGLRenderer } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import birdUrl from './assets/Bird-Wren-v2.glb?url'

const IDLE_DELAY = 8000
const RETURN_DURATION = 1200
const ROTATION_SPEED = 0.2

function disposeModel(model) {
  const materials = new Set()
  model.traverse(object => {
    object.geometry?.dispose()
    const entries = Array.isArray(object.material) ? object.material : [object.material]
    entries.filter(Boolean).forEach(material => materials.add(material))
  })
  for (const material of materials) material.dispose()
}

export function createBirdScene(host, { onReady, onError }) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.setClearColor(0x000000, 0)
  const canvas = renderer.domElement
  canvas.style.display = 'block'
  // Horizontal touch drags rotate; vertical swipes and pinch still scroll/zoom the page.
  canvas.style.touchAction = 'pan-y pinch-zoom'
  host.appendChild(canvas)

  const scene = new Scene()
  const camera = new PerspectiveCamera(34, 1, 0.01, 100)
  const initialOrbit = new Spherical().setFromVector3(new Vector3(3.6, 1.6, 5))
  const orbit = initialOrbit.clone()
  const returnFrom = initialOrbit.clone()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  // White lights and a transparent canvas integrate the original monochrome model.
  scene.add(new HemisphereLight(0xffffff, 0x888888, 2.4))
  const key = new DirectionalLight(0xffffff, 3.4)
  key.position.set(3, 4, 5)
  const rim = new DirectionalLight(0xffffff, 2.5)
  rim.position.set(-4, 2, -3)
  scene.add(key, rim)

  let model
  let disposed = false
  let unavailable = false
  let visible = true
  let radius = 1.3
  let frame = 0
  let idleTimer = 0
  let lastFrame = 0
  let returnStarted = 0
  let mode = 'auto'
  let pointer = null

  function render() {
    if (disposed || unavailable) return
    camera.position.setFromSpherical(orbit)
    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
  }
  function canAnimate() {
    return model && visible && !document.hidden && !reducedMotion.matches && !disposed && !unavailable && !pointer && mode !== 'manual'
  }
  function stopAnimation() {
    window.cancelAnimationFrame(frame)
    frame = 0
    lastFrame = 0
  }
  function animate(now) {
    frame = 0
    if (!canAnimate()) return
    // Limit rendering to 30 fps and avoid jumps after a hidden tab resumes.
    if (!lastFrame || now - lastFrame >= 1000 / 30) {
      const delta = lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) : 0
      lastFrame = now
      if (mode === 'return') {
        const progress = Math.min(1, (now - returnStarted) / RETURN_DURATION)
        const eased = progress * progress * (3 - 2 * progress)
        const shortestAngle = Math.atan2(Math.sin(initialOrbit.theta - returnFrom.theta), Math.cos(initialOrbit.theta - returnFrom.theta))
        orbit.theta = returnFrom.theta + shortestAngle * eased
        orbit.phi = MathUtils.lerp(returnFrom.phi, initialOrbit.phi, eased)
        if (progress === 1) mode = 'auto'
      } else {
        orbit.theta = (orbit.theta + delta * ROTATION_SPEED) % (Math.PI * 2)
      }
      render()
    }
    frame = window.requestAnimationFrame(animate)
  }
  function startAnimation() {
    if (!frame && canAnimate()) frame = window.requestAnimationFrame(animate)
  }
  function takeControl() {
    window.clearTimeout(idleTimer)
    mode = 'manual'
    stopAnimation()
  }
  function resumeAfterIdle() {
    window.clearTimeout(idleTimer)
    if (reducedMotion.matches || disposed || unavailable) return
    idleTimer = window.setTimeout(() => {
      returnFrom.copy(orbit)
      returnStarted = performance.now()
      mode = 'return'
      startAnimation()
    }, IDLE_DELAY)
  }
  function resize() {
    if (disposed) return
    const width = Math.max(1, host.clientWidth)
    const height = Math.max(1, host.clientHeight)
    camera.aspect = width / height
    const halfVerticalFov = MathUtils.degToRad(camera.fov / 2)
    const halfHorizontalFov = Math.atan(Math.tan(halfVerticalFov) * camera.aspect)
    // Fit a sphere around actual vertices, keeping the tail and feet in frame.
    orbit.radius = radius / Math.sin(Math.min(halfVerticalFov, halfHorizontalFov)) * 1.03
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    render()
  }
  function reset() {
    takeControl()
    orbit.theta = initialOrbit.theta
    orbit.phi = initialOrbit.phi
    render()
    resumeAfterIdle()
  }
  function rotate(key) {
    takeControl()
    const step = Math.PI / 12
    if (key === 'ArrowLeft') orbit.theta -= step
    if (key === 'ArrowRight') orbit.theta += step
    if (key === 'ArrowUp') orbit.phi -= step
    if (key === 'ArrowDown') orbit.phi += step
    orbit.phi = MathUtils.clamp(orbit.phi, 0.08, Math.PI - 0.08)
    render()
    resumeAfterIdle()
  }
  function pointerDown(event) {
    if (!model || pointer || !event.isPrimary || event.button !== 0) return
    takeControl()
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY }
    canvas.setPointerCapture(event.pointerId)
  }
  function pointerMove(event) {
    if (pointer?.id !== event.pointerId) return
    const scale = Math.PI * 1.4 / Math.max(1, host.clientHeight)
    orbit.theta -= (event.clientX - pointer.x) * scale
    if (event.pointerType !== 'touch') orbit.phi -= (event.clientY - pointer.y) * scale
    orbit.phi = MathUtils.clamp(orbit.phi, 0.08, Math.PI - 0.08)
    pointer.x = event.clientX
    pointer.y = event.clientY
    render()
  }
  function pointerEnd(event) {
    if (pointer?.id !== event.pointerId) return
    pointer = null
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId)
    resumeAfterIdle()
  }
  function updateVisibility() {
    if (canAnimate()) startAnimation()
    else stopAnimation()
  }
  function motionPreferenceChanged() {
    if (reducedMotion.matches) {
      window.clearTimeout(idleTimer)
      stopAnimation()
    } else if (mode === 'manual') resumeAfterIdle()
    else startAnimation()
  }
  function contextLost(event) {
    event.preventDefault()
    unavailable = true
    stopAnimation()
    window.clearTimeout(idleTimer)
    onError()
  }

  const resizeObserver = new ResizeObserver(resize)
  const visibilityObserver = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting
    updateVisibility()
  })
  const pointerEvents = { pointerdown: pointerDown, pointermove: pointerMove, pointerup: pointerEnd, pointercancel: pointerEnd, lostpointercapture: pointerEnd }
  for (const [type, listener] of Object.entries(pointerEvents)) canvas.addEventListener(type, listener)
  canvas.addEventListener('webglcontextlost', contextLost)
  document.addEventListener('visibilitychange', updateVisibility)
  reducedMotion.addEventListener('change', motionPreferenceChanged)
  resizeObserver.observe(host)
  visibilityObserver.observe(host)
  resize()

  new GLTFLoader().load(birdUrl, gltf => {
    if (disposed) { disposeModel(gltf.scene); return }
    model = gltf.scene
    const bounds = new Box3().setFromObject(model)
    const center = bounds.getCenter(new Vector3())
    const vertex = new Vector3()
    let radiusSquared = 0
    model.traverse(object => {
      const positions = object.geometry?.attributes.position
      if (!positions) return
      for (let index = 0; index < positions.count; index++) {
        vertex.fromBufferAttribute(positions, index).applyMatrix4(object.matrixWorld)
        radiusSquared = Math.max(radiusSquared, vertex.distanceToSquared(center))
      }
    })
    radius = Math.sqrt(radiusSquared) || 1
    model.position.sub(center)
    scene.add(model)
    resize()
    if (!unavailable) { onReady(); startAnimation() }
  }, undefined, () => { if (!disposed) { unavailable = true; onError() } })

  return {
    rotate, reset,
    dispose() {
      disposed = true
      stopAnimation()
      window.clearTimeout(idleTimer)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', updateVisibility)
      reducedMotion.removeEventListener('change', motionPreferenceChanged)
      for (const [type, listener] of Object.entries(pointerEvents)) canvas.removeEventListener(type, listener)
      canvas.removeEventListener('webglcontextlost', contextLost)
      if (model) disposeModel(model)
      renderer.dispose()
      renderer.forceContextLoss()
      canvas.remove()
    },
  }
}
