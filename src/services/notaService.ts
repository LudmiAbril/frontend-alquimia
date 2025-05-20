export const obtenerNotasPorPaso = async (paso: number) => {
  let url = "";

  switch (paso) {
    case 1:
      url = "https://localhost:7164/creacion/notasDeFondo";
      break;
    case 2:
      url = "https://localhost:7164/creacion/notasDeCorazon";
      break;
    case 3:
      url = "https://localhost:7164/creacion/notasDeSalida";
      break;
    default:
      return [];
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener las notas");
  return await res.json();
};
