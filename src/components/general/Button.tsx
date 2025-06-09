import Link from "next/link";
import { ButtonProps } from "../Utils/typing";

export default function Button({
  label,
  onClick,
  colorClass = "bg-[#9444B6] text-white hover:bg-[#7a2f96]",
  href,
}: ButtonProps & { href?: string }) {
  const classes =
    `${colorClass} px-12 py-4 rounded-xl transition font-semibold text-base md:text-lg`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
