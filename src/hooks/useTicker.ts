import { useRef, useEffect, useCallback } from 'react'

/*
 * useTicker
 * receives callback and calls it once per second
 */

const DELAY = 1_000

type Callback = () => void

export const useTicker = () => {
  const interval = useRef<ReturnType<typeof setTimeout> | null>(null)
  const callbacks = useRef<Callback[]>([])

  const addTickerListener = useCallback((func: Callback) => {
    const exist: Boolean = !!callbacks.current.find((c) => c === func)
    !exist && callbacks.current.push(func)
  }, [])

  const removeTickerListener = useCallback((func: Callback) => {
    const idx = callbacks.current.indexOf(func)
    idx !== -1 && callbacks.current.splice(idx, 1)
  }, [])

  useEffect(() => {
    interval.current = setInterval(() => {
      console.log('clbs', callbacks)
      callbacks.current.forEach((clb) => clb())
    }, DELAY)

    return () => {
      interval.current && clearInterval(interval.current)
    }
  }, [])

  return { addTickerListener, removeTickerListener }
}
