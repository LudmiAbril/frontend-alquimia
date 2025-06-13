"use client";

import { useEffect, useState } from "react";


interface UserProfile {
  name: string;
  email: string;
  role: string;
}
export default function AccountPage() {
  const [userData, setUserData] = useState<UserProfile | null>(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5035/profile/data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Error cargando perfil:", err);
        setError(true);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-10">
      {error ? (
        <p className="text-gray-400 text-center">No se pudo cargar el perfil.</p>
      ) : userData ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Hola, {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Rol: {userData.role}</p>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-400">Cargando datos...</p>
      )}
    </div>
  );
}
