/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

document.addEventListener("DOMContentLoaded", function () {
    const hideWeather = document.getElementById("hideWeather");
    const hideWeatherCheckbox = document.getElementById("hideWeatherCheckbox");

    // Select all elements that need to be disabled
    const elementsToDisable = document.querySelectorAll(".weather");

    // Retrieve saved state from localStorage (default: false if null)
    const savedState = localStorage.getItem("hideWeatherVisible") === "true";
    hideWeatherCheckbox.checked = savedState;
    hideWeather.style.visibility = savedState ? "hidden" : "visible";

    // Function to toggle the 'inactive' class
    function toggleInactiveState(isInactive) {
        elementsToDisable.forEach(element => {
            element.classList.toggle("inactive", isInactive);
        });
    }

    // Apply initial state
    toggleInactiveState(savedState);

    // Show weather widgets only if toggle is unchecked
    if (!savedState) {
        getWeatherData();
    }

    hideWeatherCheckbox.addEventListener("change", () => {
        const isChecked = hideWeatherCheckbox.checked;
        hideWeather.style.visibility = isChecked ? "hidden" : "visible";
        localStorage.setItem("hideWeatherVisible", isChecked);

        // Apply inactive class to disable elements visually
        toggleInactiveState(isChecked);

        if (!isChecked) {
            getWeatherData();
        }
    });
});

async function getWeatherData() {
    // Display texts 
    document.getElementById("conditionText").textContent = translations[currentLanguage]?.conditionText || translations["en"].conditionText;
    document.getElementById("humidityLevel").textContent = translations[currentLanguage]?.humidityLevel || translations["en"].humidityLevel;
    document.getElementById("feelsLike").textContent = translations[currentLanguage]?.feelsLike || translations["en"].feelsLike;
    document.getElementById("location").textContent = translations[currentLanguage]?.location || translations["en"].location;

    // Cache DOM elements
    const userAPIInput = document.getElementById("userAPI");
    const userLocInput = document.getElementById("userLoc");
    const saveAPIButton = document.getElementById("saveAPI");
    const saveLocButton = document.getElementById("saveLoc");
    const gpsToggle = document.getElementById("useGPScheckbox");
    const locationCont = document.getElementById("locationCont");

    // Load saved data from localStorage
    const savedApiKey = localStorage.getItem("weatherApiKey");
    const savedLocation = localStorage.getItem("weatherLocation");

    // Pre-fill input fields with saved data
    if (savedLocation) userLocInput.value = savedLocation;
    if (savedApiKey) userAPIInput.value = savedApiKey;

    // Function to simulate button click on Enter key press
    function handleEnterPress(event, buttonId) {
        if (event.key === "Enter") {
            document.getElementById(buttonId).click();
        }
    }

    // Add event listeners for handling Enter key presses
    userAPIInput.addEventListener("keydown", (event) => handleEnterPress(event, "saveAPI"));
    userLocInput.addEventListener("keydown", (event) => handleEnterPress(event, "saveLoc"));

    // Save API key to localStorage
    saveAPIButton.addEventListener("click", () => {
        const apiKey = userAPIInput.value.trim();
        localStorage.setItem("weatherApiKey", apiKey);
        userAPIInput.value = "";
        location.reload();
    });

    // Handle GPS toggle change
    gpsToggle.addEventListener("change", async () => {
        if (gpsToggle.checked) {
            const message = translations[currentLanguage]?.GPSDisclaimer || translations["en"].GPSDisclaimer;
            const confirmGPS = await confirmPrompt(message, agreeText, cancelText);

            if (!confirmGPS) {
                gpsToggle.checked = false; // Revert toggle if user cancels
                return;
            }
            localStorage.setItem("useGPS", true);
            locationCont.classList.add("inactive");
        } else {
            localStorage.setItem("useGPS", false);
            locationCont.classList.remove("inactive");
        }
        location.reload();
    });

    // Handle manual location input
    saveLocButton.addEventListener("click", () => {
        const userLocation = userLocInput.value.trim();
        localStorage.setItem("weatherLocation", userLocation);
        localStorage.setItem("useGPS", false);
        userLocInput.value = "";
        fetchWeather();
        location.reload();
    });

    // Default Weather API key
    const weatherApiKeys = [
        "d36ce712613d4f21a6083436240910",
        "db0392b338114f208ee135134240312",
        "de5f7396db034fa2bf3140033240312",
        "c64591e716064800992140217240312",
        "9b3204c5201b4b4d8a2140330240312",
        "eb8a315c15214422b60140503240312",
        "cd148ebb1b784212b74140622240312",
        "7ae67e219af54df2840140801240312",
        "0a6bc8a404224c8d89953341241912",
        "f59e58d7735d4739ae953115241912"
    ];
    const defaultApiKey = weatherApiKeys[Math.floor(Math.random() * weatherApiKeys.length)];

    // Determine which API key to use
    const apiKey = savedApiKey || defaultApiKey;

    // Determine the location to use
    let currentUserLocation = savedLocation;

    // Load the saved GPS state from localStorage
    const useGPS = JSON.parse(localStorage.getItem("useGPS")) || false;
    gpsToggle.checked = useGPS;
    if (useGPS) locationCont.classList.add("inactive");


    // Function to fetch GPS-based location
    async function fetchGPSLocation() {
        const getLocationFromGPS = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => reject(error),
                    { timeout: 6000 }
                );
            });
        };

        try {
            const { latitude, longitude } = await getLocationFromGPS();
            return `${latitude},${longitude}`;
        } catch (error) {
            console.error("Failed to retrieve GPS Location:", error);
        }
    }

    // Fetch location based on user preference
    await (async function initializeLocation() {
        try {
            if (useGPS) currentUserLocation = await fetchGPSLocation();

            if (!currentUserLocation) {
                // Fallback to IP-based location if no manual input
                const ipInfo = "https://ipinfo.io/json/";
                const locationData = await fetch(ipInfo);
                const ipLocation = await locationData.json();
                currentUserLocation = ipLocation.loc;
            }

            // Fetch weather data
            fetchWeather();
        } catch (error) {
            console.error("Failed to retrieve IP-based location:", error);
            currentUserLocation = "auto:ip";
            fetchWeather();
        }
    })();

    // Fetch weather data based on a location
    async function fetchWeather() {
        try {
            let parsedData = JSON.parse(localStorage.getItem("weatherParsedData"));
            const weatherParsedTime = parseInt(localStorage.getItem("weatherParsedTime"));
            const weatherParsedLocation = localStorage.getItem("weatherParsedLocation");
            const weatherParsedLang = localStorage.getItem("weatherParsedLang");

            const retentionTime = savedApiKey ? 120000 : 960000; // 2 min for user-entered API key, 16 min otherwise

            if (!parsedData ||
                ((Date.now() - weatherParsedTime) > retentionTime) ||
                (weatherParsedLocation !== currentUserLocation) ||
                (weatherParsedLang !== currentLanguage)) {

                // Fetch weather data using Weather API
                let weatherApi = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${currentUserLocation}&aqi=no&lang=${currentLanguage}`;
                let data = await fetch(weatherApi);
                parsedData = await data.json();
                if (!parsedData.error) {
                    // Extract only the necessary fields before saving
                    const filteredData = {
                        location: {
                            name: parsedData.location.name,
                        },
                        current: {
                            condition: {
                                text: parsedData.current.condition.text,
                                icon: parsedData.current.condition.icon,
                            },
                            temp_c: parsedData.current.temp_c,
                            temp_f: parsedData.current.temp_f,
                            humidity: parsedData.current.humidity,
                            feelslike_c: parsedData.current.feelslike_c,
                            feelslike_f: parsedData.current.feelslike_f,
                        },
                    };

                    // Save filtered weather data to localStorage
                    localStorage.setItem("weatherParsedData", JSON.stringify(filteredData));
                    localStorage.setItem("weatherParsedTime", Date.now()); // Save time of last fetching
                    localStorage.setItem("weatherParsedLocation", currentUserLocation); // Save user location
                    localStorage.setItem("weatherParsedLang", currentLanguage); // Save language preference
                }
            }

            // Update weather data
            UpdateWeather();

            function UpdateWeather() {
                // Weather data
                const conditionText = parsedData.current.condition.text;
                const tempCelsius = Math.round(parsedData.current.temp_c);
                const tempFahrenheit = Math.round(parsedData.current.temp_f);
                const humidity = parsedData.current.humidity;
                const feelsLikeCelsius = parsedData.current.feelslike_c;
                const feelsLikeFahrenheit = parsedData.current.feelslike_f;

                // Update DOM elements with the weather data
                document.getElementById("conditionText").textContent = conditionText;

                // Localize and display temperature and humidity
                const localizedHumidity = localizeNumbers(humidity.toString(), currentLanguage);
                const localizedTempCelsius = localizeNumbers(tempCelsius.toString(), currentLanguage);
                const localizedFeelsLikeCelsius = localizeNumbers(feelsLikeCelsius.toString(), currentLanguage);
                const localizedTempFahrenheit = localizeNumbers(tempFahrenheit.toString(), currentLanguage);
                const localizedFeelsLikeFahrenheit = localizeNumbers(feelsLikeFahrenheit.toString(), currentLanguage);

                // Check if language is RTL
                const isRTL = rtlLanguages.includes(currentLanguage);

                // Set humidity level
                const humidityLabel = translations[currentLanguage]?.humidityLevel || translations["en"].humidityLevel;
                document.getElementById("humidityLevel").textContent = isRTL
                    ? `${localizedHumidity}% ${humidityLabel}` // RTL: "76% ytidimuH"
                    : `${humidityLabel} ${localizedHumidity}%`;

                // Event Listener for the Fahrenheit toggle
                const fahrenheitCheckbox = document.getElementById("fahrenheitCheckbox");
                const updateTemperatureDisplay = () => {
                    const tempElement = document.getElementById("temp");
                    const feelsLikeElement = document.getElementById("feelsLike");
                    const feelsLikeLabel = translations[currentLanguage]?.feelsLike || translations["en"].feelsLike;

                    // List of languages where a space before °F or °C is required
                    const langWithSpaceBeforeDegree = ['cs'];

                    if (fahrenheitCheckbox.checked) {
                        // Update temperature
                        tempElement.textContent = localizedTempFahrenheit;
                        const tempUnitF = document.createElement("span");
                        tempUnitF.className = "tempUnit";
                        tempUnitF.textContent = "°F";
                        tempElement.appendChild(tempUnitF);

                        // Update feels like
                        const feelsLikeFUnit = langWithSpaceBeforeDegree.includes(currentLanguage) ? ' °F' : '°F';
                        feelsLikeElement.textContent = isRTL
                            ? `${localizedFeelsLikeFahrenheit}${feelsLikeFUnit} ${feelsLikeLabel}`
                            : `${feelsLikeLabel} ${localizedFeelsLikeFahrenheit}${feelsLikeFUnit}`;
                    } else {
                        // Update temperature
                        tempElement.textContent = localizedTempCelsius;
                        const tempUnitC = document.createElement("span");
                        tempUnitC.className = "tempUnit";
                        tempUnitC.textContent = "°C";
                        tempElement.appendChild(tempUnitC);

                        // Update feels like
                        const feelsLikeCUnit = langWithSpaceBeforeDegree.includes(currentLanguage) ? ' °C' : '°C';
                        feelsLikeElement.textContent = isRTL
                            ? `${localizedFeelsLikeCelsius}${feelsLikeCUnit} ${feelsLikeLabel}`
                            : `${feelsLikeLabel} ${localizedFeelsLikeCelsius}${feelsLikeCUnit}`;
                    }
                };
                updateTemperatureDisplay();

                // Setting weather Icon
                const newWIcon = parsedData.current.condition.icon;
                const weatherIcon = newWIcon.replace("//cdn.weatherapi.com/weather/64x64/", "https://cdn.weatherapi.com/weather/128x128/");
                document.getElementById("wIcon").src = weatherIcon;

                // Define minimum width for the slider based on the language
                const humidityMinWidth = {
                    idn: "47%",
                    hu: "48%",
                    en: "42%", // Default for English and others
                };
                const slider = document.getElementById("slider");
                slider.style.minWidth = humidityMinWidth[currentLanguage] || humidityMinWidth["en"];

                // Set slider width based on humidity
                if (humidity > 40) {
                    slider.style.width = `calc(${humidity}% - 60px)`;
                }

                // Update location
                var city = parsedData.location.name;
                // var city = "Thiruvananthapuram";
                var maxLength = 10;
                var limitedText = city.length > maxLength ? city.substring(0, maxLength) + "..." : city;
                document.getElementById("location").textContent = limitedText;
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
}


// Save and load toggle state
document.addEventListener("DOMContentLoaded", function () {
    const hideWeatherCard = document.getElementById("hideWeatherCard");
    const fahrenheitCheckbox = document.getElementById("fahrenheitCheckbox");

    hideWeatherCard.addEventListener("change", function () {
        saveCheckboxState("hideWeatherCardState", hideWeatherCard);
    });

    fahrenheitCheckbox.addEventListener("change", function () {
        saveCheckboxState("fahrenheitCheckboxState", fahrenheitCheckbox);
    });

    loadCheckboxState("hideWeatherCardState", hideWeatherCard);
    loadCheckboxState("fahrenheitCheckboxState", fahrenheitCheckbox);
});
