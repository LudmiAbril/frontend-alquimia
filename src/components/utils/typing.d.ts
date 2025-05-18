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