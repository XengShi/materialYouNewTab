// Translation data
const translations = {
    "en": {
        // Menu Itens
        "shortcutsText": "Shortcuts",
        "enableShortcutsText": "Enable/disable shortcuts",
        "ai_tools_button": "AI-Tools",
        "enable_ai_tools": "Enable/disable AI Tools shortcuts",
        "fahrenheitCelciusCheckbox": "Switch to Fahrenheit",
        "fahrenheitCelciusText": "Refresh the page to see the updates",
        "WeatherApiText": "Enter your own WeatherAPI key",
        "WeatherApiSubtext": "If the weather functionality isn't working",
        "LearnMoreButton": "Learn More",
        "saveAPI": "Enter",
        // End of Menu Itens

        "searchWithHint": "Search With",

    },
    "pt": {

        // Menu Itens
        "shortcutsText": "Atalhos",
        "enableShortcutsText": "Ativar/desativar atalhos",
        "ai_tools_button": "Ferramentas de IA",
        "enable_ai_tools": "Ativar/desativar atalhos de ferramentas de IA",
        "fahrenheitCelciusCheckbox": "Alternar para Fahrenheit",
        "fahrenheitCelciusText": "Atualize a página para ver as atualizações",
        "WeatherApiText": "Insira sua propria API de Clima",
        "WeatherApiSubtext": "Se a funcionalidade de clima não estiver funcionando",
        "LearnMoreButton": "Saiba Mais",
        "saveAPI": "Salvar API",
        // End of Menu Itens

        "searchWithHint": "Pesquisar Com",

    }
};

// Function to apply the selected language
function applyLanguage(lang) {
    if (translations[lang]) {
        // Menu Itens
        document.getElementById('shortcutsText').innerText = translations[lang].shortcutsText;
        document.getElementById('enableShortcutsText').innerText = translations[lang].enableShortcutsText;
        document.getElementById('ai_tools_button').innerText = translations[lang].ai_tools_button;
        document.getElementById('enable_ai_tools').innerText = translations[lang].enable_ai_tools;
        document.getElementById('fahrenheitCelciusCheckbox').innerText = translations[lang].fahrenheitCelciusCheckbox;
        document.getElementById('fahrenheitCelciusText').innerText = translations[lang].fahrenheitCelciusText;
        document.getElementById('WeatherApiText').innerText = translations[lang].WeatherApiText;
        document.getElementById('WeatherApiSubtext').innerText = translations[lang].WeatherApiSubtext;
        document.getElementById('LearnMoreButton').innerText = translations[lang].LearnMoreButton;
        document.getElementById('saveAPI').innerText = translations[lang].saveAPI;

        // End of Menu Itens

        document.getElementById('searchWithHint').innerText = translations[lang].searchWithHint;
    } else {
        console.error('Language not found');
    }
}

// Detects language change
document.getElementById('languageSelector').addEventListener('change', (event) => {
    applyLanguage(event.target.value);
});

// Sets default language to English on page load
window.onload = function () {
    applyLanguage('pt');
};
