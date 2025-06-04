import { PropsInput } from "../utils/typing";

export default function SearchInput({ query, setQuery }: PropsInput) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
      className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--violeta)]"
    />
  )
}
