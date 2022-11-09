import { btnRecentSearch } from "./eventListenner";
import { recentSearch, setDomSearchs } from "./searchRecent";

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

let gradesInCelsius = true;


async function searchWeatherWithCoords(lat, lon, metricImperial){
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${metricImperial}&appid=884ed5debe51a2eb936519a83d93ae35`, {mode: 'cors'})
    // const api = await fetch('todayWeather.json');
    const resolve = await api.json();
    const cityName = resolve.name;

    callAPI(cityName, metricImperial)
    
}

async function callAPI(cityName, metricImperial){
    try {
        document.body.classList.add('load');
        await weatherToday(cityName, metricImperial);
        await weatherApiWeek(cityName, metricImperial);
        changeGrades()
        document.body.classList.remove('load');
    } catch (error) {
        const localStorageReturn = JSON.parse(localStorage.getItem('coords'));
        alert('This city not found');
        recentSearch.pop();
        setDomSearchs();
        await searchWeatherWithCoords(localStorageReturn.lat, localStorageReturn.long, 'metric');
        document.body.classList.remove('load');
        btnRecentSearch()
    }
}

async function weatherToday(city, metricImperial){
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metricImperial}&appid=884ed5debe51a2eb936519a83d93ae35`, {mode: 'cors'})
    // const api = await fetch('todayWeather.json');
    const resolve = await api.json();
    weather(resolve.weather[0].main, Math.round(resolve.main.temp), resolve.name, Math.round(resolve.wind.speed), resolve.wind.deg,
    resolve.main.humidity, resolve.visibility/1000, resolve.main.pressure);
}

async function weatherApiWeek(city, metricImperial){
    const api = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metricImperial}&appid=884ed5debe51a2eb936519a83d93ae35`,{mode: 'cors'});
    // const api = await fetch('weatther4Week.json')
    const resolve = await api.json();

    weatherTomorrow(resolve.list[1].weather[0].main, Math.ceil(resolve.list[1].main.temp_max), Math.round(resolve.list[1].main.temp_min));
    weatherTwoDays(resolve.list[9].dt_txt, resolve.list[9].weather[0].main, Math.ceil(resolve.list[9].main.temp_max), Math.round(resolve.list[9].main.temp_min));
    weatherThreeDays(resolve.list[17].dt_txt, resolve.list[17].weather[0].main, Math.ceil(resolve.list[17].main.temp_max), Math.round(resolve.list[17].main.temp_min));
    weatherFourDays(resolve.list[25].dt_txt, resolve.list[25].weather[0].main, Math.ceil(resolve.list[25].main.temp_max), Math.round(resolve.list[25].main.temp_min));
    weatherFiveDays(resolve.list[33].dt_txt, resolve.list[33].weather[0].main, Math.ceil(resolve.list[33].main.temp_max), Math.round(resolve.list[33].main.temp_min));
}

function changeGrades(){
    const btnCelsius = document.querySelector('#celsius');
    const btnFarenheit = document.querySelector('#farenheit');
    const cityName = document.querySelector('#city-name');

    if(gradesInCelsius === true){
        btnCelsius.style.color = '#100E1D';
        btnCelsius.style.backgroundColor = '#E6E6EA';

        btnFarenheit.style.color = '#E6E6EA';
        btnFarenheit.style.backgroundColor = '#1E213A';
    } else{
        btnCelsius.style.color = '#E6E6EA';
        btnCelsius.style.backgroundColor = '#1E213A';

        btnFarenheit.style.color = '#100E1D';
        btnFarenheit.style.backgroundColor = '#E6E6EA';
    }


    btnCelsius.addEventListener('click', () => {
        if(gradesInCelsius === false){
            gradesInCelsius = true;
            callAPI(cityName.innerText, 'metric');
        }
    });

    btnFarenheit.addEventListener('click', () => {
        if(gradesInCelsius === true){
            gradesInCelsius = false;
            callAPI(cityName.innerText, 'imperial');
        }
    })

    
}

function weather(description, temp, cityName, windSpeed, windDirection, humidity, visibility, pressure){
    const iconWeatherMenu = document.querySelector('#icon-weather-menu');
    const temperature = document.querySelector('#temp');
    const gradesTxt = document.querySelector('#grades');
    const descriptionTxt = document.querySelector('#description');
    const dateDay = document.querySelector('#day');
    const dateDayNumber = document.querySelector('#dayNumber');
    const dateMonth = document.querySelector('#month')
    const name = document.querySelector('#city-name');
    const locationArrow = document.querySelector('#location-arrow');
    const speedWind = document.querySelector('#wind-speed');
    const WindUnity = document.querySelector('#wind-unity');
    const humidityTxt = document.querySelector('#humidity');
    const progressBar = document.querySelector('#file');
    const visibilityTxt = document.querySelector('#visibility');
    const visibilityUnit = document.querySelector('#vis-unit');
    const pressureTxt = document.querySelector('#pressure');
    const dateToday = new Date();
    
    iconWeatherMenu.src = `/assets/${description}.png`;
    descriptionTxt.innerText = description;
    dateDay.innerText = `${days[dateToday.getDay()]}, `;
    dateDayNumber.innerText = dateToday.getDate();
    dateMonth.innerText = months[dateToday.getMonth()];
    name.innerText = cityName;
    speedWind.innerText = windSpeed;
    locationArrow.style.transform = `rotate(${windDirection}deg)`;
    humidityTxt.innerText = humidity;
    progressBar.value = humidity;
    visibilityTxt.innerText = visibility;
    pressureTxt.innerText = pressure;
    
    if(gradesInCelsius === true){
        temperature.innerText = temp;
        gradesTxt.innerText = '°C';
        WindUnity.innerText = 'Km/h'
        visibilityUnit.innerText = 'km';
    } else{
        temperature.innerText = temp ;
        gradesTxt.innerText = '°F';
        WindUnity.innerText = 'mph'
        visibilityUnit.innerText = 'miles';
    }

}


function weatherTomorrow(description, tempMax, tempMin){
    const iconWeather = document.querySelector('#icon-weather1');
    const tomorrowMax = document.querySelector('#tomorrow-temp-max');
    const tomorrowMin = document.querySelector('#tomorrow-temp-min');

    iconWeather.src = `/assets/${description}.png`;
    
    if(gradesInCelsius === true){        
        tomorrowMax.innerText = `${tempMax}°c`;
        tomorrowMin.innerText = `${tempMin}°c`;
    } else{
        tomorrowMax.innerText = `${tempMax}°f`;
        tomorrowMin.innerText = `${tempMin}°f`;
    }
}

function weatherTwoDays(date, description, tempMax, tempMin){
    const dateTwoDays = document.querySelector('#weather-two-days')
    const iconWeather = document.querySelector('#icon-weather2');
    const twoDaysTempMax = document.querySelector('#two-days-max');
    const twoDaysTempMin = document.querySelector('#two-days-min');
    const formatDate = new Date(date)

    dateTwoDays.innerText = days[formatDate.getDay()] + ', ' + formatDate.getDate() + ' ' + months[formatDate.getMonth()];
    iconWeather.src = `/assets/${description}.png`;
    
    if(gradesInCelsius === true){
        twoDaysTempMax.innerText = `${tempMax}°c`;
        twoDaysTempMin.innerText = `${tempMin}°c`;
    } else{
        twoDaysTempMax.innerText = `${tempMax}°f`;
        twoDaysTempMin.innerText = `${tempMin}°f`;
    }

}

function weatherThreeDays(date, description, tempMax, tempMin){
    const dateThreeDays = document.querySelector('#weather-three-days')
    const iconWeather = document.querySelector('#icon-weather3');
    const threeDaysTempMax = document.querySelector('#three-days-max');
    const threeDaysTempMin = document.querySelector('#three-days-min');
    const formatDate = new Date(date)

    dateThreeDays.innerText = days[formatDate.getDay()] + ', ' + formatDate.getDate() + ' ' + months[formatDate.getMonth()];
    iconWeather.src = `/assets/${description}.png`;
    
    if(gradesInCelsius === true){
        threeDaysTempMax.innerText = `${tempMax}°c`;
        threeDaysTempMin.innerText = `${tempMin}°c`;
    } else{
        threeDaysTempMax.innerText = `${tempMax}°f`;
        threeDaysTempMin.innerText = `${tempMin}°f`;
    }

}

function weatherFourDays(date, description, tempMax, tempMin){
    const dateFourDays = document.querySelector('#weather-four-days')
    const iconWeather = document.querySelector('#icon-weather3');
    const fourDaysTempMax = document.querySelector('#four-days-max');
    const fourDaysTempMin = document.querySelector('#four-days-min');
    const formatDate = new Date(date)

    dateFourDays.innerText = days[formatDate.getDay()] + ', ' + formatDate.getDate() + ' ' + months[formatDate.getMonth()];
    iconWeather.src = `/assets/${description}.png`;
    
    if(gradesInCelsius === true){        
        fourDaysTempMax.innerText = `${tempMax}°c`;
        fourDaysTempMin.innerText = `${tempMin}°c`;
    } else{
        fourDaysTempMax.innerText = `${tempMax}°f`;
        fourDaysTempMin.innerText = `${tempMin}°f`;
    }

}

function weatherFiveDays(date, description, tempMax, tempMin){
    const dateFiveDays = document.querySelector('#weather-five-days')
    const iconWeather = document.querySelector('#icon-weather3');
    const fiveDaysTempMax = document.querySelector('#five-days-max');
    const fiveDaysTempMin = document.querySelector('#five-days-min');
    const formatDate = new Date(date);

    dateFiveDays.innerText = days[formatDate.getDay()] + ', ' + formatDate.getDate() + ' ' + months[formatDate.getMonth()];
    iconWeather.src = `/assets/${description}.png`;
    
    if(gradesInCelsius === true){        
        fiveDaysTempMax.innerText = `${tempMax}°c`;
        fiveDaysTempMin.innerText = `${tempMin}°c`;
    } else{
        fiveDaysTempMax.innerText = `${tempMax}°f`;
        fiveDaysTempMin.innerText = `${tempMin}°f`;
    }

}

export {callAPI, searchWeatherWithCoords, gradesInCelsius}