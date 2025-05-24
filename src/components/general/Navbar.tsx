"use client";

import { useState } from "react";
import Link from "next/link";
import AuthModalWrapper from "@/components/login/AuthModalWrapper";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<"login" | "register">("login");
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`absolute top-0 left-0 z-[9999] w-full bg-transparent px-10 pt-2 flex justify-between items-center transition-colors duration-200 ${
          isHome ? "text-white" : "text-[var(--violeta)]"
        }`}
      >
        <img
          src={isHome ? "/logo/logo-blanco.svg" : "/logo/logo-violeta.svg"}
          alt="Logo"
          className="w-[62px]"
        />
        <div className="flex items-center gap-[50px]">
          <nav className="flex items-center gap-[50px]">
            <Link href="/">Home</Link>
            <Link href="/crearPerfume">Diseñar</Link>
            <Link href="/descubrir">Descubrir</Link>
            <Link href="/providers">Proveedores</Link>
          </nav>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-[30px] h-[30px] cursor-pointer transition-colors duration-200"
            onClick={() => {
              setActiveForm("login");
              setIsModalOpen(true);
            }}
            fill="currentColor"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </header>

      {isModalOpen && (
        <AuthModalWrapper
          title={activeForm === "login" ? "Iniciar sesión" : "Registrarte"}
          onClose={() => setIsModalOpen(false)}
        >
          {activeForm === "login" ? (
            <LoginForm toggleForm={() => setActiveForm("register")} />
          ) : (
            <RegisterForm toggleForm={() => setActiveForm("login")} />
          )}
        </AuthModalWrapper>
      )}
    </>
  );
}
