import { PropsSearch } from "../Utils/typing"

export default function SearchResult({ results, isLoading }: PropsSearch) {
  if (isLoading) return <p className="mt-6 animate-pulse">Buscando...</p>

  if (!results.length) return <p className="mt-6 text-gray-500">Sin resultados</p>

  return (
    <ul className="mt-6 grid gap-4">
      {results.map((item) => (
        <li key={item.id} className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </li>
      ))}
    </ul>
  )
}
