
import SectionWrapper from "@/components/general/SectionWrapper";

export default function FlujoUsersLayout() {
  return (
    <SectionWrapper className="bg-[var(--degrade)] " >
    <div className="bg-white p-6 rounded-md shadow-md">
    <h2 className="text-center text-xl font-bold text-[var(--violeta)] mb-6 uppercase">
      Política de privacidad
    </h2>

    <p className="text-sm text-gray-700 mb-4">
      <strong>Última actualización:</strong> 19/05/25
    </p>

    <p className="text-sm text-gray-700 mb-4">
      En Alquimia respetamos su privacidad y nos comprometemos a proteger sus datos personales.
    </p>

    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
      <li>
        <strong>Información que recolectamos</strong>
        <ul className="list-disc list-inside ml-4 mt-1">
          <li>Datos de contacto (nombre, correo electrónico)</li>
          <li>Preferencias de usuario (notas seleccionadas, envases, etc.)</li>
          <li>Interacciones dentro de la app</li>
        </ul>
      </li>

      <li>
        <strong>Uso de la información</strong>
        <ul className="list-disc list-inside ml-4 mt-1">
          <li>Para mejorar la experiencia del usuario</li>
          <li>Para enviar notificaciones si el usuario lo autoriza</li>
          <li>Para facilitar el contacto con proveedores</li>
        </ul>
      </li>

      <li>
        <strong>Compartir con terceros</strong>
        <ul className="list-disc list-inside ml-4 mt-1">
          <li>Solo compartimos datos con proveedores si el usuario lo autoriza explícitamente</li>
          <li>No vendemos ni cedemos datos personales a otras empresas</li>
        </ul>
      </li>

      <li>
        <strong>Seguridad</strong>
        <p className="ml-4 mt-1">Aplicamos medidas técnicas y organizativas adecuadas para proteger su información</p>
      </li>

      <li>
        <strong>Derechos del usuario</strong>
        <p className="ml-4 mt-1">
          Puede acceder, modificar o eliminar sus datos personales solicitándolo a: <span className="text-gray-900 font-medium">[email@email.com]</span>
        </p>
      </li>
    </ol>
  </div>
    </SectionWrapper>
  );
}
