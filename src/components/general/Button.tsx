import Link from "next/link"
import { ButtonProps } from "../utils/typing"

export default function Button({
  label,
  onClick,
  colorClass = "bg-[#9444B6] text-white hover:bg-[#7a2f96]",
  href,
}: ButtonProps & { href?: string }) {
  const classes =
    `${colorClass} px-10 py-3 rounded-[10px] transition font-bold text-sm uppercase`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {label}
    </button>
  )
}
