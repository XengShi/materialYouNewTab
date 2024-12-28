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
    zh: zh, // Chinese (Simplified)
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
    sl: sl, // Slovenian
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
    ru: '400px',
    it: '437px',
    idn: '435px',
    tr: '418px',
    fr: '475px',
    az: '418px',
    sl: '470px',
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
    const specialDecimalLanguages = ['cs', 'it', 'pt', 'ru', 'tr', 'vi', 'uz', 'es', 'ko', 'idn', 'fr', 'az', 'sl']; // Add more languages here as needed

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
    // Mapping of text elements and their translation keys
    const translationMap = [
        'feedback',
        'resetsettings',
        'shortcutsText',
        'enableShortcutsText',
        'editShortcutsText',
        'shortcutsInfoText',
        'editShortcutsList',
        'editShortcutsListInfo',
        'adaptiveIconText',
        'adaptiveIconInfoText',
        'ai_tools_button',
        'enable_ai_tools',
        'googleAppsMenuText',
        'googleAppsMenuInfo',
        'todoListText',
        'todoListInfo',
        'fahrenheitCelsiusCheckbox',
        'fahrenheitCelsiusText',
        'micIconTitle',
        'micIconInfo',
        'hideSearchWith',
        'hideSearchWithInfo',
        'search_suggestions_button',
        'search_suggestions_text',
        'digitalclocktittle',
        'digitalclockinfo',
        'timeformattittle',
        'timeformatinfo',
        'greetingtittle',
        'greetinginfo',
        'userTextTitle',
        'userTextInfo',
        'useproxytitletext',
        'useproxyText',
        'ProxyText',
        'ProxySubtext',
        'HostproxyButton',
        'saveproxy',
        'UserLocText',
        'UserLocSubtext',
        'InputOptionsButton',
        'saveLoc',
        'WeatherApiText',
        'WeatherApiSubtext',
        'LearnMoreButton',
        'saveAPI',
        'conditionText',
        'enterBtn',
        'searchWithHint',
        'ai_tools',
        'humidityLevel',
        'feelsLike',
        'location',
        'googleEngine',
        'duckEngine',
        'bingEngine',
        'braveEngine',
        'youtubeEngine',
        'chatGPT',
        'gemini',
        'copilot',
        'perplexity',
        'firefly',
        'metaAI',
        'github',
        'googleAppsHover',
        'todoListHover',
        'uploadWallpaperText',
        'backupText',
        'restoreText',
        'rangColor',
        'bookmarksText',
        'bookmarksInfo',
        'bookmarksHeading',
        'bookmarkViewAs',
        'bookmarkViewGrid',
        'bookmarkViewList',
    ];

    // Specific mapping for placeholders
    const placeholderMap = [
        { id: 'userLoc', key: 'userLoc' },
        { id: 'userAPI', key: 'userAPI' },
        { id: 'searchQ', key: 'searchPlaceholder' },
        { id: 'todoInput', key: 'todoPlaceholder' },
        { id: 'bookmarkSearch', key: 'bookmarkSearch' }
    ];

    // Mapping of elements and their different translation keys
    const elementsMap = [
        { id: 'todoListHeading', key: 'todoListText' },
        { id: 'googleEngineDD', key: 'googleEngine' },
        { id: 'duckEngineDD', key: 'duckEngine' },
        { id: 'bingEngineDD', key: 'bingEngine' },
        { id: 'braveEngineDD', key: 'braveEngine' },
        { id: 'youtubeEngineDD', key: 'youtubeEngine' },
        { id: 'bookmarksHover', key: 'bookmarksHeading' },
    ];

    // Function to apply translations
    function applyTranslations(items, isPlaceholder) {
        items.forEach(item => {
            // Get the element by its ID
            const element = document.getElementById(item.id || item);
            if (element) {
                // Use 'key' if defined, otherwise use 'id' as the translation key
                const key = item.key || item;
                // Get the translation, fallback to English if not found in the current language
                const translation = translations[lang]?.[key] || translations['en']?.[key];

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
    applyTranslations(placeholderMap, true); // For placeholders
    applyTranslations(elementsMap, false);  // For innerTexts with different IDs and keys
    applyTranslations(translationMap, false);  // For innerTexts with same ID and keys

    // For userText
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
