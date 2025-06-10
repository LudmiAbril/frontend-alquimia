"use client";

import Link from "next/link";
import { ButtonProps } from "../utils/typing";

interface ButtonVioletProps extends ButtonProps {
  href?: string;
}

export default function ButtonViolet({ label, onClick, disabled, href }: ButtonVioletProps) {
  const baseClasses =
    "border-2 border-[var(--violeta)] bg-[var(--violeta)] text-white font-bold text-sm uppercase px-10 py-3 rounded-[10px] transition hover:bg-[#7c38a4]";

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {label}
    </button>
  );
}
