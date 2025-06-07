"use client";

import SectionWrapper from "@/components/general/SectionWrapper";
import CustomButton from "@/components/provider/CustomButton";
import ProviderMenu from "@/components/provider/ProviderMenu";
import ProviderTable from "@/components/provider/ProviderTable";
import ProviderTabs from "@/components/provider/ProviderTabs";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Provider } from "@/components/utils/typing";
import Link from "next/dist/client/link";
import { useEffect } from "react";

export default function ProviderPage() {
  const mockProviders: Provider[] = [
    { id: 1, name: "Producto A", description: "Descripción A", stock: 1 },
    { id: 2, name: "Producto B", description: "Descripción B", stock: 8 },
    { id: 3, name: "Producto C", description: "Descripción C", stock: 20 },
  ];

  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#ffffff"; // blanco

    return () => {
      document.body.style.backgroundColor = previous; // restaurar al salir
    };
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
        <ProviderTable providers={mockProviders} />
      </div>
    </section>
  );
}

