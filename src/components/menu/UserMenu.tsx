"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { userMenuItems } from "@/components/Utils/utils";

export default function UserMenu() {
  const currentPath = usePathname();

  return (
    <aside className="w-full max-w-[200px] p-6">
      <h2 className="text-lg font-bold uppercase mb-8">¡Hola, </h2>
      <ul className="space-y-4">
        {userMenuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block border-l-4 pl-3 py-5 font-semibold transition-colors text-[var(--gris3)] ${
                currentPath === item.href
                  ? "border-[#9444B6] text-[var(--gris4)]"
                  : "border-transparent hover:text-[var(--gris2)]"
              }`} >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
