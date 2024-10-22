// Import Material Web components
import '@material/web/all.js';
import '@material/web/icon/icon.js';
import translations from '/src/languages.js';
let proxyurl;
let clocktype;
let hourformat;
function getLanguageStatus(key) {
    return localStorage.getItem(key);
}
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load the API key, location and proxy from localStorage
        const savedApiKey = localStorage.getItem("weatherApiKey");
        const userAPIInput = document.getElementById("userAPI");
        const savedLocation = localStorage.getItem("weatherLocation");
        const userLocInput = document.getElementById("userLoc");
        const savedProxy = localStorage.getItem("proxy");
        const userProxyInput = document.getElementById("userproxy");
        if (savedApiKey) {
            userAPIInput.value = savedApiKey;
        }
        if (savedLocation) {
            userLocInput.value = savedLocation;
        }
        if (savedProxy) {
            userProxyInput.value = savedProxy;
        }
        function exportLocalStorage() {
            const localStorageData = JSON.stringify(localStorage);
            const blob = new Blob([localStorageData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'localStorageBackup.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        
        const saveAPIButton = document.getElementById("saveAPIbtn");
        const saveLocButton = document.getElementById("saveLocbtn");
        const resetbtn = document.getElementById("resetsettings");
        const exportbtn = document.getElementById("exportbtn");
        const importbtn = document.getElementById("fileInputbtn");
        const saveProxyButton = document.getElementById("saveproxybtn");
        
        exportbtn.addEventListener("click", () => {
            exportLocalStorage();
        });
        
        importbtn.addEventListener("click", () => {
            document.getElementById('fileInput').click();
        });
        document.getElementById('fileInput').addEventListener('change', handleFileSelect);

        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;
    
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    for (const key in data) {
                        localStorage.setItem(key, data[key]);
                    }
                    const alert =document.getElementById("alert");
                    document.getElementById('alertheadline').innerText = "Settings Imported Successfully!";
                    document.getElementById('alertform').innerText = "Settings has been Imported Successfully!, Page Refresh Recommended";
                    alert.show();
                } catch (error) {
                    const alert =document.getElementById("alert");
                    document.getElementById('alertheadline').innerText = "Error While Importing Settings";
                    document.getElementById('alertform').innerText = 'Error importing settings: ' + error.message;
                    alert.show();
                }
            };
    
            reader.readAsText(file);
        }
        // Add an event listener to save the API key when the "Save" button is clicked
        saveAPIButton.addEventListener("click", () => {
            const apiKey = userAPIInput.value;
            // Save the API key to localStorage
            localStorage.setItem("weatherApiKey", apiKey);
            document.getElementById("userAPI").value = "";
            location.reload();
        });
    
        saveLocButton.addEventListener("click", () => {
            const userLocation = userLocInput.value;
            // Save the location to localStorage
            localStorage.setItem("weatherLocation", userLocation);
            document.getElementById("userLoc").value = "";
            location.reload();
        });
        resetbtn.addEventListener("click", () => {
           const resetdialog =document.getElementById("resetdialog");
            resetdialog.show();
resetdialog.addEventListener('close', () => {
    const cancelClicked = resetdialog.returnValue === 'cancel';
    const deleteClicked = resetdialog.returnValue === 'delete';
    if(deleteClicked){
        localStorage.clear();
        location.reload();
    }else{
        return;
    }
  });
           
        });
        saveProxyButton.addEventListener("click", () => {
            const proxyurl = userProxyInput.value;

            if (proxyurl.startsWith("http://") || proxyurl.startsWith("https://")) {
                if (!proxyurl.endsWith("/")) {
                    // Save the proxy to localStorage
                    localStorage.setItem("proxy", proxyurl);
                    document.getElementById("userproxy").value = "";
                    location.reload();
                }
                else {
                    const alert =document.getElementById("alert");
                    document.getElementById('alertheadline').innerText = "Invalid proxy";
                    document.getElementById('alertform').innerText = "There shouldn't be / at the end of the link";
                    alert.show();
                }
            } else {
                const alert =document.getElementById("alert");
                    document.getElementById('alertheadline').innerText = "Invalid proxy";
                    document.getElementById('alertform').innerText = "Only links (starting with http:// or https://) are allowed.";
                    alert.show();
            }
        });

        // Set the default API key
        const defaultApiKey = 'd36ce712613d4f21a6083436240910'; // Default Weather API key
        const defaultProxyURL = 'https://mynt-proxy.rhythmcorehq.com'; //Default proxy url
        // Check if the user has entered their own API key
        const userApiKey = userAPIInput.value.trim();
        const userproxyurl = userProxyInput.value.trim();

        // Use the user's API key if available, otherwise use the default API key
        const apiKey = userApiKey || defaultApiKey;
        proxyurl = userproxyurl || defaultProxyURL;
        // Getting current user location
        const geoLocation = 'https://ipinfo.io/json/';
        const locationData = await fetch(geoLocation);
        const parsedLocation = await locationData.json();
        const currentUserLocation = parsedLocation.ip;
        if (currentUserLocation) {
            
            const locationQuery = savedLocation || currentUserLocation;
            var currentLanguage = getLanguageStatus('selectedLanguage') || 'en';
            localStorage.setItem("locationQ", currentUserLocation);
            var weatherApi = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationQuery}&aqi=no&lang=${currentLanguage}`;
        } else {
            const savedlocQ = localStorage.getItem("locationQ");
            const locationQuery = savedLocation || savedlocQ;
            var currentLanguage = getLanguageStatus('selectedLanguage') || 'en';
            var weatherApi = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationQuery}&aqi=no&lang=${currentLanguage}`;
        }


        const data = await fetch(weatherApi);
        const parsedData = await data.json();
        // Weather data
        const conditionText = parsedData.current.condition.text;
        const tempCelsius = Math.round(parsedData.current.temp_c);
        const tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);
        const humidity = parsedData.current.humidity;
        const feelsLikeCelsius = parsedData.current.feelslike_c;
        const feelsLikeFahrenheit = Math.round(feelsLikeCelsius * 9 / 5 + 32);

        // Update DOM elements
        document.getElementById("conditionText").textContent = conditionText;
        document.getElementById("humidityLevel").textContent = `${translations[currentLanguage].humidityText} ${humidity}%`;

        // Event Listener for the Fahrenheit toggle
        const fahrenheitCheckbox = document.getElementById("fahrenheitCheckbox");
        const updateTemperatureDisplay = () => {
            if (fahrenheitCheckbox.selected) {
                document.getElementById("temp").textContent = `${tempFahrenheit}°`;
                document.getElementById("feelsLike").textContent = `${translations[currentLanguage].feelsLike} ${feelsLikeFahrenheit}°F`;
            } else {
                document.getElementById("temp").textContent = `${tempCelsius}°`;
                document.getElementById("feelsLike").textContent = `${translations[currentLanguage].feelsLike} ${feelsLikeCelsius}°C`;
            }
        };
        updateTemperatureDisplay();
        updateusertextbox();
        // Setting weather Icon
        const newWIcon = parsedData.current.condition.icon;
        const weatherIcon = newWIcon.replace("//cdn", "https://cdn");
        document.getElementById("wIcon").src = weatherIcon;

        // Set slider width based on humidity
        if (humidity > 40) {
            document.getElementById("slider").style.width = `calc(${humidity}% - 60px)`;
        }

        // Update location
        // document.getElementById("location").textContent = parsedLocation.city;
        var city = parsedData.location.name;
        // var city = "Thiruvananthapuram";
        var maxLength = 10;
        var limitedText = city.length > maxLength ? city.substring(0, maxLength) + "..." : city;
        // Update the span's text content with the limited text
        document.getElementById("location").textContent = limitedText;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        const alert =document.getElementById("alertbody");
                    document.getElementById('alertbodyheadline').innerText = "Error fetching weather data";
                    document.getElementById('alertbodyform').innerText = 'Unable to fetch weather data. Please check your location or API key.';
                    alert.show();
        // Handle errors here, e.g., display an error message to the user.
    }
});

// ---------------------------end of weather stuff--------------------
// Retrieve current time and calculate initial angles
var currentTime = new Date();
var initialSeconds = currentTime.getSeconds();
var initialMinutes = currentTime.getMinutes();
var initialHours = currentTime.getHours();

// Initialize cumulative rotations
let cumulativeSecondRotation = initialSeconds * 6; // 6° par seconde
let cumulativeMinuteRotation = initialMinutes * 6 + (initialSeconds / 10); // 6° par minute + ajustement pour les secondes
let cumulativeHourRotation = (30 * initialHours + initialMinutes / 2); // 30° par heure + ajustement pour les minutes

// Apply initial rotations (no need to wait 1s now)
document.getElementById("second").style.transform = `rotate(${cumulativeSecondRotation}deg)`;
document.getElementById("minute").style.transform = `rotate(${cumulativeMinuteRotation}deg)`;
document.getElementById("hour").style.transform = `rotate(${cumulativeHourRotation}deg)`;

let intervalId;
let secondreset = false;
let hourreset = false;
let minreset = false;
function updateanalogclock() {
    var currentTime = new Date();
    var initialSeconds = currentTime.getSeconds();
    var initialMinutes = currentTime.getMinutes();
    var initialHours = currentTime.getHours();


    // Initialize cumulative rotations

    let cumulativeSecondRotation = initialSeconds * 6; // 6° par seconde
    let cumulativeMinuteRotation = initialMinutes * 6 + (initialSeconds / 10); // 6° par minute + ajustement pour les secondes
    let cumulativeHourRotation = (30 * initialHours + initialMinutes / 2);
    if (secondreset) {
        document.getElementById("second").style.transition = "none";
        document.getElementById("second").style.transform = `rotate(0deg)`;
        secondreset = false;
        return;
    }
    if (minreset) {
        document.getElementById("minute").style.transition = "none";
        document.getElementById("minute").style.transform = `rotate(0deg)`;
        minreset = false;
        return;
    }
    if (hourreset) {
        document.getElementById("hour").style.transition = "none";
        document.getElementById("hour").style.transform = `rotate(0deg)`;
        hourreset = false;
        return;
    }
    if (cumulativeSecondRotation == 0) {
        document.getElementById("second").style.transition = "transform 1s ease";
        document.getElementById("second").style.transform = `rotate(361deg)`;
        secondreset = true;
    } else if (secondreset != true) {
        document.getElementById("second").style.transition = "transform 1s ease";
        document.getElementById("second").style.transform = `rotate(${cumulativeSecondRotation}deg)`;
    }
    if (cumulativeMinuteRotation == 0) {
        document.getElementById("minute").style.transition = "transform 1s ease";
        document.getElementById("minute").style.transform = `rotate(361deg)`;
        minreset = true;
    } else if (minreset != true) {
        document.getElementById("minute").style.transition = "transform 1s ease";
        document.getElementById("minute").style.transform = `rotate(${cumulativeMinuteRotation}deg)`;
    } if (cumulativeHourRotation == 0) {

        document.getElementById("hour").style.transition = "transform 1s ease";
        document.getElementById("hour").style.transform = `rotate(361deg)`;
        hourreset = true;
    } else if (hourreset != true) {
        document.getElementById("hour").style.transition = "transform 1s ease"; // Transition fluide
        document.getElementById("hour").style.transform = `rotate(${cumulativeHourRotation}deg)`;
    }
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    var dayOfWeek = currentTime.getDay();
    // Get the day of the month (1 - 31)
    var dayOfMonth = currentTime.getDate();
    // Get the month (0 = January, 1 = February, ..., 11 = December)
    var month = currentTime.getMonth();

    // Define the current language
    var currentLanguage = getLanguageStatus('selectedLanguage') || 'en';

    // Get the translated name of the day and month
    var dayName = translations[currentLanguage].days[dayOfWeek];
    var monthName = translations[currentLanguage].months[month];
    const clocktype1 = localStorage.getItem("clocktype");
    if (clocktype1 == "analog") {
        // Language formatting
        if (currentLanguage === 'pt') {
            // Portuguese formatting: "day of the week, day of the month"
            document.getElementById("date").innerText = `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)} `;
        } else if (currentLanguage === 'hi' || currentLanguage === 'bn') {
            // Hindi and Bangla formatting: Show full name for month
            document.getElementById("date").innerText = `${dayName}, ${dayOfMonth} ${monthName}`;
        } else {
            // English formatting: "day of the month name"
            document.getElementById("date").innerText = `${dayName.substring(0, 3)}, ${monthName.substring(0, 3)} ${dayOfMonth} `;
        }
    }
}


function updatedigiClock() {
    const hourformatstored = localStorage.getItem("hourformat");
    if (hourformatstored) {
        if (hourformatstored == "true") {
            hourformat = true;
        } else if (hourformatstored == "false") {
            hourformat = false;
        }
    } else {
        hourformat = false;
    }
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: hourformat };
    const timeString = now.toLocaleTimeString('en-US', timeOptions);
    const formattedTimeString = timeString.replace(/ (AM|PM)/, '');

    document.getElementById('digidate').textContent = dateString;
    document.getElementById('digiclock').textContent = formattedTimeString;

    let greeting;
    const currentHour = now.getHours();

    if (currentHour < 12) {
        greeting = "Good Morning!";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    const clocktype1 = localStorage.getItem("clocktype");
    if (clocktype1 == "digital") {

        document.getElementById("date").innerText = greeting;
    }
}
function startClock() {
    if (!intervalId) { // Only set interval if not already set
        intervalId = setInterval(updateanalogclock, 500);
    }
}

// Function to stop the clock
function stopClock() {
    clearInterval(intervalId);
    intervalId = null; // Reset intervalId
}

clocktype = localStorage.getItem("clocktype");
if (!clocktype) {
    localStorage.setItem("clocktype", "analog");
    clocktype = localStorage.getItem("clocktype");
}
displayClock();
setInterval(updatedigiClock, 1000);
if (clocktype) {
    if (clocktype == "digital") {
        updatedigiClock();
    } else if (clocktype == "analog") {
        if (document.visibilityState === 'visible') {
            startClock();
        }
    }
} else {
    if (document.visibilityState === 'visible') {
        startClock();
    }
}
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'visible') {
        startClock(); // Start the clock if the tab is focused
    } else {
        stopClock(); // Stop the clock if the tab is not focused
    }
});

function displayClock() {
    const analogClock = document.getElementById('analogClock');
    const digitalClock = document.getElementById('digitalClock');

    if (clocktype === 'analog') {
        analogClock.style.display = 'block'; // Show the analog clock
        digitalClock.style.display = 'none';  // Hide the digital clock
    } else if (clocktype === 'digital') {
        digitalClock.style.display = 'block';  // Show the digital clock
        analogClock.style.display = 'none';     // Hide the analog clock
    }

}
const userTextDiv = document.getElementById("userTextt");
userTextDiv.addEventListener("input", function () {
    localStorage.setItem("userText", userTextDiv.value);
});
function updateusertextbox() {
    const userTextDiv = document.getElementById("userTextt");
    const storedValue = localStorage.getItem("userText");
    if (storedValue) {
        userTextDiv.value = storedValue;
    }
    const usertextcheckbox = document.getElementById('usertextcheckbox');
const usertextbox = document.getElementById('userTextt');
if(usertextcheckbox.selected){
    usertextbox.style.display = 'block';
}else{
    usertextbox.style.display = 'none';  
}
}

// Showing border or outline in when you click on searchbar
const searchbar = document.getElementById('searchbar');
searchbar.addEventListener('click', function () {
    const searchInput2 = document.getElementById("searchQ");
    searchbar.classList.toggle('active');
    if (searchInput2.value !== "") {
        showResultBox()
    }
});
document.addEventListener('click', function (event) {
    // Check if the clicked element is not the searchbar
    if (!searchbar.contains(event.target)) {
        searchbar.classList.remove('active');
    }
});
const storedEngine = localStorage.getItem("selectedSearchEngine");
if(!storedEngine){
    localStorage.setItem("selectedSearchEngine",1)
}
//search function
document.addEventListener("DOMContentLoaded", () => {
    const enterBTN = document.getElementById("entrbtn");
    const searchInput = document.getElementById("searchQ");
    const searchEngineRadio = document.getElementsByName("search-engine");

    // Function to perform search
    function performSearch() {
        
        //var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
        var searchTerm = searchInput.value;
        const storedSearchEngine = localStorage.getItem("selectedSearchEngine");
        var selectedOption = `engine${storedSearchEngine}`;
        var searchEngines = {
            engine1: 'https://www.google.com/search?q=',
            engine2: 'https://duckduckgo.com/?q=',
            engine3: 'https://bing.com/?q=',
            engine4: 'https://search.brave.com/search?q=',
            engine5: 'https://www.youtube.com/results?search_query='
        };

        if (searchTerm !== "") {
            var searchUrl = searchEngines[selectedOption] + encodeURIComponent(searchTerm);
            window.location.href = searchUrl;
        }
    }

    // Event listeners
    enterBTN.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });


    // Set selected search engine from local storage
    // Initialize selected search engine and removed chips
const storedSearchEngine = localStorage.getItem("selectedSearchEngine");
const storedRemovedChips = JSON.parse(localStorage.getItem("removedChips")) || [];
let selectedChipNumber = 1;
const chipsContainer = document.querySelector('.chips-container');

// Chip data for restoration
const chipData = [
    { id: 'chip1', label: 'Google' },
    { id: 'chip2', label: 'Duck' },
    { id: 'chip3', label: 'Bing' },
    { id: 'chip4', label: 'Brave' },
    { id: 'chip5', label: 'YouTube' }
];

// Function to remove a chip element by its ID
function removeChipById(chipId) {
    const chip = document.getElementById(chipId);
    if (chip) {
        chip.remove();
    }
}
const restorechipsbtn = document.getElementById("restorechipsbtn");
        restorechipsbtn.addEventListener("click", () => {
            restoreAllChips();
        });
// Function to restore all removed chips
function restoreAllChips() {
    
    // Clear removedChips from localStorage and array
    localStorage.removeItem("removedChips");
    storedRemovedChips.length = 0; // Clear the array
    window.location.reload(true);
}

// Function to check for removed chips on page load
function checkAndRemoveStoredChips() {
    storedRemovedChips.forEach(chipId => removeChipById(chipId));
}

// Check if any chips are removed on page load
checkAndRemoveStoredChips();

// If there is a stored search engine, deselect all chips and select the stored one
if (storedSearchEngine) {
    selectedChipNumber = storedSearchEngine;
    const chipToSelect = document.getElementById(`chip${selectedChipNumber}`);
    if (chipToSelect) {
        chipToSelect.selected = true;
    }
}

// Add event listeners to chips for selection and removal
function addChipEventListeners() {
    const chips = document.querySelectorAll('md-filter-chip');

    chips.forEach((chip, index) => {
        chip.addEventListener('click', () => {
            // Deselect all chips
            chips.forEach(c => c.selected = false);
            
            // Select the clicked chip
            chip.selected = true;
            selectedChipNumber = index + 1;
            
            // Store the selected chip in local storage
            localStorage.setItem("selectedSearchEngine", selectedChipNumber);
            console.log(`Chip${selectedChipNumber} is selected.`);
        });

        // Add event listener for chip removal
        chip.addEventListener('remove', () => {
            const chipId = chip.id;
            // Add the removed chip to local storage
            storedRemovedChips.push(chipId);
            localStorage.setItem("removedChips", JSON.stringify(storedRemovedChips));

            // If all chips are removed, restore all of them
            if (document.querySelectorAll('md-filter-chip').length === 1) {
                restoreAllChips();
                addChipEventListeners(); // Re-add event listeners to restored chips
            }
        });
    });
}
// Initial call to add event listeners
addChipEventListeners();

    // -----The stay changed even if user reload the page---
    //  🔴🟠🟡🟢🔵🟣⚫️⚪️🟤
    const storedTheme = localStorage.getItem(themeStorageKey);
    if (storedTheme) {
        applySelectedTheme(storedTheme);
        const selectedRadioButton = document.querySelector(`.colorPlate[value = "${storedTheme}"]`);
        if (selectedRadioButton) {
            selectedRadioButton.checked = true;
        }
    }

});



// Function to apply the selected theme
// 🔴🟠🟡🟢🔵🟣⚫️⚪️🟤
const radioButtons = document.querySelectorAll('.colorPlate');
const themeStorageKey = 'selectedTheme';

const applySelectedTheme = (colorValue) => {
    if (colorValue !== "blue") {
        document.documentElement.style.setProperty('--bg-color-blue', `var(--bg-color-${colorValue})`);
        document.documentElement.style.setProperty('--accentLightTint-blue', `var(--accentLightTint-${colorValue})`);
        document.documentElement.style.setProperty('--darkerColor-blue', `var(--darkerColor-${colorValue})`);
        document.documentElement.style.setProperty('--darkColor-blue', `var(--darkColor-${colorValue})`);
        document.documentElement.style.setProperty('--tonebtn-blue', `var(--tonebtn-${colorValue})`);
        document.documentElement.style.setProperty('--textColorDark-blue', `var(--textColorDark-${colorValue})`);
    } else {
        document.documentElement.style.setProperty('--bg-color-blue', '#BBD6FD');
        document.documentElement.style.setProperty('--accentLightTint-blue', '#E2EEFF');
        document.documentElement.style.setProperty('--darkerColor-blue', '#3569b2');
        document.documentElement.style.setProperty('--darkColor-blue', '#4382EC');
        document.documentElement.style.setProperty('--tonebtn-blue', '#2c74f1cf');
        document.documentElement.style.setProperty('--textColorDark-blue', '#1b3041');
    }
};


radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function () {
        if (this.checked) {
            const colorValue = this.value;
            localStorage.setItem(themeStorageKey, colorValue);
            applySelectedTheme(colorValue);
        }
    });
});
// end of Function to apply the selected theme

// when User click on "AI-Tools"
const element = document.getElementById("toolsCont");
const shortcuts = document.getElementById("shortcutsContainer");

document.getElementById("0NIHK").onclick = () => {
    const unfoldShortcutsButton = document.getElementById("unfoldShortcutsBtn");
    if (shortcutsCheckbox.selected) {
        if (element.style.display === "flex") {
            shortcuts.style.display = 'flex';
            element.style.opacity = "0";
            element.style.gap = "0";
            element.style.transform = "translateX(-100%)";
            unfoldShortcutsButton.style.display = "none";

            setTimeout(() => {
                element.style.display = "none";
                shortcuts.style.display = 'flex';
            }, 500);
        } else {
            shortcuts.style.display = 'none';
            unfoldShortcutsButton.style.display = "block";
            element.style.display = "flex";
            setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateX(0)";
            }, 1);
            setTimeout(() => {
                element.style.gap = "12px";
            }, 300);
        }
    } else {
        if (element.style.display === "flex") {
            shortcuts.style.display = 'none';
            unfoldShortcutsButton.style.display = "none";
            element.style.opacity = "0";
            element.style.gap = "0";
            element.style.transform = "translateX(-100%)";
            setTimeout(() => {
                element.style.display = "none";
            }, 500);
        } else {
            shortcuts.style.display = 'none';
            unfoldShortcutsButton.style.display = "none";
            element.style.display = "flex";
            setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateX(0)";
            }, 1);
            setTimeout(() => {
                element.style.gap = "12px";
            }, 300);
        }
    }
}

// ------------search suggestions ---------------
const resultBox = document.querySelector('.resultBox');

// Show the result box
function showResultBox() {
    resultBox.classList.add('show');
    resultBox.style.display = "block";
}

// Hide the result box
function hideResultBox() {
    resultBox.classList.remove('show');
    //resultBox.style.display = "none";
}
showResultBox()
hideResultBox()
document.getElementById("searchQ").addEventListener("input", async function () {
    const searchsuggestionscheckbox = document.getElementById("searchsuggestionscheckbox");
    if (searchsuggestionscheckbox.selected) {
        //var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
        const storedSearchEngine = localStorage.getItem("selectedSearchEngine");
        var selectedOption = `engine${storedSearchEngine}`;
        var searchEngines = {
            engine1: 'https://www.google.com/search?q=',
            engine2: 'https://duckduckgo.com/?q=',
            engine3: 'https://bing.com/?q=',
            engine4: 'https://search.brave.com/search?q=',
            engine5: 'https://www.youtube.com/results?search_query='
        };
        const query = this.value;
        const resultBox = document.getElementById("resultBox");

        if (query.length > 0) {
            // Fetch autocomplete suggestions
            const suggestions = await getAutocompleteSuggestions(query);

            if (suggestions == "") {
                hideResultBox()
            } else {
                // Clear the result box
                resultBox.innerHTML = '';

                // Add suggestions to the result box
                suggestions.forEach((suggestion) => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("resultItem");
                    resultItem.textContent = suggestion;
                    resultItem.onclick = () => {
                        var resultlink = searchEngines[selectedOption] + encodeURIComponent(suggestion);
                        window.location.href = resultlink;
                    };
                    resultBox.appendChild(resultItem);
                });
                showResultBox()
            }

        } else {
            hideResultBox()
        }
    }
});

function getClientParam() {
    const userAgent = navigator.userAgent.toLowerCase();

    // Check for different browsers and return the corresponding client parameter
    if (userAgent.includes("firefox")) {
        return "firefox";
    } else if (userAgent.includes("chrome") || userAgent.includes("crios")) {
        return "chrome";
    } else if (userAgent.includes("safari")) {
        return "safari";
    } else if (userAgent.includes("edge") || userAgent.includes("edg")) {
        return "firefox";
    } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
        return "opera";
    } else {
        return "firefox";  // Default to Firefox client if the browser is not recognized
    }
}

async function getAutocompleteSuggestions(query) {
    const clientParam = getClientParam(); // Get the browser client parameter dynamically
    //var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
    const storedSearchEngine = localStorage.getItem("selectedSearchEngine");
    var selectedOption = `engine${storedSearchEngine}`;
    var searchEnginesapi = {
        engine1: `http://www.google.com/complete/search?client=${clientParam}&q=${encodeURIComponent(query)}`,
        engine2: `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`,
        engine3: `http://www.google.com/complete/search?client=${clientParam}&q=${encodeURIComponent(query)}`,
        engine4: `https://search.brave.com/api/suggest?q=${encodeURIComponent(query)}&rich=true&source=web`,
        engine5: `http://www.google.com/complete/search?client=${clientParam}&ds=yt&q=${encodeURIComponent(query)}`
    };
    const useproxyCheckbox = document.getElementById("useproxyCheckbox");
    let apiUrl = searchEnginesapi[selectedOption];
    if (useproxyCheckbox.selected) {
        apiUrl = `${proxyurl}/proxy?url=${encodeURIComponent(apiUrl)}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (selectedOption === 'engine4') {
            const suggestions = data[1].map(item => {
                if (item.is_entity) {
                    return `${item.q} - ${item.name} (${item.category ? item.category : "No category"})`;
                } else {
                    return item.q;
                }
            });
            return suggestions;
        } else {

            return data[1];
        }
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        return [];
    }
}


// Hide results when clicking outside
document.addEventListener("click", function (event) {
    const searchbar = document.getElementById("searchbar");
    const resultBox = document.getElementById("resultBox");

    if (!searchbar.contains(event.target)) {
        hideResultBox()
    }
});
// ------------Showing & Hiding Menu-bar ---------------
const menuButton = document.getElementById("menuButton");
const menuBar = document.getElementById("menuBar");
const menuCont = document.getElementById("menuCont");
const optCont = document.getElementById("optCont");
const overviewPage = document.getElementById("overviewPage");
const shortcutEditPage = document.getElementById("shortcutEditPage");

function pageReset() {
    optCont.scrollTop = 0;
    overviewPage.style.transform = "translateX(0)";
    overviewPage.style.opacity = "1";
    overviewPage.style.display = "block";
    shortcutEditPage.style.transform = "translateX(120%)";
    shortcutEditPage.style.opacity = "0";
    shortcutEditPage.style.display = "none";
}

const closeMenuBar = () => {
    requestAnimationFrame(() => {
        optCont.style.opacity = "0"
        optCont.style.transform = "translateX(100%)"
    });
    setTimeout(() => {
        requestAnimationFrame(() => {
            menuBar.style.opacity = "0"
            menuCont.style.transform = "translateX(100%)"
        });
    }, 14);
    setTimeout(() => {
        menuBar.style.display = "none";
    }, 555);
}

const openMenuBar = () => {
    setTimeout(() => {
        menuBar.style.display = "block";
        pageReset();
    });
    setTimeout(() => {
        requestAnimationFrame(() => {
            menuBar.style.opacity = "1"
            menuCont.style.transform = "translateX(0px)"
        });
    }, 7);
    setTimeout(() => {
        requestAnimationFrame(() => {
            optCont.style.opacity = "1"
            optCont.style.transform = "translateX(0px)"
        });
    }, 11);
}

menuButton.addEventListener("click", () => {
    if (menuBar.style.display === 'none' || menuBar.style.display === '') {
        openMenuBar();
    } else {
        closeMenuBar();
    }
});

//   ----------Hiding Menu Bar--------
menuBar.addEventListener("click", (event) => {
    if (event.target === menuBar) {
        closeMenuBar()
    }
});

// Hiding Menu Bar when user click on close button --------
document.getElementById("menuCloseButton").onclick = () => {
    closeMenuBar()
}


const secondaryTabs = document.querySelectorAll('md-secondary-tab');
const secondaryPanels = document.querySelectorAll('[role="tabpanel2"]');

function handleSecondaryTabClick(event) {
    const selectedTab = event.currentTarget;
    const selectedPanelId = selectedTab.id.replace('-tab', '-panel');

    secondaryPanels.forEach(panel => {
        panel.hidden = true; // Hide all secondary panels
    });
    secondaryTabs.forEach(tab => {
        tab.removeAttribute('active'); // Remove active attribute from all secondary tabs
    });

    const selectedPanel = document.getElementById(selectedPanelId);
    selectedPanel.hidden = false; // Show the selected secondary panel
    selectedTab.setAttribute('active', ''); // Set active attribute on selected secondary tab
}

secondaryTabs.forEach(tab => {
    tab.addEventListener('click', handleSecondaryTabClick);
});

// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {


    /* ------ Constants ------ */

    // maximum number of shortcuts allowed
    const MAX_SHORTCUTS_ALLOWED = 50;

    // minimum number of shortcuts allowed
    const MIN_SHORTCUTS_ALLOWED = 1;

    // The new shortcut placeholder info
    const PLACEHOLDER_SHORTCUT_NAME = "New shortcut";
    const PLACEHOLDER_SHORTCUT_URL = "https://github.com/XengShi/materialYouNewTab";

    // The placeholder for an empty shortcut
    const SHORTCUT_NAME_PLACEHOLDER = "Shortcut Name";
    const SHORTCUT_URL_PLACEHOLDER = "Shortcut URL";

    const SHORTCUT_PRESET_NAMES = ["Youtube", "Gmail", "Telegram", "WhatsApp", "Instagram", "Twitter"];
    const SHORTCUT_PRESET_URLS_AND_LOGOS = new Map([["youtube.com", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor"
                    d="M11.6698 9.82604L9.33021 8.73437C9.12604 8.63958 8.95833 8.74583 8.95833 8.97187V11.0281C8.95833 11.2542 9.12604 11.3604 9.33021 11.2656L11.6688 10.174C11.874 10.0781 11.874 9.92188 11.6698 9.82604ZM10 0C4.47708 0 0 4.47708 0 10C0 15.5229 4.47708 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47708 15.5229 0 10 0ZM10 14.0625C4.88125 14.0625 4.79167 13.601 4.79167 10C4.79167 6.39896 4.88125 5.9375 10 5.9375C15.1187 5.9375 15.2083 6.39896 15.2083 10C15.2083 13.601 15.1187 14.0625 10 14.0625Z"
                    fill="#617859"/>
            </svg>`], ["mail.google.com", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor"
                    d="M10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0ZM5 5H15C15.1788 5 15.3513 5.03875 15.5113 5.11L10 11.5387L4.48875 5.11C4.64929 5.03704 4.82366 4.99952 5 5ZM3.75 13.75V6.25L3.7525 6.17125L7.4175 10.4475L3.7925 14.0725C3.76387 13.9674 3.74957 13.8589 3.75 13.75ZM15 15H5C4.89 15 4.78125 14.985 4.6775 14.9575L8.235 11.4L10.0013 13.46L11.7675 11.4L15.325 14.9575C15.2199 14.9861 15.1114 15.0004 15.0025 15H15ZM16.25 13.75C16.25 13.86 16.235 13.9688 16.2075 14.0725L12.5825 10.4475L16.2475 6.17125L16.25 6.25V13.75Z"
                    fill="#00f"/>
            </svg>
            `], ["web.telegram.org", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor"
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.64 6.8C14.49 8.38 13.84 12.22 13.51 13.99C13.37 14.74 13.09 14.99 12.83 15.02C12.25 15.07 11.81 14.64 11.25 14.27C10.37 13.69 9.87 13.33 9.02 12.77C8.03 12.12 8.67 11.76 9.24 11.18C9.39 11.03 11.95 8.7 12 8.49C12.0069 8.45819 12.006 8.42517 11.9973 8.3938C11.9886 8.36244 11.9724 8.33367 11.95 8.31C11.89 8.26 11.81 8.28 11.74 8.29C11.65 8.31 10.25 9.24 7.52 11.08C7.12 11.35 6.76 11.49 6.44 11.48C6.08 11.47 5.4 11.28 4.89 11.11C4.26 10.91 3.77 10.8 3.81 10.45C3.83 10.27 4.08 10.09 4.55 9.9C7.47 8.63 9.41 7.79 10.38 7.39C13.16 6.23 13.73 6.03 14.11 6.03C14.19 6.03 14.38 6.05 14.5 6.15C14.6 6.23 14.63 6.34 14.64 6.42C14.63 6.48 14.65 6.66 14.64 6.8Z"
                    fill="#617859"/>
            </svg>
            `], ["web.whatsapp.com", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor"
                    d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C8.23279 20.0029 6.49667 19.5352 4.97001 18.645L0.00401407 20L1.35601 15.032C0.465107 13.5049 -0.00293838 11.768 1.38802e-05 10C1.38802e-05 4.477 4.47701 0 10 0ZM6.59201 5.3L6.39201 5.308C6.26254 5.31589 6.13599 5.3499 6.02001 5.408C5.91153 5.46943 5.81251 5.54622 5.72601 5.636C5.60601 5.749 5.53801 5.847 5.46501 5.942C5.09514 6.4229 4.89599 7.01331 4.89901 7.62C4.90101 8.11 5.02901 8.587 5.22901 9.033C5.63801 9.935 6.31101 10.89 7.19901 11.775C7.41301 11.988 7.62301 12.202 7.84901 12.401C8.9524 13.3725 10.2673 14.073 11.689 14.447L12.257 14.534C12.442 14.544 12.627 14.53 12.813 14.521C13.1043 14.506 13.3886 14.4271 13.646 14.29C13.777 14.2225 13.9048 14.1491 14.029 14.07C14.029 14.07 14.072 14.042 14.154 13.98C14.289 13.88 14.372 13.809 14.484 13.692C14.567 13.606 14.639 13.505 14.694 13.39C14.772 13.227 14.85 12.916 14.882 12.657C14.906 12.459 14.899 12.351 14.896 12.284C14.892 12.177 14.803 12.066 14.706 12.019L14.124 11.758C14.124 11.758 13.254 11.379 12.722 11.137C12.6663 11.1127 12.6067 11.0988 12.546 11.096C12.4776 11.089 12.4085 11.0967 12.3433 11.1186C12.2781 11.1405 12.2183 11.1761 12.168 11.223C12.163 11.221 12.096 11.278 11.373 12.154C11.3315 12.2098 11.2744 12.2519 11.2088 12.2751C11.1433 12.2982 11.0723 12.3013 11.005 12.284C10.9399 12.2665 10.876 12.2445 10.814 12.218C10.69 12.166 10.647 12.146 10.562 12.11C9.98808 11.8595 9.4567 11.5211 8.98701 11.107C8.86101 10.997 8.74401 10.877 8.62401 10.761C8.2306 10.3842 7.88774 9.95801 7.60401 9.493L7.54501 9.398C7.50264 9.33416 7.46837 9.2653 7.44301 9.193C7.40501 9.046 7.50401 8.928 7.50401 8.928C7.50401 8.928 7.74701 8.662 7.86001 8.518C7.97001 8.378 8.06301 8.242 8.12301 8.145C8.24101 7.955 8.27801 7.76 8.21601 7.609C7.93601 6.925 7.64601 6.244 7.34801 5.568C7.28901 5.434 7.11401 5.338 6.95501 5.319C6.90101 5.313 6.84701 5.307 6.79301 5.303C6.65872 5.29633 6.52415 5.29766 6.39001 5.307L6.59101 5.299L6.59201 5.3Z"
                    fill="#617859"/>
            </svg>
            `], ["instagram.com", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor"
                    d="M10 0C4.44444 0 0 4.44444 0 10C0 15.5556 4.44444 20 10 20C15.5556 20 20 15.5556 20 10C20 4.44444 15.5556 0 10 0ZM10 7.77778C11.2222 7.77778 12.2222 8.77778 12.2222 10C12.2222 11.2222 11.2222 12.2222 10 12.2222C8.77778 12.2222 7.77778 11.2222 7.77778 10C7.77778 8.77778 8.77778 7.77778 10 7.77778ZM13.1111 5.55556C13.1111 4.77778 13.7778 4.22222 14.4444 4.22222C15.1111 4.22222 15.7778 4.88889 15.7778 5.55556C15.7778 6.22222 15.2222 6.88889 14.4444 6.88889C13.6667 6.88889 13.1111 6.33333 13.1111 5.55556ZM10 17.7778C5.66667 17.7778 2.22222 14.3333 2.22222 10H5.55556C5.55556 12.4444 7.55556 14.4444 10 14.4444C12.4444 14.4444 14.4444 12.4444 14.4444 10H17.7778C17.7778 14.3333 14.3333 17.7778 10 17.7778Z"
                    fill="#617859"/>
            </svg>
            `], ["twitter.com", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor"
                    d="M10 0C15.5286 0 20 4.47143 20 10C20 15.5286 15.5286 20 10 20C4.47143 20 0 15.5286 0 10C0 4.47143 4.47143 0 10 0ZM8.17143 15.2714C12.6 15.2714 15.0286 11.6 15.0286 8.41429V8.1C15.5 7.75714 15.9143 7.32857 16.2286 6.84286C15.8 7.02857 15.3286 7.15714 14.8429 7.22857C15.3429 6.92857 15.7286 6.45714 15.9 5.9C15.4286 6.17143 14.9143 6.37143 14.3714 6.48571C13.9286 6.01429 13.3 5.72857 12.6143 5.72857C11.2857 5.72857 10.2 6.81429 10.2 8.14286C10.2 8.32857 10.2143 8.51429 10.2714 8.68571C8.27143 8.58571 6.48571 7.62857 5.3 6.17143C5.1 6.52857 4.97143 6.94286 4.97143 7.38571C4.97143 8.21429 5.4 8.95714 6.04286 9.38571C5.64286 9.38571 5.27143 9.27143 4.95714 9.08571V9.11429C4.95714 10.2857 5.78571 11.2571 6.88571 11.4857C6.68571 11.5429 6.47143 11.5714 6.25714 11.5714C6.1 11.5714 5.95714 11.5571 5.8 11.5286C6.1 12.4857 7 13.1857 8.04286 13.2C7.21429 13.8429 6.17143 14.2286 5.04286 14.2286C4.84286 14.2286 4.65714 14.2286 4.47143 14.2C5.52857 14.8857 6.8 15.2857 8.15714 15.2857"
                    fill="#617859"/>
            </svg>
            `]]);

    const SHORTCUT_DELETE_BUTTON_HTML = `
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-12q-15.3 0-25.65-10.29Q192-716.58 192-731.79t10.35-25.71Q212.7-768 228-768h156v-12q0-15.3 10.35-25.65Q404.7-816 420-816h120q15.3 0 25.65 10.35Q576-795.3 576-780v12h156q15.3 0 25.65 10.29Q768-747.42 768-732.21t-10.35 25.71Q747.3-696 732-696h-12v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM419.79-288q15.21 0 25.71-10.35T456-324v-264q0-15.3-10.29-25.65Q435.42-624 420.21-624t-25.71 10.35Q384-603.3 384-588v264q0 15.3 10.29 25.65Q404.58-288 419.79-288Zm120 0q15.21 0 25.71-10.35T576-324v-264q0-15.3-10.29-25.65Q555.42-624 540.21-624t-25.71 10.35Q504-603.3 504-588v264q0 15.3 10.29 25.65Q524.58-288 539.79-288ZM312-696v480-480Z"/>
                </svg>
            </button>
            `;

    const FAVICON_CANDIDATES = (hostname) => [
        `https://${hostname}/apple-touch-icon-180x180.png`,
        `https://${hostname}/apple-touch-icon-120x120.png`,
        `https://${hostname}/apple-touch-icon.png`
    ];

    const GOOGLE_FAVICON_API_FALLBACK = (hostname) =>
        `https://s2.googleusercontent.com/s2/favicons?domain_url=https://${hostname}&sz=256`;

    const FAVICON_REQUEST_TIMEOUT = 5000;

    const ADAPTIVE_ICON_CSS = `.shortcutsContainer .shortcuts .shortcutLogoContainer img {
                height: calc(100% / sqrt(2)) !important;
                width: calc(100% / sqrt(2)) !important;
                }`;


    /* ------ Element selectors ------ */

    const shortcuts = document.getElementById("shortcuts-section");
    const aiToolsCont = document.getElementById("aiToolsCont");
    const shortcutsCheckbox = document.getElementById("shortcutsCheckbox");
    const proxybypassField = document.getElementById("proxybypassField");
    const proxyinputField = document.getElementById("proxyField");
    const useproxyCheckbox = document.getElementById("useproxyCheckbox");
    const searchsuggestionscheckbox = document.getElementById("searchsuggestionscheckbox");
    const shortcutEditField = document.getElementById("shortcutEditField");
    const adaptiveIconField = document.getElementById("adaptiveIconField");
    const adaptiveIconToggle = document.getElementById("adaptiveIconToggle");
    const aiToolsCheckbox = document.getElementById("aiToolsCheckbox");
    const timeformatField = document.getElementById("timeformatField");
    const hourcheckbox = document.getElementById("12hourcheckbox");
    const usertextcheckbox = document.getElementById("usertextcheckbox");
    const digitalCheckbox = document.getElementById("digitalCheckbox");
    const fahrenheitCheckbox = document.getElementById("fahrenheitCheckbox");
    const shortcutEditButton = document.getElementById("shortcutEditButton");
    const backButton = document.getElementById("backButton");
    const shortcutSettingsContainer = document.getElementById("shortcutList"); // shortcuts in settings
    const shortcutsContainer = document.getElementById("shortcutsContainer"); // shortcuts in page
    const newShortcutButton = document.getElementById("newShortcutButton");
    const resetShortcutsButton = document.getElementById("resetButton");
    const iconStyle = document.getElementById("iconStyle");
    const flexMonitor = document.getElementById("flexMonitor"); // monitors whether shortcuts have flex-wrap flexed
    const defaultHeight = document.getElementById("defaultMonitor").clientHeight; // used to compare to previous element
    const unfoldShortcutsButton = document.getElementById("unfoldShortcutsBtn");
    /* ------ Helper functions for saving and loading states ------ */

    // Function to save checkbox state to localStorage
    function saveCheckboxState(key, checkbox) {
        localStorage.setItem(key, checkbox.selected ? "selected" : "unselected");
    }

    // Function to load and apply checkbox state from localStorage
    function loadCheckboxState(key, checkbox) {
        const savedState = localStorage.getItem(key);
        checkbox.selected = savedState === "selected";
    }

    // Function to save display status to localStorage
    function saveDisplayStatus(key, displayStatus) {
        localStorage.setItem(key, displayStatus);
    }

    // Function to load and apply display status from localStorage
    function loadDisplayStatus(key, element) {
        const savedStatus = localStorage.getItem(key);
        if (savedStatus === "flex") {
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    }

    // Function to save activeness status to localStorage
    function saveActiveStatus(key, activeStatus) {
        localStorage.setItem(key, activeStatus)
    }

    // Function to load and apply activeness status from localStorage
    function loadActiveStatus(key, element) {
        const savedStatus = localStorage.getItem(key);
        if (savedStatus === "active") {
            element.classList.remove("inactive");
        } else {
            element.classList.add("inactive");
        }
    }

    // Function to save style data
    function saveIconStyle(key, CSS) {
        localStorage.setItem(key, CSS);
    }

    // Function to load style data
    function loadIconStyle(key, element) {
        element.innerHTML = localStorage.getItem(key);
    }


    /* ------ Loading shortcuts ------ */

    /**
    * Function to load and apply all shortcut names and URLs from localStorage
    *
    * Iterates through the stored shortcuts and replaces the settings entry for the preset shortcuts with the
    * stored ones.
    * It then calls apply for all the shortcuts, to synchronize the changes settings entries with the actual shortcut
    * container.
    */
    function loadShortcuts() {
        let amount = localStorage.getItem("shortcutAmount");

        const presetAmount = SHORTCUT_PRESET_NAMES.length;

        if (amount === null) { // first time opening
            amount = presetAmount;
            localStorage.setItem("shortcutAmount", amount.toString());
        } else {
            amount = parseInt(amount);
        }

        // If we are not allowed to add more shortcuts.
        if (amount >= MAX_SHORTCUTS_ALLOWED) newShortcutButton.className = "inactive";

        // If we are not allowed to delete anymore, all delete buttons should be deactivated.
        const deleteInactive = amount <= MIN_SHORTCUTS_ALLOWED;

        for (let i = 0; i < amount; i++) {

            const name = localStorage.getItem("shortcutName" + i.toString()) || SHORTCUT_PRESET_NAMES[i];
            const url = localStorage.getItem("shortcutURL" + i.toString()) ||
                [...SHORTCUT_PRESET_URLS_AND_LOGOS.keys()][i];

            const newSettingsEntry = createShortcutSettingsEntry(name, url, deleteInactive, i);

            // Save the index for the future
            newSettingsEntry._index = i;

            shortcutSettingsContainer.appendChild(newSettingsEntry);

            applyShortcut(newSettingsEntry);
        }
    }


    /* ------ Creating shortcut elements ------ */

    /**
    * Function that creates a div to be used in the shortcut edit panel of the settings.
    *
    * @param name The name of the shortcut
    * @param url The URL of the shortcut
    * @param deleteInactive Whether the delete button should be active
    * @param i The index of the shortcut
    * @returns {HTMLDivElement} The div to be used in the settings
    */
    function createShortcutSettingsEntry(name, url, deleteInactive, i) {
        const deleteButtonContainer = document.createElement("div");
        deleteButtonContainer.className = "delete";
        deleteButtonContainer.innerHTML = SHORTCUT_DELETE_BUTTON_HTML;

        const deleteButton = deleteButtonContainer.children[0];
        if (deleteInactive) deleteButton.className = "inactive";
        deleteButton.addEventListener(
            "click",
            (e) => deleteShortcut(e.target.closest(".shortcutSettingsEntry"))
        );

        const shortcutName = document.createElement("input");
        shortcutName.className = "shortcutName";
        shortcutName.placeholder = SHORTCUT_NAME_PLACEHOLDER;
        shortcutName.value = name;
        const shortcutUrl = document.createElement("input");
        shortcutUrl.className = "URL";
        shortcutUrl.placeholder = SHORTCUT_URL_PLACEHOLDER;
        shortcutUrl.value = url;

        attachEventListenersToInputs([shortcutName, shortcutUrl]);

        const textDiv = document.createElement("div");
        textDiv.append(shortcutName, shortcutUrl);

        const entryDiv = document.createElement("div");
        entryDiv.className = "shortcutSettingsEntry";
        entryDiv.append(textDiv, deleteButtonContainer);

        entryDiv._index = i;

        return entryDiv;
    }

    /**
    * This function creates a shortcut to be used for the shortcut container on the main page.
    *
    * @param shortcutName The name of the shortcut
    * @param shortcutUrl The url of the shortcut
    * @param i The index of the shortcut
    */
    function createShortcutElement(shortcutName, shortcutUrl, i) {
        const shortcut = document.createElement("a");
        shortcut.href = shortcutUrl;

        const name = document.createElement("span");
        name.className = "shortcut-name"
        name.textContent = shortcutName;

        let icon = getCustomLogo(shortcutUrl);

        if (!icon) { // if we had to pick the fallback, attempt to get a better image in the background.
            icon = getFallbackFavicon(shortcutUrl);
            getBestIconUrl(shortcutUrl).then((iconUrl) => icon.src = iconUrl).catch();
        }

        const iconContainer = document.createElement("div");
        iconContainer.className = "shortcutLogoContainer";
        iconContainer.appendChild(icon);

        shortcut.append(iconContainer, name);

        const shortcutContainer = document.createElement("div");
        shortcutContainer.className = "shortcuts";
        shortcutContainer.appendChild(shortcut);
        shortcutContainer._index = i;

        return shortcutContainer;
    }


    /* ------ Attaching event listeners to shortcut settings ------ */

    /**
    * Function to attach all required event listeners to the shortcut edit inputs in the settings.
    *
    * It adds three event listeners to each of the two inputs:
    * 1. Blur, to save changes to the shortcut automatically.
    * 2. Focus, to select all text in the input field when it is selected.
    * 3. Keydown, which moves the focus to the URL field when the user presses 'Enter' in the name field,
    * and removes all focus to save the changes when the user presses 'Enter' in the URL field.
    *
    * @param inputs a list of the two inputs these listeners should be applied to.
    */
    function attachEventListenersToInputs(inputs) {
        inputs.forEach(input => {
            // save and apply when done
            input.addEventListener("blur", (e) => {
                const shortcut = e.target.closest(".shortcutSettingsEntry");
                saveShortcut(shortcut);
                applyShortcut(shortcut);
            });
            // select all content on click:
            input.addEventListener("focus", (e) => e.target.select());
        });
        inputs[0].addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                inputs[1].focus();  // Move focus to the URL
            }
        });
        inputs[1].addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                e.target.blur();  // Blur the input field
            }
        });
    }


    /* ------ Saving and applying changes to shortcuts ------ */

    /**
    * This function stores a shortcut by saving its values in the settings panel to the local storage.
    *
    * @param shortcut The shortcut to be saved
    */
    function saveShortcut(shortcut) {
        const name = shortcut.querySelector("input.shortcutName").value;
        const url = shortcut.querySelector("input.URL").value;

        localStorage.setItem("shortcutName" + shortcut._index, name);
        localStorage.setItem("shortcutURL" + shortcut._index, url);
    }

    /**
    * This function applies a change that has been made in the settings panel to the real shortcut in the container
    *
    * @param shortcut The shortcut to be applied.
    */
    function applyShortcut(shortcut) {
        const shortcutName = shortcut.querySelector("input.shortcutName").value;
        let url = shortcut.querySelector("input.URL").value;
        const normalizedUrl = url.startsWith('https://') ? url : 'https://' + url.replace("http://", "");

        const i = shortcut._index;

        const shortcutElement = createShortcutElement(shortcutName, normalizedUrl, i);

        if (i < shortcutsContainer.children.length) {
            shortcutsContainer.replaceChild(shortcutElement, shortcutsContainer.children[i]);
        } else {
            shortcutsContainer.appendChild(shortcutElement);
        }
    }


    /* ------ Adding, deleting, and resetting shortcuts ------ */

    /**
    * This function creates a new shortcut in the settings panel, then saves and applies it.
    */
    function newShortcut() {
        const currentAmount = parseInt(localStorage.getItem("shortcutAmount"));
        const newAmount = currentAmount + 1;

        if (newAmount > MAX_SHORTCUTS_ALLOWED) return;

        // If the delete buttons were deactivated, reactivate them.
        if (currentAmount === MIN_SHORTCUTS_ALLOWED) {
            shortcutSettingsContainer.querySelectorAll(".delete button.inactive")
                .forEach(b => b.classList.remove("inactive"));
        }

        // If we have reached the max, deactivate the add button.
        if (newAmount === MAX_SHORTCUTS_ALLOWED) newShortcutButton.className = "inactive"

        // Save the new amount
        localStorage.setItem("shortcutAmount", newAmount.toString());

        // create placeholder div
        const shortcut = createShortcutSettingsEntry(
            PLACEHOLDER_SHORTCUT_NAME, PLACEHOLDER_SHORTCUT_URL, false, currentAmount
        );

        shortcutSettingsContainer.appendChild(shortcut);

        saveShortcut(shortcut);
        applyShortcut(shortcut);
    }

    /**
    * This function deletes a shortcut and shifts all indices of the following shortcuts back by one.
    *
    * @param shortcut The shortcut to be deleted.
    */
    function deleteShortcut(shortcut) {
        const newAmount = (localStorage.getItem("shortcutAmount") || 0) - 1;
        if (newAmount < MIN_SHORTCUTS_ALLOWED) return;

        const i = shortcut._index;

        // If we had previously deactivated it, reactivate the add button
        newShortcutButton.classList.remove("inactive");

        // Remove the shortcut from the DOM
        shortcut.remove();
        shortcutsContainer.removeChild(shortcutsContainer.children[i]);

        // Update localStorage by shifting all the shortcuts after the deleted one and update the index
        for (let j = i; j < newAmount; j++) {
            const shortcutEntry = shortcutSettingsContainer.children[j];
            shortcutEntry._index--;
            saveShortcut(shortcutEntry);
        }

        // Remove the last shortcut from storage, as it has now moved up
        localStorage.removeItem("shortcutName" + (newAmount));
        localStorage.removeItem("shortcutURL" + (newAmount));

        // Disable delete buttons if minimum number reached
        if (newAmount === MIN_SHORTCUTS_ALLOWED) {
            shortcutSettingsContainer.querySelectorAll(".delete button")
                .forEach(button => button.className = "inactive");
        }

        // Update the shortcutAmount in localStorage
        localStorage.setItem("shortcutAmount", (newAmount).toString());
    }

    /**
    * This function resets shortcuts to their original state, namely the presets.
    *
    * It does this by deleting all shortcut-related data, then reloading the shortcuts.
    */
    function resetShortcuts() {
        for (let i = 0; i < (localStorage.getItem("shortcutAmount") || 0); i++) {
            localStorage.removeItem("shortcutName" + i);
            localStorage.removeItem("shortcutURL" + i);
        }
        shortcutSettingsContainer.innerHTML = "";
        shortcutsContainer.innerHTML = "";
        localStorage.removeItem("shortcutAmount");
        loadShortcuts();
    }


    /* ------ Shortcut favicon handling ------ */

    /**
    * This function verifies whether a URL for a favicon is valid.
    *
    * It does this by creating an image and setting the URL as the src, as fetch would be blocked by CORS.
    *
    * @param urls the array of potential URLs of favicons
    * @returns {Promise<unknown>}
    */
    function filterFavicon(urls) {
        return new Promise((resolve, reject) => {
            let found = false;

            for (const url of urls) {
                const img = new Image();
                img.referrerPolicy = "no-referrer"; // Don't send referrer data
                img.src = url;

                img.onload = () => {
                    if (!found) { // Make sure to resolve only once
                        found = true;
                        resolve(url);
                    }
                };
            }

            // If none of the URLs worked after all have been tried
            setTimeout(() => {
                if (!found) {
                    reject();
                }
            }, FAVICON_REQUEST_TIMEOUT);
        });
    }

    /**
    * This function returns the url to the favicon of a website, given a URL.
    *
    * @param urlString The url of the website for which the favicon is requested
    * @return {Promise<String>} Potentially the favicon url
    */
    async function getBestIconUrl(urlString) {
        const hostname = new URL(urlString).hostname;
        try {
            // Wait for filterFavicon to resolve with a valid URL
            return await filterFavicon(FAVICON_CANDIDATES(hostname));
        } catch (error) {
            return Promise.reject();
        }
    }

    /**
    * This function uses Google's API to immediately get a favicon,
    * to be used while loading the real one and as a fallback.
    *
    * @param urlString the url of the website for which the favicon is requested
    * @returns {HTMLImageElement} The img element representing the favicon
    */
    function getFallbackFavicon(urlString) {
        const logo = document.createElement("img");

        const hostname = new URL(urlString).hostname;
        logo.src = GOOGLE_FAVICON_API_FALLBACK(hostname);

        return logo;
    }

    /**
    * This function returns the custom logo for the url associated with a preset shortcut.
    *
    * @param url The url of the shortcut.
    * @returns {Element|null} The logo if it was found, otherwise null.
    */
    function getCustomLogo(url) {
        const html = SHORTCUT_PRESET_URLS_AND_LOGOS.get(url.replace("https://", ""));
        return html ? document.createRange().createContextualFragment(html).firstElementChild : null;
    }


    /* ------ Proxy ------ */

    /**
    * This function shows the proxy disclaimer.
    */
    function showProxyDisclaimer() {

        const alert =document.getElementById("alert");
                    document.getElementById('alertheadline').innerText = "Please Use Your Own Proxy";
                    document.getElementById('alertform').innerText ="It is strongly recommended to host your own proxy for enhanced privacy.\n\nBy default, the proxy will be set to https://mynt-proxy.rhythmcorehq.com, meaning all your data will go through this service, which may pose privacy concerns.";
                    alert.show();
    }


    /* ------ Event Listeners ------ */

    // Add change event listeners for the checkboxes
    shortcutsCheckbox.addEventListener("change", function () {
        saveCheckboxState("shortcutsCheckboxState", shortcutsCheckbox);
        if (shortcutsCheckbox.selected) {
            shortcuts.style.display = "flex";
            saveDisplayStatus("shortcutsDisplayStatus", "flex");
            shortcutEditField.classList.remove("inactive");
            saveActiveStatus("shortcutEditField", "active");
            adaptiveIconField.classList.remove("inactive");
            saveActiveStatus("adaptiveIconField", "active");
        } else {
            shortcuts.style.display = "none";
            saveDisplayStatus("shortcutsDisplayStatus", "none");
            shortcutEditField.classList.add("inactive");
            saveActiveStatus("shortcutEditField", "inactive");
            adaptiveIconField.classList.add("inactive");
            saveActiveStatus("adaptiveIconField", "inactive");
        }
    });
    searchsuggestionscheckbox.addEventListener("change", function () {
        saveCheckboxState("searchsuggestionscheckboxState", searchsuggestionscheckbox);
        if (searchsuggestionscheckbox.selected) {
            proxybypassField.classList.remove("inactive");
            saveActiveStatus("proxybypassField", "active");
        } else {
            proxybypassField.classList.add("inactive");
            saveActiveStatus("proxybypassField", "inactive");
            useproxyCheckbox.selected = false;
            saveCheckboxState("useproxyCheckboxState", useproxyCheckbox);
            proxyinputField.classList.add("inactive");
            saveActiveStatus("proxyinputField", "inactive");
        }
    });
    digitalCheckbox.addEventListener("change", function () {
        saveCheckboxState("digitalCheckboxState", digitalCheckbox);
        if (digitalCheckbox.selected) {
            timeformatField.classList.remove("inactive");
            localStorage.setItem("clocktype", "digital");
            clocktype = localStorage.getItem("clocktype");
            displayClock();
            stopClock();
            saveActiveStatus("timeformatField", "active");
        } else {
            timeformatField.classList.add("inactive");
            localStorage.setItem("clocktype", "analog");
            clocktype = localStorage.getItem("clocktype");
            stopClock();
            startClock();
            displayClock();
            saveActiveStatus("timeformatField", "inactive");
        }
    });
    hourcheckbox.addEventListener("change", function () {
        saveCheckboxState("hourcheckboxState", hourcheckbox);
        if (hourcheckbox.selected) {
            localStorage.setItem("hourformat", "true");
        } else {
            localStorage.setItem("hourformat", "false");
        }
    });
    usertextcheckbox.addEventListener("change", function () {
        saveCheckboxState("usertextcheckboxState", usertextcheckbox);
        const usertextbox = document.getElementById('userTextt');
        if (usertextcheckbox.selected) {
            usertextbox.style.display = 'block';
        } else {
            usertextbox.style.display = 'none';  
        }
    });
    useproxyCheckbox.addEventListener("change", function () {
        saveCheckboxState("useproxyCheckboxState", useproxyCheckbox);
        if (useproxyCheckbox.selected) {
            showProxyDisclaimer();
            proxyinputField.classList.remove("inactive");
            saveActiveStatus("proxyinputField", "active");
        } else {
            proxyinputField.classList.add("inactive");
            saveActiveStatus("proxyinputField", "inactive");
        }
    });
    adaptiveIconToggle.addEventListener("change", function () {
        saveCheckboxState("adaptiveIconToggle", adaptiveIconToggle);
        if (adaptiveIconToggle.selected) {
            const alert =document.getElementById("alert");
                    document.getElementById('alertheadline').innerText = "Warning";
                    document.getElementById('alertform').innerText = "This setting is still experimental";
                    alert.show();
            saveIconStyle("iconStyle", ADAPTIVE_ICON_CSS);
            iconStyle.innerHTML = ADAPTIVE_ICON_CSS;
        } else {
            saveIconStyle("iconStyle", "");
            iconStyle.innerHTML = "";
        }
    })

    aiToolsCheckbox.addEventListener("change", function () {
        saveCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
        if (aiToolsCheckbox.selected) {
            aiToolsCont.style.display = "flex";
            saveDisplayStatus("aiToolsDisplayStatus", "flex");
        } else {
            aiToolsCont.style.display = "none";
            saveDisplayStatus("aiToolsDisplayStatus", "none");
        }
    });

    fahrenheitCheckbox.addEventListener("change", function () {
        saveCheckboxState("fahrenheitCheckboxState", fahrenheitCheckbox);
    });

    newShortcutButton.addEventListener("click", () => newShortcut());

    resetShortcutsButton.addEventListener("click", () => resetShortcuts());

    // Create a ResizeObserver to watch the height changes of the shortcut container and see if it is wrapped
    /*new ResizeObserver(e => {
        if (shortcutsContainer.classList.contains("showBackground")) {
            openShortcutDrawer()
        }
        const height = e[0].contentRect.height;
        if (height === defaultHeight) {
            setTimeout(() => {
                unfoldShortcutsButton.style.display = "block";
            });
        } else {
            setTimeout(() => {
                unfoldShortcutsButton.style.display = "block";
            });
        }
    }).observe(flexMonitor);*/


    /* ------ Page Transitions & Animations ------ */

    /**
    * This function sets the state of the shortcut drawer to open.
    *
    * This means it can be used both to open and to update the shortcut drawer.
    */
    function openShortcutDrawer() {
        //const translationDistance = flexMonitor.clientHeight - defaultHeight;
        const translationDistance = "90";
        shortcutsContainer.style.display = "flex";
        requestAnimationFrame(() => {
            shortcutsContainer.style.transform = `translateY(-${translationDistance}px)`;
            shortcutsContainer.classList.add("showBackground");
            unfoldShortcutsButton.style.transform = "rotate(180deg)";
            unfoldShortcutsButton.closest(".unfoldContainer").style.transform = `translateY(-${translationDistance}px)`;
        });
    }

    /**
    * This function closes the shortcut drawer
    */
    function resetShortcutDrawer() {
        requestAnimationFrame(() => {
            shortcutsContainer.style.display = "none";
            shortcutsContainer.style.transform = "translateY(0)";
            shortcutsContainer.classList.remove("showBackground");
            unfoldShortcutsButton.style.transform = "rotate(0)";
            unfoldShortcutsButton.closest(".unfoldContainer").style.transform = "translateY(0)";
        });
    }

    // When clicked, open new page by sliding it in from the right.
    shortcutEditButton.onclick = () => {
        setTimeout(() => {
            shortcutEditPage.style.display = "block"
        });
        requestAnimationFrame(() => {
            overviewPage.style.transform = "translateX(-120%)"
            overviewPage.style.opacity = "0"
        });
        setTimeout(() => {
            requestAnimationFrame(() => {
                shortcutEditPage.style.transform = "translateX(0)"
                shortcutEditPage.style.opacity = "1"
            });
        }, 50);
        setTimeout(() => {
            overviewPage.style.display = "none";
        }, 650);
    }
function closeshortcuteditmenu(){

        overviewPage.style.display = "block"
        overviewPage.style.transform = "translateX(0)";
        overviewPage.style.opacity = "1";
        shortcutEditPage.style.display = "none";

    requestAnimationFrame(() => {
        shortcutEditPage.style.transform = "translateX(120%)";
        shortcutEditPage.style.opacity = "0";
    });
   
}
// Select all primary tabs
const tabs = document.querySelectorAll('md-primary-tab');
const panels = document.querySelectorAll('[role="tabpanel"]');

// Function to show the selected panel and hide others
function handleTabClick(event) {
    const selectedTab = event.currentTarget;
    const selectedPanelId = selectedTab.id.replace('-tab', '-panel');
    closeshortcuteditmenu();
    // Hide all panels and deactivate all tabs
    panels.forEach(panel => {
        panel.hidden = true; // Hide all panels
    });
    tabs.forEach(tab => {
        tab.removeAttribute('active'); // Remove active attribute from all tabs
    });
    
    // Show the selected panel and activate the selected tab
    const selectedPanel = document.getElementById(selectedPanelId);
    selectedPanel.hidden = false; // Show the selected panel
    selectedTab.setAttribute('active', ''); // Set active attribute on selected tab
}

// Add click event listeners to each tab
tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
});
    // Close page by sliding it away to the right.
    backButton.onclick = () => {
        setTimeout(() => {
            overviewPage.style.display = "block"
        });
        requestAnimationFrame(() => {
            shortcutEditPage.style.transform = "translateX(120%)";
            shortcutEditPage.style.opacity = "0";
        });
        setTimeout(() => {
            requestAnimationFrame(() => {
                overviewPage.style.transform = "translateX(0)";
                overviewPage.style.opacity = "1";
            });
        }, 50);
        setTimeout(() => {
            shortcutEditPage.style.display = "none";
        }, 650);
    }

    // Shift up shortcuts
    unfoldShortcutsButton.onclick = (e) => {

        if (!shortcutsContainer.classList.contains("showBackground")) {
            e.stopPropagation();
            openShortcutDrawer();
        }
    }

    document.addEventListener('click', function (event) {
        // Check if the clicked element is not the shortcut container, yet the container is unfolded
        if (shortcutsContainer.classList.contains("showBackground") && !shortcutsContainer.contains(event.target)) {
            resetShortcutDrawer();
        }
    });



    /* ------ Loading ------ */

    // Load and apply the saved checkbox states and display statuses
    loadCheckboxState("shortcutsCheckboxState", shortcutsCheckbox);
    loadActiveStatus("shortcutEditField", shortcutEditField);
    loadActiveStatus("adaptiveIconField", adaptiveIconField);
    loadCheckboxState("searchsuggestionscheckboxState", searchsuggestionscheckbox);
    loadCheckboxState("useproxyCheckboxState", useproxyCheckbox);
    loadCheckboxState("digitalCheckboxState", digitalCheckbox);
    loadCheckboxState("hourcheckboxState", hourcheckbox);
    loadCheckboxState("usertextcheckboxState", usertextcheckbox);
    loadActiveStatus("proxyinputField", proxyinputField);
    loadActiveStatus("timeformatField", timeformatField);
    loadActiveStatus("proxybypassField", proxybypassField);
    loadCheckboxState("adaptiveIconToggle", adaptiveIconToggle);
    loadIconStyle("iconStyle", iconStyle);
    loadCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
    loadDisplayStatus("shortcutsDisplayStatus", shortcuts);
    loadDisplayStatus("aiToolsDisplayStatus", aiToolsCont);
    loadCheckboxState("fahrenheitCheckboxState", fahrenheitCheckbox);
    loadShortcuts();
});
