import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import WrenBird from './WrenBird.jsx'
import { createBirdScene } from './bird-scene.js'

vi.mock('./bird-scene.js', () => ({ createBirdScene: vi.fn() }))
let scene
let callbacks
beforeEach(() => {
  scene = { dispose: vi.fn(), reset: vi.fn(), rotate: vi.fn() }
  createBirdScene.mockImplementation((host, options) => { callbacks = options; return scene })
})
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.clearAllMocks() })

async function load() {
  let view
  await act(async () => { view = render(<WrenBird />) })
  return view
}
it('loads the scene with a poster and no visible viewer controls', async () => {
  await load()
  expect(screen.getByAltText(/white and charcoal bird/)).toBeTruthy()
  await act(async () => callbacks.onReady())
  expect(screen.queryByRole('button')).toBeNull()
  expect(screen.getByText(/Automatic rotation resumes/).className).toBe('sr-only')
})
it('supports keyboard rotation and resetting without moving focus', async () => {
  await load()
  await act(async () => callbacks.onReady())
  const viewer = screen.getByRole('group', { name: 'Interactive 3D Wren bird' })
  viewer.focus()
  fireEvent.keyDown(viewer, { key: 'ArrowRight' })
  expect(scene.rotate).toHaveBeenCalledWith('ArrowRight')
  fireEvent.keyDown(viewer, { key: 'Home' })
  expect(scene.reset).toHaveBeenCalledTimes(1)
  expect(document.activeElement).toBe(viewer)
})
it('falls back to the bird poster when WebGL or the asset fails', async () => {
  await load()
  await act(async () => callbacks.onError())
  expect(screen.getByText(/3D view is unavailable/)).toBeTruthy()
  expect(screen.queryByRole('button', { name: /rotation/ })).toBeNull()
  expect(screen.getByAltText(/white and charcoal bird/).className).toContain('opacity-100')
})
it('releases the renderer when unmounted', async () => {
  const view = await load()
  view.unmount()
  expect(scene.dispose).toHaveBeenCalledTimes(1)
})
