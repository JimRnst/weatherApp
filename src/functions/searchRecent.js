import { btnRecentSearch } from "./eventListenner";

let recentSearch = [];

function showRecentSearch(){
    const inputSearch = document.querySelector('#seach-location');
    recentSearch.push(inputSearch.value);
    setDomSearchs();
}
function setDomSearchs(){
    const inputSearch = document.querySelector('#seach-location');
    const searchContent = document.querySelector('#search-content');
    inputSearch.value = '';
    searchContent.innerHTML = '';
    for (let i = 0; i < recentSearch.length; i++) {
        const div = document.createElement('div');
        div.classList.add('box-search');
        div.setAttribute('id', i);
        div.innerHTML = `
            <div class="box-search-name" id="${recentSearch[i]}">${recentSearch[i]}</div>
            <img class="chevron-icon" src="/assets/chevron-right.svg" alt="chevron-icon">
        `;
        searchContent.prepend(div)
    }
    
}


export {recentSearch, showRecentSearch, setDomSearchs}