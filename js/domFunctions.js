export const setPlaceholderText = () => {
	const input = document.getElementById('searchBar__text');
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

export const udpateDisplay = (weatherObj, locationObj) => {
	fadeDisplay();
	clearDisplay();
	const weatherClass = getWeatherClass(weatherObj.currentConditions.icon);
	setBGImage(weatherClass);
	fadeDisplay();
};

const fadeDisplay = () => {
	const currentConditions = document.getElementById('currentForecast');
	currentConditions.classList.toggle('zero-vis');
	currentConditions.classList.toggle('fade-in');
	const sixDay = document.getElementById('dailyForecast');
	sixDay.classList.toggle('zero-vis');
	sixDay.classList.toggle('fade-in');
};

const clearDisplay = () => {
	const currentConditions = document.getElementById(
		'currentForecast__conditions'
	);
	deleteContents(currentConditions);
	const sixDayForecast = document.getElementById('dailyForecast__contents');
	deleteContents(sixDayForecast);
};

const deleteContents = parentElement => {
	let child = parentElement.lastElementChild;
	while (child) {
		parentElement.removeChild(child);
		child = parentElement.lastElementChild;
	}
};

const getWeatherClass = icon => {
	console.log(icon);
	let weatherClass = 'clouds';
	/fog/.test(icon) && (weatherClass = 'fog');
	/rain/.test(icon) && (weatherClass = 'rain');
	/snow/.test(icon) && (weatherClass = 'snow');
	console.log(weatherClass);
	return weatherClass;
};

const setBGImage = weatherClass => {
	document.documentElement.classList.add(weatherClass);
	document.documentElement.classList.forEach(img => {
		if (img !== weatherClass) {
			document.documentElement.classList.remove(img);
		}
	});
};
