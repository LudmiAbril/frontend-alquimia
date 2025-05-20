"use client";

import { useState } from "react";
import Link from "next/link";
import AuthModalWrapper from "@/components/login/AuthModalWrapper";
import InicioSesionForm from "@/components/login/InicioSesionForm";
import RegistroForm from "@/components/login/registro";

export default function Navbar() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formulario, setFormulario] = useState<"login" | "registro">("login");

  return (
    <>
      <header className="fixed top-0 left-0 z-[9999] w-full bg-transparent text-white px-10 pt-2 flex justify-between items-center">
        <img src="/logo/logo.svg" alt="Logo" className="w-[80px]" />

        <div className="flex items-center gap-[50px]">
          <nav className="flex items-center gap-[50px]">
            <Link href="/">Home</Link>
            <Link href="/disenar">Diseñar</Link>
            <Link href="/descubrir">Descubrir</Link>
            <Link href="/proveedores">Proveedores</Link>
          </nav>

          <img  src="/svgGeneral/user.svg" alt="Perfil" className="w-[30px] h-[30px] object-contain cursor-pointer"
            onClick={() => {
              setFormulario("login");
              setMostrarModal(true);
            }}
          />
        </div>
      </header>

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
      )}


    </>
  );
}
