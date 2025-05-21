import { ButtonProps } from "../utils/typing";


export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#9444B6] text-white px-10 py-3 rounded-[10px] hover:bg-[#7a2f96] transition font-bold text-sm uppercase">
      {label}
    </button>
  );
}