export const generarID = (arreglo) => {
  if (arreglo.length === 0) return '1';
  const ids = arreglo.map((objeto) => parseInt(objeto.id));
  const maxID = Math.max(...ids);
  const rellenarID = [];

  for (let i = 1; i <= maxID; i++) {
    if (!ids.includes(i)) {
      rellenarID.push(i.toString());
    }
  }
  
  return rellenarID.length > 0 ? missingIds[0] : (maxID + 1).toString();
};