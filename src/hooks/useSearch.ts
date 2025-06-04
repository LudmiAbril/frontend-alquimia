import { useEffect, useState } from "react"
import { PerfumeNotesResult } from "@/components/utils/typing"
export function useSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<PerfumeNotesResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query.trim()) return setResults(null)

      setIsLoading(true)

      //ACÁ EL FETCH AXEL
      //fetch(`/api/search?q=${query}`)
      fetch(`http://localhost:8000/api/perfume?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .finally(() => setIsLoading(false))
    }, 500)

    return () => clearTimeout(timeout)
  }, [query])

  return { query, setQuery, results, isLoading }
}
