"use client";

import { useState } from "react";
import Link from "next/link";
import AuthModalWrapper from "@/components/login/AuthModalWrapper";
import InicioSesionForm from "@/components/login/InicioSesionForm";
import RegistroForm from "@/components/login/registro";
import { usePathname } from "next/navigation";
import logo from "@/public/logo/logo.svg";
import logoVioleta from "@/public/logo/logo-violeta.svg";


export default function Navbar() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formulario, setFormulario] = useState<"login" | "registro">("login");
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-[9999] w-full bg-transparent px-10 pt-2 flex justify-between items-center transition-colors duration-200 ${isHome ? "text-white" : "text-[var(--violeta)]"
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
            <Link href="/disenar">Diseñar</Link>
            <Link href="/descubrir">Descubrir</Link>
            <Link href="/proveedores">Proveedores</Link>
          </nav>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-[30px] h-[30px] cursor-pointer transition-colors duration-200"
            onClick={() => {
              setFormulario("login");
              setMostrarModal(true);
            }}
            fill="currentColor"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </header >

      {mostrarModal && (
        <AuthModalWrapper
          title={formulario === "login" ? "Iniciar sesión" : "Registrarte"}
          onClose={() => setMostrarModal(false)}
        >
          {formulario === "login" ? (
            <InicioSesionForm cambiarFormulario={() => setFormulario("registro")} />
          ) : (
            <RegistroForm cambiarFormulario={() => setFormulario("login")} />
          )}
        </AuthModalWrapper>
      )
      }
    </>
  );
}
