import { useEffect, useState } from "react"
import { PerfumeNotesResult } from "@/components/utils/typing"
export function useSearch() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<PerfumeNotesResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query.trim()) {
        setResult(null);
        setIsLoading(false);
        return;
      }

      //ACÁ EL FETCH AXEL
      //fetch(`/api/search?q=${query}`)
      fetch(`http://localhost:8000/api/perfume?q=${encodeURIComponent(query)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error en la respuesta del servidor")
          return res.json()
        })
        .then((data : PerfumeNotesResult) => {
          console.log("🔍 Respuesta del backend:", data)
          console.log("✅ Respuesta cruda del backend:", data)
          if (Array.isArray(data.notes) && data.notes.length > 0) {
            setResult(data)
          } else {
            setResult(null)
          }
        })
        .catch(() => setResult(null))
        .finally(() => setIsLoading(false))

    }, 500)

    return () => clearTimeout(timeout)
  }, [query])

  return { query, setQuery, result, isLoading }
}
