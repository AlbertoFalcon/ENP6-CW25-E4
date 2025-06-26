function getCancionPorId(id) {
  for (let i = 0; i < baseDatosJSON.canciones.length; i++) {
    if (baseDatosJSON.canciones[i].id === id) {
      return baseDatosJSON.canciones[i];
    }
  }
  return null;
}