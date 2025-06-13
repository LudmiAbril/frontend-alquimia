import { BackendErrorResponse, ProviderFormData } from "./typing";

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



//********************************** funciones step2 cuit ******************************************** */

export function validateCUIL(cuil: string): boolean {
  return /^\d{2}-\d{8}-\d{1}$/.test(cuil);
}

export function validateStep2Form(form: {
  empresa: string;
  cuil: string;
  productosSeleccionados: string[];
  otroProducto?: string;
}): string | null {
  const { empresa, cuil, productosSeleccionados, otroProducto } = form;

  if (!empresa || !cuil || productosSeleccionados.length === 0) {
    return "Por favor completá todos los campos obligatorios.";
  }

  if (!validateCUIL(cuil)) {
    return "El CUIL debe tener el formato 27-XXXXXXXX-X";
  }

  if (productosSeleccionados.includes("Otro") && !otroProducto?.trim()) {
    return "Por favor especificá qué otro producto ofrecés.";
  }

  return null;
}



export function formatCuit(value: string): string {
  const digits = value.replace(/\D/g, "");
  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 10);
  const part3 = digits.slice(10, 11);

  let result = part1;
  if (part2) result += `-${part2}`;
  if (part3) result += `-${part3}`;
  return result;
}




//********************************** funciones de pago  ******************************************** */

export function formatCardExpiry(value: string): string {
  let clean = value.replace(/\D/g, "");
  if (clean.length > 2) clean = `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
  return clean;
}

export function isValidExpiry(value: string): boolean {
  const [monthStr, yearStr] = value.split("/");
  if (!monthStr || !yearStr) return false;

  const month = parseInt(monthStr);
  const year = parseInt(`20${yearStr}`);
  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return false;

  const now = new Date();
  const expDate = new Date(year, month - 1, 1);
  expDate.setMonth(expDate.getMonth() + 1); // end of month
  return expDate > now;
}

export function isValidCardNumber(cardNumber: string): boolean {
  const clean = cardNumber.replace(/\s+/g, "");
  if (!/^\d{13,19}$/.test(clean)) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export function getCardBrand(cardNumber: string): string {
  const clean = cardNumber.replace(/\s+/g, "");

  if (/^4[0-9]{6,}$/.test(clean)) return "Visa";
  if (/^5[1-5][0-9]{5,}$/.test(clean)) return "MasterCard";
  if (/^3[47][0-9]{5,}$/.test(clean)) return "American Express";
  if (/^6(?:011|5[0-9]{2})[0-9]{3,}$/.test(clean)) return "Discover";

  return "Tarjeta";
}


export function validatePaymentForm(formData: ProviderFormData): {
  success: boolean;
  message: string;
  brand?: string;
} {
  const { numero, nombre, vencimiento, cvc } = formData.tarjeta ?? {};

  if (!numero || !nombre || !vencimiento || !cvc) {
    return { success: false, message: "Por favor completá todos los datos de tu tarjeta." };
  }

  if (!isValidCardNumber(numero)) {
    return { success: false, message: "El número de tarjeta no es válido." };
  }

  if (!isValidExpiry(vencimiento)) {
    return { success: false, message: "La fecha de vencimiento es inválida o ya expiró." };
  }

  const brand = getCardBrand(numero);
  return { success: true, message: "", brand };
}

