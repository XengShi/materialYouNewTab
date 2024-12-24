/*
 * Material You NewTab
 * Copyright (c) 2023-2024 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// -----Theme stay changed even if user reload the page---
//  🔴🟠🟡🟢🔵🟣⚫️⚪️🟤

// Function to apply the selected theme
const radioButtons = document.querySelectorAll('.colorPlate');
const themeStorageKey = 'selectedTheme';
const storedTheme = localStorage.getItem(themeStorageKey);
// const radioButtons = document.querySelectorAll('.colorPlate');
// const themeStorageKey = 'selectedTheme'; // For predefined themes
const customThemeStorageKey = 'customThemeColor'; // For color picker
// const storedTheme = localStorage.getItem(themeStorageKey);
const storedCustomColor = localStorage.getItem(customThemeStorageKey);

let darkThemeStyleTag; // Variable to store the dynamically added style tag

const resetDarkTheme = () => {
    // Remove the dark theme class
    document.documentElement.classList.remove('dark-theme');

    // Remove the injected dark theme style tag
    if (darkThemeStyleTag) {
        darkThemeStyleTag.remove();
        darkThemeStyleTag = null;
    }

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
            element.removeAttribute('style');
        }
    });

    // Reset fill color for elements with the class "accentColor"
    const accentElements = document.querySelectorAll('.accentColor');
    accentElements.forEach((element) => {
        element.style.fill = ''; // Reset fill color
    });
    // Reset the CSS variables to default (for non-dark themes)
    document.documentElement.style.setProperty('--bg-color-blue', '#ffffff');
    document.documentElement.style.setProperty('--accentLightTint-blue', '#E2EEFF');
    document.documentElement.style.setProperty('--darkerColor-blue', '#3569b2');
    document.documentElement.style.setProperty('--darkColor-blue', '#4382EC');
    document.documentElement.style.setProperty('--textColorDark-blue', '#1b3041');
    document.documentElement.style.setProperty('--whitishColor-blue', '#ffffff');
};


const applySelectedTheme = (colorValue) => {
    // If the selected theme is not dark, reset dark theme styles
    if (colorValue !== "dark") {
        resetDarkTheme();

        // Apply styles for other themes (not dark)
        if (colorValue === "blue") {
            document.documentElement.style.setProperty('--bg-color-blue', '#BBD6FD');
            document.documentElement.style.setProperty('--accentLightTint-blue', '#E2EEFF');
            document.documentElement.style.setProperty('--darkerColor-blue', '#3569b2');
            document.documentElement.style.setProperty('--darkColor-blue', '#4382EC');
            document.documentElement.style.setProperty('--textColorDark-blue', '#1b3041');
            document.documentElement.style.setProperty('--whitishColor-blue', '#ffffff');
        } else {
            document.documentElement.style.setProperty('--bg-color-blue', `var(--bg-color-${colorValue})`);
            document.documentElement.style.setProperty('--accentLightTint-blue', `var(--accentLightTint-${colorValue})`);
            document.documentElement.style.setProperty('--darkerColor-blue', `var(--darkerColor-${colorValue})`);
            document.documentElement.style.setProperty('--darkColor-blue', `var(--darkColor-${colorValue})`);
            document.documentElement.style.setProperty('--textColorDark-blue', `var(--textColorDark-${colorValue})`);
            document.documentElement.style.setProperty('--whitishColor-blue', `var(--whitishColor-${colorValue})`);
        }
    }

    // If the selected theme is dark
    else if (colorValue === "dark") {
        // Apply dark theme styles using CSS variables
        document.documentElement.style.setProperty('--bg-color-blue', `var(--bg-color-${colorValue})`);
        document.documentElement.style.setProperty('--accentLightTint-blue', `var(--accentLightTint-${colorValue})`);
        document.documentElement.style.setProperty('--darkerColor-blue', `var(--darkerColor-${colorValue})`);
        document.documentElement.style.setProperty('--darkColor-blue', `var(--darkColor-${colorValue})`);
        document.documentElement.style.setProperty('--textColorDark-blue', `var(--textColorDark-${colorValue})`);

        // Add dark theme styles for specific elements
        darkThemeStyleTag = document.createElement('style');
        darkThemeStyleTag.textContent = `
            .dark-theme .search-engine input[type="radio"]:checked {
                background-color: #2a2a2a;
                border: 2px solid #919191;
            }

            .dark-theme .search-engine input[type="radio"] {
                background-color: #9d9d9d   ;
                border: 0px solid #000000;
            }

            .dark-theme .colorsContainer {
                background-color: #212121;
            }

            .dark-theme #themeButton {
                background-color: #212121;
            }

            .dark-theme #themeIconSvg, .dark-theme #languageSelectorIconSvg {
                fill: #cdcdcd !important;
            }

            .dark-theme .languageIcon,
            .dark-theme .languageSelector {
                background-color: #212121;
                scrollbar-color: var(--darkerColor-blue) transparent;
            }

            .dark-theme .languageSelector::-webkit-scrollbar-thumb,
            .dark-theme .languageSelector::-webkit-scrollbar-thumb:hover {
                background-color: var(--darkerColor-blue);
            }

            .dark-theme .bottom a {
                color: #a1a1a1;
            }

            .dark-theme .ttcont input {
                background-color: #212121 !important;
            }

            .dark-theme input:checked + .toggle {
                background-color: #aaaaaa;
            }

            .dark-theme .tilesCont .tiles {
                color: #e8e8e8;
            }

            .dark-theme .resetbtn:hover {
                background-color: var(--bg-color-dark);
            }

            .dark-theme .resetbtn:active {
                background-color: #4e4e4e;
            }

            .dark-theme .savebtn:hover {
                background-color: var(--bg-color-dark);
            }

            .dark-theme .tiles:hover {
                background-color: var(--bg-color-dark);
            }

            .dark-theme .bottom a:hover {
                color: var(--darkerColor-blue);
            }

            .dark-theme #searchQ {
                color: #fff;
            }

            .dark-theme .searchbar.active {
                outline: 2px solid #696969;
            }

            .dark-theme #searchIconDark {
                fill: #bbb !important;
            }
	    
            .dark-theme .dropdown-item.selected:not(*[data-default]):before {
                background-color: #707070;
            }

            .dark-theme .tilesContainer .tiles {
                background-color: #212121;
            }

            .dark-theme #darkFeelsLikeIcon {
                fill: #fff !important;
            }

            .dark-theme .humidityBar .thinLine {
                background-color: #aaaaaa;
            }

            .dark-theme .search-engine .darkIconForDarkTheme, .dark-theme .aiDarkIcons {
                fill: #bbbbbb !important;
            }

            .dark-theme .divider {
                background-color: #cdcdcd;
            }
    
            .dark-theme .shorcutDarkColor {
                fill: #3c3c3c !important;
            }

            .dark-theme #darkLightTint {
                fill: #bfbfbf;
            }

            .dark-theme .strokecolor {
	            stroke: #3c3c3c;
            }

            .dark-theme .shortcutsContainer .shortcuts .shortcutLogoContainer {
                background: radial-gradient(circle, #bfbfbf 44%, #000 64%);
            }

            .dark-theme .digiclock {
                fill: #909090;
            }

     	    .dark-theme .uploadButton,
            .dark-theme .randomButton {
                background-color: var(--darkColor-blue);
                color: var(--whitishColor-dark);
            }
	    
            .clearButton{
                color: #d6d6d6;
            }

            .dark-theme .clearButton:hover {
                background-color: var(--whitishColor-dark);
            }

            .dark-theme .clearButton:active {
                color: #0e0e0e;
            }

            .dark-theme .backupRestoreBtn {
                background-color: var(--darkColor-dark);
            }

            .dark-theme .backupRestoreBtn:hover,
            .dark-theme .uploadButton:hover,
            .dark-theme .randomButton:hover,
            .dark-theme #todoAdd:hover {
                background-color: var(--bg-color-dark);
            }
            
            .dark-theme .uploadButton:active,
            .dark-theme .randomButton:active,
            .dark-theme .backupRestoreBtn:active,
            .dark-theme .resetbtn:active {
                background-color: #0e0e0e;
            }
	    
            .dark-theme .todolistitem .todoremovebtn {
                color:#616161;
            }

            .dark-theme .todolistitem .todoremovebtn:hover {
                color:#888888;
            }

            .dark-theme .bookmark-view-as-container .bookmark-view-as-button {
                color: var(--textColorDark-blue) !important;
            }

            .dark-theme #bookmarkSearch{
                background-color: #212121 !important;
            }

            .dark-theme .bookmark-search-container::after {
                filter: none;
            }

            .dark-theme .bookmark-right-arrow {
                color: #858585;
            }

            .dark-theme .bookmark-right-arrow.rotate {
                color: var(--textColorDark-blue);
            }

     	    .dark-theme .micIcon {
                background-color: var(--whitishColor-dark);
            }

            .dark-theme #minute, .dark-theme #minute::after, .dark-theme #second::after {
                background-color: #909090;
            }

            .dark-theme .dot-icon {
                fill: #bfbfbf;
            }

            .dark-theme .menuicon {
                color: #c2c2c2;
            }

            .dark-theme #menuButton {
                border: 6px solid var(--accentLightTint-blue);
                box-shadow:
                    /*inset 0 0 0 4px var(--accentLightTint-blue),*/
                    inset 0 0 0 4px #858585,
                    inset 0 0 0 9.7px var(--accentLightTint-blue),
                    inset 0 0 0 40px #bfbfbf;
            }

            .dark-theme #menuCloseButton, .dark-theme #menuCloseButton:hover {
                background-color: var(--darkColor-dark);
            }

            .dark-theme #menuCloseButton .icon {
                background-color: #cdcdcd;
            }

            .dark-theme #closeBtnX {
                border: 2px solid #bdbdbd;
                border-radius: 100px;
            }

            .dark-theme body {
                background-color: #000000;
            }
            
            .dark-theme #HangNoAlive {
                fill: #c2c2c2 !important;
            }

            .dark-theme .tempUnit {
                color: #dadada;
            }

            .dark-theme #githab,
            .dark-theme #sujhaw {
                fill: #b1b1b1;
            }

            .dark-theme .resultItem.active {
                background-color: var(--darkColor-dark);;
            }
        `;
        document.head.appendChild(darkThemeStyleTag);

        // Apply dark theme class
        document.documentElement.classList.add('dark-theme');

        // Change fill color for elements with the class "accentColor"
        const accentElements = document.querySelectorAll('.accentColor');
        accentElements.forEach((element) => {
            element.style.fill = '#212121';
        });
    }


    // Change the extension icon based on the selected theme
    const iconPaths = ["blue", "yellow", "red", "green", "cyan", "orange", "purple", "pink", "brown", "silver", "grey", "dark"]
        .reduce((acc, color) => {
            acc[color] = `./favicon/${color}.png`;
            return acc;
        }, {});

    // Function to update the extension icon based on browser
    const updateExtensionIcon = (colorValue) => {
        if (typeof browser !== "undefined" && browser.browserAction) {
            // Firefox
            browser.browserAction.setIcon({path: iconPaths[colorValue]});
        } else if (typeof chrome !== "undefined" && chrome.action) {
            // Chromium-based: Chrome, Edge, Brave
            chrome.action.setIcon({path: iconPaths[colorValue]});
        } else if (typeof safari !== "undefined") {
            // Safari
            safari.extension.setToolbarIcon({path: iconPaths[colorValue]});
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
function darkenHexColor(hex, factor = 0.6) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.floor(r * (1 - factor));
    g = Math.floor(g * (1 - factor));
    b = Math.floor(b * (1 - factor));
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

function lightenHexColor(hex, factor = 0.85) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.floor(r + (255 - r) * factor);
    g = Math.floor(g + (255 - g) * factor);
    b = Math.floor(b + (255 - b) * factor);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}

function lightestColor(hex, factor = 0.95) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.floor(r + (255 - r) * factor);
    g = Math.floor(g + (255 - g) * factor);
    b = Math.floor(b + (255 - b) * factor);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}

function isNearWhite(hex, threshold = 240) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return r > threshold && g > threshold && b > threshold;
}

// ---- Color Picker || ColorPicker----

const applyCustomTheme = (color) => {

    adjustedColor = color;
    if (isNearWhite(color)) {
        adjustedColor = '#696969'; // Light gray if near white
    }
    const darkerColorHex = darkenHexColor(adjustedColor);
    const lighterColorHex = lightenHexColor(adjustedColor, 0.85);
    const lightTin = lightestColor(adjustedColor, 0.95);

    // resetDarkTheme();
    document.documentElement.style.setProperty('--bg-color-blue', lighterColorHex);
    document.documentElement.style.setProperty('--accentLightTint-blue', lightTin);
    document.documentElement.style.setProperty('--darkerColor-blue', darkerColorHex);
    document.documentElement.style.setProperty('--darkColor-blue', adjustedColor);
    document.documentElement.style.setProperty('--textColorDark-blue', darkerColorHex);
    document.documentElement.style.setProperty('--whitishColor-blue', '#ffffff');
    document.getElementById("rangColor").style.borderColor = color;
    document.getElementById('dfChecked').checked = false;
    ApplyLoadingColor();
};

// Load theme on page reload// Load theme on page reload
window.addEventListener('load', function () {
    // console.log('Page loaded, stored theme:', storedTheme);
    // console.log('Page loaded, stored custom color:', storedCustomColor);
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
        // console.log('Radio button changed, selected theme:', colorValue);
        localStorage.setItem(themeStorageKey, colorValue);
        localStorage.removeItem(customThemeStorageKey); // Clear custom theme
        applySelectedTheme(colorValue);
    }
};

// Remove any previously attached listeners and add only one
radioButtons.forEach(radioButton => {
    radioButton.removeEventListener('change', handleThemeChange); // Remove if already attached
    radioButton.addEventListener('change', handleThemeChange);    // Add fresh listener
});

// Handle color picker changes
const handleColorPickerChange = function (event) {
    const selectedColor = event.target.value;
    // console.log('Color picker changed, selected color:', selectedColor);
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
colorPicker.removeEventListener('input', handleColorPickerChange); // Ensure no duplicate listeners
colorPicker.addEventListener('input', handleColorPickerChange);
// colorPicker.addEventListener('change', function () {
//     // console.log('Final color applied:', colorPicker.value);
//     location.reload();
// });


// end of Function to apply the selected theme
