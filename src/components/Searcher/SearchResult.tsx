import { PropsSearch } from "../utils/typing"
import { PerfumeNotesResult } from "../utils/typing"


export default function SearchResult({ result, isLoading }: PropsSearch) {
  console.log("🎯 SearchResult recibió:", result)
  if (isLoading) return <p className="mt-6 animate-pulse">Buscando...</p>

  if (!result || result.notes.length === 0) {
    return <p className="mt-6 text-gray-500">Sin resultados</p>
  }

  return (
    <div className="mt-6 bg-white shadow-md rounded-lg p-6 text-gray-800">
      <p>
        Tu perfume <strong>{result.perfume}</strong> está compuesto por la nota principal <strong>{result.notes[0]}</strong>.
      </p>
      {result.notes.slice(1).map((note, index) => (
        <p key={index}>{note}</p>
      ))}
    </div>
  )
}
