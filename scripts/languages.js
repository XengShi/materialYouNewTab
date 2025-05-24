/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Translation data
const translations = {
    en: en, // English
    pt: pt, // Portuguese-BR (Brazil)
    zh: zh, // Chinese (Simplified)
    zh_TW: zh_TW, // Chinese (Traditional)
    hi: hi, // Hindi
    hu: hu, // Hungarian
    cs: cs, // Czech
    it: it, // Italian
    tr: tr, // Turkish
    bn: bn, // Bengali
    vi: vi, // Vietnamese
    ru: ru, // Russian
    uz: uz, // Uzbek
    es: es, // Spanish
    ja: ja, // Japanese
    ko: ko, // Korean
    idn: idn, // Indonesian
    mr: mr, // Marathi
    fr: fr, // French
    az: az, // Azerbaijani
    sl: sl, // Slovenian
    np: np, // Nepali
    ur: ur, // Urdu
    de: de, // German
    fa: fa, // Farsi
};

// Define the width of the menu container for each language
const menuWidths = {
    en: "400px",
    pt: "470px",
    bn: "416px",
    uz: "455px",
    vi: "445px",
    cs: "452px",
    es: "446px",
    hi: "408px",
    hu: "445px",
    ja: "444px",
    ru: "400px",
    it: "437px",
    idn: "435px",
    tr: "430px",
    fr: "475px",
    az: "418px",
    sl: "470px",
    np: "430px",
    de: "460px",
    fa: "460px"
    // Add more languages and widths as needed
};

const numberMappings = {
    "bn": { "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪", "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯" },
    "mr": { "0": "०", "1": "१", "2": "२", "3": "३", "4": "४", "5": "५", "6": "६", "7": "७", "8": "८", "9": "९" },
    "np": { "0": "०", "1": "१", "2": "२", "3": "३", "4": "४", "5": "५", "6": "६", "7": "७", "8": "८", "9": "९" },
    "fa": { 0: "۰", 1: "۱", 2: "۲", 3: "۳", 4: "۴", 5: "۵", 6: "۶", 7: "۷", 8: "۸", 9: "۹" }
    // Add more languages as needed, Ensure it is supported in the fonts
};

function localizeNumbers(text, language) {
    const map = numberMappings[language]; // Get the numeral map for the current language

    // Define languages that use a comma as the decimal separator instead of a dot
    const specialDecimalLanguages = ["cs", "it", "pt", "ru", "tr", "vi", "uz", "es", "ko", "idn", "fr", "az", "sl", "hu", "de", "fa"]; // Add more languages here as needed

    if (specialDecimalLanguages.includes(language)) {
        // Replace decimal point with a comma for specific languages
        text = text.replace(".", ",");
    }
    // Apply digit localization if the numeral map exists
    if (map) {
        text = text.replace(/\d/g, (digit) => map[digit] || digit);
    }
    return text; // Return the localized text
}

// Right-to-left languages
const rtlLanguages = ["ur", "fa"];

// Function to apply the language to the page
function applyLanguage(lang) {
    // Mapping of text elements and their translation keys
    const translationMap = [
        "feedback",
        "resetsettings",
        "shortcutsText",
        "enableShortcutsText",
        "editShortcutsText",
        "shortcutsInfoText",
        "editShortcutsList",
        "editShortcutsListInfo",
        "adaptiveIconText",
        "adaptiveIconInfoText",
        "ai_tools_button",
        "enable_ai_tools",
        "aiToolsSettingsText",
        "aiToolsSettingsInfo",
        "googleAppsMenuText",
        "googleAppsMenuInfo",
        "todoListText",
        "todoListInfo",
        "fahrenheitCelsiusCheckbox",
        "fahrenheitCelsiusText",
        "minMaxTempText",
        "minMaxTempSubText",
        "hideWeatherTitle",
        "hideWeatherInfo",
        "hideWeatherBox",
        "hideWeatherBoxInfo",
        "micIconTitle",
        "micIconInfo",
        "hideSearchWith",
        "hideSearchWithInfo",
        "motivationalQuotesText",
        "motivationalQuotesInfo",
        "search_suggestions_button",
        "search_suggestions_text",
        "hideClockBox",
        "hideClockBoxInfo",
        "digitalclocktitle",
        "digitalclockinfo",
        "timeformattitle",
        "timeformatinfo",
        "greetingtitle",
        "greetinginfo",
        "userTextTitle",
        "userTextInfo",
        "useproxytitletext",
        "useproxyText",
        "ProxyText",
        "ProxySubtext",
        "HostproxyButton",
        "UserLocText",
        "UserLocSubtext",
        "useGPS",
        "useGPSInfo",
        "PrivacyPolicy",
        "WeatherApiText",
        "WeatherApiSubtext",
        "LearnMoreButton",
        "saveAPI",
        "enterBtn",
        "ai_tools",
        "defaultEngine",
        "googleEngine",
        "duckEngine",
        "bingEngine",
        "braveEngine",
        "youtubeEngine",
        "gImagesEngine",
        "redditEngine",
        "wikipediaEngine",
        "quoraEngine",
        "chatGPT",
        "gemini",
        "copilot",
        "claude",
        "grok",
        "qwen",
        "perplexity",
        "deepseek",
        "metaAI",
        "github",
        "googleAppsHover",
        "todoListHover",
        "uploadWallpaperText",
        "backupText",
        "restoreText",
        "rangColor",
        "bookmarksText",
        "bookmarksInfo",
        "bookmarksHeading",
        "bookmarkSortBy",
        "sortAlphabetical",
        "sortTimeAdded",
        "bookmarkViewAs",
        "bookmarkViewGrid",
        "bookmarkViewList",
        "editBookmarkHeading",
        "enableDarkMode",
        "enableDarkModeInfo",
        "switchSearchModes",
        "switchSearchModesInfo",
        "adjustZoom",
        "changeBrowserTheme",
        "updateFirefoxHomepage",
        "dontShowTips",
        "aiSettingsIntro",
        "resetAISettingsBtn"
    ];

    // Specific mapping for placeholders
    const placeholderMap = [
        { id: "userLoc", key: "userLoc" },
        { id: "userAPI", key: "userAPI" },
        { id: "searchQ", key: "searchPlaceholder" },
        { id: "todoInput", key: "todoPlaceholder" },
        { id: "bookmarkSearch", key: "bookmarkSearch" },
        { id: "editBookmarkName", key: "editBookmarkName" },
        { id: "editBookmarkURL", key: "editBookmarkURL" }
    ];

    // Mapping of elements and their different translation keys
    const elementsMap = [
        { id: "todoListHeading", key: "todoListText" },
        { id: "defaultEngineDD", key: "defaultEngine" },
        { id: "googleEngineDD", key: "googleEngine" },
        { id: "duckEngineDD", key: "duckEngine" },
        { id: "bingEngineDD", key: "bingEngine" },
        { id: "braveEngineDD", key: "braveEngine" },
        { id: "youtubeEngineDD", key: "youtubeEngine" },
        { id: "gImagesEngineDD", key: "gImagesEngine" },
        { id: "redditEngineDD", key: "redditEngine" },
        { id: "wikipediaEngineDD", key: "wikipediaEngine" },
        { id: "quoraEngineDD", key: "quoraEngine" },
        { id: "bookmarksHover", key: "bookmarksHeading" },
        { id: "saveproxy", key: "saveAPI" },
        { id: "saveLoc", key: "saveAPI" },
        { id: "saveBookmarkChanges", key: "saveAPI" },
        { id: "cancelBookmarkEdit", key: "cancelText" },
        { id: "aiSettingsHeader", key: "aiToolsSettingsText" },
        { id: "saveAISettingsBtn", key: "saveAPI" },
        { id: "editBookmarkNameLabel", key: "editBookmarkName" },
        { id: "editBookmarkURLLabel", key: "editBookmarkURL" }
    ];

    // Function to apply translations
    function applyTranslations(items, isPlaceholder) {
        items.forEach(item => {
            // Get the element by its ID
            const element = document.getElementById(item.id || item);
            if (element) {
                // Use "key" if defined, otherwise use "id" as the translation key
                const key = item.key || item;
                // Get the translation, fallback to English if not found in the current language
                const translation = translations[lang]?.[key] || translations["en"]?.[key];

                // Apply the translation to either placeholder or innerText
                if (isPlaceholder) {
                    element.placeholder = translation;
                } else {
                    element.innerText = translation;
                }
            }
        });
    }

    // Apply the translations
    applyTranslations(placeholderMap, true);   // For placeholders
    applyTranslations(elementsMap, false);     // For innerTexts with different IDs and keys
    applyTranslations(translationMap, false);  // For innerTexts with same ID and keys

    // For userText
    const userTextDiv = document.getElementById("userText");
    if (translations[lang]) {
        const placeholder = translations[lang]?.userText || translations["en"].userText;
        userTextDiv.dataset.placeholder = placeholder; // Update the placeholder in data attribute
        // Only set the text content if there's nothing in localStorage
        if (!localStorage.getItem("userText")) {
            userTextDiv.innerText = placeholder;
        }
    }

    // Update hover text for #menuCloseButton
    const menuCloseButton = document.getElementById("menuCloseButton");
    if (menuCloseButton) {
        const hoverText = translations[lang]?.menuCloseText || translations["en"].menuCloseText;
        menuCloseButton.setAttribute("data-lang", hoverText);
    }

    // Update the width of the menu container based on the language
    const menuCont = document.querySelector(".menuBar .menuCont");
    if (menuCont) {
        menuCont.style.width = menuWidths[lang] || menuWidths["en"];
        let widthh = window.innerWidth / parseInt(menuWidths[lang] || menuWidths["en"]);
        if (window.innerWidth < 476) {
            let menuStyle = document.getElementById("menuStyle") || document.createElement("style");
            menuStyle.id = "menuStyle";
            menuStyle.innerHTML = `
                .menuCont {
                    scale: ${widthh} !important;
                    height: ${(100 / widthh).toString()}dvh !important;
                    transform-origin: top right !important;
                }
            `;
            document.head.append(menuStyle);
        }
    }

    // Function to dynamically load Google Fonts
    function loadFont(fontUrl) {
        if (!document.querySelector(`link[href="${fontUrl}"]`)) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = fontUrl;
            document.head.appendChild(link);
        }
    }

    // Dynamically update the font family based on the language
    const root = document.documentElement;
    const commonFontStack = "'poppins', 'Poppins', sans-serif";
    if (lang === "vi") {
        loadFont("https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro&display=swap");
        root.style.setProperty("--main-font-family", `"Be Vietnam Pro", ${commonFontStack}`);
    } else if (lang === "ur") {
        loadFont("https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic&display=swap");
        root.style.setProperty("--main-font-family", `"Noto Sans Arabic", ${commonFontStack}`);
        document.body.classList.add("lang-ur"); // Apply special styles
    } else if (lang === "fa") {
        loadFont("https://fonts.googleapis.com/css2?family=Vazirmatn&display=swap"); // Using Vazirmatn for Farsi
        root.style.setProperty("--main-font-family", `"Vazirmatn", ${commonFontStack}`);
    } else {
        root.style.setProperty("--main-font-family", commonFontStack);
        document.body.classList.remove("lang-ur");
    }

    //  Apply the direction attribute to specific classes for RTL languages
    const isRTL = rtlLanguages.includes(lang);
    const rtlClasses = ["topDiv", "searchbar", "resultBox", "leftDiv", "shortcutsContainer", "page",
        "bookmark-search-container", "bookmark-controls-container", "todo-container"]

    rtlClasses.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(el => {
            el.setAttribute("dir", isRTL ? "rtl" : "ltr");
        });
    });

    // Save the selected language in localStorage
    saveLanguageStatus("selectedLanguage", lang);
}

// Detect language from navigator.language
document.getElementById("languageSelector").addEventListener("change", (event) => {
    applyLanguage(event.target.value);
    location.reload();
});

// Function to apply the language when the page loads
window.onload = function () {
    const savedLanguage = getLanguageStatus("selectedLanguage") || "en"; // Default language is English
    document.getElementById("languageSelector").value = savedLanguage;
    applyLanguage(savedLanguage);
};

// Function to save the language status in localStorage
function saveLanguageStatus(key, languageStatus) {
    localStorage.setItem(key, languageStatus);
}

// Function to get the language status from localStorage
function getLanguageStatus(key) {
    return localStorage.getItem(key);
}
