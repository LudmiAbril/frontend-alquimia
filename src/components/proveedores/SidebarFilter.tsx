import { productCategories } from "../utils/utils";

export default function SidebarFilter() {
  return (
    <aside className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold uppercase text-gray-600">ORDENAR POR</h3>
        <select className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm">
          <option>Más vendidos</option>
          <option>Menor precio</option>
          <option>Mayor precio</option>
        </select>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase text-gray-600 mb-2">FILTRAR POR</h3>
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
        />
        <ul className="space-y-2 text-sm text-gray-700">
          {productCategories.map((category) => (
            <li key={category}>
              <button className="w-full text-left hover:underline">{category}</button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
