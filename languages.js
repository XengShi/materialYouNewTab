/* 
 * Material You NewTab
 * Copyright (c) 2023-2024 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program. 
 * If not, see <https://www.gnu.org/licenses/>.
 */


// Translation data
const translations = {
    "en": {
        // Menu Items
        "feedback": "Feedback",
        "resetsettings": "Reset Settings",
        "menuCloseText": "Close",
        // Shortcuts
        "shortcutsText": "Shortcuts",
        "enableShortcutsText": "Show saved shortcuts",
        "editShortcutsText": "Edit Shortcuts",
        "shortcutsInfoText": "Choose which shortcuts get shown",
        "editShortcutsList": "Saved Shortcuts",
        'editShortcutsListInfo': 'You can add new shortcuts by clicking the "+" icon or edit existing ones by clicking on the shortcut name or URL.',
        "adaptiveIconText": "Adaptive Icon Shapes",
        "adaptiveIconInfoText": "Shortcut icons will appear smaller",
        "ai_tools_button": "AI-Tools",
        "enable_ai_tools": "Show shortcuts for AI tools",
        "googleAppsMenuText": "Google Apps",
        "googleAppsMenuInfo": "Show shortcuts for Google Apps",
        // Digital Clock
        "digitalclocktittle": "Digital Clock",
        "digitalclockinfo": "Switch to the digital clock",
        "timeformattittle": "12-Hour Format",
        "timeformatinfo": "Use 12-hour time format",
        "greetingtittle": "Greeting",
        "greetinginfo": "Show greeting below custom text",
        // Misc
        "userTextTitle": "Customizable Text",
        "userTextInfo": "Show custom text below the clock",
        "fahrenheitCelsiusCheckbox": "Switch to Fahrenheit",
        "fahrenheitCelsiusText": "Refresh the page to apply changes",
        "micIconTitle": "Hide Microphone Icon",
        "micIconInfo": "If voice typing is not working",
        "hideSearchWith": "Hide Search Engines",    // or "Hide Search Engine Selector"
        "hideSearchWithInfo": "Switch between search engines by clicking its icon",
        "search_suggestions_button": "Search Suggestions",
        "search_suggestions_text": "Enable search suggestions",
        // Proxy
        "useproxytitletext": "Proxy Bypass",
        "useproxyText": "If search suggestions aren't working",
        "ProxyText": "CORS Bypass Proxy",
        "ProxySubtext": "Add your own CORS bypass proxy",
        "HostproxyButton": "Host your own proxy",
        "saveproxy": "Save",
        // Location
        "UserLocText": "Enter your Location",
        "UserLocSubtext": "If the weather location isn't correct",
        "userLoc": "Your City or Coordinates (Latitude, Longitude)",
        "InputOptionsButton": "Input options",
        "saveLoc": "Save",
        // Weather
        "WeatherApiText": "Enter your WeatherAPI key",    // For 'WeatherAPI' string, only transliterate it
        "WeatherApiSubtext": "If the weather functionality isn't working",
        "userAPI": "Your weatherAPI key",
        "LearnMoreButton": "Learn more",
        "saveAPI": "Save",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        "months": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        // End of Calendar

        // Weather
        "humidityLevel": "Humidity",
        "feelsLike": "Feels",
        "location": "Earth",
        // End of Weather

        // New Tab Item
        "conditionText": "Hello! How are you today?",
        "enterBtn": "Search",
        "searchPlaceholder": "Type here...",
        "listenPlaceholder": "Listening...",
        "searchWithHint": "Search With",
        "ai_tools": "AI Tools",
        "userText": "Click here to edit",
        "googleAppsHover": "Google Apps",    // Keep this untranslated if string width is much longer
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Good Morning!",
            "afternoon": "Good Afternoon!",
            "evening": "Good Evening!"
        },

        // Search Engines and rest
        "googleEngine": "Google",
        "duckEngine": "Duck", // DuckDuckGo
        "bingEngine": "Bing",
        "braveEngine": "Brave",
        "youtubeEngine": "YouTube",
        "chatGPT": "ChatGPT",
        "gemini": "Gemini",
        "copilot": "Copilot",
        "perplexity": "Perplexity",
        "firefly": "Adobe Firefly",
        "metaAI" : "Meta AI",
        "github": "GitHub",

        // Wallpaper and alerts
        "uploadWallpaperText": "Upload Wallpaper",    // Keep it shorter
        "backupText": "Backup",
        "restoreText": "Restore",
        "rangColor": "Pick color",    // Keep it shorter
        "reloadHint": "Reload the page after applying themes",

        // Dialog boxes (alerts)
        "confirmWallpaper": "Would you like to set a new image as your wallpaper for the day?",
        "confirmRestore": "Are you sure you want to reset your settings? This action cannot be undone.",
        "Nobackgroundset": "No background image is currently set.",
        "clearbackgroundimage": "Are you sure you want to clear the background image?",
        "confirmbackup": "Are you sure you want to backup your settings?",
        "ProxyDisclaimer": "All proxy features are off by default.\n\nIf you enable search suggestions and CORS bypass proxy, it is strongly recommended to host your own proxy for enhanced privacy.\n\nBy default, the proxy will be set to https://mynt-proxy.rhythmcorehq.com, meaning all your data will go through this service, which may pose privacy concerns.",
        "endlink": "There shouldn't be / at the end of the link",
        "onlylinks": "Only links (starting with http:// or https://) are allowed.",
        "imagedimensions": "Warning: The uploaded image dimensions ({width}x{height}) exceed 1920x1080 pixels. \n\nThis may impact performance or image may fail to load properly.",
        "failedbackup": "Backup failed: ",
        "restorecompleted": "Restore completed successfully!",
        "restorefailed": "Restore failed: ",
    },


    // Portuguese
    "pt": {
        // Menu Items
        "feedback": "Feedback",
        "resetsettings": "Redefinir Configurações",
        "menuCloseText": "Fechar",
        // Shortcuts
        "shortcutsText": "Atalhos",
        "enableShortcutsText": "Mostrar atalhos salvos",
        "editShortcutsText": "Editar Atalhos",
        "shortcutsInfoText": "Escolha quais atalhos serão exibidos",
        "editShortcutsList": "Atalhos Salvos",
        "editShortcutsListInfo": "Você pode adicionar novos atalhos clicando no ícone \"+\" ou editar os existentes clicando no nome ou URL do atalho",
        "adaptiveIconText": "Ícones Adaptativos",
        "adaptiveIconInfoText": "Os ícones de atalho aparecerão redondos",
        "ai_tools_button": "Ferramentas de IA",
        "enable_ai_tools": "Mostrar atalhos para ferramentas de IA",
        "googleAppsMenuText": "Apps Google",
        "googleAppsMenuInfo": "Mostrar atalhos para Apps Google",
        // Digital Clock
        "digitalclocktittle": "Relógio Digital",
        "digitalclockinfo": "Mudar para o relógio digital",
        "timeformattittle": "Formato 12 Horas",
        "timeformatinfo": "Usar formato de 12 horas",
        "greetingtittle": "Saudação",
        "greetinginfo": "Mostrar saudação abaixo do texto personalizado",
        // Misc
        "userTextTitle": "Texto Personalizável",
        "userTextInfo": "Mostrar texto personalizado abaixo do relógio",
        "fahrenheitCelsiusCheckbox": "Mudar para Fahrenheit",
        "fahrenheitCelsiusText": "Atualize a página para aplicar as mudanças",
        "micIconTitle": "Ocultar Ícone do Microfone",
        "micIconInfo": "Se o ditado por voz não estiver funcionando",
        "search_suggestions_button": "Sugestões de Pesquisa",
        "search_suggestions_text": "Ativar sugestões de pesquisa",
        // Proxy
        "useproxytitletext": "Bypass de Proxy",
        "useproxyText": "Se as sugestões de pesquisa não estiverem funcionando",
        "ProxyText": "Proxy de Bypass CORS",
        "ProxySubtext": "Adicione seu próprio proxy de bypass CORS",
        "HostproxyButton": "Hospede seu próprio proxy",
        "saveproxy": "Salvar",
        // Location
        "UserLocText": "Digite sua Localização",
        "UserLocSubtext": "Se a localização do clima não estiver correta",
        "userLoc": "Sua Cidade ou Coordenadas (Latitude, Longitude)",
        "InputOptionsButton": "Opções de entrada",
        "saveLoc": "Salvar",
        // Weather
        "WeatherApiText": "Digite sua chave WeatherAPI",
        "WeatherApiSubtext": "Se a funcionalidade do clima não estiver funcionando",
        "userAPI": "Sua chave weatherAPI",
        "LearnMoreButton": "Saiba mais",
        "saveAPI": "Salvar",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        "months": ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        // End of Calendar

        // Weather
        "humidityLevel": "Umidade",
        "feelsLike": "Sensação de",
        "location": "Terra",
        // End of Weather

        // New Tab Item
        "conditionText": "Olá! Como você está hoje?",
        "enterBtn": "Pesquisar",
        "searchPlaceholder": "Digite aqui...",
        "listenPlaceholder": "Ouvindo...",
        "searchWithHint": "Pesquisar Com",
        "ai_tools": "Ferramentas de IA",
        "userText": "Clique aqui para editar",
        "googleAppsHover": "Apps do Google",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Bom dia!",
            "afternoon": "Boa tarde!",
            "evening": "Boa noite!"
        },
        // Search Engines
        "googleEngine": "Google",
        "duckEngine": "Duck",
        "bingEngine": "Bing",
        "braveEngine": "Brave",
        "youtubeEngine": "YouTube",
        "chatGPT": "ChatGPT",
        "gemini": "Gemini",
        "copilot": "Copilot",
        "perplexity": "Perplexity",
        "firefly": "Adobe Firefly",
        "github": "GitHub"
    },


    // Chinese (Simplified)
    "zh": {
        // Menu Items
        "feedback": "反馈",
        "resetsettings": "重置设置",
        "menuCloseText": "关闭",
        // Shortcuts
        "shortcutsText": "快捷方式",
        "enableShortcutsText": "显示已保存的快捷方式",
        "editShortcutsText": "编辑快捷方式",
        "editShortcutsList": "已保存的快捷方式",
        "editShortcutsListInfo": "您可以通过单击“+”图标添加新的快捷方式，或通过单击快捷方式名称或 URL 来编辑现有快捷方式",
        "shortcutsInfoText": "选择要显示的快捷方式",
        "adaptiveIconText": "自适应图标形状",
        "adaptiveIconInfoText": "快捷方式图标将显示为圆形",
        "ai_tools_button": "AI 工具",
        "enable_ai_tools": "显示 AI 工具快捷方式",
        "googleAppsMenuText": "谷歌应用",
        "googleAppsMenuInfo": "显示谷歌应用的快捷方式",
        // Digital Clock
        "digitalclocktittle": "数字时钟",
        "digitalclockinfo": "切换到数字时钟",
        "timeformattittle": "12 小时制",
        "timeformatinfo": "使用 12 小时制时间格式",
        "greetingtittle": "问候语",
        "greetinginfo": "在自定义文本下显示问候语",
        // Misc
        "userTextTitle": "自定义文本",
        "userTextInfo": "在时钟下方显示自定义文本",
        "fahrenheitCelsiusCheckbox": "切换到华氏温度",
        "fahrenheitCelsiusText": "刷新页面以应用更改",
        "micIconTitle": "隐藏麦克风图标",
        "micIconInfo": "如果语音输入无法使用",
        "search_suggestions_button": "搜索建议",
        "search_suggestions_text": "启用搜索建议",
        // Proxy
        "useproxytitletext": "代理绕过",
        "useproxyText": "如果搜索建议无法正常工作",
        "ProxyText": "CORS 绕过代理",
        "ProxySubtext": "添加您的地址以绕过CORS限制",
        "HostproxyButton": "托管您自己的代理",
        "saveproxy": "保存",
        // Location
        "UserLocText": "输入您的位置",
        "UserLocSubtext": "如果天气位置不正确",
        "userLoc": "您的城市或坐标（纬度，经度）",
        "InputOptionsButton": "输入选项",
        "saveLoc": "保存",
        // Weather
        "WeatherApiText": "输入您的 WeatherAPI 密钥",
        "WeatherApiSubtext": "如果天气功能无法正常工作",
        "userAPI": "您的 WeatherAPI 密钥",
        "LearnMoreButton": "了解更多",
        "saveAPI": "保存",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        "months": ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        // End of Calendar

        // Weather
        "humidityLevel": "湿度",
        "feelsLike": "体感温度",
        "location": "地球",
        // End of Weather

        // New Tab Item
        "conditionText": "你好！今天感觉怎么样？",
        "enterBtn": "搜索",
        "searchPlaceholder": "输入搜索内容...",
        "listenPlaceholder": "正在聆听...",
        "searchWithHint": "搜索引擎",
        "ai_tools": "AI 工具",
        "userText": "点击这里以编辑",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "早上好！",
            "afternoon": "下午好！",
            "evening": "晚上好！"
        },

        // Search Engines and rest
        "googleEngine": "谷歌",
        "duckEngine": "DuckDuckGo",
        "bingEngine": "必应",
        "googleAppsHover": "谷歌应用",
    },


    // Hindi
    "hi": {
        // Menu Items
        "feedback": "प्रतिक्रिया",
        "resetsettings": "सेटिंग्स रीसेट करें",
        "menuCloseText": "बंद करें",
        // Shortcuts
        "shortcutsText": "शॉर्टकट्स",
        "enableShortcutsText": "सहेजे गए शॉर्टकट प्रदर्शित करें",
        "editShortcutsText": "शॉर्टकट्स संपादित करें",
        "shortcutsInfoText": "निर्धारित करें कि कौन से शॉर्टकट प्रदर्शित किए जाएँ",
        "editShortcutsList": "सहेजे गए शॉर्टकट",
        'editShortcutsListInfo': 'आप "+" आइकन पर क्लिक करके नए शॉर्टकट्स जोड़ सकते हैं या शॉर्टकट के नाम या URL पर क्लिक करके मौजूदा शॉर्टकट्स को संपादित कर सकते हैं।',
        "adaptiveIconText": "अनुकूल आइकन आकृतियाँ",
        "adaptiveIconInfoText": "शॉर्टकट आइकन छोटे आकार में प्रदर्शित करें",
        "ai_tools_button": "AI-उपकरण",
        "enable_ai_tools": "AI उपकरणों के शॉर्टकट्स प्रदर्शित करें",
        "googleAppsMenuText": "गूगल ऐप्स",
        "googleAppsMenuInfo": "गूगल ऐप्स के शॉर्टकट्स प्रदर्शित करें",
        // Digital Clock
        "digitalclocktittle": "डिजिटल घड़ी",
        "digitalclockinfo": "डिजिटल घड़ी पर स्विच करें",
        "timeformattittle": "12 घंटे का प्रारूप",
        "timeformatinfo": "12 घंटे का समय प्रारूप उपयोग करें",
        "greetingtittle": "अभिवादन",
        "greetinginfo": "कस्टम टेक्स्ट के नीचे अभिवादन दिखाएँ",
        // Misc
        "userTextTitle": "कस्टमाइज़ेबल टेक्स्ट",
        "userTextInfo": "घड़ी के नीचे कस्टम टेक्स्ट दिखाएँ",
        "fahrenheitCelsiusCheckbox": "तापमान फ़ारेनहाइट में बदलें",
        "fahrenheitCelsiusText": "बदलाव के लिए पृष्ठ को रीफ्रेश करें",
        "micIconTitle": "माइक्रोफोन आइकन छिपाएँ",
        "micIconInfo": "अगर वॉइस टाइपिंग काम नहीं कर रहा है",
        "hideSearchWith": "सर्च इंजन चयनकर्ता छिपाएं",
        "hideSearchWithInfo": "आइकन पर क्लिक करके सर्च इंजन बदलें",
        "search_suggestions_button": "खोज सुझाव",
        "search_suggestions_text": "खोज सुझाव सक्षम करें",
        // Proxy
        "useproxytitletext": "प्रॉक्सी बायपास",
        "useproxyText": "यदि खोज सुझाव काम नहीं कर रहे हैं",
        "ProxyText": "CORS बायपास प्रॉक्सी",
        "ProxySubtext": "अपना CORS बायपास प्रॉक्सी जोड़ें",
        "HostproxyButton": "अपना प्रॉक्सी संचालित करें",
        "saveproxy": "सहेजें",
        // Location
        "UserLocText": "अपना स्थान दर्ज करें",
        "UserLocSubtext": "यदि मौसम स्थान सही नहीं है",
        "userLoc": "आपका शहर या निर्देशांक (अक्षांश, देशांतर)",
        "InputOptionsButton": "इनपुट विकल्प",
        "saveLoc": "सहेजें",
        // Weather
        "WeatherApiText": "अपनी WeatherAPI कुंजी दर्ज करें",
        "WeatherApiSubtext": "यदि मौसम सुविधा काम नहीं कर रही है",
        "userAPI": "आपकी WeatherAPI कुंजी",
        "LearnMoreButton": "और जानें",
        "saveAPI": "सहेजें",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],   // Truncated for display
        // "days": ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],  // Full
        "months": ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
        // "months": ['जन', 'फर', 'मार्च', 'अप्र', 'मई', 'जून', 'जुला', 'अग', 'सित', 'अक्टू', 'नव', 'दिस'],   // Truncated

        // Weather
        "humidityLevel": "नमी",
        "feelsLike": "महसूस",
        "location": "पृथ्वी",
        // End of Weather

        // New Tab Item
        "conditionText": "नमस्ते! आप आज कैसे हैं?",
        "enterBtn": "खोजें",
        "searchPlaceholder": "यहाँ लिखें...",
        "listenPlaceholder": "सुन रहे हैं...",
        "searchWithHint": "खोज माध्यम",
        "ai_tools": "AI उपकरण",
        "userText": "यहाँ अपना टेक्स्ट लिखें",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "सुप्रभात!",
            "afternoon": "शुभ अपराह्न!",
            "evening": "शुभ संध्या!"
        },

        // Search Engines and rest
        "googleEngine": "गूगल",
        "duckEngine": "डकडकगो",
        "bingEngine": "बिंग",
        "braveEngine": "ब्रेव",
        "youtubeEngine": "यूट्यूब",
        "chatGPT": "चैटGPT",
        "gemini": "जेमिनी",
        "copilot": "कोपायलट",
        "perplexity": "पर्प्लेक्सिटी",
        "firefly": "एडोबी फायरफ्लाई",
        "github": "गिटहब",
        "googleAppsHover": "गूगल ऐप्स",

        // Wallpaper and alerts
        "uploadWallpaperText": "वॉलपेपर अपलोड करें",
        "backupText": "बैकअप करें",
        "restoreText": "रिस्टोर करें",
        "rangColor": "रंग चुनें",
        "reloadHint": "थीम लागू करने के बाद पृष्ठ को पुनः लोड करें",

        // Dialog boxes (alerts)
        "confirmWallpaper": "क्या आप आज के लिए एक यादृच्छिक छवि को वॉलपेपर के रूप में सेट करना चाहेंगे?",
        "confirmRestore": "क्या आप वाकई अपनी सेटिंग्स रीसेट करना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।",
        "Nobackgroundset": "कोई बैकग्राउंड छवि वर्तमान में सेट नहीं है।",
        "clearbackgroundimage": "क्या आप वाकई बैकग्राउंड छवि को हटाना चाहते हैं?",
        "confirmbackup": "क्या आप वाकई अपनी सेटिंग्स का बैकअप लेना चाहते हैं?",
        "ProxyDisclaimer": "सभी प्रॉक्सी फीचर डिफ़ॉल्ट रूप से बंद रहते हैं।\n\nयदि आप खोज सुझाव और CORS बायपास प्रॉक्सी सक्षम करते हैं, तो गोपनीयता बढ़ाने के लिए अपना प्रॉक्सी होस्ट करना अत्यधिक अनुशंसित है।\n\nडिफ़ॉल्ट रूप से प्रॉक्सी को https://mynt-proxy.rhythmcorehq.com पर सेट किया जाएगा, जिसका अर्थ है कि आपका सारा डेटा इस सेवा से गुजरेगा, जिससे गोपनीयता संबंधित चिंताएँ हो सकती हैं।",
        "endlink": "लिंक के अंत में / नहीं होना चाहिए।",
        "onlylinks": "केवल लिंक (http:// या https:// से शुरू होने वाले) ही अनुमत हैं।",
        "imagedimensions": "चेतावनी: अपलोड की गई छवि का आकार ({width}x{height}) 1920x1080 पिक्सेल से अधिक है।\n\nयह प्रदर्शन को प्रभावित कर सकता है या छवि ठीक से लोड होने में विफल हो सकती है।",
        "failedbackup": "बैकअप विफल: ",
        "restorecompleted": "पुनर्स्थापना सफलतापूर्वक पूरी हुई!",
        "restorefailed": "पुनर्स्थापना विफल: ",
    },


    // Czech
    "cs": {
        // Menu Items
        "feedback": "Zpětná vazba",
        "resetsettings": "Resetovat nastavení",
        "menuCloseText": "Zavřít",
        // Shortcuts
        "shortcutsText": "Zkratky",
        "enableShortcutsText": "Zobrazí zkratky",
        "editShortcutsText": "Upravit zkratky",
        "editShortcutsList": "Uložené zkratky",
        "editShortcutsListInfo": "Nové zkratky můžete přidat klepnutím na ikonku „+“. Upravit existující můžete klepnutím na název nebo URL adresu zkratky.",
        "shortcutsInfoText": "Vyberte, které zkratky se mají zobrazit",
        "adaptiveIconText": "Adaptivní tvary ikon",
        "adaptiveIconInfoText": "Ikony zkratek se zmenší",
        "ai_tools_button": "AI nástroje",
        "enable_ai_tools": "Zobrazí zkratky AI nástrojů",
        "googleAppsMenuText": "Google aplikace",
        "googleAppsMenuInfo": "Zobrazí zkratky Google aplikací",
        // Digital Clock
        "digitalclocktittle": "Digitální hodiny",
        "digitalclockinfo": "Přepne hodiny na digitální",
        "timeformattittle": "12hodinový formát",
        "timeformatinfo": "Použije se 12hodinový formát času",
        "greetingtittle": "Pozdrav",
        "greetinginfo": "Zobrazí pozdrav pod upravitelným textem",
        // Misc
        "userTextTitle": "Upravitelný text",
        "userTextInfo": "Zobrazí upravitelný text pod hodinami",
        "fahrenheitCelsiusCheckbox": "Přepnout na stupně Fahrenheita",
        "fahrenheitCelsiusText": "Změny se projeví po obnovení stránky",
        "micIconTitle": "Skrýt ikonu mikrofonu",
        "micIconInfo": "Pokud nefunguje hlasové vyhledávání",
        "hideSearchWith": "Skrýt vyhledávače",
        "hideSearchWithInfo": "Mezi vyhledávači přepnete klepnutím na jejich ikonky",
        "search_suggestions_button": "Návrhy ve vyhledávání",
        "search_suggestions_text": "Zapne návrhy vyhledávání",
        // Proxy
        "useproxytitletext": "Obcházení proxy",
        "useproxyText": "Pokud nefungují návrhy ve vyhledávání",
        "ProxyText": "Proxy pro obcházení CORS",
        "ProxySubtext": "Nastavte si vlastní proxy pro obcházení CORS",
        "HostproxyButton": "Provozování vlastní proxy",
        "saveproxy": "Uložit",
        // Location
        "UserLocText": "Zadejte svou polohu",
        "UserLocSubtext": "Pokud není správná poloha počasí",
        "userLoc": "Město nebo souřadnice (šířka, délka)",
        "InputOptionsButton": "Co lze zadat",
        "saveLoc": "Uložit",
        // Weather
        "WeatherApiText": "Zadejte svůj klíč k WeatherAPI",
        "WeatherApiSubtext": "Pokud nefunguje funkce počasí",
        "userAPI": "Váš klíč k WeatherAPI",
        "LearnMoreButton": "Zjistit více",
        "saveAPI": "Uložit",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"],
        "months": ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"],
        // End of Calendar

        // Weather
        "humidityLevel": "Vlhkost",
        "feelsLike": "Pocitová teplota",
        "location": "Země",
        // End of Weather

        // New Tab Item
        "conditionText": "Dobrý den! Jak se máte?",
        "enterBtn": "Vyhledat",
        "searchPlaceholder": "Zadejte hledaný výraz...",
        "listenPlaceholder": "Poslouchám...",
        "searchWithHint": "Vyhledávat prostřednictvím",
        "ai_tools": "AI nástroje",
        "userText": "Upravíte po kliknutí",
        "googleAppsHover": "Google aplikace",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Dobré ráno!",
            "afternoon": "Dobré odpoledne!",
            "evening": "Dobrý večer!"
        },

        // Wallpaper and alerts
        "uploadWallpaperText": "Nahrát tapetu",
        "backupText": "Zálohovat",
        "restoreText": "Obnovit",
    },


    // Italian
    "it": {
        // Menu Items
        "feedback": "Feedback",
        "resetsettings": "Reimposta Impostazioni",
        "menuCloseText": "Chiudi",
        // Shortcuts
        "shortcutsText": "Scorciatoie",
        "enableShortcutsText": "Abilita/disabilita scorciatoie",
        "editShortcutsText": "Modifica Scorciatoie",
        "editShortcutsList": "Modifica Scorciatoie",
        "shortcutsInfoText": "Scegli quali scorciatoie mostrare",
        "adaptiveIconText": "Forme di Icona Adattiva",
        "adaptiveIconInfoText": "Le icone delle scorciatoie saranno sempre rotonde",
        "ai_tools_button": "Strumenti IA",
        "enable_ai_tools": "Abilita/disabilita scorciatoie Strumenti IA",
        "googleAppsMenuText": "App Google",
        "googleAppsMenuInfo": "Mostra collegamenti App Google",
        // Digital Clock
        "digitalclocktittle": "Orologio Digitale",
        "digitalclockinfo": "Abilita/disabilita Orologio Digitale",
        "timeformattittle": "Usa formato 12h",
        "timeformatinfo": "Usa formato orario a 12 ore",
        "greetingtittle": "Saluto",
        "greetinginfo": "Mostra il saluto sotto il testo personalizzato",
        // Misc
        "userTextTitle": "Testo personalizzabile",
        "userTextInfo": "Mostra il testo personalizzato sotto l'orologio",
        "fahrenheitCelsiusCheckbox": "Passa a Fahrenheit",
        "fahrenheitCelsiusText": "Ricarica la pagina per vedere gli aggiornamenti",
        "micIconTitle": "Nascondi icona del microfono",
        "micIconInfo": "Se la digitazione vocale non funziona",
        "hideSearchWith": "Noscondi motori di ricerca",
        "hideSearchWithInfo": "Scegli tra i motori di ricerca cliccando l'icona",
        "search_suggestions_button": "Suggerimenti di Ricerca",
        "search_suggestions_text": "Abilita/disabilita Suggerimenti di Ricerca",
        // Proxy
        "useproxytitletext": "Bypass Proxy",
        "useproxyText": "Se i suggerimenti di ricerca non funzionano",
        "ProxyText": "Proxy di Bypass CORS",
        "ProxySubtext": "Aggiungi il tuo Proxy di Bypass CORS",
        "HostproxyButton": "Hosta il Tuo Proxy",
        "saveproxy": "Salva",
        // Location
        "UserLocText": "Inserisci la tua posizione",
        "UserLocSubtext": "Se la posizione meteo non è corretta",
        "userLoc": "La tua posizione (Città/Latitudine,Longitudine)",
        "InputOptionsButton": "Opzioni di Inserimento",
        "saveLoc": "Salva",
        // Weather
        "WeatherApiText": "Inserisci la tua chiave WeatherAPI",
        "WeatherApiSubtext": "Se la funzionalità meteo non funziona",
        "userAPI": "La tua chiave WeatherAPI",
        "LearnMoreButton": "Scopri di più",
        "saveAPI": "Salva",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
        "months": ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        // End of Calendar

        // Weather
        "humidityLevel": "Umidità",
        "feelsLike": "Percepito",
        "location": "Terra",
        // End of Weather

        // New Tab Item
        "conditionText": "Ciao! Come stai oggi?",
        "enterBtn": "Cerca",
        "searchPlaceholder": "Cerca...",
        "listenPlaceholder": "Ascoltando...",
        "searchWithHint": "Cerca con",
        "ai_tools": "Strumenti IA",
        "userText": "Clicca qui per modificare",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Buongiorno!",
            "afternoon": "Buon pomeriggio!",
            "evening": "Buona sera!"
        },

        // Wallpaper and alerts
        "uploadWallpaperText": "Carica immagine",    // Keep it shorter
        "backupText": "Backup",
        "restoreText": "Ripristina",
        "rangColor": "Scegli colore",    // Keep it shorter
        "reloadHint": "Ricarica la pagina dopo aver selezionato i temi",

        // Dialog boxes (alerts)
        "confirmWallpaper": "Vuoi impostare una nuova immagine come sfondo per oggi?",
        "confirmRestore": "Sei sicuro di voler reimpostare le impostazioni? Questa azione non può essere annullata.",
        "Nobackgroundset": "Nessuna immagine di sfondo è attualmente impostata.",
        "clearbackgroundimage": "Sei sicuro di voler rimuovere l'immagine di sfondo?",
        "confirmbackup": "Sei sicuro di voler eseguire il backup delle tue impostazioni?",
        "ProxyDisclaimer": "Tutte le funzionalità del proxy sono disattivate di default.\n\nSe abiliti i suggerimenti di ricerca e il proxy per il bypass CORS, è fortemente consigliato usare un proprio proxy per una maggiore privacy.\n\nIl proxy predefinito sarà configurato su https://mynt-proxy.rhythmcorehq.com, il che significa che tutti i tuoi dati passeranno attraverso questo servizio, con possibili rischi per la privacy.",
        "endlink": "Non ci dovrebbe essere uno / alla fine del link",
        "onlylinks": "Solo link (che iniziano con http:// o https://) sono consentiti.",
        "imagedimensions": "Attenzione: Le dimensioni dell'immagine caricata ({width}x{height}) superano i 1920x1080 pixel. \n\nCiò potrebbe influire sulle prestazioni o l'immagine potrebbe non essere caricata correttamente.",
        "failedbackup": "Backup fallito: ",
        "restorecompleted": "Ripristino completato con successo!",
        "restorefailed": "Ripristino fallito: "
    },


    // Turkish
    "tr": {
        // Menu Items
        "feedback": "Geri Bildirim",
        "resetsettings": "Ayarları Sıfırla",
        "menuCloseText": "Kapat",
        // Shortcuts
        "shortcutsText": "Kısayollar",
        "enableShortcutsText": "Kaydedilen kısayolları göster",
        "editShortcutsText": "Kısayolları Düzenle",
        "editShortcutsList": "Kaydedilen Kısayollar",
        "shortcutsInfoText": "Hangi kısayolların gösterileceğini seçin",
        "adaptiveIconText": "Uyarlanabilir İkon Şekilleri",
        "adaptiveIconInfoText": "Kısayol ikonları yuvarlak görünecek",
        "ai_tools_button": "AI Araçları",
        "enable_ai_tools": "AI Araçları kısayollarını göster",
        "googleAppsMenuText": "Google Uygulamaları",
        "googleAppsMenuInfo": "Google Uygulamaları için kısayollarını göster",
        // Digital Clock
        "digitalclocktittle": "Dijital Saat",
        "digitalclockinfo": "Dijital saate geçiş yap",
        "timeformattittle": "12 Saat Formatı",
        "timeformatinfo": "12 saat zaman formatını kullanın",
        "greetingtittle": "Hoşgeldiniz",
        "greetinginfo": "Özel metinin altında hoşgeldiniz mesajını göster",
        // Misc
        "userTextTitle": "Özelleştirilebilir Metin",
        "userTextInfo": "Saatin altında özel metin göster",
        "fahrenheitCelsiusCheckbox": "Fahrenheit'a geç",
        "fahrenheitCelsiusText": "Güncellemeleri görmek için sayfayı yenileyin",
        "micIconTitle": "Mikrofon Simgesini Gizle",
        "micIconInfo": "Eğer sesli yazma çalışmıyorsa",
        "search_suggestions_button": "Arama Önerileri",
        "search_suggestions_text": "Arama Önerilerini etkinleştir",
        // Proxy
        "useproxytitletext": "Proxy Atlatma",
        "useproxyText": "Eğer arama önerileri çalışmıyorsa",
        "ProxyText": "CORS Atlatma Proxy",
        "ProxySubtext": "Kendi CORS Atlatma Proxy'nizi ekleyin",
        "HostproxyButton": "Kendi Proxy'nizi Barındırın",
        "saveproxy": "Kaydet",
        // Location
        "UserLocText": "Konumunuzu girin",
        "UserLocSubtext": "Hava durumu konumu doğru değilse",
        "userLoc": "Konumunuz (Şehir/Enlem,Boylam)",
        "InputOptionsButton": "Girdi Seçenekleri",
        "saveLoc": "Kaydet",
        // Weather
        "WeatherApiText": "Kendi WeatherAPI anahtarınızı girin",
        "WeatherApiSubtext": "Hava durumu işlevi çalışmıyorsa",
        "userAPI": "WeatherAPI anahtarınız",
        "LearnMoreButton": "Daha Fazla Bilgi Edinin",
        "saveAPI": "Kaydet",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
        "months": ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        // End of Calendar

        // Weather
        "humidityLevel": "Nem",
        "feelsLike": "Hissediyor",
        "location": "Dünya",
        // End of Weather

        // New Tab Item
        "conditionText": "Merhaba! Bugün nasılsın?",
        "enterBtn": "Arama Yap",
        "searchPlaceholder": "Aramanız...",
        "listenPlaceholder": "Dinliyor...",
        "searchWithHint": "ile Ara",
        "ai_tools": "AI Araçları",
        "userText": "Buraya tıklayarak düzenleyin",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Günaydın!",
            "afternoon": "İyi öğleden sonra!",
            "evening": "İyi akşamlar!"
        },
    },


    // Bengali
    "bn": {
        // Menu Items
        "feedback": "মতামত",
        "resetsettings": "সেটিংস পুনরায় সেট করুন",
        "menuCloseText": "বন্ধ করুন",

        // Shortcuts
        "shortcutsText": "শর্টকাট",
        "enableShortcutsText": "সংরক্ষিত শর্টকাটগুলি প্রদর্শন করুন",
        "editShortcutsText": "শর্টকাট সম্পাদনা করুন",
        "shortcutsInfoText": "যে শর্টকাটগুলো দেখাতে চান তা নির্বাচন করুন",
        "editShortcutsList": "সংরক্ষিত শর্টকাট",
        "editShortcutsListInfo": "'+' আইকনে ক্লিক করে নতুন শর্টকাট যোগ করুন অথবা বিদ্যমান শর্টকাটের নাম বা URL এ ক্লিক করে সম্পাদনা করুন।",
        "adaptiveIconText": "অ্যাডাপ্টিভ আইকন আকৃতি",
        "adaptiveIconInfoText": "শর্টকাট আইকনগুলো ছোট আকারে প্রদর্শন হবে",
        "ai_tools_button": "এআই সরঞ্জাম",
        "enable_ai_tools": "এআই সরঞ্জামের শর্টকাট প্রদর্শন করুন",
        "googleAppsMenuText": "গুগল অ্যাপস",
        "googleAppsMenuInfo": "গুগল অ্যাপসের শর্টকাট প্রদর্শন করুন",

        // Digital Clock
        "digitalclocktittle": "ডিজিটাল ঘড়ি",
        "digitalclockinfo": "ডিজিটাল ঘড়িতে পরিবর্তন করুন",
        "timeformattittle": "১২-ঘণ্টা ফরম্যাট",
        "timeformatinfo": "১২-ঘণ্টার সময় ফরম্যাট ব্যবহার করুন",
        "greetingtittle": "অভিবাদন",
        "greetinginfo": "কাস্টম টেক্সটের নিচে অভিবাদন দেখান",

        // Misc
        "userTextTitle": "কাস্টমাইজেবল টেক্সট",
        "userTextInfo": "ঘড়ির নিচে কাস্টম টেক্সট দেখান",
        "fahrenheitCelsiusCheckbox": "ফারেনহাইটে পরিবর্তন করুন",
        "fahrenheitCelsiusText": "পরিবর্তন প্রয়োগ করতে পেজ রিফ্রেশ করুন",
        "micIconTitle": "মাইক্রোফোন আইকন লুকান",
        "micIconInfo": "যদি ভয়েস টাইপিং কাজ না করে",
        "hideSearchWith": "সার্চ ইঞ্জিন লুকান",
        "hideSearchWithInfo": "সার্চ ইঞ্জিনের আইকনে ক্লিক করে সার্চ ইঞ্জিন পরিবর্তন করুন",
        "search_suggestions_button": "সার্চ সাজেশন",
        "search_suggestions_text": "সার্চ সাজেশন সক্রিয় করুন",

        // Proxy
        "useproxytitletext": "প্রক্সি বাইপাস",
        "useproxyText": "যদি সার্চ সাজেশন কাজ না করে",
        "ProxyText": "CORS বাইপাস প্রক্সি",
        "ProxySubtext": "নিজস্ব CORS বাইপাস প্রক্সি যোগ করুন",
        "HostproxyButton": "নিজস্ব প্রক্সি হোস্ট করুন",
        "saveproxy": "সংরক্ষণ করুন",

        // Location
        "UserLocText": "আপনার অবস্থান লিখুন",
        "UserLocSubtext": "যদি আবহাওয়া অবস্থান সঠিক না হয়",
        "userLoc": "আপনার শহর বা স্থানাঙ্ক (অক্ষাংশ, দ্রাঘিমাংশ)",
        "InputOptionsButton": "ইনপুট অপশন",
        "saveLoc": "সংরক্ষণ করুন",

        // Weather
        "WeatherApiText": "আপনার WeatherAPI কী লিখুন",
        "WeatherApiSubtext": "যদি আবহাওয়ার ফাংশন কাজ না করে",
        "userAPI": "আপনার WeatherAPI কী",
        "LearnMoreButton": "আরও জানুন",
        "saveAPI": "সংরক্ষণ করুন",

        // Body Items
        // Calendar
        "days": ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'],   // Truncated for display
        //"days": ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],   // Full
        "months": ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
        // "months": ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রি', 'মে', 'জুন', 'জুলাই', 'আগ', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'],   // Truncated

        // Weather
        "humidityLevel": "আর্দ্রতা",
        "feelsLike": "অনুভূতি হয়",
        "location": "পৃথিবী",

        // New Tab Item
        "conditionText": "হ্যালো! আজ আপনি কেমন আছেন?",
        "enterBtn": "সার্চ করুন",
        "searchPlaceholder": "এখানে টাইপ করুন...",
        "listenPlaceholder": "শোনা হচ্ছে...",
        "searchWithHint": "সার্চের মাধ্যম",
        "ai_tools": "এআই টুলস",
        "userText": "এখানে আপনার টেক্সট লিখুন",
        "googleAppsHover": "গুগল অ্যাপস",

        // Greeting
        greeting: {
            "morning": "শুভ সকাল!",
            "afternoon": "শুভ বিকেল!",
            "evening": "শুভ সন্ধ্যা!"
        },

        // Search Engines and rest
        "googleEngine": "গুগল",
        "duckEngine": "ডাকডাকগো",
        "bingEngine": "বিং",
        "braveEngine": "ব্রেভ",
        "youtubeEngine": "ইউটিউব",
        "chatGPT": "চ্যাটজিপিটি",
        "gemini": "জেমিনি",
        "copilot": "কোপাইলট",
        "perplexity": "পারপ্লেক্সিটি",
        "firefly": "অ্যাডোবি ফায়ারফ্লাই",
        "github": "গিটহাব",

        // Wallpaper and alerts
        "uploadWallpaperText": "ওয়ালপেপার দিন", //"ওয়ালপেপার আপলোড করুন"
        "backupText": "ব্যাকআপ করুন",
        "restoreText": "পুনরুদ্ধার করুন",
        "rangColor": "রঙ নির্বাচন করুন",
        "reloadHint": "থিম প্রয়োগ করার পরে পেজ রিফ্রেশ করুন",

        // Dialog boxes (alerts)
        "confirmWallpaper": "আপনি কি আজকের জন্য একটি নতুন ছবি ওয়ালপেপার হিসেবে সেট করতে চান?",
        "confirmRestore": "আপনি কি নিশ্চিত যে আপনি আপনার সেটিংস রিসেট করতে চান? এটি পূর্বাবস্থায় ফেরানো যাবে না।",
        "Nobackgroundset": "বর্তমানে কোন ব্যাকগ্রাউন্ড ইমেজ সেট করা হয়নি।",
        "clearbackgroundimage": "আপনি কি ব্যাকগ্রাউন্ড ইমেজ মুছে ফেলতে চান?",
        "confirmbackup": "আপনি কি নিশ্চিত যে আপনি আপনার সেটিংস ব্যাকআপ করতে চান?",
        "ProxyDisclaimer": "সমস্ত প্রক্সি ফিচার ডিফল্টভাবে বন্ধ থাকে।\n\nআপনি যদি সার্চ সাজেশন এবং CORS বাইপাস প্রক্সি সক্রিয় করেন, তাহলে উন্নত গোপনীয়তার জন্য আপনার নিজস্ব প্রক্সি হোস্ট করার পরামর্শ দেওয়া হয়।\n\nডিফল্টভাবে প্রক্সি https://mynt-proxy.rhythmcorehq.com এ সেট করা হবে, যার মানে আপনার সমস্ত ডেটা এই পরিষেবার মাধ্যমে যাবে, যা গোপনীয়তার ঝুঁকি তৈরি করতে পারে।",
        "endlink": "লিঙ্কের শেষে / থাকা উচিত নয়",
        "onlylinks": "শুধুমাত্র লিঙ্ক (http:// বা https:// দিয়ে শুরু) অনুমোদিত।",
        "imagedimensions": "সতর্কতা: আপলোড করা ছবির মাত্রা ({width}x{height}) ১৯২০x১০৮০ পিক্সেলের বেশি। \n\nএটি কর্মক্ষমতায় প্রভাব ফেলতে পারে বা ছবি সঠিকভাবে লোড হতে ব্যর্থ হতে পারে।",
        "failedbackup": "ব্যাকআপ ব্যর্থ: ",
        "restorecompleted": "পুনরুদ্ধার সফলভাবে সম্পন্ন হয়েছে!",
        "restorefailed": "পুনরুদ্ধার ব্যর্থ: ",
    },


    // Vietnamese
    "vi": {
        // Menu Items
        "feedback": "Phản hồi",
        "resetsettings": "Đặt lại Cài đặt",
        "menuCloseText": "Đóng",
        // Shortcuts
        "shortcutsText": "Phím tắt",
        "enableShortcutsText": "Bật/tắt phím tắt",
        "editShortcutsText": "Chỉnh sửa Phím tắt",
        "editShortcutsList": "Chỉnh sửa Danh sách Phím tắt",
        "shortcutsInfoText": "Chọn các phím tắt muốn hiển thị",
        "adaptiveIconText": "Hình dạng Biểu tượng Thích ứng",
        "adaptiveIconInfoText": "Biểu tượng phím tắt sẽ luôn là hình tròn",
        "ai_tools_button": "Công cụ AI",
        "enable_ai_tools": "Bật/tắt các phím tắt Công cụ AI",
        "googleAppsMenuText": "Ứng dụng Google",
        "googleAppsMenuInfo": "Hiển thị các phím tắt cho Ứng dụng Google",
        // Digital Clock
        "digitalclocktittle": "Đồng hồ Kỹ thuật số",
        "digitalclockinfo": "Bật/tắt Đồng hồ Kỹ thuật số",
        "timeformattittle": "Sử dụng Định dạng 12 giờ",
        "timeformatinfo": "Sử dụng định dạng thời gian 12 giờ",
        "greetingtittle": "Lời chào",
        "greetinginfo": "Hiển thị lời chào dưới văn bản tùy chỉnh",
        // Misc
        "userTextTitle": "Văn bản tùy chỉnh",
        "userTextInfo": "Hiển thị văn bản tùy chỉnh dưới đồng hồ",
        "fahrenheitCelsiusCheckbox": "Chuyển sang Fahrenheit",
        "fahrenheitCelsiusText": "Tải lại trang để thấy cập nhật",
        "micIconTitle": "Ẩn biểu tượng mic",
        "micIconInfo": "Nếu gõ bằng giọng nói không hoạt động",
        "search_suggestions_button": "Gợi ý Tìm kiếm",
        "search_suggestions_text": "Bật/tắt Gợi ý Tìm kiếm",
        // Proxy
        "useproxytitletext": "Bỏ qua Proxy",
        "useproxyText": "Nếu gợi ý tìm kiếm không hoạt động",
        "ProxyText": "Proxy Bỏ qua CORS",
        "ProxySubtext": "Thêm Proxy Bỏ qua CORS của bạn",
        "HostproxyButton": "Tự Chạy Proxy",
        "saveproxy": "Lưu",
        // Location
        "UserLocText": "Nhập vị trí của bạn",
        "UserLocSubtext": "Nếu vị trí thời tiết không chính xác",
        "userLoc": "Vị trí của bạn (Thành phố/Vĩ độ, Kinh độ)",
        "InputOptionsButton": "Tùy chọn Nhập",
        "saveLoc": "Lưu",
        // Weather
        "WeatherApiText": "Nhập khóa WeatherAPI của bạn",
        "WeatherApiSubtext": "Nếu tính năng thời tiết không hoạt động",
        "userAPI": "Khóa WeatherAPI của bạn",
        "LearnMoreButton": "Tìm hiểu Thêm",
        "saveAPI": "Lưu",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
        "months": ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'],
        // End of Calendar

        // Weather
        "humidityLevel": "Độ ẩm",
        "feelsLike": "cảm giác như là",
        "location": "Trái Đất",
        // End of Weather

        // New Tab Item
        "conditionText": "Xin chào! Bạn cảm thấy thế nào hôm nay?",
        "enterBtn": "Tìm kiếm",
        "searchPlaceholder": "Nhập câu hỏi của bạn...",
        "listenPlaceholder": "Đang nghe...",
        "searchWithHint": "Tìm kiếm Với",
        "ai_tools": "Công cụ AI",
        "userText": "Nhấp vào đây để chỉnh sửa",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Chào buổi sáng!",
            "afternoon": "Chào buổi chiều!",
            "evening": "Chào buổi tối!"
        },
    },


    // Russian
    "ru": {
        // Menu Items
        "feedback": "Обратная связь",
        "resetsettings": "Сброс настроек",
        "menuCloseText": "Закрыть",
        // Shortcuts
        "shortcutsText": "Ярлыки",
        "enableShortcutsText": "Включить/Отключить ярлыки",
        "editShortcutsText": "Редактировать ярлыки",
        "editShortcutsList": "Редактировать ярлыки",
        "shortcutsInfoText": "Выберите, какие ярлыки будут отображаться",
        "editShortcutsList": "Сохранёные ярлыки",
        'editShortcutsListInfo': 'Вы можете добавить новые ярлыки нажав на "+" или отредактировать существующие, щёлкнув на ярлык или URL.',
        "adaptiveIconText": "Адаптивные формы значков",
        "adaptiveIconInfoText": "Ярлыки всегда будут круглыми",
        "ai_tools_button": "Инструменты ИИ",
        "enable_ai_tools": "Включить/Отключить ярлыки ИИ",
        "googleAppsMenuText": "Приложения Google",
        "googleAppsMenuInfo": "Показать ярлыки для приложений Google",
        // Digital Clock
        "digitalclocktittle": "Цифровые часы",
        "digitalclockinfo": "Включить/Отключить цифровые часы",
        "timeformattittle": "12-часовой формат",
        "timeformatinfo": "Использовать 12-часовой формат времени",
        "greetingtittle": "Приветствие",
        "greetinginfo": "Показать приветствие под вашим текстом",
        // Misc
        "userTextTitle": "Настраиваемый текст",
        "userTextInfo": "Отображение текста под часами",
        "fahrenheitCelsiusCheckbox": "Использовать Фаренгейт",
        "fahrenheitCelsiusText": "Обновите страницу, чтобы применить",
        "micIconTitle": "Скрыть значок микрофона",
        "micIconInfo": "Если голосовой ввод не работает",
        "hideSearchWith": "Скрыть поисковые системы",
        "hideSearchWithInfo": "Переключайте поисковые системы, щёлкая по их значку",
        "search_suggestions_button": "Поисковые подсказки",
        "search_suggestions_text": "Включить/Отключить поисковые подсказки",
        // Proxy
        "useproxytitletext": "Использовать прокси",
        "useproxyText": "Если поисковые подсказки не работают",
        "ProxyText": "CORS обход прокси",
        "ProxySubtext": "Добавьте свой CORS-прокси",
        "HostproxyButton": "Разместить свой прокси",
        "saveproxy": "Сохранить",
        // Location
        "UserLocText": "Введите ваше местоположение",
        "UserLocSubtext": "Если местоположение для погоды неверно",
        "userLoc": "Ваше местоположение (Город/Широта,Долгота)",
        "InputOptionsButton": "Опции ввода",
        "saveLoc": "Сохранить",
        // Weather
        "WeatherApiText": "Введите свой ключ WeatherAPI",
        "WeatherApiSubtext": "Если функция погоды не работает",
        "userAPI": "Ваш ключ WeatherAPI",
        "LearnMoreButton": "Узнать больше",
        "saveAPI": "Сохранить",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        "months": ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        // End of Calendar

        // Weather
        "humidityLevel": "Влажность",
        "feelsLike": "Ощущается",
        "location": "Земля",
        // End of Weather

        // New Tab Item
        "conditionText": "Привет! Как ты сегодня?",
        "enterBtn": "Поиск",
        "searchPlaceholder": "Ваш запрос...",
        "listenPlaceholder": "Слушаю...",
        "searchWithHint": "Искать с",
        "ai_tools": "Нейросети",
        "userText": "Нажмите здесь, чтобы редактировать",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Доброе утро!",
            "afternoon": "Добрый день!",
            "evening": "Добрый вечер!"
        },

        // Search Engines and rest
        "googleEngine": "Google",
        "duckEngine": "Duck",
        "bingEngine": "Bing",
        "braveEngine": "Brave",
        "youtubeEngine": "YouTube",
        "chatGPT": "ЧатGPT",
        "gemini": "Gemini",
        "copilot": "Копилот",
        "perplexity": "Perplexity",
        "firefly": "Adobe Firefly",
        "github": "GitHub",
        "googleAppsHover": "Гугл приложения",

        // Wallpaper and alerts
        "uploadWallpaperText": "Загрузить обои",
        "backupText": "Экспорт настроек",
        "restoreText": "Восстановить",
        "rangColor": "Выбрать цвет",
        "reloadHint": "Перезагрузите страницу для применения темы.",

        //Dialog boxes (alerts)
        "confirmWallpaper": "Хотите установить новое изображение в качестве обоев на весь день?",
        "confirmRestore": "Вы уверены, что хотите сбросить настройки? Это действие нельзя отменить",
        "Nobackgroundset": "В настоящее время обои не установлены.",
        "clearbackgroundimage": "Вы уверены что хотите убрать обои?",
        "confirmbackup": "Вы уверены что хотите создать резервную копию настроек?",
        "ProxyDisclaimer": "По умолчанию все функции прокси отключены.\n\nЕсли вы включите поисковые предложения и прокси для обхода CORS, настоятельно рекомендуется разместить собственный прокси для повышения конфиденциальности.\n\nПо умолчанию прокси будет установлен на https://mynt-proxy.rhythmcorehq.com, то есть все ваши данные будут проходить через этот сервис, что может вызвать проблемы с конфиденциальностью.",
        "endlink": "В конце ссылки не должно быть /",
        "onlylinks": "Разрешены только ссылки (начинаются с http:// or https://).",
        "imagedimensions": "Предупреждение: Размеры загруженного изображения ({width}x{height}) превышают 1920x1080 пикселей. \n\nЭто может повлиять на производительность или изображение может не загрузиться должным образом.",
        "failedbackup": "Резервное копирование не удалось: ",
        "restorecompleted": "Восстановление настроек успешно завершено!",
        "restorefailed": "Восстановление настроек не удалось: ",
    },


    // Uzbek
    "uz": {
        // Menu Items
        "feedback": "Fikr-mulohaza",
        "resetsettings": "Sozlamalarni tiklash",
        "menuCloseText": 'Yopish',
        // Shortcuts
        "shortcutsText": "Tezkor tugmalar",
        "enableShortcutsText": "Tezkor tugmalarni ko'rsatish",
        "editShortcutsText": "Tezkor tugmalarni tahrirlash",
        "editShortcutsList": "Saqlangan Tezkor tugmalar",
        "shortcutsInfoText": "Qaysi tezkor tugmalarni ko'rsatishni tanlang",
        "adaptiveIconText": "Adaptiv ikonlar shakllari",
        "adaptiveIconInfoText": "Tezkor tugmalar doimiy ravishda doiraviy bo'ladi",
        "ai_tools_button": "AI-instrumentlar",
        "enable_ai_tools": "Tezkor tugmalarni ko'rsatish AI-instrumentlar",
        "googleAppsMenuText": "Google Dasturlari",
        "googleAppsMenuInfo": "Google Dasturlariga qisqacha havolani ko'rsating",
        // Digital Clock
        "digitalclocktittle": "Digital Clock",
        "digitalclockinfo": "Digital Clockga o'tish",
        "timeformattittle": "12-soat format",
        "timeformatinfo": "12-soat formatni qo'llang",
        "greetingtittle": "Salomlashish",
        "greetinginfo": "Savatchadagi text pastdagi salomlashishni ko'rsatish",
        // Misc
        "userTextTitle": "Tahrirlash mumkin bo'lgan matn",
        "userTextInfo": "Savatchadagi text pastdagi salomlashishni ko'rsatish",
        "fahrenheitCelsiusCheckbox": "Fahrenheitga o'tish",
        "fahrenheitCelsiusText": "Sahifani yangilash, o'zgarishlarni qo'llash",
        "micIconTitle": "Mikrofon belgisini yashirish",
        "micIconInfo": "Agar ovozli yozish ishlamasa",
        "search_suggestions_button": "Izlash tavsiyalari",
        "search_suggestions_text": "Izlash tavsiyalarini yoqish",
        // Proxy
        "useproxytitletext": "Proxy Bypass",
        "useproxyText": "Izlash tavsiyalari ishlamaydi",
        "ProxyText": "CORS Bypass Proxy",
        "ProxySubtext": "O'zingizning CORS bypass proxyni qo'shing",
        "HostproxyButton": "O'zingizning proxyni joylash",
        "saveproxy": "Saqlash",
        // Location
        "UserLocText": "O'zingizning joylashganligingizni kiriting",
        "UserLocSubtext": "Agar havo joylashuvi noto'g'ri bo'lsa",
        "userLoc": "O'zingizning shahringiz yoki koordinatalaringiz (Kenglik, Uzunlik)",
        "InputOptionsButton": "Kirish imkoniyatlari",
        "saveLoc": "Saqlash",
        // Weather
        "WeatherApiText": "O'zingizning WeatherAPI kalitini kiriting",
        "WeatherApiSubtext": "Agar havo funktsiyasi ishlamaydi",
        "userAPI": "O'zingizning WeatherAPI kaliti",
        "LearnMoreButton": "Bilish",
        "saveAPI": "Saqlash",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
        "months": ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'],
        // End of Calendar

        // Weather
        "humidityLevel": "Namlik",
        "feelsLike": "Uxshaydi",
        "location": "Yer",
        // End of Weather

        // New Tab Item
        "conditionText": "Salom! Siz bugun qanday holatdasiz?",
        "enterBtn": "Izlash",
        "searchPlaceholder": "Sizning savolingiz...",
        "listenPlaceholder": "Tinglayapman...",
        "searchWithHint": "Bular bilan izlash",
        "ai_tools": "AI Texnikalar",
        "userText": "Buni tahrirlash",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Xayrli tong!",
            "afternoon": "Xayrli tushlik!",
            "evening": "Xayrli kech!"
        },
    },


    // Spanish
    "es": {
        // Menu Items
        "feedback": "Comentarios",
        "resetsettings": "Restablecer configuraciones",
        "menuCloseText": "Cerrar",
        // Shortcuts
        "shortcutsText": "Accesos directos",
        "enableShortcutsText": "Mostrar accesos directos guardados",
        "editShortcutsText": "Editar accesos directos",
        "editShortcutsList": "Accesos directos guardados",
        "shortcutsInfoText": "Elige qué accesos directos mostrar",
        "adaptiveIconText": "Iconos adaptativos",
        "adaptiveIconInfoText": "Los iconos de accesos directos serán más pequeños",
        "ai_tools_button": "Herramientas de IA",
        "enable_ai_tools": "Mostrar accesos directos de herramientas de IA",
        "googleAppsMenuText": "Aplicaciones de Google",
        "googleAppsMenuInfo": "Mostrar accesos directos a las aplicaciones de Google",
        // Digital Clock
        "digitalclocktittle": "Reloj digital",
        "digitalclockinfo": "Cambiar a reloj digital",
        "timeformattittle": "Formato de 12 horas",
        "timeformatinfo": "Usar formato de 12 horas",
        "greetingtittle": "Saludo",
        "greetinginfo": "Mostrar saludo debajo del texto personalizado",
        // Misc
        "userTextTitle": "Texto personalizable",
        "userTextInfo": "Mostrar texto personalizado debajo del reloj",
        "fahrenheitCelsiusCheckbox": "Cambiar a Fahrenheit",
        "fahrenheitCelsiusText": "Recarga la página para aplicar cambios",
        "micIconTitle": "Ocultar ícono de micrófono",
        "micIconInfo": "Si la escritura por voz no está funcionando",
        "search_suggestions_button": "Sugerencias de búsqueda",
        "search_suggestions_text": "Habilitar sugerencias de búsqueda",
        // Proxy
        "useproxytitletext": "Omisión de proxy",
        "useproxyText": "Si las sugerencias de búsqueda no funcionan",
        "ProxyText": "Proxy CORS por defecto",
        "ProxySubtext": "Añade tu propio proxy CORS",
        "HostproxyButton": "Aloja tu propio proxy",
        "saveproxy": "Guardar",
        // Location
        "UserLocText": "Ingresa tu ubicación",
        "UserLocSubtext": "Si la ubicación del clima es incorrecta",
        "userLoc": "Tu ciudad o coordenadas (Latitud, Longitud)",
        "InputOptionsButton": "Opciones de entrada",
        "saveLoc": "Guardar",
        // Weather
        "WeatherApiText": "Ingresa tu clave de WeatherAPI",
        "WeatherApiSubtext": "Si la funcionalidad del clima no funciona",
        "userAPI": "Tu clave de WeatherAPI",
        "LearnMoreButton": "Más información",
        "saveAPI": "Guardar",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        "months": ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        // End of Calendar

        // Weather
        "humidityLevel": "Humedad",
        "feelsLike": "Sensación",
        "location": "Ubicación",
        // End of Weather

        // New Tab Item
        "conditionText": "¡Hola! ¿Cómo estás hoy?",
        "enterBtn": "Buscar",
        "searchPlaceholder": "Escribe tu búsqueda...",
        "listenPlaceholder": "Escuchando...",
        "searchWithHint": "Buscar con",
        "ai_tools": "Herramientas de IA",
        "userText": "Haz clic aquí para editar",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "¡Buenos días!",
            "afternoon": "¡Buenas tardes!",
            "evening": "¡Buenas noches!"
        },
    },


    // Japanese
    "ja": {
        // Menu Items
        "feedback": "フィードバック",
        "resetsettings": "設定をリセット",
        "menuCloseText": "閉じる",
        // Shortcuts
        "shortcutsText": "ショートカット",
        "enableShortcutsText": "保存されたショートカットを表示",
        "editShortcutsText": "ショートカットを編集",
        "editShortcutsList": "保存されたショートカット",
        "shortcutsInfoText": "表示するショートカットを選択",
        'editShortcutsListInfo': '"+" アイコンをクリックして新しいショートカットを追加したり、ショートカット名またはURLをクリックして既存のショートカットを編集したりできます',
        "adaptiveIconText": "アダプティブアイコン",
        "adaptiveIconInfoText": "ショートカットアイコンは小さく表示されます",
        "ai_tools_button": "AIツール",
        "enable_ai_tools": "AIツールのショートカットを表示",
        "googleAppsMenuText": "Googleアプリ",
        "googleAppsMenuInfo": "Googleアプリのショートカットを表示",
        // Digital Clock
        "digitalclocktittle": "デジタル時計",
        "digitalclockinfo": "デジタル時計に変更",
        "timeformattittle": "12時間形式",
        "timeformatinfo": "12時間形式を使用",
        "greetingtittle": "あいさつ",
        "greetinginfo": "カスタムテキストの下にあいさつを表示",
        // Misc
        "userTextTitle": "カスタムテキスト",
        "userTextInfo": "時計の下にカスタムテキストを表示",
        "fahrenheitCelsiusCheckbox": "華氏に変更",
        "fahrenheitCelsiusText": "変更を適用するにはページを再読み込み",
        "micIconTitle": "マイクアイコンを非表示",
        "micIconInfo": "音声入力が動作しない場合",
        "search_suggestions_button": "検索候補",
        "search_suggestions_text": "検索候補を有効にする",
        // Proxy
        "useproxytitletext": "プロキシ使用",
        "useproxyText": "検索候補が機能しない場合",
        "ProxyText": "デフォルトCORSプロキシ",
        "ProxySubtext": "独自のCORSプロキシを追加",
        "HostproxyButton": "独自のプロキシをホスト",
        "saveproxy": "保存",
        // Location
        "UserLocText": "場所を入力",
        "UserLocSubtext": "天気の地域が正しくない場合",
        "userLoc": "都市または座標（緯度、経度）",
        "InputOptionsButton": "入力オプション",
        "saveLoc": "保存",
        // Weather
        "WeatherApiText": "WeatherAPIキーを入力",
        "WeatherApiSubtext": "天気機能が動作しない場合",
        "userAPI": "WeatherAPIキー",
        "LearnMoreButton": "詳細情報",
        "saveAPI": "保存",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        "months": ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        // End of Calendar

        // Weather
        "humidityLevel": "湿度",
        "feelsLike": "体感温度",
        "location": "場所",
        // End of Weather

        // New Tab Item
        "conditionText": "こんにちは！本日の調子はいかがですか？",
        "enterBtn": "検索",
        "searchPlaceholder": "検索キーワードを入力...",
        "listenPlaceholder": "聴き取り中...",
        "searchWithHint": "次で検索",
        "ai_tools": "AIツール",
        "userText": "ここをクリックして編集",
        "googleAppsHover": "Googleアプリ",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "おはようございます！",
            "afternoon": "こんにちは！",
            "evening": "こんばんは！"
        },

        // Search Engines and rest
        "googleEngine": "Google",
        "duckEngine": "DuckDuckGo",
        "bingEngine": "Bing",
        "braveEngine": "Brave",
        "youtubeEngine": "YouTube",
        "chatGPT": "ChatGPT",
        "gemini": "Gemini",
        "copilot": "Copilot",
        "perplexity": "Perplexity",
        "firefly": "Adobe Firefly",
        "github": "GitHub",
    },


    // Korean
    "ko": {
        // Menu Items
        "feedback": "피드백",
        "resetsettings": "설정 초기화",
        "menuCloseText": "닫기",
        // Shortcuts
        "shortcutsText": "단축키",
        "enableShortcutsText": "저장된 단축키 표시",
        "editShortcutsText": "단축키 편집",
        "editShortcutsList": "저장된 단축키",
        "shortcutsInfoText": "표시할 단축키 선택",
        "adaptiveIconText": "적응형 아이콘 모양",
        "adaptiveIconInfoText": "단축 아이콘이 더 작게 표시됩니다",
        "ai_tools_button": "AI 도구",
        "enable_ai_tools": "AI 도구 단축키 표시",
        "googleAppsMenuText": "Google 앱",
        "googleAppsMenuInfo": "Google 앱 바로가기 표시",
        // Digital Clock
        "digitalclocktittle": "디지털 시계",
        "digitalclockinfo": "디지털 시계로 전환",
        "timeformattittle": "12시간 형식",
        "timeformatinfo": "12시간 형식 사용",
        "greetingtittle": "인사말",
        "greetinginfo": "사용자 정의 텍스트 아래에 인사말 표시",
        // Misc
        "userTextTitle": "사용자 정의 텍스트",
        "userTextInfo": "시계 아래에 사용자 정의 텍스트 표시",
        "fahrenheitCelsiusCheckbox": "화씨로 전환",
        "fahrenheitCelsiusText": "변경 사항을 적용하려면 페이지를 새로 고침하십시오",
        "micIconTitle": "마이크 아이콘 숨기기",
        "micIconInfo": "음성 입력이 작동하지 않으면",
        "search_suggestions_button": "검색 제안",
        "search_suggestions_text": "검색 제안 활성화",
        // Proxy
        "useproxytitletext": "프록시 우회",
        "useproxyText": "검색 제안이 작동하지 않으면",
        "ProxyText": "CORS 우회 프록시",
        "ProxySubtext": "자신의 CORS 우회 프록시 추가",
        "HostproxyButton": "자신의 프록시 호스팅",
        "saveproxy": "저장",
        // Location
        "UserLocText": "위치 입력",
        "UserLocSubtext": "날씨 위치가 정확하지 않으면",
        "userLoc": "당신의 도시 또는 좌표 (위도, 경도)",
        "InputOptionsButton": "입력 옵션",
        "saveLoc": "저장",
        // Weather
        "WeatherApiText": "WeatherAPI 키 입력",
        "WeatherApiSubtext": "날씨 기능이 작동하지 않으면",
        "userAPI": "당신의 WeatherAPI 키",
        "LearnMoreButton": "자세히 알아보기",
        "saveAPI": "저장",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        "months": ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        // End of Calendar

        // Weather
        "humidityLevel": "습도",
        "feelsLike": "체감",
        "location": "지구",
        // End of Weather

        // New Tab Item
        "conditionText": "안녕하세요! 오늘 기분은 어떠세요?",
        "enterBtn": "검색",
        "searchPlaceholder": "검색어를 입력하세요...",
        "listenPlaceholder": "듣고 있습니다...",
        "searchWithHint": "검색 방법",
        "ai_tools": "AI 도구",
        "userText": "편집하려면 클릭하세요",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "좋은 아침!",
            "afternoon": "좋은 오후!",
            "evening": "좋은 저녁!"
        },

        // Search Engines and rest
        "googleEngine": "구글",
        "duckEngine": "덕덕고",
        "bingEngine": "빙",
        "braveEngine": "브레이브",
        "youtubeEngine": "유튜브",
        "chatGPT": "챗GPT",
        "gemini": "제미니",
        "copilot": "코파일럿",
        "perplexity": "퍼플렉시티",
        "firefly": "어도비 파이어플라이",
        "github": "깃허브",
        "googleAppsHover": "구글 앱",
    },


    // Indonesian
    "idn": {
        // Menu Items
        "feedback": "Umpan Balik",
        "resetsettings": "Setelan Awal",
        "menuCloseText": "Tutup",
        // Shortcuts
        "shortcutsText": "Pintasan",
        "enableShortcutsText": "Menampilkan Pintasan",
        "editShortcutsText": "Ubah Pintasan",
        "editShortcutsList": "Pintasan Tersimpan",
        'editShortcutsListInfo': 'Anda dapat menambahkan pintasan baru dengan mengeklik ikon "+" atau mengedit pintasan yang sudah ada dengan mengeklik nama pintasan atau URL',
        "shortcutsInfoText": "Pilih pintasan apa yang akan ditampilkan",
        "adaptiveIconText": "Penyesuaian Bentuk Ikon",
        "adaptiveIconInfoText": "Ikon pintasan akan terlihat lebih kecil",
        "ai_tools_button": "Utilitas AI",
        "enable_ai_tools": "Tampilkan pintasan untuk utilitas AI",
        "googleAppsMenuText": "Google Apps",
        "googleAppsMenuInfo": "Tampilkan pintasan untuk Google Apps",
        // Digital Clock
        "digitalclocktittle": "Jam Digital",
        "digitalclockinfo": "Ubah menjadi jam digital",
        "timeformattittle": "Format 12-Jam",
        "timeformatinfo": "Menggunakan format 12-jam",
        "greetingtittle": "Sapaan",
        "greetinginfo": "Tampilkan sapaan di bawah teks kustom",
        // Misc
        "userTextTitle": "Teks Kostumisasi",
        "userTextInfo": "Tampilkan teks kustom di bawah jam",
        "fahrenheitCelsiusCheckbox": "Ubah menjadi Fahrenheit",
        "fahrenheitCelsiusText": "Muat ulang halaman untuk mengaplikasikan perubahan",
        "micIconTitle": "Sembunyikan Ikon Microfon",
        "micIconInfo": "Jika voice typing tidak berfungsi",
        "hideSearchWith": "Sembunyikan Mesin Pencarian",
        "hideSearchWithInfo": "Ubah mesin pencarian dengan cara mengeklik ikon",
        "search_suggestions_button": "Saran Pencarian",
        "search_suggestions_text": "Mengaktifkan saran pencarian",
        // Proxy
        "useproxytitletext": "Pemintas Proksi",
        "useproxyText": "Jika saran pencarian tidak berfungsi",
        "ProxyText": "Pemintas proksi CORS",
        "ProxySubtext": "Tambahkan pemintas proksi CORS anda sendiri",
        "HostproxyButton": "Host proksi anda sendiri",
        "saveproxy": "Simpan",
        // Location
        "UserLocText": "Masukkan Lokasi Anda",
        "UserLocSubtext": "Jika lokasi cuaca tidak berfungsi",
        "userLoc": "Kota atau Koordinat anda (Lintang, Bujur)",
        "InputOptionsButton": "Pilihan Input",
        "saveLoc": "Simpan",
        // Weather
        "WeatherApiText": "Masukkan kunci WeatherAPI anda",
        "WeatherApiSubtext": "Jika fungsionalitas cuaca tidak berfungsi",
        "userAPI": "Kunci weatherAPI anda",
        "LearnMoreButton": "Pelajari lebih lanjut",
        "saveAPI": "Simpan",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        "months": ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        // End of Calendar

        // Weather
        "humidityLevel": "Kelembapan",
        "feelsLike": "Terasa",
        "location": "Bumi",
        // End of Weather

        // New Tab Item
        "conditionText": "Halo! Bagaimana kabarmu hari ini?",
        "enterBtn": "Telusuri",
        "searchPlaceholder": "Ketik disini...",
        "listenPlaceholder": "Mendengarkan...",
        "searchWithHint": "Cari Dengan",
        "ai_tools": "Utilitas AI",
        "userText": "Klik disini untuk mengubah tulisan",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Selamat Pagi!",
            "afternoon": "Selamat Sore!",
            "evening": "Selamat Malam!"
        },

        // Wallpaper and alerts
        "uploadWallpaperText": "Unggah Wallpaper",
        "backupText": "Cadangkan",
        "restoreText": "Mengembalikan",
    },


    // Marathi
    "mr": {
        // Menu Items
        "feedback": "प्रतिसाद",
        "resetsettings": "सेटिंग्ज रीसेट करा",
        "menuCloseText": "बंद करा",
        // Shortcuts
        "shortcutsText": "शॉर्टकट्स",
        "enableShortcutsText": "जतन केलेले शॉर्टकट दाखवा",
        "editShortcutsText": "शॉर्टकट्स संपादित करा",
        "shortcutsInfoText": "कोणते शॉर्टकट दाखवायचे ते निवडा",
        "editShortcutsList": "जतन केलेले शॉर्टकट्स",
        'editShortcutsListInfo': 'आपण "+" आयकॉनवर क्लिक करून नवीन शॉर्टकट्स जोडू शकता किंवा शॉर्टकटच्या नावावर किंवा URL वर क्लिक करून विद्यमान शॉर्टकट्स संपादित करू शकता.',
        "adaptiveIconText": "अनुकूल आयकॉन आकार",
        "adaptiveIconInfoText": "शॉर्टकट आयकॉन छोटे दिसतील",
        "ai_tools_button": "AI साधने",
        "enable_ai_tools": "AI साधनांसाठी शॉर्टकट्स दाखवा",
        "googleAppsMenuText": "गुगल ॲप्स",
        "googleAppsMenuInfo": "गुगल ॲप्ससाठी शॉर्टकट्स दाखवा",
        // Digital Clock
        "digitalclocktittle": "डिजिटल घड्याळ",
        "digitalclockinfo": "डिजिटल घड्याळावर स्विच करा",
        "timeformattittle": "१२-तासांचा फॉरमॅट",
        "timeformatinfo": "१२-तासांचा वेळ फॉरमॅट वापरा",
        "greetingtittle": "शुभेच्छा",
        "greetinginfo": "सानुकूल मजकुराखाली शुभेच्छा दाखवा",
        // Misc
        "userTextTitle": "सानुकूल मजकूर",
        "userTextInfo": "घड्याळाखाली सानुकूल मजकूर दाखवा",
        "fahrenheitCelsiusCheckbox": "फॅरेनहाइटमध्ये बदल करा",
        "fahrenheitCelsiusText": "बदल लागू करण्यासाठी पृष्ठ रीफ्रेश करा",
        "micIconTitle": "मायक्रोफोन आयकॉन लपवा",
        "micIconInfo": "जर व्हॉइस टायपिंग कार्यरत नसेल",
        "hideSearchWith": "सर्च इंजिन सिलेक्टर लपवा",
        "hideSearchWithInfo": "आयकॉनवर क्लिक करून सर्च इंजिन बदला",
        "search_suggestions_button": "शोध सूचना",
        "search_suggestions_text": "शोध सूचना सक्षम करा",
        // Proxy
        "useproxytitletext": "प्रॉक्सी बायपास",
        "useproxyText": "जर शोध सूचना कार्यरत नसतील",
        "ProxyText": "CORS बायपास प्रॉक्सी",
        "ProxySubtext": "आपला स्वतःचा CORS बायपास प्रॉक्सी जोडा",
        "HostproxyButton": "आपला प्रॉक्सी होस्ट करा",
        "saveproxy": "जतन करा",
        // Location
        "UserLocText": "आपले स्थान प्रविष्ट करा",
        "UserLocSubtext": "जर हवामानाचे स्थान बरोबर नसेल",
        "userLoc": "आपले शहर किंवा समन्वय (अक्षांश, रेखांश)",
        "InputOptionsButton": "इनपुट पर्याय",
        "saveLoc": "जतन करा",
        // Weather
        "WeatherApiText": "आपली WeatherAPI की प्रविष्ट करा",
        "WeatherApiSubtext": "जर हवामान कार्यरत नसेल",
        "userAPI": "आपली WeatherAPI कळी",
        "LearnMoreButton": "अधिक जाणून घ्या",
        "saveAPI": "जतन करा",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'],   // Truncated for display
        // "days": ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],     // Full
        "months": ['जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'],
        // End of Calendar

        // Weather
        "humidityLevel": "आर्द्रता",
        "feelsLike": "वाटते",
        "location": "पृथ्वी",
        // End of Weather

        // New Tab Item
        "conditionText": "नमस्कार! तुम्ही आज कसे आहात?",
        "enterBtn": "शोधा",
        "searchPlaceholder": "येथे लिहा...",
        "listenPlaceholder": "ऐकत आहे...",
        "searchWithHint": "यासह शोधा",
        "ai_tools": "AI साधने",
        "userText": "येथे आपला मजकूर लिहा",
        "googleAppsHover": "गुगल ॲप्स",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "शुभ सकाळ!",
            "afternoon": "शुभ दुपार!",
            "evening": "शुभ संध्याकाळ!"
        },

        // Search Engines and rest
        "googleEngine": "गुगल",
        "duckEngine": "डकडकगो",
        "bingEngine": "बिंग",
        "braveEngine": "ब्रेव्ह",
        "youtubeEngine": "यूट्यूब",
        "chatGPT": "चॅटGPT",
        "gemini": "जेमिनी",
        "copilot": "कोपायलट",
        "perplexity": "पर्प्लेक्सिटी",
        "firefly": "अडोबी फायरफ्लाय",
        "metaAI" : "मेटा AI",
        "github": "गिटहब",

        // Wallpaper and alerts
       "uploadWallpaperText": "वॉलपेपर सेट करा",
        "backupText": "बॅकअप करा",
        "restoreText": "पुनर्संचयित करा",
        "rangColor": "रंग निवडा",
        "reloadHint": "थीम लागू केल्यानंतर पृष्ठ रीलोड करा",

        //Dialog boxes (alerts)
        "confirmWallpaper": "तुम्हाला आजचा वॉलपेपर बदलायचा आहे का?",
        "confirmRestore": "तुम्हाला तुमचे सेटिंग्स रीसेट करायचे आहेत का? हि क्रिया परत केली जाऊ शकत नाही.",
        "Nobackgroundset": "सद्यस्थितीत कोणतीही पार्श्वभूमी सेट केलेली नाही.",
        "clearbackgroundimage": "तुम्हाला पार्श्वभूमी इमेज क्लिअर करायची आहे का?",
        "confirmbackup": "तुम्हाला तुमचे सेटिंग्स बॅकअप करायचे आहेत का?",
        "ProxyDisclaimer": "सर्व प्रॉक्सी फीचर्स डिफॉल्टनुसार बंद असतात.\n\nजर तुम्ही सर्च सुजेशन्स आणि CORS बायपास प्रॉक्सी सक्षम केले, तर गोपनीयतेसाठी तुमची स्वतःची प्रॉक्सी होस्ट करणे अत्यंत शिफारसीय आहे.\n\nडिफॉल्टनुसार, प्रॉक्सी https://mynt-proxy.rhythmcorehq.com म्हणून सेट केले जाईल, म्हणजे तुमचे सर्व डेटा या सर्विसमधून जाईल, ज्यामुळे गोपनीयतेच्या संदर्भात धोका होऊ शकतो.",
        "endlink": "लिंकमध्ये / नसावा.",
        "onlylinks": "फक्त लिंक (http:// किंवा https:// ने सुरू होणाऱ्या) चालू आहेत.",
        "imagedimensions": "तयार केलेली इमेज ({width}x{height}) चे परिमाण 1920x1080 पिक्सल्सपेक्षा जास्त आहे. \n\nयामुळे कार्यक्षमता प्रभावित होऊ शकते किंवा इमेज नीट लोड होऊ नये.",
        "failedbackup": "बॅकअप अयशस्वी: ",
        "restorecompleted": "पुनर्संचयित यशस्वी झाले!",
        "restorefailed": "पुनर्संचयित अयशस्वी: "

    },


    // French
    "fr": {
        // Menu Items
        "feedback": "Feedback",
        "resetsettings": "Réinitialiser les paramètres",
        "menuCloseText": "Fermer",
        // Shortcuts
        "shortcutsText": "Raccourcis",
        "enableShortcutsText": "Afficher les raccourcis sauvegardés",
        "editShortcutsText": "Modifier les raccourcis",
        "shortcutsInfoText": "Choisir les raccourcis à afficher",
        "editShortcutsList": "Raccourcis Sauvegardés",
        'editShortcutsListInfo': 'Vous pouvez ajouter de nouveaux raccourcis en cliquant sur l\'icône « + » ou modifier les raccourcis existants en cliquant sur le nom ou l\'URL du raccourci.',
        "adaptiveIconText": "Formes d'Icônes Adaptatives",
        "adaptiveIconInfoText": "Les icônes de raccourci apparaîtront plus petites",
        "ai_tools_button": "Outils IA",
        "enable_ai_tools": "Afficher les raccourcis pour les Outils IA",
        "googleAppsMenuText": "Apps Google",
        "googleAppsMenuInfo": "Afficher les raccourcis pour les Applications Google",
        // Digital Clock
        "digitalclocktittle": "Horloge Numérique",
        "digitalclockinfo": "Passer à l'horloge numérique",
        "timeformattittle": "Format 12h",
        "timeformatinfo": "Utiliser le format 12h",
        "greetingtittle": "Salutation",
        "greetinginfo": "Afficher la salutation sous le texte personnalisé",
        // Misc
        "userTextTitle": "Texte personnalisé",
        "userTextInfo": "Afficher le texte personnalisé sous l'horloge",
        "fahrenheitCelsiusCheckbox": "Passer à Fahrenheit",
        "fahrenheitCelsiusText": "Actualiser la page pour appliquer les changements",
        "micIconTitle": "Masquer l'Icône du Microphone",
        "micIconInfo": "Si la saisie vocale ne fonctionne pas",
        "hideSearchWith": "Masquer les Moteurs de Recherche",    // or "Hide Search Engine Selector"
        "hideSearchWithInfo": "Passez d'un moteur de recherche à l'autre en cliquant sur son icône",
        "search_suggestions_button": "Suggestions de Recherche",
        "search_suggestions_text": "Activer les suggestions de recherche",
        // Proxy
        "useproxytitletext": "Contournement du Proxy",
        "useproxyText": "Si les suggestions de recherche ne fonctionnent pas",
        "ProxyText": "Proxy de contournement CORS",
        "ProxySubtext": "Ajouter votre propre proxy de contournement CORS",
        "HostproxyButton": "Hébergez votre propre proxy",
        "saveproxy": "Enregistrer",
        // Location
        "UserLocText": "Saisissez votre localisation",
        "UserLocSubtext": "Si la localisation de la météo n'est pas correct",
        "userLoc": "Votre ville ou vos coordonnées (Latitude, Longitude)",
        "InputOptionsButton": "Options de saisie",
        "saveLoc": "Enregistrer",
        // Weather
        "WeatherApiText": "Entrez votre clé WeatherAPI",    // For 'WeatherAPI' string, only transliterate it
        "WeatherApiSubtext": "Si la fonctionnalité météo ne fonctionne pas",
        "userAPI": "Your weatherAPI key",
        "LearnMoreButton": "En savoir plus",
        "saveAPI": "Enregistrer",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        "months": ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        // End of Calendar

        // Weather
        "humidityLevel": "Humidité",
        "feelsLike": "Ressenti",
        "location": "Terre",
        // End of Weather

        // New Tab Item
        "conditionText": "Bonjour, comment allez-vous?",
        "enterBtn": "Rechercher",
        "searchPlaceholder": "Saisissez ici...",
        "listenPlaceholder": "Écoute...",
        "searchWithHint": "Rechercher avec",
        "ai_tools": "Outils IA",
        "userText": "Cliquez ici pour modifier",
        "googleAppsHover": "Applications Google",    // Keep this untranslated if string width is much longer
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Bonjour!",
            "afternoon": "Bonsoir!",
            "evening": "Bonne nuit!"
        },

        // Search Engines and rest
        "googleEngine": "Google",
        "duckEngine": "Duck", // DuckDuckGo
        "bingEngine": "Bing",
        "braveEngine": "Brave",
        "youtubeEngine": "YouTube",
        "chatGPT": "ChatGPT",
        "gemini": "Gemini",
        "copilot": "Copilot",
        "perplexity": "Perplexity",
        "firefly": "Adobe Firefly",
        "metaAI" : "Meta AI",
        "github": "GitHub",

        // Wallpaper and alerts
        "uploadWallpaperText": "Uploader un fond d'ecran",    // Keep it shorter
        "backupText": "Sauvegarder",
        "restoreText": "Restaurer",
        "rangColor": "Choisir la couleur",    // Keep it shorter
        "reloadHint": "Actualiser la page après l'application des thèmes",

        // Dialog boxes (alerts)
        "confirmWallpaper": "Souhaitez-vous définir une nouvelle image comme fond d'écran pour la journée?",
        "confirmRestore": "Êtes-vous sûr de vouloir réinitialiser vos paramètres? Cette action ne peut être annulée.",
        "Nobackgroundset": "Aucune image de fond n'est actuellement définie.",
        "clearbackgroundimage": "Êtes-vous sûr de vouloir effacer l'image de fond?",
        "confirmbackup": "Êtes-vous sûr de vouloir sauvegarder vos paramètres?",
        "ProxyDisclaimer": "Toutes les fonctions du proxy sont désactivées par défaut.\n\nSi vous activez les suggestions de recherche et le proxy de contournement CORS, il est fortement recommandé d'héberger votre propre proxy pour une meilleure confidentialité.\n\nPar défaut, le proxy sera réglé sur https://mynt-proxy.rhythmcorehq.com, ce qui signifie que toutes vos données passeront par ce service, ce qui peut poser des problèmes de confidentialité.",
        "endlink": "Il ne doit pas y avoir de / à la fin du lien.",
        "onlylinks": "Seuls les liens (commençant par http:// ou https://) sont autorisés.",
        "imagedimensions": "Attention: Les dimensions de l'image téléchargée ({largeur}x{hauteur}) dépassent 1920x1080 pixels.\n\nCela peut avoir un impact sur les performances ou l'image peut ne pas se charger correctement.",
        "failedbackup": "Échec de la sauvegarde: ",
        "restorecompleted": "Restauration terminée avec succès!",
        "restorefailed": "Échec de la restauration: ",
    }
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
    fr: '490px',
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
    const specialDecimalLanguages = ['cs', 'it', 'pt', 'ru', 'tr', 'vi', 'uz', 'es', 'ko', 'idn', 'fr']; // Add more languages here as needed

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
        { id: 'metaAI', key: 'metaAI'},
        { id: 'github', key: 'github' },
        { id: 'googleAppsHover', key: 'googleAppsHover' },
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

    //Update hover text for .themingStuff
    const themingElement = document.querySelector('.themingStuff');
    if (themingElement) {
        const localizedText = translations[lang]?.reloadHint || translations['en'].reloadHint;
        themingElement.setAttribute('data-lang', localizedText);
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
