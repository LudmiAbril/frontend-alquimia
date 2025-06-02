import { RegisterDTO } from "./typing";

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

