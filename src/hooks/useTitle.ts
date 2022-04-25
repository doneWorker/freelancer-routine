import { useCallback } from 'react'

const useTitle = () => {
  const setTitle = useCallback((title: string) => {
    document.title = title
  }, [])

  return setTitle
}

export default useTitle
