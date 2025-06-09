"use client";

import ProviderMenu from "@/components/provider/ProviderMenu";
import ProviderTable from "@/components/provider/ProviderTable";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Provider } from "@/components/utils/typing";

export default function ProviderPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#ffffff";
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, []);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No hay token de autenticación.");
          setLoading(false);
          return;
        }
console.log(token)
        const response = await fetch("http://localhost:5035/provider/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Status code:", response.status);

        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de productos.");
        }

        const data = await response.json();
        setProviders(data);
      } catch (err) {
        setError("Error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  return (
    <section className="flex min-h-screen bg-white mt-20">
      {/* Menú lateral izquierdo */}
      <div className="w-[220px] border-r border-gray-200 bg-white shadow-md">
        <ProviderMenu />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[var(--gris4)]">
            Lista de productos
          </h2>
          <Tooltip title="Crear nuevo producto" arrow>
            <Link href="/subirProducto" passHref>
              <IconButton
                color="primary"
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#8e44ad",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#732d91",
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </div>

        {loading && <p>Cargando productos...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <ProviderTable providers={providers} />}
      </div>
    </section>
  );
}
