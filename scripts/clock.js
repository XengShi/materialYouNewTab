/*
 * Material You NewTab
 * Copyright (c) 2023-2024 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Retrieve current time and calculate initial angles
var currentTime = new Date();
var initialSeconds = currentTime.getSeconds();
var initialMinutes = currentTime.getMinutes();
var initialHours = currentTime.getHours();

// Initialize cumulative rotations
let cumulativeSecondRotation = initialSeconds * 6; // 6° par seconde
let cumulativeMinuteRotation = initialMinutes * 6 + (initialSeconds / 10); // 6° par minute + ajustement pour les secondes
let cumulativeHourRotation = (30 * initialHours + initialMinutes / 2); // 30° par heure + ajustement pour les minutes

// Apply initial rotations (no need to wait 1s now)
document.getElementById("second").style.transform = `rotate(${cumulativeSecondRotation}deg)`;
document.getElementById("minute").style.transform = `rotate(${cumulativeMinuteRotation}deg)`;
document.getElementById("hour").style.transform = `rotate(${cumulativeHourRotation}deg)`;

let intervalId;
let secondreset = false;
let hourreset = false;
let minreset = false;

function initializeClockType() {
    const savedClockType = localStorage.getItem("clocktype");
    clocktype = savedClockType ? savedClockType : "analog"; // Default to "analog" if nothing is saved
    localStorage.setItem("clocktype", clocktype); // Ensure it's set in local storage
}

// Call this function to initialize the clock type
initializeClockType();

function updateDate() {
    if (clocktype === "analog") {
        var currentTime = new Date();
        var dayOfWeek = currentTime.getDay();
        var dayOfMonth = currentTime.getDate();
        var month = currentTime.getMonth();

        // Define the current language
        var currentLanguage = getLanguageStatus('selectedLanguage') || 'en';

        // Get the translated name of the day
        var dayName;
        if (
            translations[currentLanguage] &&
            translations[currentLanguage].days &&
            translations[currentLanguage].days[dayOfWeek]
        ) {
            dayName = translations[currentLanguage].days[dayOfWeek];
        } else {
            dayName = translations['en'].days[dayOfWeek]; // Fallback to English day name
        }

        // Get the translated name of the month
        var monthName;
        if (
            translations[currentLanguage] &&
            translations[currentLanguage].months &&
            translations[currentLanguage].months[month]
        ) {
            monthName = translations[currentLanguage].months[month];
        } else {
            monthName = translations['en'].months[month]; // Fallback to English month name
        }

        // Localize the day of the month
        var localizedDayOfMonth = localizeNumbers(dayOfMonth.toString(), currentLanguage);

        const dateDisplay = {
            bn: `${dayName}, ${localizedDayOfMonth} ${monthName}`,
            mr: `${dayName}, ${localizedDayOfMonth} ${monthName}`,
            zh: `${monthName}${dayOfMonth}日${dayName}`,
            cs: `${dayName}, ${dayOfMonth}. ${monthName}`,
            hi: `${dayName}, ${dayOfMonth} ${monthName}`,
            it: `${dayName.substring(0, 3)} ${dayOfMonth} ${monthName.substring(0, 3)}`,
            ja: `${dayName.substring(0, 1)}, ${monthName}${dayOfMonth}`,
            ko: `${dayName.substring(0, 1)}, ${monthName} ${dayOfMonth}일`,
            pt: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
            ru: `${dayName.substring(0, 2)}, ${dayOfMonth} ${monthName.substring(0, 4)}.`,
            es: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
            tr: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName}`,
            uz: `${dayName.substring(0, 3)}, ${dayOfMonth}-${monthName}`,
            vi: `${dayName}, Ngày ${dayOfMonth} ${monthName}`,
            idn: `${dayName}, ${dayOfMonth} ${monthName}`,
            fr: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`, //Jeudi, 5 avril
            az: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
            default: `${dayName.substring(0, 3)}, ${monthName.substring(0, 3)} ${localizedDayOfMonth}`
        };
        document.getElementById("date").innerText = dateDisplay[currentLanguage] || dateDisplay.default;
    }
}

function updateanalogclock() {
    var currentTime = new Date();
    var initialSeconds = currentTime.getSeconds();
    var initialMinutes = currentTime.getMinutes();
    var initialHours = currentTime.getHours();


    // Initialize cumulative rotations

    let cumulativeSecondRotation = initialSeconds * 6; // 6° par seconde
    let cumulativeMinuteRotation = initialMinutes * 6 + (initialSeconds / 10); // 6° par minute + ajustement pour les secondes
    let cumulativeHourRotation = (30 * initialHours + initialMinutes / 2);
    if (secondreset) {
        document.getElementById("second").style.transition = "none";
        document.getElementById("second").style.transform = `rotate(0deg)`;
        secondreset = false;
        return;
    }
    if (minreset) {
        document.getElementById("minute").style.transition = "none";
        document.getElementById("minute").style.transform = `rotate(0deg)`;
        minreset = false;
        return;
    }
    if (hourreset) {
        document.getElementById("hour").style.transition = "none";
        document.getElementById("hour").style.transform = `rotate(0deg)`;
        hourreset = false;
        return;
    }
    if (cumulativeSecondRotation == 0) {
        document.getElementById("second").style.transition = "transform 1s ease";
        document.getElementById("second").style.transform = `rotate(361deg)`;
        secondreset = true;
    } else if (secondreset != true) {
        document.getElementById("second").style.transition = "transform 1s ease";
        document.getElementById("second").style.transform = `rotate(${cumulativeSecondRotation}deg)`;
    }
    if (cumulativeMinuteRotation == 0) {
        document.getElementById("minute").style.transition = "transform 1s ease";
        document.getElementById("minute").style.transform = `rotate(361deg)`;
        minreset = true;
    } else if (minreset != true) {
        document.getElementById("minute").style.transition = "transform 1s ease";
        document.getElementById("minute").style.transform = `rotate(${cumulativeMinuteRotation}deg)`;
    }
    if (cumulativeHourRotation == 0) {

        document.getElementById("hour").style.transition = "transform 1s ease";
        document.getElementById("hour").style.transform = `rotate(361deg)`;
        hourreset = true;
    } else if (hourreset != true) {
        document.getElementById("hour").style.transition = "transform 1s ease"; // Transition fluide
        document.getElementById("hour").style.transform = `rotate(${cumulativeHourRotation}deg)`;
    }
    // Update date immediately
    updateDate();
}

function getGreeting() {
    const currentHour = new Date().getHours();
    let greetingKey;

    // Determine the greeting key based on the current hour
    if (currentHour < 12) {
        greetingKey = 'morning';
    } else if (currentHour < 17) {
        greetingKey = 'afternoon';
    } else {
        greetingKey = 'evening';
    }

    // Get the user's language setting
    const userLang = getLanguageStatus('selectedLanguage') || 'en'; // Default to English

    // Check if the greeting is available for the selected language
    if (
        translations[userLang] &&
        translations[userLang].greeting &&
        translations[userLang].greeting[greetingKey]
    ) {
        return translations[userLang].greeting[greetingKey];
    } else {
        // Fallback to English greeting if the userLang or greeting key is missing
        return translations['en'].greeting[greetingKey];
    }
}

function updatedigiClock() {
    const hourformatstored = localStorage.getItem("hourformat");
    let hourformat = hourformatstored === "true"; // Default to false if null
    const greetingCheckbox = document.getElementById("greetingcheckbox");
    const isGreetingEnabled = localStorage.getItem("greetingEnabled") === "true";
    greetingCheckbox.checked = isGreetingEnabled;

    const now = new Date();
    const dayOfWeek = now.getDay(); // Get day of the week (0-6)
    const dayOfMonth = now.getDate(); // Get current day of the month (1-31)

    const currentLanguage = getLanguageStatus('selectedLanguage') || 'en';

    // Get translated day name
    let dayName;
    if (
        translations[currentLanguage] &&
        translations[currentLanguage].days &&
        translations[currentLanguage].days[dayOfWeek]
    ) {
        dayName = translations[currentLanguage].days[dayOfWeek];
    } else {
        dayName = translations['en'].days[dayOfWeek]; // Fallback to English day name
    }

    // Localize the day of the month
    const localizedDayOfMonth = localizeNumbers(dayOfMonth.toString(), currentLanguage);

    // Determine the translated short date string based on language
    const dateFormats = {
        az: `${dayName} ${dayOfMonth}`, //Mardi 11
        bn: `${dayName}, ${localizedDayOfMonth}`,
        mr: `${dayName}, ${localizedDayOfMonth}`,
        zh: `${dayOfMonth}日${dayName}`,
        cs: `${dayName}, ${dayOfMonth}.`,
        hi: `${dayName}, ${dayOfMonth}`,
        ja: `${dayOfMonth} ${dayName.substring(0, 1)}`,
        ko: `${dayOfMonth} ${dayName.substring(0, 1)}`,
        pt: `${dayName}, ${dayOfMonth}`,
        ru: `${dayOfMonth} ${dayName.substring(0, 2)}`,
        vi: `${dayOfMonth} ${dayName}`,
        idn: `${dayOfMonth} ${dayName}`,
        fr: `${dayName} ${dayOfMonth}`, //Mardi 11
        default: `${localizedDayOfMonth} ${dayName.substring(0, 3)}`, // e.g., "24 Thu"
    };
    const dateString = dateFormats[currentLanguage] || dateFormats.default;

    // Handle time formatting based on the selected language
    let timeString;
    let period = ''; // For storing AM/PM equivalent

    // Array of languages to use 'en-US' format
    const specialLanguages = ['tr', 'zh', 'ja', 'ko']; // Languages with NaN in locale time format
    const localizedLanguages = ['bn', 'mr'];
    // Force the 'en-US' format for Bengali, otherwise, it will be localized twice, resulting in NaN

    // Set time options and determine locale based on the current language
    const timeOptions = {hour: '2-digit', minute: '2-digit', hour12: hourformat};
    const locale = specialLanguages.includes(currentLanguage) || localizedLanguages.includes(currentLanguage) ? 'en-US' : currentLanguage;
    timeString = now.toLocaleTimeString(locale, timeOptions);

    // Split the time and period (AM/PM) if in 12-hour format
    if (hourformat) {
        [timeString, period] = timeString.split(' '); // Split AM/PM if present
    }

    // Split the hours and minutes from the localized time string
    let [hours, minutes] = timeString.split(':');

    // Remove leading zero from hours in 12-hour format
    if (hourformat) {
        hours = parseInt(hours, 10).toString(); // Remove leading zero
    }

    // Localize hours and minutes for the selected language
    const localizedHours = localizeNumbers(hours, currentLanguage);
    const localizedMinutes = localizeNumbers(minutes, currentLanguage);

    // Update the hour, colon, and minute text elements
    document.getElementById('digihours').textContent = localizedHours;
    document.getElementById('digicolon').textContent = ':'; // Static colon
    document.getElementById('digiminutes').textContent = localizedMinutes;

    // Manually set the period for special languages if 12-hour format is enabled
    if (hourformat && specialLanguages.includes(currentLanguage)) {
        period = parseInt(hours, 10) < 12 ? 'AM' : 'PM';
    }

    // Display AM/PM if in 12-hour format
    if (hourformat) {
        document.getElementById('amPm').textContent = period; // Show AM/PM based on calculated period
    } else {
        document.getElementById('amPm').textContent = ''; // Clear AM/PM for 24-hour format
    }

    // Update the translated date
    document.getElementById('digidate').textContent = dateString;

    const clocktype1 = localStorage.getItem("clocktype");
    if (clocktype1 === "digital" && isGreetingEnabled) {
        document.getElementById("date").innerText = getGreeting();
    } else if (clocktype1 === "digital") {
        document.getElementById("date").innerText = ""; // Hide the greeting
    }
}

// Function to start the clock
function startClock() {
    if (!intervalId) { // Only set interval if not already set
        intervalId = setInterval(updateanalogclock, 500);
    }
}

// Function to stop the clock
function stopClock() {
    clearInterval(intervalId);
    intervalId = null; // Reset intervalId
}

// Initial clock display
displayClock();
setInterval(updatedigiClock, 1000); // Update digital clock every second

// Start or stop clocks based on clock type and visibility state
if (clocktype === "digital") {
    updatedigiClock();
} else if (clocktype === "analog") {
    if (document.visibilityState === 'visible') {
        startClock();
        updateDate(); // Immediately update date when clock is analog
    }
}

// Event listener for visibility change
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'visible') {
        startClock(); // Start the clock if the tab is focused
        updateDate(); // Update date when the tab becomes visible
    } else {
        stopClock(); // Stop the clock if the tab is not focused
    }
});

function displayClock() {
    const analogClock = document.getElementById('analogClock');
    const digitalClock = document.getElementById('digitalClock');

    if (clocktype === 'analog') {
        analogClock.style.display = 'block'; // Show the analog clock
        digitalClock.style.display = 'none';  // Hide the digital clock
    } else if (clocktype === 'digital') {
        digitalClock.style.display = 'block';  // Show the digital clock
        analogClock.style.display = 'none';     // Hide the analog clock
    }
}

// Call updateanalogclock when the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    updateanalogclock();
});

// End of clock display
