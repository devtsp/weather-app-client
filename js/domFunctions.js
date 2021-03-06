
// aplicar la animación al elemento argumentado
export const addSpinner = (element) => {
  // activa el spinner
  animateButton(element);
  // 3er arg: es pasado como arg a la función en arg1
  setTimeout(animateButton, 1000, element);
};

// animación per sé (helper de addSpinner) class toggler
const animateButton = (element) => {
  element.classList.toggle("none");
  element.nextElementSibling.classList.toggle("block");
  element.nextElementSibling.classList.toggle("none");
};

export const displayError = (headerMsg, srMsg) => {
  updateWeatherLocationHeader(headerMsg);
  updateScreenReaderConfirmation(srMsg);
};

const updateWeatherLocationHeader = (message) => {
  const h1 = document.getElementById("currentForecast__location");
  h1.textContent = message;
};

const updateScreenReaderConfirmation = (message) => {
  document.getElementById("confirmation").textContent = message;
};

const geoSuccess = (position) => {
  const myCoordsObj = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`
  };
  // set location object
}
