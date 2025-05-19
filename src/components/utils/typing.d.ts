/*GENERAL*/

interface ButtonProps {
  label: string;
};

/**PROVEEDORES */
interface CardProductoProps {
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
};

// LANDING
export interface SeccionConImagenProps {
  titulo: string;
  descripcion: string;
  imagen: string;
  alt: string;
  botonTexto?: string;
  invertir?: boolean;
  className?: string;
}

// perfil
export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  botonPrincipal: string;
  children: React.ReactNode;
  textoSecundario: string;
  accionSecundaria: string;
  onAccionSecundaria: () => void;
}