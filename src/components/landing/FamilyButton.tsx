import { FamilyButtonProps } from "@/components/utils/typing";

export default function FamilyButton({ icon, label, onClick }: FamilyButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
    >
      {icon} {label}
    </button>
  );
}
