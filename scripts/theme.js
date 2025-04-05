/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

//  🔴🟠🟡🟢🔵🟣⚫️⚪️🟤
let storedTheme = localStorage.getItem("selectedTheme");
if (!storedTheme) {
    storedTheme = "blue";
    localStorage.setItem("selectedTheme", storedTheme);
}

//------------------------- LoadingScreen -----------------------//

function ApplyLoadingColor() {
    let LoadingScreenColor = getComputedStyle(document.body).getPropertyValue("background-color");
    localStorage.setItem("LoadingScreenColor", LoadingScreenColor);
}

const enableDarkModeCheckbox = document.getElementById("enableDarkModeCheckbox");
loadCheckboxState("enableDarkModeCheckboxState", enableDarkModeCheckbox);

// Function to save theme to Local Storage
const saveThemeColors = () => {
    const getComputedStyl = getComputedStyle(document.documentElement);
    let themeColors = {
        "--bg-color-blue": getComputedStyl.getPropertyValue("--bg-color-blue"),
        "--accentLightTint-blue": getComputedStyl.getPropertyValue("--accentLightTint-blue"),
        "--darkerColor-blue": getComputedStyl.getPropertyValue("--darkerColor-blue"),
        "--darkColor-blue": getComputedStyl.getPropertyValue("--darkColor-blue"),
        "--textColorDark-blue": getComputedStyl.getPropertyValue("--textColorDark-blue"),
        "--whitishColor-blue": getComputedStyl.getPropertyValue("--whitishColor-blue"),
    }
    localStorage.setItem("themeColors", JSON.stringify(themeColors));
}

// Function to apply the selected theme
const radioButtons = document.querySelectorAll(".colorPlate");
const applySelectedTheme = (colorValue) => {
    const themeColorMapping = {
        "blue": "#4382ec",
        "yellow": "#d1a93d",
        "red": "#ec4343",
        "green": "#5cba5c",
        "cyan": "#09b2b4",
        "orange": "#ec844d",
        "purple": "#9563b5",
        "pink": "#ec5e78",
        "brown": "#705347",
        "silver": "#9e9e9e",
        "peach": 0,
        "dark": 0,
    }
    // const themeColorMapping = ["blue", "yellow", "red", "green", "cyan", "orange", "purple", "pink", "brown", "silver", "peach", "dark"]

    document.querySelector('.darkmodeswitch #enableDarkModeCheckbox').disabled = false;

    // if (themeColorMapping.includes(colorValue)&&(!enableDarkModeCheckbox.checked==false)) {
    if ((colorValue in themeColorMapping) && (enableDarkModeCheckbox.checked == false) || colorValue == "dark" || colorValue == "peach") {
        if (colorValue == "dark" || colorValue == "peach") {
            document.querySelector('.darkmodeswitch #enableDarkModeCheckbox').disabled = true;
        }
        if (colorValue != "blue") {
            document.documentElement.style.setProperty("--bg-color-blue", `var(--bg-color-${colorValue})`);
            document.documentElement.style.setProperty("--accentLightTint-blue", `var(--accentLightTint-${colorValue})`);
            document.documentElement.style.setProperty("--darkerColor-blue", `var(--darkerColor-${colorValue})`);
            document.documentElement.style.setProperty("--darkColor-blue", `var(--darkColor-${colorValue})`);
            document.documentElement.style.setProperty("--textColorDark-blue", `var(--textColorDark-${colorValue})`);
            document.documentElement.style.setProperty("--whitishColor-blue", "#ffffff");
            document.getElementById("dfChecked").checked = false;
        } else {
            document.documentElement.style.setProperty("--bg-color-blue", "#BBD6FD");
            document.documentElement.style.setProperty("--accentLightTint-blue", "#E2EEFF");
            document.documentElement.style.setProperty("--darkerColor-blue", "#3569b2");
            document.documentElement.style.setProperty("--darkColor-blue", "#4382EC");
            document.documentElement.style.setProperty("--textColorDark-blue", "#1b3041");
            document.documentElement.style.setProperty("--whitishColor-blue", "#ffffff");
            document.getElementById("dfChecked").checked = true;
        }
        document.getElementById("rangColor").style.borderColor = "transparent";
    } else if (colorValue in themeColorMapping) {
        applyCustomTheme(themeColorMapping[colorValue], true);
        document.getElementById("rangColor").style.borderColor = "transparent";
    } else {
        applyCustomTheme(colorValue, enableDarkModeCheckbox.checked);
        saveThemeColors();
        UpdateCustomThemeModal();
        return;
    }
    saveThemeColors();
    UpdateCustomThemeModal();
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

// ----Color Picker || ColorPicker----
function generateFullyNormalizedShades(color, numShades = 16) {
    color = color || "#4382ec";
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Function to calculate luminance
    const calculateLuminance = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Calculate luminance for black, the given color, and white
    const luminanceBlack = calculateLuminance(0, 0, 0);
    const luminanceColor = calculateLuminance(r, g, b);
    const luminanceWhite = calculateLuminance(255, 255, 255);

    // Full luminance range
    const totalLuminanceRange = luminanceWhite - luminanceBlack;

    // Generate evenly spaced luminance values
    const luminanceSteps = Array.from({ length: numShades }, (_, i) =>
        luminanceBlack + (i / (numShades - 1)) * totalLuminanceRange
    );

    // Convert each luminance value to RGB
    const shades = luminanceSteps.map((targetLuminance) => {
        let factor;
        if (targetLuminance <= luminanceColor) {
            // Interpolate between black and the given color
            factor = targetLuminance / luminanceColor;
            return [
                Math.round(r * factor),
                Math.round(g * factor),
                Math.round(b * factor),
            ];
        } else {
            // Interpolate between the given color and white
            factor = (targetLuminance - luminanceColor) / (luminanceWhite - luminanceColor);
            return [
                Math.round(r + (255 - r) * factor),
                Math.round(g + (255 - g) * factor),
                Math.round(b + (255 - b) * factor),
            ];
        }
    });

    return shades;
}

const applyCustomTheme = (color, isDarkTheme = true) => {
    let modif = isDarkTheme ? 15 : 0;
    let themeShades = generateFullyNormalizedShades(color);

    document.documentElement.style.setProperty("--bg-color-blue", `rgb(${themeShades[Math.abs(modif - 12)].join(',')})`);
    document.documentElement.style.setProperty("--accentLightTint-blue", `rgb(${themeShades[Math.abs(modif - 14)].join(',')})`);
    document.documentElement.style.setProperty("--darkerColor-blue", `rgb(${themeShades[Math.abs(modif - 6)].join(',')})`);
    document.documentElement.style.setProperty("--darkColor-blue", `rgb(${themeShades[Math.abs(modif - 8)].join(',')})`);
    document.documentElement.style.setProperty("--textColorDark-blue", `rgb(${themeShades[Math.abs(modif - 1)].join(',')})`);
    document.documentElement.style.setProperty("--whitishColor-blue", `rgb(${themeShades[Math.abs(modif - 15)].join(',')})`);
    if (localStorage.getItem("selectedTheme").slice(0, 1) === '#') {
        document.getElementById("rangColor").style.borderColor = color;
        document.getElementById("dfChecked").checked = false;
    }

    changeFaviconColor();
    ApplyLoadingColor();
};

// -----Theme stay changed even if user reload the page---
(function () {
    // applySelectedTheme(storedTheme);
    if (localStorage.getItem("themeColors")) {
        const themeColors = JSON.parse(localStorage.getItem("themeColors"));
        document.documentElement.style.setProperty("--bg-color-blue", themeColors["--bg-color-blue"]);
        document.documentElement.style.setProperty("--accentLightTint-blue", themeColors["--accentLightTint-blue"]);
        document.documentElement.style.setProperty("--darkerColor-blue", themeColors["--darkerColor-blue"]);
        document.documentElement.style.setProperty("--darkColor-blue", themeColors["--darkColor-blue"]);
        document.documentElement.style.setProperty("--textColorDark-blue", themeColors["--textColorDark-blue"]);
        document.documentElement.style.setProperty("--whitishColor-blue", themeColors["--whitishColor-blue"]);
        if (storedTheme === 'customTheme') {
            document.querySelector('.darkmodeswitch #enableDarkModeCheckbox').disabled = true;
            document.getElementById("dfChecked").checked = false;
            return;
        }
    }
    const selectedRadioButton = document.querySelector(`.colorPlate[value="${storedTheme}"]`);
    if (selectedRadioButton) {
        if (storedTheme == "dark" || storedTheme == "peach") {
            document.querySelector('.darkmodeswitch #enableDarkModeCheckbox').disabled = true;
        }
        selectedRadioButton.checked = true;
    }
    if (storedTheme.slice(0, 1) === '#') {
        document.getElementById("rangColor").style.borderColor = storedTheme;
        document.getElementById("dfChecked").checked = false;
    }
}())

// Handle radio button changes
const handleThemeChange = function () {
    if (this.checked) {
        const colorValue = this.value;
        storedTheme = colorValue;
        localStorage.setItem("selectedTheme", colorValue);
        applySelectedTheme(colorValue);
    }
};

enableDarkModeCheckbox.addEventListener("change", function () {
    saveCheckboxState("enableDarkModeCheckboxState", enableDarkModeCheckbox);
    applySelectedTheme(storedTheme);
});


// Remove any previously attached listeners and add only one
radioButtons.forEach(radioButton => {
    radioButton.removeEventListener("change", handleThemeChange); // Remove if already attached
    radioButton.addEventListener("change", handleThemeChange);    // Add fresh listener
});

// Handle color picker changes
const handleColorPickerChange = function (event) {
    const selectedColor = event.target.value;
    storedTheme = selectedColor;
    localStorage.setItem("selectedTheme", selectedColor); // Save custom color
    applySelectedTheme(selectedColor);

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


// Button CLick Event
document.getElementById("darkModeSwitch").addEventListener("click", function () {
    enableDarkModeCheckbox.click();
});



//> Custom Theme Modal
const customThemeModal = document.getElementById("customThemeModal");
const closeCustomThemeModal = document.getElementById("closeCustomThemeModal");
const saveCustomTheme = document.getElementById("saveCustomTheme");
const backgroundColorPicker = document.getElementById("backgroundColorPicker");
const accentColorPicker = document.getElementById("accentColorPicker");
const secondaryColorPicker = document.getElementById("secondaryColorPicker");
const primaryColorPicker = document.getElementById("primaryColorPicker");
const textColorPicker = document.getElementById("textColorPicker");
const highlightColorPicker = document.getElementById("highlightColorPicker");
const customThemeButton = document.getElementById("themeButton");

customThemeButton.addEventListener("click", () => {
    closeMenuBar();
    customThemeModal.classList.add("active");
});

customThemeModal.addEventListener("click", (e) => {
    if (e.target === customThemeModal) {
        customThemeModal.classList.remove("active");
    }
});

closeCustomThemeModal.addEventListener("click", () => {
    customThemeModal.classList.remove("active");
});

saveCustomTheme.addEventListener("click", () => {
    storedTheme = "customTheme";
    localStorage.setItem("selectedTheme", storedTheme);
    document.documentElement.style.setProperty("--bg-color-blue", backgroundColorPicker.value || "#BBD6FD");
    document.documentElement.style.setProperty("--accentLightTint-blue", accentColorPicker.value || "#E2EEFF");
    document.documentElement.style.setProperty("--darkerColor-blue", secondaryColorPicker.value || "#3569b2");
    document.documentElement.style.setProperty("--darkColor-blue", primaryColorPicker.value || "#4382EC");
    document.documentElement.style.setProperty("--textColorDark-blue", textColorPicker.value || "#1b3041");
    document.documentElement.style.setProperty("--whitishColor-blue", highlightColorPicker.value || "#ffffff");
    document.querySelector('.darkmodeswitch #enableDarkModeCheckbox').disabled = true;
    document.getElementById("dfChecked").checked = true;
    document.getElementById("dfChecked").checked = false;
    ApplyLoadingColor();
    saveThemeColors();
    customThemeModal.classList.remove("active");
});

function rgbToHex(rgbString) {
    if (rgbString.slice(0, 1) === '#') {
        return rgbString;
    }
    const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
        return "Invalid RGB format";
    }
    const [_, r, g, b] = match.map(Number);
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        return "Invalid RGB values";
    }
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase();
}

function UpdateCustomThemeModal() {
    const getComputedStyl = getComputedStyle(document.documentElement);
    backgroundColorPicker.value = rgbToHex(getComputedStyl.getPropertyValue("--bg-color-blue"));
    accentColorPicker.value = rgbToHex(getComputedStyl.getPropertyValue("--accentLightTint-blue"));
    secondaryColorPicker.value = rgbToHex(getComputedStyl.getPropertyValue("--darkerColor-blue"));
    primaryColorPicker.value = rgbToHex(getComputedStyl.getPropertyValue("--darkColor-blue"));
    textColorPicker.value = rgbToHex(getComputedStyl.getPropertyValue("--textColorDark-blue"));
    highlightColorPicker.value = rgbToHex(getComputedStyl.getPropertyValue("--whitishColor-blue"));
}

UpdateCustomThemeModal();
