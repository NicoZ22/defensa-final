export const generarId = (socios) => {
  if (socios.length === 0) return '1';
  const ids = socios.map((socio) => parseInt(socio.id));
  const maxId = Math.max(...ids);
  const missingIds = [];

  for (let i = 1; i <= maxId; i++) {
    if (!ids.includes(i)) {
      missingIds.push(i.toString());
      break;
    }
  }
  
  return missingIds.length > 0 ? missingIds[0] : (maxId + 1).toString();
};