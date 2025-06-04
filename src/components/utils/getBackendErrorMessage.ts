import { BackendErrorResponse } from "./typing";

export function getBackendErrorMessage(data: unknown): string {
  if (
    typeof data === "object" &&
    data !== null &&
    ("mensaje" in data || "errors" in data)
  ) {
    const response = data as BackendErrorResponse;

    if (response.mensaje) return response.mensaje;

    if (response.errors) {
      const firstKey = Object.keys(response.errors)[0];
      return response.errors[firstKey][0];
    }
  }

  return "Ocurrió un error inesperado.";
}


export function validatePassword(password: string): string | null {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!regex.test(password)) {
    return "Debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial.";
  }
  return null;
}
 
export function validateRegisterForm(nombre: string, email: string, password: string, confirmPassword: string): string | null {
  if (!nombre.trim()) return "El nombre es obligatorio.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "El correo electrónico no es válido.";

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  if (password !== confirmPassword) return "Las contraseñas no coinciden.";

  return null;
}

export function getPasswordStrength(password: string): "Débil" | "Media" | "Segura" {
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (password.length < 8 || !hasUpper || !hasDigit || !hasSpecial) return "Débil";
  if (password.length < 10) return "Media";
  return "Segura";
}
