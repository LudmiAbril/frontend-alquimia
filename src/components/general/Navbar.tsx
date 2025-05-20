"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthModalWrapper from "@/components/login/AuthModalWrapper";
import InicioSesionForm from "@/components/login/InicioSesionForm";
import RegistroForm from "@/components/login/registro"; // ESTE ya tiene la lógica dentro

export default function Navbar() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formulario, setFormulario] = useState<"login" | "registro">("login");
  const [usuario, setUsuario] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
  const cargarUsuario = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setUsuario(null);
      return;
    }

    try {
      const res = await fetch("https://localhost:7164/home/usuario", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.autenticado) {
        setUsuario({ name: data.nombre, email: data.email });
      } else {
        setUsuario(null);
      }
    } catch (err) {
      console.error("Error obteniendo usuario:", err);
      setUsuario(null);
    }
  };

  // Ejecutar al inicio
  cargarUsuario();

  // También cuando el token cambia (usando 'storage' event)
  const onStorageChange = () => cargarUsuario();
  window.addEventListener("storage", onStorageChange);

  return () => {
    window.removeEventListener("storage", onStorageChange);
  };
}, []);


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

          {usuario ? (
            <div
              className="bg-white text-black rounded-full w-[30px] h-[30px] flex items-center justify-center font-bold"
              title={usuario.email}
            >
              {usuario.name.slice(0, 3).toUpperCase()}
            </div>
          ) : (
            <img
              src="/svgGeneral/user.svg"
              alt="Perfil"
              className="w-[30px] h-[30px] object-contain cursor-pointer"
              onClick={() => {
                setFormulario("login");
                setMostrarModal(true);
              }}
            />
          )}
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
            <RegistroForm
              cambiarFormulario={() => setFormulario("login")}
            />
          )}
        </AuthModalWrapper>
      )}
    </>
  );
}
