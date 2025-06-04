import { useEffect, useState } from "react"

export function useSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query.trim()) return setResults([])

      setIsLoading(true)

      //ACÁ EL FETCH AXEL
      fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .finally(() => setIsLoading(false))
    }, 500)

    return () => clearTimeout(timeout)
  }, [query])

  return { query, setQuery, results, isLoading }
}
