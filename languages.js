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
        "editShortcutsList": "Saved Shortcuts",
        "shortcutsInfoText": "Choose which shortcuts get shown",
        "adaptiveIconText": "Adaptive Icon Shapes",
        "adaptiveIconInfoText": "Shortcut icons will appear smaller",
        "ai_tools_button": "AI-Tools",
        "enable_ai_tools": "Show shortcuts for AI tools",
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
        "WeatherApiText": "Enter your WeatherAPI key",
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
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Good Morning!",
            "afternoon": "Good Afternoon!",
            "evening": "Good Evening!"
        },
    },
    
    // Portuguese
    "pt": {
        // Menu Items
        "feedback": "Feedback",
        "resetsettings": "Redefinir Configurações",
        "menuCloseText": "Fechar",
        // Shortcuts
        "shortcutsText": "Atalhos",
        "enableShortcutsText": "Ativar/desativar atalhos",
        "editShortcutsText": "Editar Atalhos",
        "editShortcutsList": "Editar Atalhos",
        "shortcutsInfoText": "Escolha quais atalhos serão exibidos",
        "adaptiveIconText": "Formas de Ícone Adaptativo",
        "adaptiveIconInfoText": "Os ícones de atalhos serão sempre redondos",
        "ai_tools_button": "Ferramentas de IA",
        "enable_ai_tools": "Ativar/desativar atalhos de ferramentas de IA",
        // Digital Clock
        "digitalclocktittle": "Relógio Digital",
        "digitalclockinfo": "Ativar/desativar o Relógio Digital",
        "timeformattittle": "Usar Formato de 12h",
        "timeformatinfo": "Usar formato de hora de 12 horas",
        "greetingtittle": "Saudação",
        "greetinginfo": "Mostrar saudação abaixo do texto personalizado",
        // Misc
        "userTextTitle": "Texto Personalizável",
        "userTextInfo": "Mostrar texto personalizado abaixo do relógio",
        "fahrenheitCelsiusCheckbox": "Alternar para Fahrenheit",
        "fahrenheitCelsiusText": "Atualize a página para ver as atualizações",
        "micIconTitle": "Ocultar Icone do Microfone",
        "micIconInfo": "Se a digitação por voz não estiver funcionando",
        "search_suggestions_button": "Sugestões de Pesquisa",
        "search_suggestions_text": "Ativar/desativar Sugestões de Pesquisa",
        // Proxy
        "useproxytitletext": "Bypass de Proxy",
        "useproxyText": "Se as sugestões de pesquisa não estiverem funcionando",
        "ProxyText": "Proxy de Bypass CORS",
        "ProxySubtext": "Adicione seu próprio Proxy de Bypass CORS",
        "HostproxyButton": "Hospede Seu Próprio Proxy",
        "saveproxy": "Salvar",
        // Location
        "UserLocText": "Insira sua localização",
        "UserLocSubtext": "Se a localização do clima não estiver correta",
        "userLoc": "Sua localização (Cidade/Aletitude,Longitude)",
        "InputOptionsButton": "Opções de Entrada",
        "saveLoc": "Salvar",
        // Weather
        "WeatherApiText": "Insira sua própria chave da API de Clima",
        "WeatherApiSubtext": "Se a funcionalidade do clima não estiver funcionando",
        "userAPI": "Sua chave da WeatherAPI",
        "LearnMoreButton": "Saiba Mais",
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
        "searchPlaceholder": "Digite sua consulta...",
        "listenPlaceholder": "Ouvindo...",
        "searchWithHint": "Pesquisar Com",
        "ai_tools": "Ferramentas de IA",
        "userText": "Clique aqui para editar",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Bom dia!",
            "afternoon": "Boa tarde!",
            "evening": "Boa noite!"
        }
    },

    // Chinese (Simplified)
    // Machine translated some elements, please verify and delete this comment
    "zh": {
        // Menu Items
        "feedback": "反馈",
        "resetsettings": "重置设置",
        "menuCloseText": "关闭",
        // Shortcuts
        "shortcutsText": "快捷方式",
        "enableShortcutsText": "启用/禁用快捷方式",
        "editShortcutsText": "编辑快捷方式",
        "editShortcutsList": "编辑快捷方式",
        "shortcutsInfoText": "选择要显示的快捷方式",
        "adaptiveIconText": "自适应图标形状",
        "adaptiveIconInfoText": "快捷方式图标将始终为圆形",
        "ai_tools_button": "AI工具",
        "enable_ai_tools": "启用/禁用AI工具快捷方式",
        // Digital Clock
        "digitalclocktittle": "数字时钟",
        "digitalclockinfo": "启用/禁用数字时钟",
        "timeformattittle": "使用12小时格式",
        "timeformatinfo": "使用12小时制时间格式",
        "greetingtittle": "问候",
        "greetinginfo": "在自定义文本下显示问候",
        // Misc
        "userTextTitle": "可自定义文本",
        "userTextInfo": "在时钟下方显示自定义文本",
        "fahrenheitCelsiusCheckbox": "切换到华氏温度",
        "fahrenheitCelsiusText": "刷新页面以查看更新",
        "micIconTitle": "隐藏麦克风图标",
        "micIconInfo": "如果语音输入不起作用",
        "search_suggestions_button": "搜索建议",
        "search_suggestions_text": "启用/禁用搜索建议",
        // Proxy
        "useproxytitletext": "代理绕过",
        "useproxyText": "如果搜索建议无法正常工作",
        "ProxyText": "CORS绕过代理",
        "ProxySubtext": "添加您自己的CORS绕过代理",
        "HostproxyButton": "托管您自己的代理",
        "saveproxy": "保存",
        // Location
        "UserLocText": "输入您的位置",
        "UserLocSubtext": "如果天气位置不正确",
        "userLoc": "您的位置（城市/纬度，经度）",
        "InputOptionsButton": "输入选项",
        "saveLoc": "保存",
        // Weather
        "WeatherApiText": "输入您自己的天气API密钥",
        "WeatherApiSubtext": "如果天气功能无法正常工作",
        "userAPI": "您的天气API密钥",
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
        "conditionText": "你好！今天怎么样？",
        "enterBtn": "搜索",
        "searchPlaceholder": "输入搜索内容...",
        "listenPlaceholder": "正在聆听...",
        "searchWithHint": "搜索引擎",
        "ai_tools": "AI工具",
        "userText": "点击这里编辑",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "早上好!",
            "afternoon": "下午好!",
            "evening": "晚上好!"
        }
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
        "editShortcutsList": "सहेजे गए शॉर्टकट",
        "shortcutsInfoText": "निर्धारित करें कि कौन से शॉर्टकट प्रदर्शित किए जाएँ",
        "adaptiveIconText": "अनुकूल आइकन आकृतियाँ",
        "adaptiveIconInfoText": "शॉर्टकट आइकन छोटे आकार में प्रदर्शित करें",
        "ai_tools_button": "AI-उपकरण",
        "enable_ai_tools": "AI उपकरणों के शॉर्टकट्स प्रदर्शित करें",
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
        }
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
        "shortcutsInfoText": "Vyberte, které zkratky se mají zobrazit",
        "adaptiveIconText": "Adaptivní tvary ikon",
        "adaptiveIconInfoText": "Ikony zkratek se zmenší",
        "ai_tools_button": "AI nástroje",
        "enable_ai_tools": "Zobrazí zkratky AI nástrojů",
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
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Dobré ráno!",
            "afternoon": "Dobré odpoledne!",
            "evening": "Dobrý večer!"
        }
    },

    // Italian
    // Machine translated some elements, please verify and delete this comment
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
        "ai_tools_button": "Strumenti AI",
        "enable_ai_tools": "Abilita/disabilita scorciatoie Strumenti AI",
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
        "listenPlaceholder": "In ascolto...",
        "searchWithHint": "Cerca con",
        "ai_tools": "Strumenti AI",
        "userText": "Clicca qui per modificare",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Buongiorno!",
            "afternoon": "Buon pomeriggio!",
            "evening": "Buona sera!"
        }
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
        "WeatherApiText": "Kendi Hava Durumu API anahtarınızı girin",
        "WeatherApiSubtext": "Hava durumu işlevi çalışmıyorsa",
        "userAPI": "Hava Durumu API anahtarınız",
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
        }
    },

    // Bengali
    "bn": {
        // Menu Items
        "feedback": "মতামত",
        "resetsettings": "সেটিংস রিসেট করুন",
        "menuCloseText": "বন্ধ করুন",
        // Shortcuts
        "shortcutsText": "শর্টকাট",
        "enableShortcutsText": "সংরক্ষিত শর্টকাটগুলি প্রদর্শন করুন",
        "editShortcutsText": "শর্টকাট সম্পাদনা করুন",
        "editShortcutsList": "সংরক্ষিত শর্টকাট",
        "shortcutsInfoText": "যেসব শর্টকাট প্রদর্শিত হবে তা নির্বাচন করুন",
        "adaptiveIconText": "অ্যাডাপ্টিভ আইকন আকার",
        "adaptiveIconInfoText": "শর্টকাট আইকন ছোট আকারে প্রদর্শন হবে",
        "ai_tools_button": "AI সরঞ্জাম",
        "enable_ai_tools": "AI সরঞ্জাম শর্টকাট প্রদর্শন করুন",
        // Digital Clock
        "digitalclocktittle": "ডিজিটাল ঘড়ি",
        "digitalclockinfo": "ডিজিটাল ঘড়িতে পরিবর্তন করুন",
        "timeformattittle": "১২ ঘণ্টার ফরম্যাট",
        "timeformatinfo": "১২ ঘণ্টার সময় ফরম্যাট ব্যবহার করুন",
        "greetingtittle": "অভিবাদন",
        "greetinginfo": "কাস্টম টেক্সটের নিচে অভিবাদন দেখান",
        // Misc
        "userTextTitle": "কাস্টমাইজেবল টেক্সট",
        "userTextInfo": "ঘড়ির নিচে কাস্টম টেক্সট দেখান",
        "fahrenheitCelsiusCheckbox": "ফারেনহাইটে পরিবর্তন করুন",
        "fahrenheitCelsiusText": "পরিবর্তনের জন্য পৃষ্ঠাটি রিফ্রেশ করুন",
        "micIconTitle": "মাইক্রোফোন আইকন লুকান",
        "micIconInfo": "যদি ভয়েস টাইপিং কাজ করছে না",
        "search_suggestions_button": "অনুসন্ধান পরামর্শ",
        "search_suggestions_text": "অনুসন্ধান পরামর্শ সক্ষম করুন",
        // Proxy
        "useproxytitletext": "প্রক্সি বাইপাস",
        "useproxyText": "যদি অনুসন্ধান পরামর্শ কাজ না করে",
        "ProxyText": "CORS বাইপাস প্রক্সি",
        "ProxySubtext": "আপনার নিজের CORS বাইপাস প্রক্সি যোগ করুন",
        "HostproxyButton": "নিজের প্রক্সি হোস্ট করুন",
        "saveproxy": "সংরক্ষণ করুন",
        // Location
        "UserLocText": "আপনার অবস্থান লিখুন",
        "UserLocSubtext": "যদি আবহাওয়ার অবস্থান সঠিক না হয়",
        "userLoc": "আপনার শহর বা স্থানাঙ্ক (অক্ষাংশ, দ্রাঘিমাংশ)",
        "InputOptionsButton": "ইনপুট অপশন",
        "saveLoc": "সংরক্ষণ করুন",
        // Weather
        "WeatherApiText": "আপনার WeatherAPI টীকা লিখুন",
        "WeatherApiSubtext": "যদি আবহাওয়া কার্যকারিতা কাজ না করে",
        "userAPI": "আপনার WeatherAPI টীকা",
        "LearnMoreButton": "আরও জানুন",
        "saveAPI": "সংরক্ষণ করুন",
        // End of Menu Items

        // Body Items
        // Calendar
        "days": ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'],   // Truncated for display
        //"days": ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],   // Full
        "months": ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
        // "months": ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রি', 'মে', 'জুন', 'জুলাই', 'আগ', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'],   // Truncated
        // End of Calendar

        // Weather
        "humidityLevel": "আর্দ্রতা",
        "feelsLike": "অনুভব হয়",
        "location": "পৃথিবী",
        // End of Weather

        // New Tab Item
        "conditionText": "হ্যালো! আজ আপনি কেমন আছেন?",
        "enterBtn": "অনুসন্ধান করুন",
        "searchPlaceholder": "আপনার প্রশ্ন...",
        "listenPlaceholder": "শোনা হচ্ছে...",
        "searchWithHint": "অনুসন্ধানের মাধ্যম",
        "ai_tools": "AI সরঞ্জাম",
        "userText": "এখানে আপনার টেক্সট লিখুন",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "শুভ সকাল!",
            "afternoon": "শুভ বিকেল!",
            "evening": "শুভ সন্ধ্যা!"
        }
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
        }
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
        "adaptiveIconText": "Адаптивные формы значков",
        "adaptiveIconInfoText": "Ярлыки всегда будут круглыми",
        "ai_tools_button": "Инструменты ИИ",
        "enable_ai_tools": "Включить/Отключить ярлыки ИИ",
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
        "ai_tools": "Инструменты ИИ",
        "userText": "Нажмите здесь, чтобы редактировать",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "Доброе утро!",
            "afternoon": "Добрый день!",
            "evening": "Добрый вечер!"
        }
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
        }
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
        "adaptiveIconText": "アダプティブアイコン",
        "adaptiveIconInfoText": "ショートカットアイコンは小さく表示されます",
        "ai_tools_button": "AIツール",
        "enable_ai_tools": "AIツールのショートカットを表示",
        // Digital Clock
        "digitalclocktittle": "デジタル時計",
        "digitalclockinfo": "デジタル時計に変更",
        "timeformattittle": "12時間形式",
        "timeformatinfo": "12時間形式を使用",
        "greetingtittle": "挨拶",
        "greetinginfo": "カスタムテキストの下に挨拶を表示",
        // Misc
        "userTextTitle": "カスタムテキスト",
        "userTextInfo": "時計の下にカスタムテキストを表示",
        "fahrenheitCelsiusCheckbox": "華氏に変更",
        "fahrenheitCelsiusText": "変更を適用するにはページをリロード",
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
        "UserLocSubtext": "天気が正しくない場合",
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
        "conditionText": "こんにちは！今日はどうですか？",
        "enterBtn": "検索",
        "searchPlaceholder": "検索キーワードを入力...",
        "listenPlaceholder": "聞いています...",
        "searchWithHint": "検索で検索",
        "ai_tools": "AIツール",
        "userText": "ここをクリックして編集",
        // End of Body and New Tab Items

        // Greeting
        greeting: {
            "morning": "おはようございます！",
            "afternoon": "こんにちは！",
            "evening": "こんばんは！"
        }
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
        }
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
        "shortcutsInfoText": "Pilih pintasan apa yang akan ditampilkan",
        "adaptiveIconText": "Penyesuaian Bentuk Ikon",
        "adaptiveIconInfoText": "Ikon pintasan akan terlihat lebih kecil",
        "ai_tools_button": "Utilitas AI",
        "enable_ai_tools": "Tampilkan pintasan untuk utilitas AI",
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
    },

};

// Define the width of the menu container for each language
const menuWidths = {
    en: '400px',
    pt: '415px',
    uz: '455px',
    vi: '445px',
    cs: '452px',
    es: '446px',
    hi: '408px',
    ja: '444px',
    ru: '450px',
    it: '437px',
    idn: '415px',
    // Add more languages and widths as needed
};

const numberMappings = {
    "bn": { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' },
    //"mr": { '0': '०', '1': '१', '2': '२', '3': '३', '4': '४', '5': '५', '6': '६', '7': '७', '8': '८', '9': '९' }, // Ensure it is supported in the fonts
    // Add more languages as needed
};

function localizeNumbers(text, language) {
    const map = numberMappings[language]; // Get the numeral map for the current language
<<<
    // Define languages that use a comma as the decimal separator instead of a dot
    const specialDecimalLanguages = ['cs', 'it', 'pt', 'ru', 'tr', 'vi', 'uz', 'es', 'ko', 'idn']; // Add more languages here as needed
  
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
        { id: 'editShortcutsList', key: 'editShortcutsList' },
        { id: 'shortcutsInfoText', key: 'shortcutsInfoText' },
        { id: 'adaptiveIconText', key: 'adaptiveIconText' },
        { id: 'adaptiveIconInfoText', key: 'adaptiveIconInfoText' },
        { id: 'ai_tools_button', key: 'ai_tools_button' },
        { id: 'enable_ai_tools', key: 'enable_ai_tools' },
        { id: 'fahrenheitCelsiusCheckbox', key: 'fahrenheitCelsiusCheckbox' },
        { id: 'fahrenheitCelsiusText', key: 'fahrenheitCelsiusText' },
        { id: 'micIconTitle', key: 'micIconTitle' },
        { id: 'micIconInfo', key: 'micIconInfo' },
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
        { id: 'location', key: 'location' }
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
        menuCloseButton.style.setProperty('--hover-close-text', `"${hoverText}"`);
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
