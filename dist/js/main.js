
import { addSpinner, displayError } from "./domFunctions.js";

import CurrentLocation from "./CurrentLocation.js";

import { setLocationObject }  from "./dataFunctions.js";

// Objeto con location data 
const currentLoc = new CurrentLocation();

const initApp = () => {
  // add listeners!!
  // geoloc butn
  const geoButton = document.getElementById("getLocation");
  geoButton.addEventListener("click", getGeoWeather);
  // home btn
  const homeButton = document.getElementById("home");
  homeButton.addEventListener("click",loadWeather)
  // set up

  // load weather
  
};

// DOM check para cargar las funcionalidades
document.addEventListener("DOMContentLoaded", initApp);

// Funcion madre: llama a varias helper (animación, validación)
const getGeoWeather = (event) => {
  // if porque podriamos llamar a la función sin el click
  if (event) {
    if (event.type === "click") {
      // si es llamada por click; add spinner animation!!
      const mapIcon = document.querySelector(".fa-map-marker-alt");
      addSpinner(mapIcon);
    }
  }
  // check if geolocation is supported/enabled on browser first
  if (!navigator.geolocation) geoError();
  // built in!!! 
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

// error handling procedural func
const geoError = (errObj) => {
  // error message or geoloc disabled
  const errMsg = errObj ? errObj.message : "Geolocation not supported";
  // muestra error o unabled en header y envia al screen reader
  displayError(errMsg, errMsg);
};

const geoSuccess = (position) => {
  const myCoordsObj = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`
  };
  setLocationObject(currentLoc, myCoordsObj);
  updateDataAndDisplay(currentLoc);
};

const updateDataAndDisplay = async (locationObj) => {
  // const weatherJson = await getWeatherFromCoords(locationObj);
  // if (weatherJson) updateDataAndDisplay(weatherJson, locationObj);
};
