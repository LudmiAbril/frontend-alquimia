"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import RegistroModal from "../login/RegistroModal";
import LoginModal from "../login/LoginModal";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [usuario, setUsuario] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetch("https://localhost:7164/home/usuario", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.autenticado) {
            setUsuario({ name: data.nombre, email: data.email });
          }
        })
        .catch(() => setUsuario(null));
    }
  }, []);

  return (
    <header className="absolute top-0 left-0 z-10 bg-transparent text-white font-medium text-sm w-full flex justify-between items-center px-10 pt-2 box-border">
      <img src="/logo/logo.svg" alt="Logo" className="w-[80px]" />

      <div className="flex items-center gap-[50px]">
        <nav className="flex items-center gap-[50px]">
          <Link href="/" className="text-white no-underline">Home</Link>
          <Link href="/disenar" className="text-white no-underline">Diseñar</Link>
          <Link href="/descubrir" className="text-white no-underline">Descubrir</Link>
          <Link href="/proveedores" className="text-white no-underline">Proveedores</Link>
        </nav>

        {/* Icono de perfil o iniciales */}
        {usuario ? (
          <div className="bg-white text-black rounded-full w-[30px] h-[30px] flex items-center justify-center font-bold">
            {usuario.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <img
            src="/svgGeneral/user.svg"
            alt="Perfil"
            className="w-[30px] h-[30px] object-contain cursor-pointer"
            onClick={() => setShowLogin(true)}
          />
        )}
      </div>

      {/* Modales */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <LoginModal
              onSuccess={() => {
                setShowLogin(false);
                window.location.reload();
              }}
              onRegisterClick={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <RegistroModal
              onSuccess={() => {
                setShowRegister(false);
                window.location.reload();
              }}
              onLoginClick={() => {
                setShowRegister(false);
                setShowLogin(true);
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
