"use client";

import Button from "@/components/General/Button";

import { EmptySectionProps } from "@/components/utils/typing";

export default function EmptySection({
  title,
  description1,
  description2,
  buttonText,
  onClick,
}: EmptySectionProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-[var(--gris4)] uppercase pt-6">{title}</h2>
      <p className="italic text-gray-500 mb-6">{description1}</p>
      <p className="text-gray-600 mb-9">{description2}</p>
      <Button label={buttonText} onClick={onClick} />
    </div>
  );
}
