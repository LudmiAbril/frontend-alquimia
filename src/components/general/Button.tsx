<<<<<<< HEAD
type Props = {
    children: React.ReactNode;
  };
  
  export default function Button({ children }: Props) {
    return (
      <button className="bg-[#9444B6] text-white px-10 py-3 rounded-[10px] hover:bg-[#7a2f96] transition font-bold text-sm">
        {children}
      </button>
    );
  }
=======


export default function Button({ label }: ButtonProps) {
  return (
    <button className="bg-[#9444B6] text-white px-10 py-3 rounded-[10px] hover:bg-[#7a2f96] transition font-bold text-sm">
      {label}
    </button>
  );
}
>>>>>>> origin/main
