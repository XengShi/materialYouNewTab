/* 
 * Material You NewTab
 * Copyright (c) 2023-2024 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program. 
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Translation data
const translations = {
    en: en, // English
    pt: pt, // Portuguese-BR
    zn: zn, // Chinese (Simplified)
    hi: hi, // Hindi
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
};

// Define the width of the menu container for each language
const menuWidths = {
    en: '400px',
    pt: '470px',
    uz: '455px',
    vi: '445px',
    cs: '452px',
    es: '446px',
    hi: '408px',
    ja: '444px',
    ru: '450px',
    it: '437px',
    idn: '415px',
    tr: '418px',
    fr: '475px',
    az: '418px',
    // Add more languages and widths as needed
};

const numberMappings = {
    "bn": { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' },
    "mr": { '0': '०', '1': '१', '2': '२', '3': '३', '4': '४', '5': '५', '6': '६', '7': '७', '8': '८', '9': '९' },
    // Add more languages as needed, Ensure it is supported in the fonts
};

function localizeNumbers(text, language) {
    const map = numberMappings[language]; // Get the numeral map for the current language

    // Define languages that use a comma as the decimal separator instead of a dot
    const specialDecimalLanguages = ['cs', 'it', 'pt', 'ru', 'tr', 'vi', 'uz', 'es', 'ko', 'idn', 'fr','az' ]; // Add more languages here as needed

    if (specialDecimalLanguages.includes(language)) {
        // Replace decimal point with a comma for specific languages
        text = text.replace('.', ',');
    }
    // Apply digit localization if the numeral map exists
    if (map) {
        text = text.replace(/\d/g, (digit) => map[digit] || digit);
    }
    return text;  // Return the localized text
}

// Function to apply the language to the page
function applyLanguage(lang) {
    // Define an array of elements and their corresponding translation keys
    const translationMap = [
        { id: 'feedback', key: 'feedback' },
        { id: 'resetsettings', key: 'resetsettings' },
        { id: 'shortcutsText', key: 'shortcutsText' },
        { id: 'enableShortcutsText', key: 'enableShortcutsText' },
        { id: 'editShortcutsText', key: 'editShortcutsText' },
        { id: 'shortcutsInfoText', key: 'shortcutsInfoText' },
        { id: 'editShortcutsList', key: 'editShortcutsList' },
        { id: 'editShortcutsListInfo', key: 'editShortcutsListInfo' },
        { id: 'adaptiveIconText', key: 'adaptiveIconText' },
        { id: 'adaptiveIconInfoText', key: 'adaptiveIconInfoText' },
        { id: 'ai_tools_button', key: 'ai_tools_button' },
        { id: 'enable_ai_tools', key: 'enable_ai_tools' },
        { id: 'googleAppsMenuText', key: 'googleAppsMenuText' },
        { id: 'googleAppsMenuInfo', key: 'googleAppsMenuInfo' },
        { id: 'todoListHeading', key: 'todoListHeading' },
        { id: 'todoListText', key: 'todoListText' },
        { id: 'todoListInfo', key: 'todoListInfo' },
        { id: 'fahrenheitCelsiusCheckbox', key: 'fahrenheitCelsiusCheckbox' },
        { id: 'fahrenheitCelsiusText', key: 'fahrenheitCelsiusText' },
        { id: 'micIconTitle', key: 'micIconTitle' },
        { id: 'micIconInfo', key: 'micIconInfo' },
        { id: 'hideSearchWith', key: 'hideSearchWith' },
        { id: 'hideSearchWithInfo', key: 'hideSearchWithInfo' },
        { id: 'search_suggestions_button', key: 'search_suggestions_button' },
        { id: 'search_suggestions_text', key: 'search_suggestions_text' },
        { id: 'digitalclocktittle', key: 'digitalclocktittle' },
        { id: 'digitalclockinfo', key: 'digitalclockinfo' },
        { id: 'timeformattittle', key: 'timeformattittle' },
        { id: 'timeformatinfo', key: 'timeformatinfo' },
        { id: 'greetingtittle', key: 'greetingtittle' },
        { id: 'greetinginfo', key: 'greetinginfo' },
        { id: 'userTextTitle', key: 'userTextTitle' },
        { id: 'userTextInfo', key: 'userTextInfo' },
        { id: 'useproxytitletext', key: 'useproxytitletext' },
        { id: 'useproxyText', key: 'useproxyText' },
        { id: 'ProxyText', key: 'ProxyText' },
        { id: 'ProxySubtext', key: 'ProxySubtext' },
        { id: 'HostproxyButton', key: 'HostproxyButton' },
        { id: 'saveproxy', key: 'saveproxy' },
        { id: 'UserLocText', key: 'UserLocText' },
        { id: 'UserLocSubtext', key: 'UserLocSubtext' },
        { id: 'userLoc', key: 'userLoc', isPlaceholder: true },
        { id: 'InputOptionsButton', key: 'InputOptionsButton' },
        { id: 'saveLoc', key: 'saveLoc' },
        { id: 'WeatherApiText', key: 'WeatherApiText' },
        { id: 'WeatherApiSubtext', key: 'WeatherApiSubtext' },
        { id: 'userAPI', key: 'userAPI', isPlaceholder: true },
        { id: 'LearnMoreButton', key: 'LearnMoreButton' },
        { id: 'saveAPI', key: 'saveAPI' },
        { id: 'conditionText', key: 'conditionText' },
        { id: 'enterBtn', key: 'enterBtn' },
        { id: 'searchQ', key: 'searchPlaceholder', isPlaceholder: true },
        { id: 'todoInput', key: 'todoPlaceholder', isPlaceholder: true },
        { id: 'searchWithHint', key: 'searchWithHint' },
        { id: 'ai_tools', key: 'ai_tools' },
        { id: 'humidityLevel', key: 'humidityLevel' },
        { id: 'feelsLike', key: 'feelsLike' },
        { id: 'location', key: 'location' },
        { id: 'googleEngine', key: 'googleEngine' },
        { id: 'duckEngine', key: 'duckEngine' },
        { id: 'bingEngine', key: 'bingEngine' },
        { id: 'braveEngine', key: 'braveEngine' },
        { id: 'youtubeEngine', key: 'youtubeEngine' },
        { id: 'googleEngineDD', key: 'googleEngine' },
        { id: 'duckEngineDD', key: 'duckEngine' },
        { id: 'bingEngineDD', key: 'bingEngine' },
        { id: 'braveEngineDD', key: 'braveEngine' },
        { id: 'youtubeEngineDD', key: 'youtubeEngine' },
        { id: 'chatGPT', key: 'chatGPT' },
        { id: 'gemini', key: 'gemini' },
        { id: 'copilot', key: 'copilot' },
        { id: 'perplexity', key: 'perplexity' },
        { id: 'firefly', key: 'firefly' },
        { id: 'metaAI', key: 'metaAI' },
        { id: 'github', key: 'github' },
        { id: 'googleAppsHover', key: 'googleAppsHover' },
        { id: 'todoListHover', key: 'todoListHover' },
        { id: 'uploadWallpaperText', key: 'uploadWallpaperText' },
        { id: 'backupText', key: 'backupText' },
        { id: 'restoreText', key: 'restoreText' },
        { id: 'rangColor', key: 'rangColor' }

    ];

    // Loop through the translation map to apply translations
    for (const { id, key, isPlaceholder } of translationMap) {
        const element = document.getElementById(id);
        if (element) {
            if (isPlaceholder) {
                element.placeholder = translations[lang]?.[key] || translations['en'][key];
            } else {
                element.innerText = translations[lang]?.[key] || translations['en'][key];
            }
        }
    }

    // userText
    const userTextDiv = document.getElementById('userText');
    if (translations[lang]) {
        const placeholder = translations[lang]?.userText || translations['en'].userText;
        userTextDiv.dataset.placeholder = placeholder; // Update the placeholder in data attribute
        // Only set the text content if there's nothing in localStorage
        if (!localStorage.getItem("userText")) {
            userTextDiv.innerText = placeholder;
        }
    }

    // Update hover text for #menuCloseButton
    const menuCloseButton = document.getElementById('menuCloseButton');
    if (menuCloseButton) {
        const hoverText = translations[lang]?.menuCloseText || translations['en'].menuCloseText;
        menuCloseButton.setAttribute('data-lang', hoverText);
    }

    // Update the width of the menu container based on the language
    const menuCont = document.querySelector('.menuBar .menuCont');
    if (menuCont) {
        menuCont.style.width = menuWidths[lang] || menuWidths['en'];
    }

    // Save the selected language in localStorage
    saveLanguageStatus('selectedLanguage', lang);
}

// Detect language from navigator.language
document.getElementById('languageSelector').addEventListener('change', (event) => {
    applyLanguage(event.target.value);
    location.reload();
});

// Function to apply the language when the page loads
window.onload = function () {
    const savedLanguage = getLanguageStatus('selectedLanguage') || 'en'; // Default language is English
    if (savedLanguage) {
        document.getElementById("languageSelector").value = savedLanguage;
    }
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
