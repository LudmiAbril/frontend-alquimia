"use client"

import SearchInput from "@/components/Searcher/SearchInput"
import SearchResult from "@/components/Searcher/SearchResult"
import { useSearch } from "@/services/useSearchService"


export default function SearchPage() {
  const { query, setQuery, results, isLoading } = useSearch()

  return (
    <div className="min-h-screen px-6 py-10 bg-[var(--hueso)] text-[var(--gris4)]">
      <h1 className="text-3xl font-bold mb-6">Buscar productos</h1>
      <SearchInput query={query} setQuery={setQuery} />
      <SearchResult results={results} isLoading={isLoading} />
    </div>
  )
}
