export const obtenerNotasPorPaso = async (paso: number) => {
  let url = "";

  switch (paso) {
    case 1:
      url = "https://localhost:5035/creador/base-notes";
      break;
    case 2:
      url = "https://localhost:5035/creador/heart-notes";
      break;
    case 3:
      url = "https://localhost:5035/creador/top-notes";
      break;
    default:
      return [];
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener las notas");
  const data= await res.json()
  console.log(data)
  return await data;
};
