/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */


document.addEventListener("DOMContentLoaded", () => {
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
changeFaviconColor();


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

const applyBrowserTheme = async ({ theme }) => {
    const convertToHex = (colorValue) => {

        colorValue = colorValue.trim();

        // If it's already a 6-character hex code, return it in uppercase
        if (/^#[0-9A-Fa-f]{6}$/.test(colorValue)) {
            return colorValue.toUpperCase();
        }

        // Convert RGB and RGBA
        if (/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/.test(colorValue)) {
            const rgbValues = colorValue
                .replace(/rgba?\(|\)/g, "")
                .split(",")
                .map((val) => {
                    const num = parseInt(val.trim(), 10);
                    return num > 255 ? 255 : (num < 0 ? 0 : num);
                });

            return "#" + rgbValues
                .map((val) => {
                    const hex = val.toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                })
                .join("")
                .toUpperCase();
        }

        // Convert HSLA to RGB
        if (
            /^hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*[\d.]+)?\)$/.test(colorValue)
        ) {
            const [h, s, l] = colorValue
                .replace(/hsla?\(|\)/g, "")
                .split(",")
                .map((val) => parseFloat(val.trim()));

            const hToRgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const hue = h / 360;
            const sat = s / 100;
            const light = l / 100;

            let r, g, b;
            if (sat === 0) {
                r = g = b = light;
            } else {
                const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat;
                const p = 2 * light - q;

                r = hToRgb(p, q, hue + 1 / 3);
                g = hToRgb(p, q, hue);
                b = hToRgb(p, q, hue - 1 / 3);
            }

            return "#" + [r, g, b]
                .map((val) => {
                    const hex = Math.round(val * 255).toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                })
                .join("")
                .toUpperCase();
        }
        // converiosn failed
    };

    const newColor = convertToHex(theme.colors.frame);
    if (!newColor) return;
    if (newColor.length > 7) {
        // remove alpha value
        applyCustomTheme(newColor.slice(0, 7));
    } else applyCustomTheme(newColor);
};

// Load theme on page reload
window.addEventListener('load', async function () {
    if (isFirefox && (localStorage.getItem("firefoxAdaptiveToggleState") == 'checked')) {
        browser.theme.onUpdated.addListener(applyBrowserTheme);
        await applyBrowserTheme({ theme: await browser.theme.getCurrent() })
    } else {
        if (storedTheme) {
            applySelectedTheme(storedTheme);
        } else if (storedCustomColor) {
            applyCustomTheme(storedCustomColor);
        };
    }
});

// Handle radio button changes
const handleThemeChange = function () {
    if (this.checked) {
        const colorValue = this.value;
        localStorage.setItem(themeStorageKey, colorValue);
        localStorage.removeItem(customThemeStorageKey); // Clear custom theme
        applySelectedTheme(colorValue);

        firefoxAdaptiveToggle.checked = false;
        localStorage.setItem("firefoxAdaptiveToggleState", "unchecked");
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

    // firefoxAdaptiveToggle
    const firefoxAdaptiveField = document.getElementById("firefoxAdaptiveField");
    const firefoxAdaptiveToggle = document.getElementById("firefoxAdaptiveToggle");

    if (!isFirefox) {
        firefoxAdaptiveField.classList.add("inactive");
        saveActiveStatus("firefoxAdaptiveField", "inactive");
    } else {
        firefoxAdaptiveField.classList.remove("inactive");
        saveActiveStatus("firefoxAdaptiveField", "active");
    }

    // Check if Firefox Theming is enabled or not
    loadCheckboxState("firefoxAdaptiveToggleState", firefoxAdaptiveToggle);

    firefoxAdaptiveToggle.addEventListener("change", async function () {
        saveCheckboxState("firefoxAdaptiveToggleState", firefoxAdaptiveToggle);
        if (firefoxAdaptiveToggle.checked) {
            await applyBrowserTheme({ theme: await browser.theme.getCurrent() });
            browser.theme.onUpdated.addListener(applyBrowserTheme);
        } else {
            if (storedTheme) {
                applySelectedTheme(storedTheme);
            } else if (storedCustomColor) {
                applyCustomTheme(storedCustomColor);
            };
            browser.theme.onUpdated.removeListener(applyBrowserTheme);
            location.reload();
        }
    });

    loadActiveStatus("firefoxAdaptiveField", firefoxAdaptiveField);
    loadCheckboxState("firefoxAdaptiveToggleState", firefoxAdaptiveToggle);
});

//------------------------- LoadingScreen -----------------------//

function ApplyLoadingColor() {
    let LoadingScreenColor = getComputedStyle(document.body).getPropertyValue("background-color");
    localStorage.setItem("LoadingScreenColor", LoadingScreenColor);
}


// ------------------------------------ Tips ------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    // Hide tips that are not relevant to mobile
    if (!isDesktop) {
        document.querySelectorAll('.hideOnMobile').forEach(el => el.style.display = 'none');
    }

    // Determine the correct key for adjustZoomInfo based on OS
    const adjustZoomInfo = document.getElementById("adjustZoomInfo");
    let adjustZoomInfoText = translations[currentLanguage]?.adjustZoomInfo || translations["en"].adjustZoomInfo;
    if (isMac) {
        adjustZoomInfoText = adjustZoomInfoText.replace(/Ctrl/g, "⌘");
    }
    adjustZoomInfo.textContent = adjustZoomInfoText;

    // Change browser theme info based on the user's browser
    const changeBrowserThemeInfo = document.getElementById("changeBrowserThemeInfo");
    if (navigator.userAgent.toLowerCase().includes("firefox")) {
        changeBrowserThemeInfo.innerHTML = translations[currentLanguage]?.firefoxThemeInfo || translations["en"].firefoxThemeInfo;
    } else if (isEdge) {
        changeBrowserThemeInfo.innerHTML = translations[currentLanguage]?.edgeThemeInfo || translations["en"].edgeThemeInfo;
    } else if (isBrave) {
        changeBrowserThemeInfo.innerHTML = translations[currentLanguage]?.braveThemeInfo || translations["en"].braveThemeInfo;
    } else {
        changeBrowserThemeInfo.innerHTML = translations[currentLanguage]?.chromeThemeInfo || translations["en"].chromeThemeInfo;
    }

    const firefoxHomepage = document.getElementById("firefoxHomepage");
    const updateFirefoxHomepageInfo = document.getElementById("updateFirefoxHomepageInfo");
    if (isFirefox) {
        firefoxHomepage.style.display = "block";
        updateFirefoxHomepageInfo.innerHTML = translations[currentLanguage]?.updateFirefoxHomepageInfo || translations["en"].updateFirefoxHomepageInfo;
    }

    // Hide tips 
    const tips = document.getElementById("tips");
    const dontShowButton = document.getElementById("dontShowTips");

    // Check if the user has previously disabled tips
    if (localStorage.getItem("hideTips") === "true") {
        tips.style.display = "none";
    }

    // Hide tips and save preference when button is clicked
    dontShowButton.addEventListener("click", function () {
        tips.style.display = "none";
        localStorage.setItem("hideTips", "true"); // Save preference
    });
});
