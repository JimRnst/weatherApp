const createHomePage = (function(){
    const body = document.body;
    body.innerHTML = `
        <div id="loading-page">
            <div class="dots"></div>
            <div id="overlay-loading"></div>
        </div>
        <div id="container">
            <div id="menu">
                <div id="header-menu">
                    <button id="btn-search">Search for places</button>
                    <button id="btn-location"><img src="/assets/target.svg" alt="target"></button>
                </div>
                <div id="icon-weather-box">
                    <img id="icon-weather-menu" src="assets/shower.png" alt="Shower">
                </div>
                <div id="temp-container">
                    <div id="temp">0</div>
                    <div id="grades">°c</div>
                </div>
                <div id="temp-description">
                    <div id="description">----</div>
                </div>
                <div id="date">
                    <div id="today">Today</div>
                    <span>·</span>
                    <div id="date-today">
                        <div id="day">Fri</div>
                        <div id="dayNumber">5</div>
                        <div id="month">Jun</div>
                    </div>
                </div>
                <div id="ubication">
                    <img id="icon-ub" src="/assets/location-dot.svg">
                    <div id="city-name">Reynosa</div>
                </div>
                <div id="menu-overlay">
                    <div id="menu-close"><img src="/assets/xmark.svg" alt="xmark" id="icon-x"></div>
                    <div id="search-location-input">
                        <img src="/assets/magnifying-glass.svg" alt="magnifying-glass" id="magnifying-glass">
                        <input type="text" id="seach-location" placeholder="search location">
                        <button id="submit-search">Search</button>
                    </div>
                    <div id="search-content"></div>
                    <div id="box-clear-history"><button id="clear-history">Clear History</button></div>
                </div>
            </div>
            <div id="content">
                <div id="content-grades">
                    <button id="celsius" class="btn-grades">°C</button>
                    <button id="farenheit" class="btn-grades">°F</button>
                </div>
                <div id="container-weather-week">
                    <div class="box-weather-day">
                        <div class="day" id="weather-tomorrow">Tomorrow</div>
                        <div class="icon-weather-day"><img class="icon-weather" id="icon-weather1" src="/assets/thunderstorm.png"></div>
                        <div class="max-min">
                            <div class="temp-max" id="tomorrow-temp-max">30°C</div>
                            <div class="temp-min" id="tomorrow-temp-min">30°C</div>
                        </div>
                    </div>
                    <div class="box-weather-day">
                        <div class="day" id="weather-two-days">Date</div>
                        <div class="icon-weather-day"><img class="icon-weather" id="icon-weather2" src="/assets/thunderstorm.png"></div>
                        <div class="max-min">
                            <div class="temp-max" id="two-days-max">30°C</div>
                            <div class="temp-min" id="two-days-min">30°C</div>
                        </div>
                    </div>
                    <div class="box-weather-day">
                        <div class="day" id="weather-three-days">Date</div>
                        <div class="icon-weather-day"><img class="icon-weather" id="icon-weather3" src="/assets/thunderstorm.png"></div>
                        <div class="max-min">
                            <div class="temp-max" id="three-days-max">30°C</div>
                            <div class="temp-min" id="three-days-min">30°C</div>
                        </div>
                    </div>
                    <div class="box-weather-day">
                        <div class="day" id="weather-four-days">Date</div>
                        <div class="icon-weather-day"><img class="icon-weather" id="icon-weather4" src="/assets/thunderstorm.png"></div>
                        <div class="max-min">
                            <div class="temp-max" id="four-days-max">30°C</div>
                            <div class="temp-min" id="four-days-min">30°C</div>
                        </div>
                    </div>
                    <div class="box-weather-day">
                        <div class="day" id="weather-five-days">Date</div>
                        <div class="icon-weather-day"><img class="icon-weather" id="icon-weather5" src="/assets/thunderstorm.png"></div>
                        <div class="max-min">
                            <div class="temp-max" id="five-days-max">30°C</div>
                            <div class="temp-min" id="five-days-min">30°C</div>
                        </div>
                    </div>
                </div>
                <div id="highlights">
                    <div id="title-hightlights">Today's Highlights</div>
                    <div id="grid-hightlight">
                        <div class="highligh-box">
                            <div class="highligh-box-title">Wind Status</div>
                            <div class="highligh-box-content"><span id="wind-speed">0</span><span class="sub-content" id="wind-unity">Km/h</span></div>
                            <div class="highligh-box-down">
                                <img id="location-arrow" src="/assets/location-arrow.svg" alt="">
                            </div>
                        </div>
                        <div class="highligh-box">
                            <div class="highligh-box-title">Humidity</div>
                            <div class="highligh-box-content"><span id="humidity">0</span><span class="sub-content">%</span></div>
                            <div class="highligh-box-two-down">
                                <div id="label-progress">
                                    <span>0</span>
                                    <span>50</span>
                                    <span>100</span>
                                </div>
                                <progress id="file" value="0" max="100">1000</progress>
                                <span id="percentage-progressive">%</span>
                            </div>
                        </div>
                        <div class="highligh-box box-two">
                            <div class="highligh-box-title">Visibility</div>
                            <div class="highligh-box-content"><span id="visibility">0</span><span class="sub-content" id="vis-unit"> Km</span></div>
                        </div>
                        <div class="highligh-box box-two">
                            <div class="highligh-box-title">Air Pressure</div>
                            <div class="highligh-box-content"><span id="pressure">000</span><span class="sub-content">mb</span></div>
                        </div>
                    </div>
                    <div id="code-by">Code by <a href="https://github.com/JimRnst" target="_blank">JimRnst</a></div>
                </div>
            </div>
        </div>
    `;
});

export {createHomePage}