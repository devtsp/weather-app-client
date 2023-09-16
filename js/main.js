import CurrentLocation from './CurrentLocation.js';
import {
	setPlaceholderText,
	addSpinner,
	displayError,
	displayApiError,
	updateScreenReaderConfirmation,
} from './domFunctions.js';
import {
	getHomeLocation,
	setLocationObject,
	cleanText,
} from './dataFunctions.js';

const currentLoc = new CurrentLocation();

const initApp = () => {
	// Add listeners
	const geoButton = document.getElementById('getLocation');
	geoButton.addEventListener('click', getGeoWeather);
	const homeButton = document.getElementById('home');
	homeButton.addEventListener('click', loadWeather);
	const saveButton = document.getElementById('saveLocation');
	saveButton.addEventListener('click', saveLocation);
	const unitButton = document.getElementById('unit');
	unitButton.addEventListener('click', setUnitPref);
	const refreshButton = document.getElementById('refresh');
	refreshButton.addEventListener('click', refreshWeather);
	const locationEntry = document.getElementById('searchBar_form');
	locationEntry.addEventListener('submit', submitNewLocation);
	// Setup
	setPlaceholderText();
	// Load Wether
	loadWeather();
};

document.addEventListener('DOMContentLoaded', initApp);

const getGeoWeather = event => {
	if (event) {
		if (event.type === 'click') {
			const mapIcon = document.querySelector('.fa-map-marker-alt');
			addSpinner(mapIcon);
		}
	}
	if (!navigator.geolocation) {
		return geoError();
	}
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

const geoError = errObj => {
	const errMsg = errObj ? errObj.message : 'Geolocation not supported';
	displayError(errMsg, errMsg);
};

const geoSuccess = position => {
	const myCoordsObj = {
		lat: position.coords.latitude,
		lon: position.coords.longitude,
		name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`,
	};
	setLocationObject(currentLoc, myCoordsObj);
	updateDataAndDisplay(currentLoc);
};

const loadWeather = event => {
	const savedLocation = getHomeLocation();
	if (!savedLocation && !event) {
		return getGeoWeather();
	}
	if (!savedLocation && event.type === 'click') {
		displayError(
			'No Home Location saved',
			'Please save your home location first'
		);
	} else if (savedLocation && !event) {
		displayHomeLocationWeather(savedLocation);
	} else {
		const homeIcon = document.querySelector('.fa-home');
		addSpinner(homeIcon);
		displayHomeLocationWeather(savedLocation);
	}
};

const displayHomeLocationWeather = home => {
	if (typeof home === 'string') {
		const locationJson = JSON.parse(home);
		const myCoordsObj = {
			lat: locationJson.lat,
			lon: locationJson.lon,
			name: locationJson.name,
			unit: locationJson.unit,
		};
		setLocationObject(currentLoc, myCoordsObj);
		updateDataAndDisplay(currentLoc);
	}
};

const saveLocation = () => {
	if (currentLoc.getLat() && currentLoc.getLon()) {
		const saveIcon = document.querySelector('.fa-save');
		addSpinner(saveIcon);
		const locationObj = {
			name: currentLoc.getName(),
			lat: currentLoc.getLat(),
			lon: currentLoc.getLon(),
			unit: currentLoc.getUnit(),
		};
		localStorage.setItem('defaultWeatherLocation', JSON.stringify(locationObj));
		updateScreenReaderConfirmation(
			`Saved ${currentLoc.getName()} as home location.`
		);
	}
};

const setUnitPref = () => {
	const unitIcon = document.querySelector('.fa-chart-bar');
	addSpinner(unitIcon);
	currentLoc.toggleUnit();
	updateDataAndDisplay(currentLoc);
};

const refreshWeather = () => {
	const refreshIcon = document.querySelector('.fa-sync-alt');
	addSpinner(refreshIcon);
	updateDataAndDisplay(currentLoc);
};

const updateDataAndDisplay = async locationObj => {
	console.log(locationObj);
	// const weatherJson = await getWeatherFromCoords(locationObj);
	// if (weatherJson) updateDataAndDisplay(weatherJson, locationObj);
};
