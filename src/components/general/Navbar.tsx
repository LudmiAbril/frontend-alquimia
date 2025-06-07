"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import UserDropdown from "../menu/UserDropdown";
import AuthModalWrapper from "@/components/login/AuthModalWrapper";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { username, email, logout } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<"login" | "register">("login");

  return (
    <>
      <header
        className={`absolute top-0 left-0 z-[9999] w-full bg-transparent px-10 pt-5 flex justify-between items-center transition-colors duration-200 ${
          isHome ? "text-white" : "text-[var(--violeta)]"
        }`}
      >
        <Image
          src={isHome ? "/Logo/logotipo.svg" : "/Logo/LogotipoVioleta.svg"}
          alt="Logo"
          width={62}
          height={72}
          className="w-[62px]"
        />

        <div className="flex items-center gap-[50px]">
          <nav className="flex items-center gap-[50px]">
            <Link href="/">Home</Link>
            <Link href="/createParfum">Crear perfume</Link>
            <Link href="/quiz">Descubrir</Link>
            <Link href="/proveedores">Proveedores</Link>
          </nav>

          {username ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-[40px] h-[40px] rounded-full bg-[var(--violeta)] text-white flex items-center justify-center font-bold uppercase"
              >
                {username.substring(0, 3)}
              </button>

              {showDropdown && (
                <UserDropdown
                  name={username}
                  email={email ?? ""}
                  onLogout={logout}
                  onClose={() => setShowDropdown(false)}
                />
              )}
            </div>
          ) : (
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
          )}
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
