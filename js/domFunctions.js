// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/rio%20ceballos?unitGroup=metric&key=PPJXX3FU5BTQEKCJM3QA5DQ5A&contentType=json

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

export const udpateDisplay = async (weatherObj, locationObj) => {
	fadeDisplay();
	clearDisplay();
	const weatherClass = getWeatherClass(weatherObj.days[0].icon);
	setBGImage(weatherClass);
	const screenRaderWeather = buildScreenReaderWeather(weatherObj, locationObj);
	updateScreenReaderConfirmation(screenRaderWeather);
	updateWeatherLocationHeader(locationObj.getName());
	const currentConditionsArray = await createCurrentConditionsDivs(
		weatherObj,
		locationObj.getUnit()
	);
	displayCurrentConditions(currentConditionsArray);
	setFocusOnSearch();
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
	let weatherClass = 'clouds';
	/fog/.test(icon) && (weatherClass = 'fog');
	/rain/.test(icon) && (weatherClass = 'rain');
	/snow/.test(icon) && (weatherClass = 'snow');
	return weatherClass;
};

const setBGImage = weatherClass => {
	console.log(weatherClass);
	document.documentElement.classList.add(weatherClass);
	document.documentElement.classList.forEach(img => {
		if (img !== weatherClass) {
			document.documentElement.classList.remove(img);
		}
	});
};

const buildScreenReaderWeather = (weatherJson, locationObj) => {
	const location = locationObj.getName();
	const unit = locationObj.getUnit();
	const tempUnit = unit === 'imperial' ? 'Fahrenheit' : 'Celsius';
	return `${weatherJson.days[0].description} ${Math.round(
		Number(weatherJson.days[0].temp)
	)} degrees ${tempUnit} in ${location}.`;
};

const setFocusOnSearch = () => {
	document.getElementById('searchBar__text').focus();
};

const createCurrentConditionsDivs = async (weatherJson, unit) => {
	const tempUnit = unit === 'imperial' ? 'F' : 'C';
	const windUnit = unit === 'imperial' ? 'mph' : 'kph';
	const icon = await createMainImgDiv(
		weatherJson.days[0].icon,
		weatherJson.days[0].description
	);
	const temp = createElement(
		'div',
		'temp',
		`${Math.round(Number(weatherJson.days[0].temp))}°`,
		tempUnit
	);
	const description = createElement(
		'div',
		'desc',
		weatherJson.days[0].conditions
	);
	const feelsLike = createElement(
		'div',
		'feels',
		`Feels like ${Math.round(Number(weatherJson.days[0].feelslike))}°`
	);
	const maxTemp = createElement(
		'div',
		'maxtemp',
		`High ${Math.round(Number(weatherJson.days[0].tempmax))}°`
	);
	const minTemp = createElement(
		'div',
		'mintemp',
		`Low ${Math.round(Number(weatherJson.days[0].tempmin))}°`
	);
	const humidity = createElement(
		'div',
		'humidity',
		`Humidity ${Math.round(Number(weatherJson.days[0].humidity))}%`
	);
	const wind = createElement(
		'div',
		'wind',
		`Wind ${Math.round(Number(weatherJson.days[0].windspeed))} ${windUnit}`
	);
	return [icon, temp, description, feelsLike, maxTemp, minTemp, humidity, wind];
};

const createMainImgDiv = async (icon, altText) => {
	const iconDiv = createElement('div', 'icon');
	iconDiv.id = 'icon';
	const svg = await getSvgParsedString(icon);
	iconDiv.innerHTML = svg;
	// svg.ariaHidden = true;
	// svg.title = altText;
	return iconDiv;
};

const createElement = (elementType, divClassName, divText, unit) => {
	const div = document.createElement(elementType);
	div.className = divClassName;
	if (divText) {
		div.textContent = divText;
	}
	if (divClassName === 'temp') {
		const unitDiv = document.createElement('div');
		unitDiv.className = 'unit';
		unitDiv.textContent = unit;
		div.appendChild(unitDiv);
	}
	return div;
};

async function getSvgParsedString(svgName) {
	try {
		const response = await fetch(`img/weather-icons/${svgName}.svg`);
		const svgText = await response.text();

		// Create a new SVG element from the SVG text
		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
		const svgElement = svgDoc.documentElement;

		// Convert the SVG element to an HTML string
		const svgString = new XMLSerializer().serializeToString(svgElement);

		return svgString;
	} catch (error) {
		console.error(`Error loading or parsing SVG: ${error}`);
		return ':(';
	}
}

const displayCurrentConditions = currentConditionsArray => {
	const currentConditionsContainer = document.getElementById(
		'currentForecast__conditions'
	);
	currentConditionsArray.forEach(cc => {
		currentConditionsContainer.appendChild(cc);
	});
};
