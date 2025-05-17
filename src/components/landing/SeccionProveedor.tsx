import SectionWrapper from "@/components/general/SeccionWrapper";

export default function SeccionProveedor() {
  return (
    <SectionWrapper className="bg-[#E8E3DE]">
      <div className="text-center">
        <h2 className="text-lg md:text-xl font-bold mb-4">
          ¿SOS FABRICANTE O PROVEEDOR DE INSUMOS PARA PERFUMERÍA?
        </h2>
        <p className="text-base md:text-lg mb-10">
          Te ofrecemos la posibilidad de publicitar tus productos en nuestra plataforma,
          con un costo anual de $50000 podés controlar tu stock y fijar tus precios.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-rows-3 gap-4">
            <input
              type="text"
              placeholder="Nombre"
              className="p-3 border border-gray-400 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 border border-gray-400 rounded-md"
            />
            <input
              type="text"
              placeholder="Nombre de la empresa"
              className="p-3 border border-gray-400 rounded-md"
            />
          </div>
          <div className="h-full">
            <textarea
              placeholder="Contanos sobre tu empresa..."
              className="p-3 border border-gray-400 rounded-md h-full min-h-[192px] w-full resize-none"
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center mt-2">
            <button
              type="submit"
              className="bg-[#9444B6] hover:bg-[#7a2f96] transition text-white font-bold px-6 py-3 rounded-md w-full md:w-auto">
                 QUIERO SER PARTE
            </button>
          </div>
        </form>

      </div>
    </SectionWrapper>
  );
}
