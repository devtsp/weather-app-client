export const addSpinner = element => {
	animateButton(element);
	setTimeout(animateButton, 1000, element);
};

const animateButton = element => {
	element.classList.toggle('none');
	element.nextElementSibling.classList.toggle('block');
	element.nextElementSibling.classList.toggle('none');
};

export const displayError = (headerMsg, srMsg) => {
	updateWeatherLocationHeader(headerMsg);
	updateScreenReaderConfirmation(srMsg);
};

const updateWeatherLocationHeader = message => {
	const h1 = document.getElementById('currentForecast__location');
	h1.textContent = message;
};

const updateScreenReaderConfirmation = message => {
	document.getElementById('confirmation').textContent = message;
};

const geoSuccess = position => {
	const myCoordsObj = {
		lat: position.coords.latitude,
		lon: position.coords.longitude,
		name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`,
	};
	// set location object
};
