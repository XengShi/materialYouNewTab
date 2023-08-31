// Use a weather API to fetch the weather data
// Display the data in the 'weatherInfo' div
window.addEventListener('DOMContentLoaded', async () => {
    const updateWeather = async () => {
        // Getting current user location
        let geoLocation = 'https://geolocation-db.com/json/';
        let locationData = await fetch(geoLocation);
        let parsedLocation = await locationData.json();
        let currentUserLocation = parsedLocation.IPv4;
        let weatherApi = `https://api.weatherapi.com/v1/current.json?key=c8ec5c78e09448f6bce75309220907&q=${currentUserLocation}&aqi=no`;
        // let weatherApi = `https://api.weatherapi.com/v1/current.json?key=c8ec5c78e09448f6bce75309220907&q=chennai&aqi=no`;
        let data = await fetch(weatherApi);
        let parsedData = await data.json();

        document.getElementById("conditionText").textContent = parsedData.current.condition.text;

        // Convert decimal temperature to whole number temperature
        let wholeNumberWeather = Math.round(parsedData.current.temp_c);

        document.getElementById("temp").textContent = `${wholeNumberWeather}°`;
        // document.getElementById("temp").textContent = `${parsedData.current.temp_f}°`;

        // Setting weather Icon
        let newWIcon = parsedData.current.condition.icon;
        let weatherIcon = newWIcon.replace("//cdn", "https://cdn");
        document.getElementById("wIcon").src = weatherIcon;

        const humidity = parsedData.current.humidity

        if (humidity > 40) {
            document.getElementById("slider").style.width = `calc(${humidity}% - 60px)`;
        }
        document.getElementById("humidityLevel").textContent = `Humidity ${humidity} %`
        document.getElementById("feelsLike").textContent = `Feels ${parsedData.current.feelslike_c}°C`;
        // document.getElementById("location").textContent = `${parsedLocation.city}, ${parsedData.location.country}`;
        document.getElementById("location").textContent = `${parsedLocation.city}`;
    };
    updateWeather();
});

// ---------------------------end of weather stuff--------------------

setInterval(() => {
    var currentTime = new Date();
    let hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    // let hour_rotate_angle = (twelveH(hours) * 30) 
    let hour_rotate_angle = 30 * hours + minutes / 2
    document.getElementById("second").style.transform = `rotate(${seconds * 6}deg)`
    document.getElementById("minute").style.transform = `rotate(${minutes * 6}deg)`
    document.getElementById("hour").style.transform = `rotate(${hour_rotate_angle}deg)`
    // done : 5:08* 14 August 2023pHar

    // Create a new Date object
    var currentTime = new Date();
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    var dayOfWeek = currentTime.getDay();
    // Get the day of the month (1 - 31)
    var dayOfMonth = currentTime.getDate();
    // Get the month (0 = January, 1 = February, ..., 11 = December)
    var month = currentTime.getMonth();
    // Define an array of month names
    var monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // Get the name of the month using the array
    var monthName = monthNames[month];
    // Define an array of day names
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Get the name of the day using the array
    var dayName = dayNames[dayOfWeek];
    document.getElementById("date").innerText = `${dayName.substring(0, 3)}, ${monthName.substring(0, 3)} ${dayOfMonth}`
    console.log(`${dayName.substring(0, 3)}, ${monthName.substring(0, 3)} ${dayOfMonth}`)


}, 1000);



// Showing border or outline in when you click on searchbar
const searchbar = document.getElementById('searchbar');
searchbar.addEventListener('click', function () {
    searchbar.classList.toggle('active'); // Toggle the 'active' class
});
document.addEventListener('click', function (event) {
    // Check if the clicked element is not the searchbar
    if (!searchbar.contains(event.target)) {
        searchbar.classList.remove('active'); // Remove the 'active' class
    }
});

//search function
document.addEventListener("DOMContentLoaded", () => {
    const enterBTN = document.getElementById("enterBtn");
    const searchInput = document.getElementById("searchQ");

    function performSearch() {
        var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
        var searchTerm = searchInput.value;
        var searchEngines = {
            engine1: 'https://duckduckgo.com/?q=',
            engine2: 'https://www.google.com/search?q=',
            engine3: 'https://bing.com/?q=',
            engine4: 'https://www.youtube.com/results?search_query='
        };

        if (searchTerm !== "") {
            var searchUrl = searchEngines[selectedOption] + encodeURIComponent(searchTerm);
            window.location.href = searchUrl;
        }
    }

    enterBTN.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    // -----The stay changed even if user reload the page---
    const storedTheme = localStorage.getItem(themeStorageKey);
    if (storedTheme) {
        applySelectedTheme(storedTheme);
        const selectedRadioButton = document.querySelector(`.colorPlate[value="${storedTheme}"]`);
        if (selectedRadioButton) {
            selectedRadioButton.checked = true;
        }
    }
});



// Function to apply the selected theme
let themeButton = document.getElementById("themeButton")
themeButton.onclick = () => {
    document.getElementById("colorsContainer").classList.toggle("showColorPlate")
}

const radioButtons = document.querySelectorAll('.colorPlate');
const themeStorageKey = 'selectedTheme';

const applySelectedTheme = (colorValue) => {
    if (colorValue != "blue") {
        document.documentElement.style.setProperty('--bg-color-blue', `var(--bg-color-${colorValue})`);
        document.documentElement.style.setProperty('--accentLightTint-blue', `var(--accentLightTint-${colorValue})`);
        document.documentElement.style.setProperty('--darkerColor-blue', `var(--darkerColor-${colorValue})`);
        document.documentElement.style.setProperty('--darkColor-blue', `var(--darkColor-${colorValue})`);
        document.documentElement.style.setProperty('--textColorDark-blue', `var(--textColorDark-${colorValue})`);
    } else {
        document.documentElement.style.setProperty('--bg-color-blue', '#BBD6FD');
        document.documentElement.style.setProperty('--accentLightTint-blue', '#E2EEFF');
        document.documentElement.style.setProperty('--darkerColor-blue', '#3569b2');
        document.documentElement.style.setProperty('--darkColor-blue', '#4382EC');
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


// User entered Text stay changed even after reloadig the page
const userTextDiv = document.getElementById("userText");
const storedValue = localStorage.getItem("userText");
if (storedValue) {
    userTextDiv.textContent = storedValue;
}
userTextDiv.addEventListener("input", function () {
    localStorage.setItem("userText", userTextDiv.textContent);
});
// end of user entered text stufff