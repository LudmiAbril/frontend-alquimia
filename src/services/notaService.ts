export const obtenerNotasPorPaso = async (paso: number) => {
  let url = "";
  const token = localStorage.getItem('token');
  switch (paso) {
    case 1:
      url = "http://localhost:5035/creator/base-notes";
      break;
    case 2:
      url = "http://localhost:5035/creator/heart-notes";
      break;
    case 3:
      url = "http://localhost:5035/creator/top-notes";
      break;
    default:
      return [];
  }

  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) throw new Error("Error al obtener las notas");
  const data = await res.json();
  return data;
};

export const getFamilyInfo = async (familyId: number) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:5035/creator/family-info/${familyId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) throw new Error("Error al obtener las notas");
  const data = await res.json();
  console.log(data)
  return data;
}

export const getNoteInfo = async (noteId: number) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:5035/creator/family-info/${noteId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) throw new Error("Error al obtener las notas");
  const data = await res.json();
  return data;
}