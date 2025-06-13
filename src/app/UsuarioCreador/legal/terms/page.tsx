
import SectionWrapper from "@/components/General/SectionWrapper";

export default function FlujoUsersLayout() {
  return (
    <SectionWrapper className="bg-[var(--degrade)] " >
    <div className="bg-white p-6 rounded-md shadow-md">
     <h2 className="text-center text-xl font-bold text-[var(--violeta)] mb-6 uppercase">
      Términos y condiciones
    </h2>

    <p className="text-sm text-gray-700 mb-4">
      <strong>Última actualización:</strong> [11/05/2025]
    </p>

    <p className="text-sm text-gray-700 mb-4">
      Bienvenido/a a Alquimia (en adelante,  &quot;la Plataforma &quot;). Al utilizar este sitio web, usted acepta los siguientes términos y condiciones. Le rogamos que los lea detenidamente.
    </p>

    <ol className="list-decimal list-inside text-sm text-gray-700 space-y-4">
      <li>
        <strong>Objeto de la Plataforma</strong><br />
        La Plataforma permite al usuario diseñar virtualmente perfumes personalizados seleccionando esencias, envases y otros productos, y contactar proveedores que los ofrecen. La Plataforma no fabrica, vende ni distribuye productos físicos.
      </li>

      <li>
        <strong>Responsabilidad del Usuario</strong>
        <ul className="list-disc list-inside ml-4 mt-1">
          <li>Usted es responsable del uso que haga del diseño generado.</li>
          <li>El diseño y sus ingredientes son orientativos. El uso real de ingredientes puede causar efectos adversos (como alergias, irritaciones u otros).</li>
          <li>Se recomienda consultar con un profesional de salud antes de aplicar productos con ingredientes nuevos.</li>
        </ul>
      </li>

      <li>
        <strong>Relación con Proveedores</strong>
        <ul className="list-disc list-inside ml-4 mt-1">
          <li>Los proveedores son terceros independientes.</li>
          <li>La Plataforma no garantiza ni se responsabiliza por la calidad, seguridad, disponibilidad o resultados del uso de los productos ofrecidos por dichos proveedores.</li>
          <li>Cualquier transacción realizada con ellos será bajo su propio riesgo.</li>
        </ul>
      </li>

      <li>
        <strong>Limitación de Responsabilidad</strong>
        <ul className="list-disc list-inside ml-4 mt-1">
          <li>La Plataforma no se hace responsable por:</li>
          <li>Daños, reacciones o pérdidas ocasionadas por el uso de ingredientes o productos adquiridos a través de terceros.</li>
          <li>Errores en el contenido, interrupciones en el servicio o pérdidas de datos.</li>
        </ul>
      </li>

      <li>
        <strong>Uso Aceptable</strong>
        <ul className="list-disc list-inside ml-4 mt-1">
          <li>El usuario se compromete a:</li>
          <li>No utilizar la Plataforma para actividades ilegales o fraudulentas.</li>
          <li>No intentar vulnerar la seguridad del sistema ni modificar su funcionamiento.</li>
        </ul>
      </li>

      <li>
        <strong>Propiedad Intelectual</strong><br />
        Todos los contenidos del sitio (nombre, diseño, estructura, textos, etc.) son propiedad de [Nombre del desarrollador o empresa] y están protegidos por la legislación vigente.
      </li>

      <li>
        <strong>Jurisdicción</strong><br />
        Estos términos se rigen por las leyes de [País]. Cualquier disputa será resuelta por los tribunales competentes de [Ciudad/Provincia].
      </li>
    </ol>
  </div>

  {/* <button
    className="mt-6 bg-[#9444B6] hover:bg-[#7a2f96] text-white font-bold px-6 py-3 rounded-lg transition" >
    Estoy de acuerdo
  </button> */}
    </SectionWrapper>
  );
}
