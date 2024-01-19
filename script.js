// URL
const baseURL = "http://api.weatherapi.com/v1";
const key = "?key=f36116024ea548d484f122941232106";


// get the html elements
const condImgElement = document.getElementById("condImg");
const condTextElement = document.getElementById("condText");
const temperature = document.getElementById("temp");
const feelsTemp = document.getElementById("feels_temp");
const switchFCButton = document.getElementById("switchFC");
const imgBack = document.querySelector(".imgback");
const locate = document.querySelector(".location");

const info = document.querySelector(".info");
const loader = document.querySelector(".loader");



// vars to hold the temperature data
let tempF = 0;
let tempC = 0;
let feelsLikeF = 0;
let feelsLikeC = 0;
let showingF = true;


// get the location from the user
const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
        handlePosition
    )
}


// Gets the lat and lon from the user's position and pass to the getWeather func
const handlePosition = (pos) => {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    const URL = baseURL + "/current.json" + key + "&q=" + latitude + "," + longitude;
    getWeather(URL);
}


// Calls the weather api and returns a json response
const getWeather = async (url) => {
    const response = await fetch(url);
    const jsonData = await response.json();

    tempF = jsonData.current.temp_f;
    tempC = jsonData.current.temp_c;
    feelsLikeF = jsonData.current.feelslike_f;
    feelsLikeC = jsonData.current.feelslike_c;

    console.log(jsonData);

    renderWeather(jsonData);
}


// Renders the weather data on the page
const renderWeather = (weather) => {
    // update the condition image and text
    // condImgElement.src=weather.current.condition.icon;
    condTextElement.textContent=weather.current.condition.text;

    // show the location
    locate.innerText=weather.location.name + ", " + weather.location.region;

    //display the temps
    temperature.innerHTML=tempF + '&deg; f';
    feelsTemp.innerHTML=feelsLikeF + '&deg; f';

    // set the day/night
    if (weather.current.is_day) {
        imgBack.classList.remove("nightTime");
        imgBack.classList.add("dayTime");
    } else {
        imgBack.classList.remove("dayTime");
        imgBack.classList.add("nightTime");
    }

    hide(loader);
    unhide(info);

}


// hides the given element
const hide = (element) => {
    element.classList.add("hidden");
}

// unhides the given element
const unhide = (element) => {
    element.classList.remove("hidden");
}


// Toggles the displayed temperature between farenheight and celsuis
const switchFC = () => {
    showingF = !showingF;
    if (showingF) {
        temperature.innerHTML=tempF + '&deg; f';
        feelsTemp.innerHTML=feelsLikeF + '&deg; f';
        switchFCButton.innerHTML='&deg;C';
    } else {
        temperature.innerHTML=tempC + '&deg; C';
        feelsTemp.innerHTML=feelsLikeC + '&deg; C';
        switchFCButton.innerHTML='&deg;f';
    }
}

getLocation();