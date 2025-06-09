"use client";

import ClearIcon from '@mui/icons-material/Clear';
import { Note } from '../Utils/typing';

interface NotesSectionProps {
    title: string;
    notes: Note[];
    onDelete: (id: number) => void;
}

const AddedNotesSection: React.FC<NotesSectionProps> = ({ title, notes, onDelete }) => {
    if (notes.length === 0) return null;

    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            <p className="mt-4 text-[var(--gris4)] text-lg">{title}</p>
            <div className="flex gap-4 flex-wrap">
                {notes.map((note) => (
                    <button
                        key={note.id}
                        onClick={() => onDelete(note.id)}
                        className="items-center px-3 py-1 rounded-[10px] bg-[var(--violeta)] hover:bg-[var(--gris3)] transition-colors duration-200 text-white"
                    >
                        <span>{note.name}</span>
                        <span className="ml-2">
                            <ClearIcon sx={{ color: 'white' }} />
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AddedNotesSection;
