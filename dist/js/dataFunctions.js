
// coords: browser data. loc: custom class
export const setLocationObject = (locationObj, coordsObj) => {
  // deconstruct browser object
  const { lat, lon, name, unit } = coordsObj;
  // modificamos los valores de nuestro custom object con los datos requeridos al browser
  locationObj.setLat(lat);
  locationObj.setLon(lon);
  locationObj.setName(name);
  if (unit) {
    locationObj.setUnit(unit);
  }
}