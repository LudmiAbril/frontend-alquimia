"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "@/services/useSession";
import UserDropdown from "../menu/UserDropdown";
import AuthModalWrapper from "@/components/modals/AuthModalWrapper";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";

const navLinkClasses = "flex items-center gap-[40px] text-base md:text-lg lg:text-xl font-semibold";
const avatarButtonClasses = "w-[50px] h-[50px] rounded-full bg-[var(--violeta)] text-white flex items-center justify-center font-bold uppercase text-lg md:text-1xl";

const LoginIcon = ({ onClick }: { onClick: () => void }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-[40px] h-[40px] cursor-pointer transition-colors duration-200"
    onClick={onClick}
    fill="currentColor"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

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
        className={`absolute top-0 left-0 z-[9999] w-full bg-transparent px-10 py-4 flex justify-between items-center transition-colors duration-200 ${isHome ? "text-white" : "text-[var(--violeta)]"}`}
      >
        <Image
          src={isHome ? "/Logo/logotipo.svg" : "/Logo/LogotipoVioleta.svg"}
          alt="Logo"
          width={90}
          height={100}
          className="w-[90px] h-[100px] object-contain"
        />

        <div className="flex items-center gap-[60px]">
          <nav className={navLinkClasses}>
            <Link href="/">Home</Link>
            <Link href="/createParfum">Crear mi perfume</Link>
            <Link href="/quiz">Descubrir</Link>
            <Link href="/proveedores">Proveedores</Link>
          </nav>

          {username ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={avatarButtonClasses}
              >
                {username.substring(0, 3)}
              </button>

              {showDropdown && (
                <UserDropdown
                  name={username}
                  email={email || ""}
                  onLogout={logout}
                  onClose={() => setShowDropdown(false)}
                />
              )}
            </div>
          ) : (
            <LoginIcon
              onClick={() => {
                setActiveForm("login");
                setIsModalOpen(true);
              }}
            />
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
