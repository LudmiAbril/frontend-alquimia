/*GENERAL*/

interface ButtonProps {
  label: string;
  onClick?: () => void;
};

/**PROVEEDORES */
interface CardProductoProps {
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
};
type Props = {
  params: {
    slug: string;
  };
};
interface Props {
  params: { slug: string };
}
export interface Producto {
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
}

export interface DetalleProductoProps {
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  proveedor: string;
  rubro: string;
  subrubro?: string;
}

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


export interface SeccionVaciaProps {
  titulo: string;
  descripcion1: string;
  descripcion2: string;
  textoBoton: string;
  onClick?: () => void;
}



export interface AuthModalWrapperProps {
    children: ReactNode;
    title: string;
    onClose: () => void;
}


export interface Props {
  cambiarFormulario: () => void;
}
