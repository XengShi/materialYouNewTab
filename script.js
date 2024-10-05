window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load the API key from localStorage
        const savedApiKey = localStorage.getItem("weatherApiKey");
        const userAPIInput = document.getElementById("userAPI");

        if (savedApiKey) {
            userAPIInput.value = savedApiKey;
        }

        const saveAPIButton = document.getElementById("saveAPI");

        // Add an event listener to save the API key when the "Save" button is clicked
        saveAPIButton.addEventListener("click", () => {
            const apiKey = userAPIInput.value;
            // Save the API key to localStorage
            localStorage.setItem("weatherApiKey", apiKey);

            document.getElementById("userAPI").value = "";
        });

        // Set the default API key
        const defaultApiKey = 'c8ec5c78e09448f6bce75309220907&q'; // Default Weather API key

        // Check if the user has entered their own API key
        const userApiKey = userAPIInput.value.trim();

        // Use the user's API key if available, otherwise use the default API key
        const apiKey = userApiKey || defaultApiKey;

        // Getting current user location
        const geoLocation = 'https://ipapi.co/json/';
        const locationData = await fetch(geoLocation);
        const parsedLocation = await locationData.json();
        const currentUserLocation = parsedLocation.ip;

        const weatherApi = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${currentUserLocation}&aqi=no`;

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
        document.getElementById("humidityLevel").textContent = `Humidity ${humidity}%`;

        // Event Listener for the Fahrenheit toggle
        const fahrenheitCheckbox = document.getElementById("fahrenheitCheckbox");
        const updateTemperatureDisplay = () => {
            if (fahrenheitCheckbox.checked) {
                document.getElementById("temp").textContent = `${tempFahrenheit}°`;
                document.getElementById("feelsLike").textContent = `Feels ${feelsLikeFahrenheit}°F`;
            } else {
                document.getElementById("temp").textContent = `${tempCelsius}°`;
                document.getElementById("feelsLike").textContent = `Feels ${feelsLikeCelsius}°C`;
            }
        };
        updateTemperatureDisplay();

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
        // Handle errors here, e.g., display an error message to the user.
    }
});



// ---------------------------end of weather stuff--------------------

setInterval(() => {
    var currentTime = new Date();
    let hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    let hour_rotate_angle = 30 * hours + minutes / 2
    document.getElementById("second").style.transform = `rotate(${seconds * 6}deg)`
    document.getElementById("minute").style.transform = `rotate(${minutes * 6}deg)`
    document.getElementById("hour").style.transform = `rotate(${hour_rotate_angle}deg)`
    // done : 5:08* 14 August 2023pHar

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
    // substring(0, 3) => We are taking only three Char from the name of the month and day like Sunday > Sun
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
    const searchEngineRadio = document.getElementsByName("search-engine");

    // Function to perform search
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

    // Event listeners
    enterBTN.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    // Set selected search engine from local storage
    const storedSearchEngine = localStorage.getItem("selectedSearchEngine");
    if (storedSearchEngine) {
        const selectedRadioButton = document.querySelector(`input[name="search-engine"][value="${storedSearchEngine}"]`);
        if (selectedRadioButton) {
            selectedRadioButton.checked = true;
        }
    }

    // Event listener for search engine radio buttons
    searchEngineRadio.forEach((radio) => {
        radio.addEventListener("change", () => {
            const selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
            localStorage.setItem("selectedSearchEngine", selectedOption);
        });
    });
    // -----The stay changed even if user reload the page---
    //  🔴🟠🟡🟢🔵🟣⚫️⚪️🟤
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
// 🔴🟠🟡🟢🔵🟣⚫️⚪️🟤
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
    if (colorValue === "dark") {
        // Please note: The dark theme is currently under development and may have issues.
        alert("Please note: The dark theme is currently under development and may have issues.")
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

// when User click on "AI-Tools"
const element = document.getElementById("toolsCont");
const shortcuts = document.getElementById("shortcutsContainer");
document.getElementById("0NIHK").onclick = () => {

    if (element.style.display === "flex") {
        shortcuts.style.display = 'flex';
        element.style.opacity = "0";
        element.style.gap = "0";
        element.style.transform = "translateX(-100%)";
        setTimeout(() => {
            element.style.display = "none";
        }, 500);
    } else {
        shortcuts.style.display = 'none';
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


// ------------Showing & Hiding Menu-bar ---------------
const menuButton = document.getElementById("menuButton");
const menuBar = document.getElementById("menuBar");
const menuCont = document.getElementById("menuCont");
const optCont = document.getElementById("optCont");
const overviewPage = document.getElementById("overviewPage");
const shortcutEditPage = document.getElementById("shortcutEditPage");

function pageReset() {
    overviewPage.style.transform = "translateX(0)";
    overviewPage.style.opacity = "1";
    overviewPage.style.display = "block";
    shortcutEditPage.style.transform = "translateX(120%)";
    shortcutEditPage.style.opacity = "0";
    shortcutEditPage.style.display = "none";
}

const closeMenuBar = () => {
    setTimeout(() => {
        menuBar.style.opacity = 0
        menuCont.style.transform = "translateX(100%)"
    }, 14);
    setTimeout(() => {
        optCont.style.opacity = 1
        optCont.style.transform = "translateX(100%)"
    }, 7);
    setTimeout(() => {
        menuBar.style.display = "none";
    }, 555);
}
menuButton.addEventListener("click", () => {
    if (menuBar.style.display === 'none' || menuBar.style.display === '') {
        menuBar.style.display = "block";
        pageReset()
        setTimeout(() => {
            menuBar.style.opacity = 1
            menuCont.style.transform = "translateX(0px)"
        }, 7);
        setTimeout(() => {
            optCont.style.opacity = 1
            optCont.style.transform = "translateX(0px)"
        }, 11);
    } else {
        menuBar.style.display = "none";
    }
    //   ----------Hiding Menu Bar--------
    menuBar.addEventListener("click", (event) => {
        if (event.target === menuBar) {
            closeMenuBar()
        }
    });
});

// Hiding Menu Bar when user click on close button --------
document.getElementById("menuCloseButton").onclick = () => {
    closeMenuBar()
}

// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const shortcuts = document.getElementById("shortcutsContainer");
    const aiToolsCont = document.getElementById("aiToolsCont");
    const shortcutsCheckbox = document.getElementById("shortcutsCheckbox");
    const shortcutEditField = document.getElementById("shortcutEditField");
    const aiToolsCheckbox = document.getElementById("aiToolsCheckbox");
    const fahrenheitCheckbox = document.getElementById("fahrenheitCheckbox");
    const shortcutEditButton = document.getElementById("shortcutEditButton");
    const backButton = document.getElementById("backButton");
    const shortcutList = document.getElementById("shortcutList"); // shortcuts in settings
    const shortcutsContainer = document.getElementById("shortcutsContainer") // shortcuts in page
    const addButton = document.getElementById("newShortcutButton")

    // Function to save checkbox state to localStorage
    function saveCheckboxState(key, checkbox) {
        localStorage.setItem(key, checkbox.checked ? "checked" : "unchecked");
    }

    // Function to load and apply checkbox state from localStorage
    function loadCheckboxState(key, checkbox) {
        const savedState = localStorage.getItem(key);
        if (savedState === "checked") {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    }

    // Function to load and apply all shortcut names and URLs from localStorage
    function loadShortcuts() {
        let amount = localStorage.getItem("shortcutAmount");

        const presetAmount = shortcutList.children.length;
        console.log("preset amount = " + presetAmount.toString());

        if (amount === null) { // first time opening
            amount = presetAmount;
            localStorage.setItem("shortcutAmount", amount.toString());
        } else {
            amount = parseInt(amount);
        }

        for (let i = 0; i < amount; i++) {
            console.log("in loop: " + shortcutList.children.length);

            const name = localStorage.getItem("shortcutName" + i.toString());
            const url = localStorage.getItem("shortcutURL" + i.toString());

            if (!name || !url) { // this is not a custom shortcut, just needs event listeners
                shortcutList.children[i].children[1].children[0].addEventListener("click", () => {
                    deleteShortcut(i);
                })
                const inputs = shortcutList.children[i].children[0].children;
                inputs[0].addEventListener("blur", () => {
                    saveShortcut(i, false);
                    applyShortcut(i);
                })
                inputs[1].addEventListener("blur", () => {
                    saveShortcut(i, true);
                    applyShortcut(i);
                })
                continue;
            }

            let deleteButton = document.createElement("div");
            deleteButton.className = "delete";
            deleteButton.innerHTML = `
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-12q-15.3 0-25.65-10.29Q192-716.58 192-731.79t10.35-25.71Q212.7-768 228-768h156v-12q0-15.3 10.35-25.65Q404.7-816 420-816h120q15.3 0 25.65 10.35Q576-795.3 576-780v12h156q15.3 0 25.65 10.29Q768-747.42 768-732.21t-10.35 25.71Q747.3-696 732-696h-12v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM419.79-288q15.21 0 25.71-10.35T456-324v-264q0-15.3-10.29-25.65Q435.42-624 420.21-624t-25.71 10.35Q384-603.3 384-588v264q0 15.3 10.29 25.65Q404.58-288 419.79-288Zm120 0q15.21 0 25.71-10.35T576-324v-264q0-15.3-10.29-25.65Q555.42-624 540.21-624t-25.71 10.35Q504-603.3 504-588v264q0 15.3 10.29 25.65Q524.58-288 539.79-288ZM312-696v480-480Z"/>
                </svg>
            </button>
            `
            deleteButton.children[0].addEventListener("click", () => {
                deleteShortcut(i);
            })

            let title = document.createElement("input");
            title.className = "bigText";
            title.value = name;
            title.addEventListener("blur", () => {
                saveShortcut(i, false);
                applyShortcut(i);
            });
            let subtitle = document.createElement("input");
            subtitle.className = "URL";
            subtitle.value = url;
            subtitle.addEventListener("blur", () => {
                saveShortcut(i, true);
                applyShortcut(i);
            });

            let textDiv = document.createElement("div");
            textDiv.append(title, subtitle);

            if (i < presetAmount) {
                shortcutList.children[i].innerHTML = '';
                shortcutList.children[i].append(textDiv, deleteButton);
            } else {

                let entryDiv = document.createElement("div");
                entryDiv.className = "shortcutSettingsEntry";
                entryDiv.append(textDiv, deleteButton);

                shortcutList.appendChild(entryDiv);
            }
            applyShortcut(i)
        }

        console.log("after loop: " + shortcutList.children.length);
        console.log(shortcutList.children[presetAmount - 1])

        for (let i = amount; i < presetAmount; i++) {
            shortcutList.removeChild(shortcutList.children[amount]);
            shortcutsContainer.removeChild(shortcutsContainer.children[amount]);
        }
    }

    function getFavicon(url) {
        const normalizedUrl = url.startsWith('https://') ? url : 'https://' + url.replace("http://", "");
        return `https://s2.googleusercontent.com/s2/favicons?domain_url=${normalizedUrl}&sz=256`;
    }

    function saveShortcut(i, isUrl) {
        if (isUrl === undefined) {
            saveShortcut(i, false);
            saveShortcut(i, true);
            return;
        }

        const value = shortcutList.children[i].children[0].children[isUrl ? 1 : 0].value;

        localStorage.setItem("shortcut" + (isUrl ? "URL" : "Name") + i.toString(), value);
    }

    function applyShortcut(i) {
        let settingsEntryText = shortcutList.children[i].children[0];

        if (i >= shortcutsContainer.children.length) {
            shortcutsContainer.insertAdjacentHTML('beforeend', '<div class="shortcuts"><a href=""></a></div>');
        }

        let shortcut = shortcutsContainer.children[i].children[0];
        let url = settingsEntryText.children[1].value;

        shortcut.href = url.startsWith('https://') ? url : 'https://' + url.replace("http://", "");
        shortcut.innerHTML = '';

        let logo = document.createElement("img");
        logo.className = "shortcutLogo";
        logo.src = getFavicon(url);

        let name = document.createElement("span");
        name.className = "shortcut-name"
        name.textContent = settingsEntryText.children[0].value;

        shortcut.append(logo, name);
    }

    function newShortcut() {
        const currentAmount = parseInt(localStorage.getItem("shortcutAmount"));
        const newAmount = currentAmount + 1;

        if (newAmount > 10) return;

        localStorage.setItem("shortcutAmount", newAmount.toString())

        // create placeholder divs
        shortcutsContainer.insertAdjacentHTML('beforeend', `
        <div class="shortcuts">
            <a href="https://github.com/XengShi/materialYouNewTab">
                <img class="shortcutLogo" src="https://s2.googleusercontent.com/s2/favicons?domain_url=https://github.com/XengShi/materialYouNewTab&amp;sz=256">
                <span class="shortcut-name">Placeholder</span>
            </a>
        </div>
        `)
        shortcutList.insertAdjacentHTML('beforeend', `
        <div class="shortcutSettingsEntry">
            <div>
                <input class="bigText" value="Placeholder">
                <input class="URL" value="https://github.com/XengShi/materialYouNewTab">
            </div>
            <div class="delete">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"
                         width="20px">
                        <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-12q-15.3 0-25.65-10.29Q192-716.58 192-731.79t10.35-25.71Q212.7-768 228-768h156v-12q0-15.3 10.35-25.65Q404.7-816 420-816h120q15.3 0 25.65 10.35Q576-795.3 576-780v12h156q15.3 0 25.65 10.29Q768-747.42 768-732.21t-10.35 25.71Q747.3-696 732-696h-12v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM419.79-288q15.21 0 25.71-10.35T456-324v-264q0-15.3-10.29-25.65Q435.42-624 420.21-624t-25.71 10.35Q384-603.3 384-588v264q0 15.3 10.29 25.65Q404.58-288 419.79-288Zm120 0q15.21 0 25.71-10.35T576-324v-264q0-15.3-10.29-25.65Q555.42-624 540.21-624t-25.71 10.35Q504-603.3 504-588v264q0 15.3 10.29 25.65Q524.58-288 539.79-288ZM312-696v480-480Z"/>
                    </svg>
                </button>
            </div>
        </div>
        `)
        const settingsEntry = shortcutList.children[newAmount - 1];
        settingsEntry.children[1].children[0].addEventListener("click", () => {
            deleteShortcut(newAmount - 1);
        })
        const entryInputs = settingsEntry.children[0].children;
        entryInputs[0].addEventListener("blur", () => {
            saveShortcut(newAmount - 1, false);
            applyShortcut(newAmount - 1);
        });
        entryInputs[1].addEventListener("blur", () => {
            saveShortcut(newAmount - 1, true);
            applyShortcut(newAmount - 1);
        });

        saveShortcut(newAmount - 1);
    }

    function deleteShortcut(i) {
        const currentAmount = parseInt(localStorage.getItem("shortcutAmount") || "-1");
        if (currentAmount < 2) return;

        // Remove the shortcut from the DOM
        shortcutList.removeChild(shortcutList.children[i]);
        shortcutsContainer.removeChild(shortcutsContainer.children[i]);

        // Update localStorage by shifting all the shortcuts after the deleted one
        for (let j = i; j < currentAmount - 1; j++) {
            saveShortcut(j);
        }

        // Remove the last shortcut, as it has now moved up
        localStorage.removeItem("shortcutName" + (currentAmount - 1));
        localStorage.removeItem("shortcutURL" + (currentAmount - 1));

        // Update the shortcutAmount in localStorage
        localStorage.setItem("shortcutAmount", (currentAmount - 1).toString());
    }

    // Function to save display status to localStorage
    function saveDisplayStatus(key, displayStatus) {
        localStorage.setItem(key, displayStatus);
    }

    // Function to save activeness status to localStorage
    function saveActiveStatus(key, activeStatus) {
        localStorage.setItem(key, activeStatus)
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

    // Function to load and apply activeness status from localStorage
    function loadActiveStatus(key, element) {
        const savedStatus = localStorage.getItem(key);
        if (savedStatus === "active") {
            element.classList.remove("inactive");
        } else {
            element.classList.add("inactive");
        }
    }

    // Load and apply the saved checkbox states and display statuses
    loadCheckboxState("shortcutsCheckboxState", shortcutsCheckbox);
    loadActiveStatus("shortcutEditField", shortcutEditField);
    loadCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
    loadDisplayStatus("shortcutsDisplayStatus", shortcuts);
    loadDisplayStatus("aiToolsDisplayStatus", aiToolsCont);
    loadCheckboxState("fahrenheitCheckboxState", fahrenheitCheckbox);
    loadShortcuts();

    addButton.addEventListener("click", () => {
        newShortcut();
    })

    // Add change event listeners for the checkboxes
    shortcutsCheckbox.addEventListener("change", function () {
        saveCheckboxState("shortcutsCheckboxState", shortcutsCheckbox);
        if (shortcutsCheckbox.checked) {
            shortcuts.style.display = "flex";
            saveDisplayStatus("shortcutsDisplayStatus", "flex");
            shortcutEditField.classList.remove("inactive");
            saveActiveStatus("shortcutEditField", "active");
        } else {
            shortcuts.style.display = "none";
            saveDisplayStatus("shortcutsDisplayStatus", "none");
            shortcutEditField.classList.add("inactive")
            saveActiveStatus("shortcutEditField", "inactive");
        }
    });

    aiToolsCheckbox.addEventListener("change", function () {
        saveCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
        if (aiToolsCheckbox.checked) {
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

    shortcutEditButton.onclick = () => {
        shortcutEditPage.style.display = "block"
        setTimeout(() => {
            overviewPage.style.transform = "translateX(-120%)"
            overviewPage.style.opacity = "0"
        });
        setTimeout(() => {
            shortcutEditPage.style.transform = "translateX(0)"
            shortcutEditPage.style.opacity = "1"
        }, 50);
        setTimeout(() => {
            overviewPage.style.display = "none";
        }, 650);
    }

    backButton.onclick = () => {
        overviewPage.style.display = "block"
        setTimeout(() => {
            overviewPage.style.transform = "translateX(0)";
            overviewPage.style.opacity = "1";
        }, 50);
        setTimeout(() => {
            shortcutEditPage.style.transform = "translateX(120%)";
            shortcutEditPage.style.opacity = "0";
        });
        setTimeout(() => {
            shortcutEditPage.style.display = "none";
        }, 650);
    }
});
