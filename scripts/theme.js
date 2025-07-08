/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 */

const themeStorageKey = "selectedTheme";
const customThemeStorageKey = "customThemeColor";
const storedTheme = localStorage.getItem(themeStorageKey);
const storedCustomColor = localStorage.getItem(customThemeStorageKey);
const radioButtons = document.querySelectorAll(".colorPlate");
const colorPicker = document.getElementById("colorPicker");
const colorPickerLabel = document.getElementById("rangColor");

document.addEventListener("DOMContentLoaded", () => {
    // Forced Dark Mode
    const enableDarkModeCheckbox = document.getElementById("enableDarkModeCheckbox");
    enableDarkModeCheckbox.addEventListener("change", function () {
        saveCheckboxState("enableDarkModeCheckboxState", enableDarkModeCheckbox);
    });
    loadCheckboxState("enableDarkModeCheckboxState", enableDarkModeCheckbox);

    // Check for custom color
    const storedCustomColor = localStorage.getItem(customThemeStorageKey);
    if (storedCustomColor) {
        applyCustomTheme(storedCustomColor);
        // Uncheck all radio buttons
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
    }
    // Check for regular theme
    else {
        const storedTheme = localStorage.getItem(themeStorageKey);
        if (storedTheme) {
            applySelectedTheme(storedTheme);
            const selectedRadioButton = document.querySelector(`.colorPlate[value="${storedTheme}"]`);
            if (selectedRadioButton) {
                selectedRadioButton.checked = true;
            }
        }
    }

    // Remove Loading Screen when the DOM and the theme has loaded
    document.getElementById("LoadingScreen").style.display = "none";

    // Stop blinking of some elements when the page is reloaded
    setTimeout(() => {
        document.documentElement.classList.add("theme-transition");
    }, 25);
});

// Function to load background color 
function ApplyLoadingColor() {
    let LoadingScreenColor = getComputedStyle(document.body).getPropertyValue("background-color");
    localStorage.setItem("LoadingScreenColor", LoadingScreenColor);
}

const resetDarkTheme = () => {
    // Remove the dark theme class
    document.documentElement.classList.remove("dark-theme");

    // Reset inline styles that were applied specifically for dark mode
    const resetElements = ["searchQ", "searchIconDark", "darkFeelsLikeIcon", "menuButton", "menuCloseButton", "closeBtnX"];

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

// Function to apply the selected theme
const applySelectedTheme = (colorValue) => {
    const isDarkMode = colorValue === "dark";

    // Reset dark theme if not in dark mode
    if (!isDarkMode) resetDarkTheme();

    // Set CSS variables based on the selected color theme
    if (colorValue === "blue") {
        document.documentElement.style.setProperty("--bg-color-blue", "#BBD6FD");
        document.documentElement.style.setProperty("--accentLightTint-blue", "#E2EEFF");
        document.documentElement.style.setProperty("--darkerColor-blue", "#3569B2");
        document.documentElement.style.setProperty("--darkColor-blue", "#4382EC");
        document.documentElement.style.setProperty("--textColorDark-blue", "#1B3041");
        document.documentElement.style.setProperty("--whitishColor-blue", "#ffffff");
    } else {
        const prefix = isDarkMode ? "dark" : colorValue;
        document.documentElement.style.setProperty("--bg-color-blue", `var(--bg-color-${prefix})`);
        document.documentElement.style.setProperty("--accentLightTint-blue", `var(--accentLightTint-${prefix})`);
        document.documentElement.style.setProperty("--darkerColor-blue", `var(--darkerColor-${prefix})`);
        document.documentElement.style.setProperty("--darkColor-blue", `var(--darkColor-${prefix})`);
        document.documentElement.style.setProperty("--textColorDark-blue", `var(--textColorDark-${prefix})`);

        if (!isDarkMode) {
            document.documentElement.style.setProperty("--whitishColor-blue", `var(--whitishColor-${colorValue})`);
        }
    }

    // Handle dark mode specific changes
    if (isDarkMode) {
        document.documentElement.classList.add("dark-theme");
        document.querySelectorAll(".accentColor").forEach(el => {
            el.style.fill = "#212121";
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
changeFaviconColor();

// --------------------- Color Picker ---------------------
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
    colorPickerLabel.style.borderColor = color;
    document.getElementById("dfChecked").checked = false;

    changeFaviconColor();
    ApplyLoadingColor();
};

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
