import { RegisterDTO } from "./typing";

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

