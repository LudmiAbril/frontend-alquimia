import BaseModal from "./BaseModal";
import Image from "next/image";
import Button from "./general/Button";
import { AuthModalProps } from "./utils/typing";

export default function AutoModal({
  isOpen,
  onClose,
  titulo,
  botonPrincipal,
  children,
  textoSecundario,
  accionSecundaria,
  onAccionSecundaria,
}: AuthModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Image src="/logo/logo.svg" alt="Logo" width={50} height={50} />
        <h2 className="text-lg font-bold mt-2 mb-6 text-[var(--gris4)]">{titulo}</h2>

        <form className="w-full flex flex-col gap-4">
          {children}
          <Button label={botonPrincipal} />

          <button className="bg-white border text-sm py-2 rounded-md text-black flex justify-center items-center gap-2">
            <img src="/svgGeneral/google.svg" alt="Google" className="w-5 h-5" />
            Iniciar sesión con Google
          </button>

          <p className="text-sm text-center mt-4">
            {textoSecundario}{" "}
            <span className="underline cursor-pointer" onClick={onAccionSecundaria}>
              {accionSecundaria}
            </span>
          </p>
        </form>
      </div>
    </BaseModal>
  );
}
