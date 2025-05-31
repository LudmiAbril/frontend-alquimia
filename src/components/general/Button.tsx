import { ButtonProps } from "../utils/typing";

export default function Button({ label, onClick, colorClass = "bg-[#9444B6] text-white hover:bg-[#7a2f96]" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${colorClass} px-10 py-3 rounded-[10px] transition font-bold text-sm uppercase`}
    >
      {label}
    </button>
  );
}
