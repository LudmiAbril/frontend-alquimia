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
