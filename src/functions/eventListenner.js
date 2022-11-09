import { recentSearch, setDomSearchs } from "./searchRecent";
import { getLocalitation } from "./localitation";
import { callAPI, gradesInCelsius } from "./openWeather";
import { searchWeatherWithCoords } from "./openWeather";

const events = (function(){
    const btnSearch = document.querySelector('#btn-search');
    const btnCloseMenu = document.querySelector('#icon-x');
    const btnLocalization = document.querySelector('#btn-location');
    const btnSearchLocation = document.querySelector('#submit-search');

    btnSearch.addEventListener('click', () => {
        openMenu()
    });

    btnCloseMenu.addEventListener('click', () => {
        closeMenu()
    });

    btnLocalization.addEventListener('click', () => {
        const localStorageReturn = JSON.parse(localStorage.getItem('coords'));
        gradesInCelsius = true;
        searchWeatherWithCoords(localStorageReturn.lat, localStorageReturn.long, 'metric');
    });


    btnSearchLocation.addEventListener('click', () => {
        const inputSearch = document.querySelector('#seach-location');
        if(recentSearch.map(name => name).indexOf(inputSearch.value) === -1){
            recentSearch.push(inputSearch.value);
            callAPI(inputSearch.value, 'metric');
            setDomSearchs();
            closeMenu();
            localStorage.setItem('recentSearch', JSON.stringify(recentSearch));
        }
        
        if(recentSearch.length > 0){
            document.querySelector('#box-clear-history').classList.add('show')
        }

        btnRecentSearch()
    });

});

const btnRecentSearch = (function(){

    const btnBoxSearch = document.querySelectorAll('.box-search');
    btnBoxSearch.forEach(box => {
        box.addEventListener('click', (e) => {
            callAPI(e.target.firstElementChild.id, 'metric');
            closeMenu();
        });
    });
    
});

const openMenu = (function(){
    document.querySelector('#menu').classList.add('open');
    document.querySelector('#menu').classList.remove('close');
});

const closeMenu = (function(){
    document.querySelector('#menu').classList.add('close');
    document.querySelector('#menu').classList.remove('open');
});

export{events, btnRecentSearch}