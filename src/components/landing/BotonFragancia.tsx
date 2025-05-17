type Props = {
    label: string;
  };
  
  export default function BotonFragancia({ label }: Props) {
    return (
      <button className="bg-white px-4 py-2 rounded-full text-[#9444B6] font-semibold text-sm shadow-sm hover:bg-[#f0e7f5] transition">
        {label}
      </button>
    );
  }
  