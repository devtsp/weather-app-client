export const setPlaceholderText = () => {
	const input = document.getElementById('saerchBar__text');
	window.innerWidth < 400
		? (input.placeholder = 'City, State, Country')
		: (input.placeholder = 'City, State, Country, or Zip Code');
};

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

export const displayApiError = statusCode => {
	const properMsg = toProperCase(statusCode.message);
	updateWeatherLocationHeader(properMsg);
	updateScreenReaderConfirmation(`${properMsg}. Please try again.`);
};

export const toProperCase = text => {
	const words = text.split(' ');
	const properWords = words.map(word => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});
	return properWords.join(' ');
};

const updateWeatherLocationHeader = message => {
	const h1 = document.getElementById('currentForecast__location');
	h1.textContent = message;
};

export const updateScreenReaderConfirmation = message => {
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
