import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from 'three'
import { createBirdScene } from './bird-scene.js'

const mocks = vi.hoisted(() => ({ renderer: null, load: null }))
vi.mock('three', async importOriginal => ({
  ...await importOriginal(),
  WebGLRenderer: class {
    constructor() {
      this.domElement = document.createElement('canvas')
      this.domElement.setPointerCapture = vi.fn()
      this.domElement.hasPointerCapture = () => false
      this.render = vi.fn((scene, camera) => { this.position = camera.position.clone() })
      this.dispose = vi.fn()
      this.forceContextLoss = vi.fn()
      mocks.renderer = this
    }
    setPixelRatio() {}
    setClearColor() {}
    setSize() {}
  },
}))
vi.mock('three/addons/loaders/GLTFLoader.js', () => ({
  GLTFLoader: class { load(url, success) { mocks.load = success } },
}))

let viewer, host, preference, onVisibility
beforeEach(() => {
  vi.useFakeTimers()
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false)
  preference = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }
  vi.stubGlobal('matchMedia', () => preference)
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} })
  vi.stubGlobal('IntersectionObserver', class { constructor(callback) { onVisibility = callback } observe() {} disconnect() {} })
  host = document.createElement('div')
  Object.defineProperties(host, { clientWidth: { value: 500 }, clientHeight: { value: 440 } })
  document.body.appendChild(host)
})
afterEach(() => {
  viewer?.dispose()
  viewer = null
  host.remove()
  vi.useRealTimers()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})
function load() {
  viewer = createBirdScene(host, { onReady: vi.fn(), onError: vi.fn() })
  const model = new Group()
  model.add(new Mesh(new BoxGeometry(1, 2, 1), new MeshStandardMaterial()))
  mocks.load({ scene: model })
}
function position() { return mocks.renderer.position.toArray() }
function pointer(type, changes = {}) {
  const event = new Event(type)
  Object.assign(event, { isPrimary: true, button: 0, pointerId: 1, clientX: 100, clientY: 100, pointerType: 'mouse', ...changes })
  mocks.renderer.domElement.dispatchEvent(event)
}

it('rotates automatically, pauses after manual input, then returns and resumes', () => {
  load()
  const start = position()
  vi.advanceTimersByTime(1000)
  expect(position()).not.toEqual(start)
  viewer.rotate('ArrowUp')
  viewer.rotate('ArrowRight')
  const manual = position()
  vi.advanceTimersByTime(7999)
  expect(position()).toEqual(manual)
  vi.advanceTimersByTime(1300)
  const resumed = position()
  expect(resumed).not.toEqual(manual)
  expect(resumed[1]).toBeCloseTo(start[1], 4)
  vi.advanceTimersByTime(1000)
  expect(position()).not.toEqual(resumed)
})
it('does not resume while the mouse is held and handles cancellation', () => {
  load()
  pointer('pointerdown')
  pointer('pointermove', { clientX: 180, clientY: 130 })
  const manual = position()
  vi.advanceTimersByTime(12000)
  expect(position()).toEqual(manual)
  pointer('pointercancel')
  vi.advanceTimersByTime(9500)
  expect(position()).not.toEqual(manual)
})
it('touch input rotates horizontally without claiming vertical page gestures', () => {
  load()
  expect(mocks.renderer.domElement.style.touchAction).toBe('pan-y pinch-zoom')
  pointer('pointerdown', { pointerType: 'touch' })
  const start = position()
  pointer('pointermove', { pointerType: 'touch', clientY: 180 })
  expect(position()).toEqual(start)
  pointer('pointermove', { pointerType: 'touch', clientX: 180, clientY: 180 })
  expect(position()).not.toEqual(start)
  pointer('pointerup', { pointerType: 'touch' })
})
it('respects reduced motion while preserving manual rotation', () => {
  preference.matches = true
  load()
  const start = position()
  vi.advanceTimersByTime(12000)
  expect(position()).toEqual(start)
  viewer.rotate('ArrowRight')
  const manual = position()
  expect(manual).not.toEqual(start)
  vi.advanceTimersByTime(12000)
  expect(position()).toEqual(manual)
})
it('stops animation offscreen and releases timers and GPU resources on dispose', () => {
  load()
  onVisibility([{ isIntersecting: false }])
  const count = mocks.renderer.render.mock.calls.length
  vi.advanceTimersByTime(1000)
  expect(mocks.renderer.render).toHaveBeenCalledTimes(count)
  onVisibility([{ isIntersecting: true }])
  vi.advanceTimersByTime(1000)
  expect(mocks.renderer.render.mock.calls.length).toBeGreaterThan(count)
  const activeViewer = viewer
  viewer = null
  activeViewer.dispose()
  expect(mocks.renderer.dispose).toHaveBeenCalledTimes(1)
  expect(host.children.length).toBe(0)
  expect(vi.getTimerCount()).toBe(0)
})
