import { useEffect, useId, useRef, useState } from 'react'
import birdPoster from './assets/wren-bird-poster.png'

export default function WrenBird() {
  const hostRef = useRef(null)
  const sceneRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const hintId = useId()

  useEffect(() => {
    let cancelled = false
    // Keep the 3D engine out of the site's initial JavaScript bundle.
    import('./bird-scene.js').then(({ createBirdScene }) => {
      if (cancelled) return
      sceneRef.current = createBirdScene(hostRef.current, {
        onReady: () => { if (!cancelled) setStatus('ready') },
        onError: () => { if (!cancelled) setStatus('fallback') },
      })
    }).catch(() => { if (!cancelled) setStatus('fallback') })
    return () => {
      cancelled = true
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [])

  function handleKey(event) {
    if (status !== 'ready' || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return
    event.preventDefault()
    if (event.key === 'Home') sceneRef.current?.reset()
    else sceneRef.current?.rotate(event.key)
  }

  return (
    <figure className="relative -mx-5 w-[calc(100%+2.5rem)] min-w-0 select-none sm:mx-auto sm:w-full sm:max-w-[680px] lg:-ml-[10%] lg:w-[135%] lg:max-w-none">
      <div
        role="group"
        aria-label="Interactive 3D Wren bird"
        aria-describedby={hintId}
        tabIndex={status === 'ready' ? 0 : -1}
        onKeyDown={handleKey}
        className="relative h-[330px] focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/50 min-[360px]:h-[390px] sm:h-[480px] lg:h-[520px] xl:h-[600px]"
      >
        <img src={birdPoster} alt="Wren, our white and charcoal bird mascot with an upturned tail" className={`pointer-events-none absolute inset-0 size-full object-contain transition-opacity duration-300 ${status === 'ready' ? 'opacity-0' : 'opacity-100'}`} />
        <div ref={hostRef} aria-hidden="true" className={`absolute inset-0 overflow-hidden ${status === 'ready' ? 'cursor-grab opacity-100 active:cursor-grabbing' : 'opacity-0'}`} />
      </div>
      <figcaption id={hintId} className="sr-only">
        {status === 'loading' ? 'Loading the Wren bird.' : status === 'fallback' ? 'Static Wren bird. The 3D view is unavailable on this device.' : 'Rotating Wren bird. Drag horizontally or use arrow keys to explore. Home resets the view. Automatic rotation resumes after eight seconds of inactivity and is disabled when reduced motion is preferred.'}
      </figcaption>
    </figure>
  )
}
