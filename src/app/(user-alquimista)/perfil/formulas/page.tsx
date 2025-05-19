import Button from "@/components/general/Button";

export default function FormulasPage() {
  return (
    <div >
      <h2 className="text-xl font-bold mb-6 text-[var(--gris4)] uppercase pt-6">Mis Fórmulas</h2>
      <p className="italic text-gray-500 mb-6">Todavía no hay huellas perfumadas aquí.</p>
      <p className="text-gray-600 mb-9">
        Cuando elijas tu fragancia y la prepares, vas a ver tus fórmulas en este rincón.
      </p>
      <Button label="Empezar a diseñar" />
    </div>
  );
}
