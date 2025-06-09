// src/app/perfumes/page.tsx
"use client"

import SearchInput from "@/components/Searcher/SearchInput"
import SearchResult from "@/components/Searcher/SearchResult"
import { useSearcher } from "@/services/useSearcher"

export default function PerfumePage() {
  const { query, setQuery, result, isLoading } = useSearcher()
  console.log("🚀 result que se pasa a SearchResult:", result)

  return (
    <section className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-[var(--violeta)] mb-6">Descubrí tu Perfume</h1>
      <SearchInput query={query} setQuery={setQuery} />
      <SearchResult result={result} isLoading={isLoading} />
    </section>
  )
}
