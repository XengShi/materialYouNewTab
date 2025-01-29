/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

//  🔴🟠🟡🟢🔵🟣⚫️⚪️🟤
let storedTheme = localStorage.getItem("selectedTheme");

//------------------------- LoadingScreen -----------------------//

function ApplyLoadingColor() {
    let LoadingScreenColor = getComputedStyle(document.body).getPropertyValue("background-color");
    localStorage.setItem("LoadingScreenColor", LoadingScreenColor);
}

const enableDarkModeCheckbox = document.getElementById("enableDarkModeCheckbox");
loadCheckboxState("enableDarkModeCheckboxState", enableDarkModeCheckbox);

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
        "dark": "#171615",
        "peach": 0,
    }

    if (colorValue in themeColorMapping) {
        const color = themeColorMapping[colorValue];
        applyCustomTheme(color, ((colorValue==="dark") ? true : enableDarkModeCheckbox.checked));
    } else {
        applyCustomTheme(colorValue, enableDarkModeCheckbox.checked);
        return;
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

    document.documentElement.style.setProperty("--bg-color-blue", `rgb(${themeShades[Math.abs(modif-12)].join(',')})`);
    document.documentElement.style.setProperty("--accentLightTint-blue", `rgb(${themeShades[Math.abs(modif-14)].join(',')})`);
    document.documentElement.style.setProperty("--darkerColor-blue", `rgb(${themeShades[Math.abs(modif-6)].join(',')})`);
    document.documentElement.style.setProperty("--darkColor-blue", `rgb(${themeShades[Math.abs(modif-8)].join(',')})`);
    document.documentElement.style.setProperty("--textColorDark-blue", `rgb(${themeShades[Math.abs(modif-1)].join(',')})`);
    document.documentElement.style.setProperty("--whitishColor-blue", `rgb(${themeShades[Math.abs(modif-15)].join(',')})`);
    if (localStorage.getItem("selectedTheme").slice(0,1)==='#') {
        document.getElementById("rangColor").style.borderColor = color;
        document.getElementById("dfChecked").checked = false;
    }

    ApplyLoadingColor();
};

// -----Theme stay changed even if user reload the page---
if (storedTheme) {
    applySelectedTheme(storedTheme);
    const selectedRadioButton = document.querySelector(`.colorPlate[value="${storedTheme}"]`);
    if (selectedRadioButton) {
        selectedRadioButton.checked = true;
    }
}

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
    localStorage.setItem("selectedTheme", selectedColor); // Save custom color
    applyCustomTheme(selectedColor, enableDarkModeCheckbox.checked);

    // Uncheck all radio buttons
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
};

// Add listeners for color picker
colorPicker.removeEventListener("input", handleColorPickerChange); // Ensure no duplicate listeners
colorPicker.addEventListener("input", handleColorPickerChange);

// End of Function to apply the selected theme
