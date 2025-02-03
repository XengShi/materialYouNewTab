/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */


// TODO: Seperate stuffs to theme.js, search.js, search-suggestions.js (with proxy)
// TODO: `clock.js` - might be divided in two: `clock-analog.js` and `clock-digital.js`
// TODO: `search.js` - might be divided in two: `search-default.js` and `search-dropdown.js`
// TODO: Move all the CSS in a file called `theme/theme.css` (theme is the folder name) ??
// TODO: Move all the SVG icons in files called `svgs/icon-name.svg` ??


let proxyurl;
document.addEventListener("DOMContentLoaded", () => {
    const userProxyInput = document.getElementById("userproxy");
    const saveProxyButton = document.getElementById("saveproxy");
    const savedProxy = localStorage.getItem("proxy");

    const defaultProxyURL = "https://mynt-proxy.rhythmcorehq.com"; //Default proxy url
    if (savedProxy && savedProxy !== defaultProxyURL) {
        userProxyInput.value = savedProxy;
    }

    userProxyInput.addEventListener("keydown", (event) => handleEnterPress(event, "saveproxy"));

    // Save the proxy to localStorage
    saveProxyButton.addEventListener("click", () => {
        proxyurl = userProxyInput.value.trim();

        // If the input is empty, use the default proxy.
        if (proxyurl === "") {
            proxyurl = defaultProxyURL;
        } else {
            // Validate if input starts with "http://" or "https://"
            if (!(proxyurl.startsWith("http://") || proxyurl.startsWith("https://"))) {
                // Automatically correct input by adding "http:/"" if not present
                proxyurl = "http://" + proxyurl;
            }

            // Remove trailing slash if exists
            if (proxyurl.endsWith("/")) {
                proxyurl = proxyurl.slice(0, -1);  // Remove the last character ("/")
            }
        }
        // Set the proxy in localStorage, clear the input, and reload the page
        localStorage.setItem("proxy", proxyurl);
        userProxyInput.value = "";
        location.reload();
    });

    // Determine which proxy URL to use
    proxyurl = savedProxy || defaultProxyURL;
});

// --------------------------- Search Bar ------------------------------------

// Showing border or outline when you click on the searchbar
const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("click", function (event) {
    event.stopPropagation(); // Stop the click event from propagating to the document
    searchbar.classList.add("active");
});

document.addEventListener("click", function (event) {
    // Check if the clicked element is not the searchbar
    if (!searchbar.contains(event.target)) {
        searchbar.classList.remove("active");
    }
});

// Search function
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".dropdown-content");

    dropdown.addEventListener("click", (event) => {
        if (dropdown.style.display === "block") {
            event.stopPropagation();
            dropdown.style.display = "none";
            searchInput.focus();
        }
    })

    document.addEventListener("click", (event) => {
        if (dropdown.style.display === "block") {
            event.stopPropagation();
            dropdown.style.display = "none";
        }
    })

    document.querySelector(".dropdown-btn").addEventListener("click", function (event) {
        const resultBox = document.getElementById("resultBox");
        if (resultBox.classList.toString().includes("show")) return;

        // Clear selected state and reset index when dropdown opens
        dropdownItems.forEach(item => item.classList.remove("selected"));
        selectedIndex = -1;

        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    const enterBTN = document.getElementById("enterBtn");
    const searchInput = document.getElementById("searchQ");
    const searchEngineRadio = document.getElementsByName("search-engine");
    const searchDropdowns = document.querySelectorAll('[id$="-dropdown"]:not(*[data-default])');
    const defaultEngine = document.querySelector('#default-dropdown-item div[id$="-dropdown"]');

    const sortDropdown = () => {
        // Change the elements to the array
        const elements = Array.from(searchDropdowns);

        // Sort the dropdown
        const sortedDropdowns = elements.sort((a, b) => {
            const engineA = parseInt(a.getAttribute("data-engine"), 10);
            const engineB = parseInt(b.getAttribute("data-engine"), 10);

            return engineA - engineB;
        })

        // get the parent
        const parent = sortedDropdowns[0]?.parentNode;

        // Append the items if parent exists.
        if (parent) {
            sortedDropdowns.forEach(item => parent.appendChild(item));
        }
    }

    // This will add event listener for click in the search bar
    searchDropdowns.forEach(element => {
        element.addEventListener("click", () => {
            const engine = element.getAttribute("data-engine");
            const radioButton = document.querySelector(`input[type="radio"][value="engine${engine}"]`);
            const selector = `*[data-engine-name=${element.getAttribute("data-engine-name")}]`;

            radioButton.checked = true;

            // Swap the dropdown and sort them
            swapDropdown(selector);
            sortDropdown()

            localStorage.setItem("selectedSearchEngine", radioButton.value);
        });
    });

    // Make entire search-engine div clickable
    document.querySelectorAll(".search-engine").forEach((engineDiv) => {
        engineDiv.addEventListener("click", (event) => {
            event.stopPropagation();
            const radioButton = engineDiv.querySelector('input[type="radio"]');

            radioButton.checked = true;

            const radioButtonValue = radioButton.value.charAt(radioButton.value.length - 1);

            const selector = `[data-engine="${radioButtonValue}"]`;

            // Swap the dropdown
            swapDropdown(selector);
            sortDropdown();

            localStorage.setItem("selectedSearchEngine", radioButton.value);

            const searchBar = document.querySelector(".searchbar");
            searchInput.focus();
            searchBar.classList.add("active");
        });
    });

    /**
     * Swap attributes and contents between the default engine and a selected element.
     * @param {HTMLElement} defaultEngine - The current default engine element.
     * @param {HTMLElement} selectedElement - The clicked or selected element.
     */
    function swapDropdown(selectedElement) {
        // Swap innerHTML
        const element = document.querySelector(selectedElement);
        const tempHTML = defaultEngine.innerHTML;
        defaultEngine.innerHTML = element.innerHTML;
        element.innerHTML = tempHTML;

        // Swap attributes
        ["data-engine", "data-engine-name", "id"].forEach(attr => {
            const tempAttr = defaultEngine.getAttribute(attr);
            defaultEngine.setAttribute(attr, element.getAttribute(attr));
            element.setAttribute(attr, tempAttr);
        });
    }

    // Function to perform search
    function performSearch() {
        var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
        var searchTerm = searchInput.value;
        var searchEngines = {
            engine1: "https://www.google.com/search?q=",
            engine2: "https://duckduckgo.com/?q=",
            engine3: "https://bing.com/?q=",
            engine4: "https://search.brave.com/search?q=",
            engine5: "https://www.youtube.com/results?search_query="
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
        // Find Serial Number - SN with the help of charAt.
        const storedSearchEngineSN = storedSearchEngine.charAt(storedSearchEngine.length - 1);
        const defaultDropdownSN = document.querySelector("*[data-default]").getAttribute("data-engine");

        // check if the default selected search engine is same as the stored one.
        if (storedSearchEngineSN !== defaultDropdownSN) {
            // The following line will find out the appropriate dropdown for the selected search engine.
            const selector = `*[data-engine="${storedSearchEngineSN}"]`;

            swapDropdown(selector);
            sortDropdown();
        }

        const selectedRadioButton = document.querySelector(`input[name="search-engine"][value="${storedSearchEngine}"]`);
        if (selectedRadioButton) {
            selectedRadioButton.checked = true;
        }
    }

    const dropdownItems = document.querySelectorAll(".dropdown-item:not(*[data-default])");
    let selectedIndex = -1;

    // Function to update the selected item
    function updateSelection() {
        // let hasSelected = [];
        dropdownItems.forEach((item, index) => {

            item.addEventListener("mouseenter", () => {
                item.classList.add("selected");
            })
            item.addEventListener("mouseleave", () => {
                item.classList.remove("selected");
            })

            if (index === selectedIndex) {
                item.focus()
                item.classList.add("selected");
            } else {
                item.focus()
                item.classList.remove("selected");
            }
        });
    }

    // Event listener for keydown events to navigate up/down
    document.querySelector(".dropdown").addEventListener("keydown", function (event) {
        if (dropdown.style.display === "block") {
            if (event.key === "ArrowDown") {
                event.preventDefault();  // Prevent the page from scrolling
                selectedIndex = (selectedIndex + 1) % dropdownItems.length; // Move down, loop around
            } else if (event.key === "ArrowUp") {
                event.preventDefault();  // Prevent the page from scrolling
                selectedIndex = (selectedIndex - 1 + dropdownItems.length) % dropdownItems.length; // Move up, loop around
            } else if (event.key === "Enter") {
                const selectedItem = document.querySelector(".dropdown-content .selected");
                const engine = selectedItem.getAttribute("data-engine");
                const radioButton = document.querySelector(`input[type="radio"][value="engine${engine}"]`);

                radioButton.checked = true;

                // Swap the dropdown and sort them
                swapDropdown(`*[data-engine="${engine}"]`);
                sortDropdown();

                localStorage.setItem("selectedSearchEngine", radioButton.value);

                // Close the dropdown after selection
                dropdown.style.display = "none";
                searchInput.focus();
            }
            updateSelection();
        }
    });

    // Initial setup for highlighting
    updateSelection();

    // Event listener for search engine radio buttons
    searchEngineRadio.forEach((radio) => {
        radio.addEventListener("change", () => {
            const selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
            localStorage.setItem("selectedSearchEngine", selectedOption);
        });
    });


    // -----Theme stay changed even if user reload the page---
    //  🔴🟠🟡🟢🔵🟣⚫️⚪️🟤
    const storedTheme = localStorage.getItem(themeStorageKey);
    if (storedTheme) {
        applySelectedTheme(storedTheme);
        const selectedRadioButton = document.querySelector(`.colorPlate[value="${storedTheme}"]`);
        if (selectedRadioButton) {
            selectedRadioButton.checked = true;
        }
    }

    // Remove Loading Screen When the DOM and the Theme has Loaded
    document.getElementById("LoadingScreen").style.display = "none";
    // it is necessary for some elements not to blink when the page is reloaded
    setTimeout(() => {
        document.documentElement.classList.add("theme-transition");
    }, 25);
});


// Function to apply the selected theme
const radioButtons = document.querySelectorAll(".colorPlate");
const themeStorageKey = "selectedTheme";
const storedTheme = localStorage.getItem(themeStorageKey);
const customThemeStorageKey = "customThemeColor"; // For color picker
const storedCustomColor = localStorage.getItem(customThemeStorageKey);

const resetDarkTheme = () => {
    // Remove the dark theme class
    document.documentElement.classList.remove("dark-theme");

    // Reset inline styles that were applied specifically for dark mode
    const resetElements = [
        "searchQ",
        "searchIconDark",
        "darkFeelsLikeIcon",
        "menuButton",
        "menuCloseButton",
        "closeBtnX"
    ];

    resetElements.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.removeAttribute("style");
        }
    });

    // Reset fill color for elements with the class "accentColor"
    const accentElements = document.querySelectorAll(".accentColor");
    accentElements.forEach((element) => {
        element.style.fill = ""; // Reset fill color
    });
};

const applySelectedTheme = (colorValue) => {
    // If the selected theme is not dark, reset dark theme styles
    if (colorValue !== "dark") {
        resetDarkTheme();

        // Apply styles for other themes (not dark)
        if (colorValue === "blue") {
            document.documentElement.style.setProperty("--bg-color-blue", "#BBD6FD");
            document.documentElement.style.setProperty("--accentLightTint-blue", "#E2EEFF");
            document.documentElement.style.setProperty("--darkerColor-blue", "#3569b2");
            document.documentElement.style.setProperty("--darkColor-blue", "#4382EC");
            document.documentElement.style.setProperty("--textColorDark-blue", "#1b3041");
            document.documentElement.style.setProperty("--whitishColor-blue", "#ffffff");
        } else {
            document.documentElement.style.setProperty("--bg-color-blue", `var(--bg-color-${colorValue})`);
            document.documentElement.style.setProperty("--accentLightTint-blue", `var(--accentLightTint-${colorValue})`);
            document.documentElement.style.setProperty("--darkerColor-blue", `var(--darkerColor-${colorValue})`);
            document.documentElement.style.setProperty("--darkColor-blue", `var(--darkColor-${colorValue})`);
            document.documentElement.style.setProperty("--textColorDark-blue", `var(--textColorDark-${colorValue})`);
            document.documentElement.style.setProperty("--whitishColor-blue", `var(--whitishColor-${colorValue})`);
        }
    }

    // If the selected theme is dark
    else if (colorValue === "dark") {
        // Apply dark theme styles using CSS variables
        document.documentElement.style.setProperty("--bg-color-blue", `var(--bg-color-${colorValue})`);
        document.documentElement.style.setProperty("--accentLightTint-blue", `var(--accentLightTint-${colorValue})`);
        document.documentElement.style.setProperty("--darkerColor-blue", `var(--darkerColor-${colorValue})`);
        document.documentElement.style.setProperty("--darkColor-blue", `var(--darkColor-${colorValue})`);
        document.documentElement.style.setProperty("--textColorDark-blue", `var(--textColorDark-${colorValue})`);

        // Apply dark theme class
        document.documentElement.classList.add("dark-theme");

        // Change fill color for elements with the class "accentColor"
        const accentElements = document.querySelectorAll(".accentColor");
        accentElements.forEach((element) => {
            element.style.fill = "#212121";
        });
    }

    // Change the extension icon based on the selected theme
    const iconPaths = ["blue", "yellow", "red", "green", "cyan", "orange", "purple", "pink", "brown", "silver", "peach", "dark"]
        .reduce((acc, color) => {
            acc[color] = `./favicon/${color}.png`;
            return acc;
        }, {});

    // Function to update the extension icon based on browser
    const updateExtensionIcon = (colorValue) => {
        if (isFirefox) {
            browser.browserAction.setIcon({ path: iconPaths[colorValue] });
        } else if (isChromiumBased) {
            chrome.action.setIcon({ path: iconPaths[colorValue] });
        } else if (isSafari) {
            safari.extension.setToolbarIcon({ path: iconPaths[colorValue] });
        }
    };
    updateExtensionIcon(colorValue);

    // Change the favicon dynamically
    const faviconLink = document.querySelector("link[rel='icon']");
    if (faviconLink && iconPaths[colorValue]) {
        faviconLink.href = iconPaths[colorValue];
    }
    ApplyLoadingColor();
};

// ----Color Picker || ColorPicker----
function adjustHexColor(hex, factor, isLighten = true) {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        hex = hex.split("").map(c => c + c).join("");
    }
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    if (isLighten) {
        r = Math.floor(r + (255 - r) * factor);
        g = Math.floor(g + (255 - g) * factor);
        b = Math.floor(b + (255 - b) * factor);
    } else {
        r = Math.floor(r * (1 - factor));
        g = Math.floor(g * (1 - factor));
        b = Math.floor(b * (1 - factor));
    }
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

function isNearWhite(hex, threshold = 240) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return r > threshold && g > threshold && b > threshold;
}

const applyCustomTheme = (color) => {
    let adjustedColor = isNearWhite(color) ? "#696969" : color;

    const lighterColorHex = adjustHexColor(adjustedColor, 0.7);
    const lightTin = adjustHexColor(adjustedColor, 0.9);
    const darkerColorHex = adjustHexColor(adjustedColor, 0.3, false);
    const darkTextColor = adjustHexColor(adjustedColor, 0.8, false);

    document.documentElement.style.setProperty("--bg-color-blue", lighterColorHex);
    document.documentElement.style.setProperty("--accentLightTint-blue", lightTin);
    document.documentElement.style.setProperty("--darkerColor-blue", darkerColorHex);
    document.documentElement.style.setProperty("--darkColor-blue", adjustedColor);
    document.documentElement.style.setProperty("--textColorDark-blue", darkTextColor);
    document.documentElement.style.setProperty("--whitishColor-blue", "#ffffff");
    document.getElementById("rangColor").style.borderColor = color;
    document.getElementById("dfChecked").checked = false;

    ApplyLoadingColor();
};

// Load theme on page reload
window.addEventListener("load", function () {
    if (storedTheme) {
        applySelectedTheme(storedTheme);
    } else if (storedCustomColor) {
        applyCustomTheme(storedCustomColor);
    }
});

// Handle radio button changes
const handleThemeChange = function () {
    if (this.checked) {
        const colorValue = this.value;
        localStorage.setItem(themeStorageKey, colorValue);
        localStorage.removeItem(customThemeStorageKey); // Clear custom theme
        applySelectedTheme(colorValue);
    }
};

// Remove any previously attached listeners and add only one
radioButtons.forEach(radioButton => {
    radioButton.removeEventListener("change", handleThemeChange); // Remove if already attached
    radioButton.addEventListener("change", handleThemeChange);    // Add fresh listener
});

// Handle color picker changes
const handleColorPickerChange = function (event) {
    const selectedColor = event.target.value;
    resetDarkTheme(); // Clear dark theme if active
    localStorage.setItem(customThemeStorageKey, selectedColor); // Save custom color
    localStorage.removeItem(themeStorageKey); // Clear predefined theme
    applyCustomTheme(selectedColor);

    // Uncheck all radio buttons
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
};

// Add listeners for color picker
colorPicker.removeEventListener("input", handleColorPickerChange); // Ensure no duplicate listeners
colorPicker.addEventListener("input", handleColorPickerChange);

// End of Function to apply the selected theme


// ------------Search Suggestions---------------

// Show the result box
function showResultBox() {
    resultBox.classList.add("show");
    resultBox.style.display = "block";
}

// Hide the result box
function hideResultBox() {
    resultBox.classList.remove("show");
    //resultBox.style.display = "none";
}

showResultBox();
hideResultBox();

document.getElementById("searchQ").addEventListener("input", async function () {
    const searchsuggestionscheckbox = document.getElementById("searchsuggestionscheckbox");
    if (searchsuggestionscheckbox.checked) {
        var selectedOption = document.querySelector("input[name='search-engine']:checked").value;
        var searchEngines = {
            engine1: "https://www.google.com/search?q=",
            engine2: "https://duckduckgo.com/?q=",
            engine3: "https://bing.com/?q=",
            engine4: "https://search.brave.com/search?q=",
            engine5: "https://www.youtube.com/results?search_query="
        };
        const query = this.value;
        const resultBox = document.getElementById("resultBox");

        if (query.length > 0) {
            try {
                // Fetch autocomplete suggestions
                const suggestions = await getAutocompleteSuggestions(query);

                if (suggestions === "") {
                    hideResultBox();
                } else {
                    // Clear the result box
                    resultBox.innerHTML = "";

                    // Add suggestions to the result box
                    suggestions.forEach((suggestion, index) => {
                        const resultItem = document.createElement("div");
                        resultItem.classList.add("resultItem");
                        resultItem.textContent = suggestion;
                        resultItem.setAttribute("data-index", index);
                        resultItem.onclick = () => {
                            var resultlink = searchEngines[selectedOption] + encodeURIComponent(suggestion);
                            window.location.href = resultlink;
                        };
                        resultBox.appendChild(resultItem);
                    });

                    // Check if the dropdown of search shortcut is open
                    const dropdown = document.querySelector(".dropdown-content");

                    if (dropdown.style.display === "block") {
                        dropdown.style.display = "none";
                    }


                    showResultBox();
                }
            } catch (error) {
                // Handle the error (if needed)
            }
        } else {
            hideResultBox();
        }
    }
});

let isMouseOverResultBox = false;
// Track mouse entry and exit within the resultBox
resultBox.addEventListener("mouseenter", () => {
    isMouseOverResultBox = true;
    // Remove keyboard highlight
    const activeItem = resultBox.querySelector(".active");
    if (activeItem) {
        activeItem.classList.remove("active");
    }
});

resultBox.addEventListener("mouseleave", () => {
    isMouseOverResultBox = false;
});

document.getElementById("searchQ").addEventListener("keydown", function (e) {
    if (isMouseOverResultBox) {
        return; // Ignore keyboard events if the mouse is in the resultBox
    }
    const activeItem = resultBox.querySelector(".active");
    let currentIndex = activeItem ? parseInt(activeItem.getAttribute("data-index")) : -1;

    if (resultBox.children.length > 0) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (activeItem) {
                activeItem.classList.remove("active");
            }
            currentIndex = (currentIndex + 1) % resultBox.children.length;
            resultBox.children[currentIndex].classList.add("active");

            // Ensure the active item is visible within the result box
            const activeElement = resultBox.children[currentIndex];
            activeElement.scrollIntoView({ block: "nearest" });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (activeItem) {
                activeItem.classList.remove("active");
            }
            currentIndex = (currentIndex - 1 + resultBox.children.length) % resultBox.children.length;
            resultBox.children[currentIndex].classList.add("active");

            // Ensure the active item is visible within the result box
            const activeElement = resultBox.children[currentIndex];
            activeElement.scrollIntoView({ block: "nearest" });
        } else if (e.key === "Enter" && activeItem) {
            e.preventDefault();
            activeItem.click();
        }
    }
});

// Check for different browsers and return the corresponding client parameter
function getClientParam() {
    if (isFirefox) return "firefox";
    if (isChromiumBased && !isOpera) return "chrome";
    if (isOpera) return "opera";
    if (isSafari) return "safari";
    return "firefox"; // Default to Firefox if the browser is not recognized
}

async function getAutocompleteSuggestions(query) {
    const clientParam = getClientParam(); // Get the browser client parameter dynamically
    var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
    var searchEnginesapi = {
        engine1: `https://www.google.com/complete/search?client=${clientParam}&q=${encodeURIComponent(query)}`,
        engine2: `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`,
        engine3: `https://www.google.com/complete/search?client=${clientParam}&q=${encodeURIComponent(query)}`,
        engine4: `https://search.brave.com/api/suggest?q=${encodeURIComponent(query)}&rich=true&source=web`,
        engine5: `https://www.google.com/complete/search?client=${clientParam}&ds=yt&q=${encodeURIComponent(query)}`
    };
    const useproxyCheckbox = document.getElementById("useproxyCheckbox");
    let apiUrl = searchEnginesapi[selectedOption];
    if (useproxyCheckbox.checked) {
        apiUrl = `${proxyurl}/proxy?url=${encodeURIComponent(apiUrl)}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (selectedOption === "engine4") {
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
        console.error("Error fetching autocomplete suggestions:", error);
        return [];
    }
}

// Hide results when clicking outside
document.addEventListener("click", function (event) {
    const searchbar = document.getElementById("searchbar");
    // const resultBox = document.getElementById("resultBox");

    if (!searchbar.contains(event.target)) {
        hideResultBox();
    }
});
// ------------End of Search Suggestions---------------


document.addEventListener("DOMContentLoaded", function () {

    // Darkmode
    const enableDarkModeCheckbox = document.getElementById("enableDarkModeCheckbox");
    enableDarkModeCheckbox.addEventListener("change", function () {
        saveCheckboxState("enableDarkModeCheckboxState", enableDarkModeCheckbox);
    });
    loadCheckboxState("enableDarkModeCheckboxState", enableDarkModeCheckbox);

    /* ------ Event Listeners for Searchbar dropdown ------ */
    const searchIconContainer = document.querySelectorAll(".searchIcon");

    const showEngineContainer = () => {
        searchIconContainer[1].style.display = "none";
        searchIconContainer[0].style.display = "block";
        document.getElementById("search-with-container").style.visibility = "visible";
    }

    const hideEngineContainer = () => {
        searchIconContainer[0].style.display = "none";
        searchIconContainer[1].style.display = "block";
        document.getElementById("search-with-container").style.visibility = "hidden";
    }

    const initShortCutSwitch = (element) => {
        if (element.checked) {
            hideEngineContainer();
            localStorage.setItem("showShortcutSwitch", true)
        } else {
            showEngineContainer();
            localStorage.setItem("showShortcutSwitch", false)
        }
    }

    // Hiding Search Icon And Search With Options for Search switch shortcut
    const element = document.getElementById("shortcut_switchcheckbox");
    element.addEventListener("change", (e) => {
        initShortCutSwitch(e.target);
    })

    // Intialize shortcut switch
    if (localStorage.getItem("showShortcutSwitch")) {
        const isShortCutSwitchEnabled = localStorage.getItem("showShortcutSwitch").toString() === "true";
        document.getElementById("shortcut_switchcheckbox").checked = isShortCutSwitchEnabled;

        if (isShortCutSwitchEnabled) {
            hideEngineContainer();
        } else if (!isShortCutSwitchEnabled) {
            showEngineContainer()
        }
    } else {
        localStorage.setItem("showShortcutSwitch", false);
    }

    initShortCutSwitch(element);


    // Search Suggestions
    const searchsuggestionscheckbox = document.getElementById("searchsuggestionscheckbox");
    const proxybypassField = document.getElementById("proxybypassField");
    const proxyinputField = document.getElementById("proxyField");
    const useproxyCheckbox = document.getElementById("useproxyCheckbox");

    // This function shows the proxy disclaimer.
    function showProxyDisclaimer() {
        const message = translations[currentLanguage]?.ProxyDisclaimer || translations["en"].ProxyDisclaimer;
        return confirm(message);
    }

    // Add change event listeners for the checkboxes
    searchsuggestionscheckbox.addEventListener("change", function () {
        saveCheckboxState("searchsuggestionscheckboxState", searchsuggestionscheckbox);
        if (searchsuggestionscheckbox.checked) {
            proxybypassField.classList.remove("inactive");
            saveActiveStatus("proxybypassField", "active");
        } else {
            proxybypassField.classList.add("inactive");
            saveActiveStatus("proxybypassField", "inactive");
            useproxyCheckbox.checked = false;
            saveCheckboxState("useproxyCheckboxState", useproxyCheckbox);
            proxyinputField.classList.add("inactive");
            saveActiveStatus("proxyinputField", "inactive");
        }
    });

    useproxyCheckbox.addEventListener("change", function () {
        if (useproxyCheckbox.checked) {
            // Show the disclaimer and check the user's choice
            const userConfirmed = showProxyDisclaimer();
            if (userConfirmed) {
                // Only enable the proxy if the user confirmed
                saveCheckboxState("useproxyCheckboxState", useproxyCheckbox);
                proxyinputField.classList.remove("inactive");
                saveActiveStatus("proxyinputField", "active");
            } else {
                // Revert the checkbox state if the user did not confirm
                useproxyCheckbox.checked = false;
            }
        } else {
            // If the checkbox is unchecked, disable the proxy
            saveCheckboxState("useproxyCheckboxState", useproxyCheckbox);
            proxyinputField.classList.add("inactive");
            saveActiveStatus("proxyinputField", "inactive");
        }
    });

    // Load and apply the saved checkbox states and display statuses
    loadCheckboxState("searchsuggestionscheckboxState", searchsuggestionscheckbox);
    loadCheckboxState("useproxyCheckboxState", useproxyCheckbox);
    loadActiveStatus("proxyinputField", proxyinputField);
    loadActiveStatus("proxybypassField", proxybypassField);
});

document.addEventListener("keydown", function (event) {
    const searchInput = document.getElementById("searchQ");
    const searchBar = document.querySelector(".searchbar");
    if (event.key === "/" && event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA" && event.target.isContentEditable !== true) {
        event.preventDefault();
        searchInput.focus();
        searchBar.classList.add("active");
    }
});

//------------------------- LoadingScreen -----------------------//

function ApplyLoadingColor() {
    let LoadingScreenColor = getComputedStyle(document.body).getPropertyValue("background-color");
    localStorage.setItem("LoadingScreenColor", LoadingScreenColor);
}
