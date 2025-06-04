// src/app/perfumes/page.tsx
"use client"

import SearchInput from "@/components/Searcher/SearchInput"
import SearchResult from "@/components/Searcher/SearchResult"
import { useSearch } from "@/hooks/useSearch"

export default function PerfumePage() {
  const { query, setQuery, results, isLoading } = useSearch()

  return (
    <section className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-[var(--violeta)] mb-6">Descubrí tu Perfume</h1>
      <SearchInput query={query} setQuery={setQuery} />
      <SearchResult result={results} isLoading={isLoading} />
    </section>
  )
}
