"use client";

import { useEffect, useState } from "react";

export default function RedirectGooglePage() {
  const [estado, setEstado] = useState<"cargando" | "ok" | "error">("cargando");
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => {
    const verificarEstado = async () => {
      try {
        const response = await fetch("http://localhost:5035/cuenta/auth/status", {
          credentials: "include",
        });

        if (!response.ok) {
          setEstado("error");
          return;
        }

        const data = await response.json();
        if (data.autenticado) {
          setUsuario(data.nombre);
          setEstado("ok");
        } else {
          setEstado("error");
        }
      } catch (err) {
        console.error("Error al verificar autenticación", err);
        setEstado("error");
      }
    };

    verificarEstado();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      {estado === "cargando" && <p>Verificando autenticación con Google...</p>}
      {estado === "ok" && <h2>¡Bienvenido {usuario}! 🎉</h2>}
      {estado === "error" && <p>Error al autenticar con Google ❌</p>}
    </div>
  );
}
