type IdleCallback = () => void

export function runWhenIdle(cb: IdleCallback, timeout = 2000) {
  if ('requestIdleCallback' in window) {
    ;(window as any).requestIdleCallback(cb, { timeout })
  } else {
    // Fallback seguro
    setTimeout(cb, 300)
  }
}
