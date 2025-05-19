import SeccionVacia from "@/components/menu/SeccionVacia";

export default function FormulasPage() {
  return (
    <SeccionVacia
      titulo="Mis Fórmulas"
      descripcion1="Todavía no hay huellas perfumadas aquí."
      descripcion2="Cuando elijas tu fragancia y la prepares, vas a ver tus fórmulas en este rincón."
      textoBoton="Empezar a diseñar"
      onClick={() => console.log("Empezar a diseñar")}
    />
  );
}
