import { RegisterDTO } from "@/components/Utils/typing";

export async function registerUser(data: RegisterDTO): Promise<{ token: string }> {
  const response = await fetch("http://localhost:5035/account/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.mensaje || "Error en el registro.");
  }

  return result;
}
