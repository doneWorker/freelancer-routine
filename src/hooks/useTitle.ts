import { useCallback } from 'react'

export const useTitle = () => {
  const setTitle = useCallback((title: string) => {
    document.title = title
  }, [])

  return setTitle
}
