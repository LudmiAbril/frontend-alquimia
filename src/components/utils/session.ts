import { RegisterDTO } from "./typing";
import { ProviderFormData } from "./typing";


export function saveSessionData(token: string) {
  localStorage.setItem("token", token);

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload?.name) {
      localStorage.setItem("username", payload.name);
    }

    if (payload?.email) {
      localStorage.setItem("useremail", payload.email);
    }

    console.log("Sesión guardada con éxito ✅");
  } catch (error) {
    console.error("Token inválido", error);
  }
}


export async function registerUser(data: RegisterDTO) {
  const response = await fetch("http://localhost:5035/cuenta/registrar-json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result?.mensaje || "Error en el registro.");
  return result;
}


export async function sendRegisterProvider(formData: ProviderFormData): Promise<boolean> {
  try {
    const payload = {
      email: formData.email,
      password: formData.password,
      name: formData.empresa, // nombre que espera el backend
      cuil: formData.cuil,
      rubro: formData.rubro,
      productosSeleccionados: formData.productosSeleccionados,
      //tarjetaNombre: formData.tarjeta.nombre,
      tarjetaNumero: formData.tarjeta.numero,
      tarjetaVencimiento: formData.tarjeta.vencimiento,
      tarjetaCVC: formData.tarjeta.cvc,
      };

    const response = await fetch("http://localhost:5035/cuenta/registrar-proveedor", {
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
    console.log("✅ Registro exitoso:", data);

    // Guardar token
    localStorage.setItem("token", data.token);
    return true;

  } catch (err) {
    console.error("❌ Error inesperado:", err);
    alert("Error de red o inesperado.");
    return false;
  }
}