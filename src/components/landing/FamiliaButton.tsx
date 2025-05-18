
export default function FamiliaButton({ icon, label, onClick }: FamiliaButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
    >
      {icon} {label}
    </button>
  );
}