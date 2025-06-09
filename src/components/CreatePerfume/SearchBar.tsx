"use client";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {

    return (<div className="flex w-full gap-2">
        <input
            type="text"
            className="border border-black rounded-[10px] w-full p-1"
            placeholder="Buscar nota..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-[var(--violeta)] px-8 rounded-[10px] text-white text-xs">
            FILTROS
        </button>
    </div>)
}
