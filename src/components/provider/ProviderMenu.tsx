"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { providerMenuItems } from "../Utils/utils";


export default function ProviderMenu() {
  const currentPath = usePathname();

  return (
    <aside className="w-full max-w-[200px] px-6 py-10 ">
      <h2 className="text-ml font-bold uppercase mb-8 text-gray-700">Panel Proveedor</h2>
      <ul className="space-y-4">
        {providerMenuItems.map((item) => {
          const isActive = currentPath.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block border-l-4 pl-3 py-5 font-semibold transition-colors text-[var(--gris3)] ${
                  isActive
                    ? "border-[#9444B6] text-[var(--gris4)]"
                    : "border-transparent hover:text-[var(--gris2)]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
