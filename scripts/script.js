/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */


// TODO: Seperate stuffs to theme.js, search.js
// TODO: `clock.js` - might be divided in two: `clock-analog.js` and `clock-digital.js`
// TODO: `search.js` - might be divided in two: `search-default.js` and `search-dropdown.js`
// TODO: Move all the CSS in a file called `theme/theme.css` (theme is the folder name) ??
// TODO: Move all the SVG icons in files called `svgs/icon-name.svg` ??


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

    document.querySelector(".dropdown-btn").addEventListener("click", function () {
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
    if (colorValue !== "dark") {
        resetDarkTheme();

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

    changeFaviconColor();
    ApplyLoadingColor();
};

function changeFaviconColor() {
    // Fetch colors from CSS variables
    const rootStyles = getComputedStyle(document.documentElement);
    const darkColor = rootStyles.getPropertyValue("--darkColor-blue");
    //const bgColor = rootStyles.getPropertyValue("--bg-color-blue");

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="${darkColor}" style="transform: scale(1.2); transform-origin: center;"
            d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1" />
    </svg>
    `;
    const encodedSvg = 'data:image/svg+xml,' + encodeURIComponent(svg);
    const favicon = document.getElementById("favicon");
    favicon.href = encodedSvg;
    favicon.setAttribute('type', 'image/svg+xml');
}

// Set default color on first page load
if (!localStorage.getItem('newFavicon')) {
    changeFaviconColor();
    localStorage.setItem('newFavicon', 'true');
}


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

    changeFaviconColor();
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

// Throttle for performance optimization
const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return (...args) => {
        if (!lastRan) {
            func(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

// Add listeners for color picker
colorPicker.removeEventListener("input", handleColorPickerChange); // Ensure no duplicate listeners
colorPicker.addEventListener("input", throttle(handleColorPickerChange, 10));

// End of Function to apply the selected theme



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
