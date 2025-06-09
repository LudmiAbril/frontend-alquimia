import { RegisterDTO, ProviderFormData } from "@/components/utils/typing";
import { useEffect, useState } from "react";

// Guardar token y decodificar datos del usuario
export function saveSessionData(token: string) {
  localStorage.setItem("token", token);
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload?.["user-name"]) {
      localStorage.setItem("username", payload["user-name"]);
    }

    if (payload?.["name-identifier"]) {
      localStorage.setItem("userId", payload["name-identifier"]);
    }

    if (payload?.["email"]) {
      localStorage.setItem("useremail", payload["email"]);
    }
  } catch (error) {
    console.error("Token inválido", error);
  }
}

// Obtener los datos de sesión
export function getSessionData() {
  return {
    name: localStorage.getItem("username"),
    email: localStorage.getItem("useremail"),
    token: localStorage.getItem("token"),
  };
}

// Limpiar datos de sesión
export function clearSessionData() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("useremail");
  localStorage.removeItem("userId");
}

// Hook React para usar sesión
export function useSession() {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const { name, email } = getSessionData();
    setUsername(name);
    setEmail(email);
  }, []);

  const logout = () => {
    clearSessionData();
    window.location.reload();
  };

  return { username, email, logout };
}

// Registro de usuario
export async function registerUser(data: RegisterDTO) {
  const response = await fetch("http://localhost:5035/account/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result?.mensaje || "Error en el registro.");
  return result;
}

// Registro de proveedor con datos extendidos
export async function sendRegisterProvider(formData: ProviderFormData): Promise<boolean> {
  try {
    const payload = {
      email: formData.email,
      password: formData.password,
      name: formData.empresa,
      cuil: formData.cuil,
      rubro: formData.rubro,
      productosSeleccionados: formData.productosSeleccionados,
      tarjetaNumero: formData.tarjeta.numero,
      tarjetaVencimiento: formData.tarjeta.vencimiento,
      tarjetaCVC: formData.tarjeta.cvc,
    };

    const response = await fetch("http://localhost:5035/account/register-provider", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Error status:", response.status);
      console.error("❌ Error en el registro:", errorData);
      alert("Ocurrió un error: " + (errorData?.mensaje || "Intente nuevamente."));
      return false;
    }

    const data = await response.json();
    saveSessionData(data.token);
    return true;

  } catch (err) {
    alert("Error de red o inesperado.");
    return false;
  }
}
