interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean; 
}

export default function ButtonViolet({ label, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled} 
      className={`px-4 py-2 rounded-full text-white font-semibold bg-[var(--violeta)] transition-all ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#7c38a4]"
      }`}
    >
      {label}
    </button>
  );
}
