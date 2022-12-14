import { btnRecentSearch } from "./eventListenner";
import { searchWeatherWithCoords } from "./openWeather";
import { recentSearch, setDomSearchs } from "./searchRecent";

const getLocalitation = async function(){

    async function getCoords(){
            const pos = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        
            return {
              long: pos.coords.longitude,
              lat: pos.coords.latitude,
            };
        };
    
    if(localStorage.length > 0){
        const localStorageReturn = JSON.parse(localStorage.getItem('coords'));
        const recentSearchLocalStorage = JSON.parse(localStorage.getItem('recentSearch'));
        searchWeatherWithCoords(localStorageReturn.lat, localStorageReturn.long, 'metric');
        if(localStorage.length>1){
          recentSearchLocalStorage.forEach(element => {
            recentSearch.push(element);
            setDomSearchs();
          });
          btnRecentSearch();
        }
        
    } else{
        document.body.classList.add('load');
        const coords = await getCoords();
        document.body.classList.remove('load');
        searchWeatherWithCoords(coords.lat, coords.long, 'metric');
        localStorage.setItem('coords', JSON.stringify(coords));
    }
}

export {getLocalitation}