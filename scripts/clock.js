/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Global variables to track intervals
let analogIntervalId = null;
let digitalIntervalId = null;

// ---------------------- Hiding clock func ----------------------
// Select elements
const leftDiv = document.getElementById("leftDiv");
const rightDiv = document.getElementById("rightDiv");
const hideClockCheckbox = document.getElementById("hideClock");
const elementsToHide = document.querySelectorAll(".clockRegion");

function toggleHideState(isHidden) {
    elementsToHide.forEach(element => {
        if (isHidden) {
            element.style.transform = "translateY(-20px)";
            setTimeout(() => {
                element.style.display = "none";
            }, 250);
        } else {
            element.style.display = "flex";
            setTimeout(() => {
                element.style.transform = "translateY(0)";
            }, 50);
        }
    });
}

function applyClockState(isHidden) {
    leftDiv.classList.toggle("clock-hidden-left", isHidden);
    rightDiv.classList.toggle("clock-shifted-right", isHidden);
    rightDiv.classList.toggle("clock-shifted-right-wide", !isHidden);
    rightDiv.classList.toggle("clock-padding-adjusted", isHidden);
}

function handleClockVisibility() {
    if (window.matchMedia("(max-width: 500px)").matches) {
        initializeClock();

        elementsToHide.forEach(element => {
            element.style.display = "flex";
            element.style.transform = "translateY(0)";
        });
        rightDiv.classList.remove("clock-padding-adjusted");
    }
    else {
        // Retrieve saved state from localStorage
        const isClockHidden = localStorage.getItem("hideClockVisible") === "true";
        hideClockCheckbox.checked = isClockHidden;

        // Apply initial state
        applyClockState(isClockHidden);
        toggleHideState(isClockHidden);

        if (!isClockHidden) {
            initializeClock();
        }

        hideClockCheckbox.addEventListener("change", function () {
            const isChecked = hideClockCheckbox.checked;
            localStorage.setItem("hideClockVisible", isChecked);
            applyClockState(isChecked);
            toggleHideState(isChecked);

            if (!isChecked) {
                initializeClock();
            }
        });
    }
}

handleClockVisibility();
// Update on window resize
window.addEventListener("resize", handleClockVisibility);

// ---------------------- Clock func ----------------------
async function initializeClock() {
    // Clear any existing intervals first
    if (analogIntervalId) {
        clearInterval(analogIntervalId);
        analogIntervalId = null;
    }
    if (digitalIntervalId) {
        clearInterval(digitalIntervalId);
        digitalIntervalId = null;
    }

    let clocktype;

    // Track cumulative rotations
    let cumulativeSecondRotation = 0;
    let cumulativeMinuteRotation = 0;
    let cumulativeHourRotation = 0;

    // Initialize on first load
    let isFirstLoad = true;

    // Retrieve current time and calculate initial angles
    var currentTime = new Date();
    var initialSeconds = currentTime.getSeconds();
    var initialMinutes = currentTime.getMinutes();
    var initialHours = currentTime.getHours();

    // Initialize cumulative rotations
    cumulativeSecondRotation = initialSeconds * 6;
    cumulativeMinuteRotation = initialMinutes * 6 + (initialSeconds / 10);
    cumulativeHourRotation = (30 * initialHours + initialMinutes / 2);

    // Apply initial rotations (no need to wait 1s now)
    document.getElementById("second").style.transform = `rotate(${cumulativeSecondRotation}deg)`;
    document.getElementById("minute").style.transform = `rotate(${cumulativeMinuteRotation}deg)`;
    document.getElementById("hour").style.transform = `rotate(${cumulativeHourRotation}deg)`;

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
            const currentLanguage = getLanguageStatus("selectedLanguage") || "en";

            // Get the translated name of the day
            var dayName = translations[currentLanguage]?.days?.[dayOfWeek] ?? translations["en"].days[dayOfWeek];

            // Get the translated name of the month
            var monthName = translations[currentLanguage]?.months?.[month] ?? translations["en"].months[month];

            // Localize the day of the month
            var localizedDayOfMonth = localizeNumbers(dayOfMonth.toString(), currentLanguage);

            // DATE DISPLAY FOR ANALOG CLOCK
            const dateDisplay = {
                bn: `${dayName}, ${localizedDayOfMonth} ${monthName}`,
                mr: `${dayName}, ${localizedDayOfMonth} ${monthName}`,
                np: `${dayName}, ${localizedDayOfMonth} ${monthName}`,
                zh: `${monthName}${dayOfMonth}日${dayName}`,
                zh_TW: `${monthName}${dayOfMonth}日${dayName}`,
                cs: `${dayName}, ${dayOfMonth}. ${monthName}`,
                hi: `${dayName}, ${dayOfMonth} ${monthName}`,
                it: `${dayName.substring(0, 3)} ${dayOfMonth} ${monthName.substring(0, 3)}`,
                ja: `${monthName} ${dayOfMonth}日(${dayName.substring(0, 1)})`,
                ko: `${monthName} ${dayOfMonth}일(${dayName.substring(0, 1)})`,
                pt: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
                ru: `${dayName.substring(0, 2)}, ${dayOfMonth} ${monthName.substring(0, 4)}.`,
                es: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
                tr: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName}`,
                uz: `${dayName.substring(0, 3)}, ${dayOfMonth}-${monthName}`,
                vi: `${dayName}, ngày ${dayOfMonth} ${monthName}`,
                idn: `${dayName}, ${dayOfMonth} ${monthName}`,
                fr: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`, // Jeudi, 5 avril
                az: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
                sl: `${dayName}, ${dayOfMonth}. ${monthName.substring(0, 3)}.`,
                hu: `${monthName.substring(0, 3)} ${dayOfMonth}, ${dayName}`,	// Dec 22, Kedd
                ta: `${monthName} ${localizedDayOfMonth}, ${dayName}`,	// e.g.,மார்கழி 31, ஞாயிறு
                ur: `${dayName}، ${dayOfMonth} ${monthName}`,
                de: `${dayName}, ${dayOfMonth}. ${monthName}`,
                fa: `${dayName}، ${localizedDayOfMonth} ${monthName}`, // e.g., شنبه، ۲۵ اسفند
                ar_SA: `${dayName}, ${localizedDayOfMonth} ${monthName}`,	// e.g., الجمعة, 31 مايو
                el: `${dayName.substring(0, 3)} ${dayOfMonth} ${monthName}`, // Κυρ 22 Δεκ
                th: `วัน${dayName}ที่ ${dayOfMonth} ${monthName}`, // วันอาทิตย์ที่ 22 ธันวาคม
                default: `${dayName.substring(0, 3)}, ${monthName.substring(0, 3)} ${dayOfMonth}`	// Sun, Dec 22
            };
            document.getElementById("date").innerText = dateDisplay[currentLanguage] || dateDisplay.default;
        }
    }

    // Helper function to update hand rotation smoothly
    function updateHandRotation(handId, newRotation, currentTotal, isResetCondition) {
        let newTotal;

        // Always calculate the shortest path for smooth transitions
        const diff = newRotation - (currentTotal % 360);

        if (isFirstLoad) {
            // On first load, just set the initial position
            newTotal = newRotation;
        } else if (isResetCondition && Math.abs(diff + 360) < Math.abs(diff)) {
            // When resetting (like 59s→0s), choose the forward path if it's shorter
            newTotal = newRotation + (Math.floor(currentTotal / 360) + 1) * 360;
        } else {
            // Normal case - maintain current rotation count
            newTotal = newRotation + Math.floor(currentTotal / 360) * 360;
        }

        // Apply the smooth transition
        document.getElementById(handId).style.transition = "transform 1s ease";
        document.getElementById(handId).style.transform = `rotate(${newTotal}deg)`;

        return newTotal;
    }

    function updateanalogclock() {
        var currentTime = new Date();
        var currentSeconds = currentTime.getSeconds();
        var currentMinutes = currentTime.getMinutes();
        var currentHours = currentTime.getHours();

        // Calculate the new rotation values
        let newSecondRotation = currentSeconds * 6; // 6° per second
        let newMinuteRotation = currentMinutes * 6 + (currentSeconds / 10); // 6° per minute + adjustment for seconds
        let newHourRotation = (30 * (currentHours % 12) + currentMinutes / 2); // 30° per hour + adjustment for minutes, 12-hour cycle

        // Define reset conditions
        const secondReset = currentSeconds === 0;
        const minuteReset = currentMinutes === 0 && currentSeconds === 0;
        const hourReset = currentHours % 12 === 0 && currentMinutes === 0 && currentSeconds === 0;

        // Update each hand using the helper function
        cumulativeSecondRotation = updateHandRotation("second", newSecondRotation, cumulativeSecondRotation, secondReset);
        cumulativeMinuteRotation = updateHandRotation("minute", newMinuteRotation, cumulativeMinuteRotation, minuteReset);
        cumulativeHourRotation = updateHandRotation("hour", newHourRotation, cumulativeHourRotation, hourReset);

        // Mark that we're no longer on first load
        isFirstLoad = false;

        // Update date immediately
        updateDate();
    }

    function getGreeting() {
        const currentHour = new Date().getHours();
        let greetingKey;

        // Determine the greeting key based on the current hour
        if (currentHour < 12) {
            greetingKey = "morning";
        } else if (currentHour < 17) {
            greetingKey = "afternoon";
        } else {
            greetingKey = "evening";
        }

        // Get the user's language setting
        const currentLanguage = getLanguageStatus("selectedLanguage") || "en"; // Default to English

        // Return the translated greeting is available
        return translations[currentLanguage]?.greeting?.[greetingKey] ?? translations["en"].greeting[greetingKey];
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

        const currentLanguage = getLanguageStatus("selectedLanguage") || "en";

        // Get translated day name
        let dayName = translations[currentLanguage]?.days?.[dayOfWeek] ?? translations["en"].days[dayOfWeek];

        // Localize the day of the month
        const localizedDayOfMonth = localizeNumbers(dayOfMonth.toString(), currentLanguage);

        // DATE DISPLAY FOR DIGITAL CLOCK
        const dateFormats = {
            az: `${dayName} ${dayOfMonth}`,
            bn: `${dayName}, ${localizedDayOfMonth}`,
            mr: `${dayName}, ${localizedDayOfMonth}`,
            np: `${dayName}, ${localizedDayOfMonth}`,
            zh: `${dayOfMonth}日${dayName}`,
            zh_TW: `${dayOfMonth}日${dayName}`,
            cs: `${dayName}, ${dayOfMonth}.`,
            hi: `${dayName}, ${dayOfMonth}`,
            ja: `${dayOfMonth}日 (${dayName[0]})`,
            ko: `${dayOfMonth}일 (${dayName[0]})`,
            pt: `${dayName}, ${dayOfMonth}`,
            ru: `${dayOfMonth} ${dayName.substring(0, 2)}`,
            ta: `${localizedDayOfMonth} ${dayName.substring(0, 2)}`,
            vi: `${dayOfMonth} ${dayName}`,
            idn: `${dayOfMonth} ${dayName}`,
            fr: `${dayName} ${dayOfMonth}`, // Mardi 11
            hu: `${dayName} ${dayOfMonth}`, // Kedd 11
            ur: `${dayName}، ${dayOfMonth}`,
            de: `${dayOfMonth}. ${dayName}`,
            fa: `${dayName} ${localizedDayOfMonth}`, // e.g. شنبه ۲۵
            ar_SA: `${dayName}, ${localizedDayOfMonth}`,	// e.g., الجمعة, 31
            el: `${dayName.substring(0, 3)} ${dayOfMonth}`, // Κυρ 22
            th: `${dayName}ที่ ${dayOfMonth}`,
            default: `${dayOfMonth} ${dayName.substring(0, 3)}`,	// 24 Thu
        };
        const dateString = dateFormats[currentLanguage] || dateFormats.default;

        // Handle time formatting based on the selected language
        let timeString;
        let period = ""; // For storing AM/PM equivalent

        // Array of languages to use "en-US" format
        const specialLanguages = ["tr", "zh", "zh_TW", "ja", "ko", "hu"]; // Languages with NaN in locale time format
        const localizedLanguages = Object.keys(numberMappings);
        // Force the "en-US" format for numeral-localized languages, otherwise, it will be localized twice, resulting in NaN

        // Set time options and determine locale based on the current language
        const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: hourformat };
        const locale = specialLanguages.includes(currentLanguage) || localizedLanguages.includes(currentLanguage) ? "en-US" : currentLanguage;
        timeString = now.toLocaleTimeString(locale, timeOptions);

        // Split the time and period (AM/PM) if in 12-hour format
        if (hourformat) {
            [timeString, period] = timeString.split(" "); // Split AM/PM if present
        }

        // Split the hours and minutes from the localized time string
        let [hours, minutes] = timeString.split(":");

        // Remove leading zero from hours in 12-hour format
        if (hourformat) {
            hours = parseInt(hours, 10).toString(); // Remove leading zero
        }

        // Localize hours and minutes for the selected language
        const localizedHours = localizeNumbers(hours, currentLanguage);
        const localizedMinutes = localizeNumbers(minutes, currentLanguage);

        // Update the hour, colon, and minute text elements
        document.getElementById("digihours").textContent = localizedHours;
        document.getElementById("digicolon").textContent = ":"; // Static colon
        document.getElementById("digiminutes").textContent = localizedMinutes;

        // Manually set the period for special languages if 12-hour format is enabled
        if (hourformat && (specialLanguages.includes(currentLanguage) || localizedLanguages.includes(currentLanguage))) {
            let realHours = new Date().getHours();

            // lANGUAGE-SPECIFIC AM/PM 
            if (currentLanguage === "fa") {
                period = realHours < 12 ? "ق.ظ" : "ب.ظ"; // قبل از ظهر / بعد از ظهر
            } else if (currentLanguage === "ar_SA") {
                period = realHours < 12 ? "ص" : "م"; // صباحاً / مساءً
            } else if (currentLanguage === "ta") {
                if (realHours < 2) {
                    period = "யாமம்"
                } else if (realHours < 6) {
                    period = "வைகறை"
                } else if (realHours < 10) {
                    period = "காலை"
                } else if (realHours < 14) {
                    period = "நண்பகல்"
                } else if (realHours < 18) {
                    period = "எற்பாடு"
                } else if (realHours < 22) {
                    period = "மாலை"
                } else {
                    period = "யாமம்"
                }
            } else {
                period = realHours < 12 ? "AM" : "PM";
            }
        }

        // Display AM/PM if in 12-hour format
        if (hourformat) {
            document.getElementById("amPm").textContent = period; // Show AM/PM based on calculated period
        } else {
            document.getElementById("amPm").textContent = ""; // Clear AM/PM for 24-hour format
        }

        // Update the translated date
        document.getElementById("digidate").textContent = dateString;

        const clocktype1 = localStorage.getItem("clocktype");
        if (clocktype1 === "digital" && isGreetingEnabled) {
            document.getElementById("date").innerText = getGreeting();
        } else if (clocktype1 === "digital") {
            document.getElementById("date").innerText = ""; // Hide the greeting
        }
    }

    // Function to start the analog clock
    function startAnalogClock() {
        if (!analogIntervalId) { // Only set interval if not already set
            analogIntervalId = setInterval(updateanalogclock, 500);
        }
    }

    // Function to stop the analog clock
    function stopAnalogClock() {
        if (analogIntervalId) {
            clearInterval(analogIntervalId);
            analogIntervalId = null; // Reset intervalId
        }
    }

    // Function to start the digital clock
    function startDigitalClock() {
        if (!digitalIntervalId) {
            digitalIntervalId = setInterval(updatedigiClock, 1000);
        }
    }

    // Function to stop the digital clock
    function stopDigitalClock() {
        if (digitalIntervalId) {
            clearInterval(digitalIntervalId);
            digitalIntervalId = null;
        }
    }

    // Initial clock display
    displayClock();
    updateanalogclock();

    // Start appropriate clock based on type
    if (clocktype === "digital") {
        updatedigiClock();
        startDigitalClock();
        stopAnalogClock();
    } else if (clocktype === "analog") {
        if (document.visibilityState === "visible") {
            startAnalogClock();
            updateDate(); // Immediately update date when clock is analog
        }
        stopDigitalClock();
    }

    // Event listener for visibility change
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible") {
            if (clocktype === "analog") {
                startAnalogClock(); // Start the analog clock if the tab is focused
                updateDate(); // Update date when the tab becomes visible
            } else if (clocktype === "digital") {
                startDigitalClock(); // Start the digital clock if the tab is focused
            }
        } else {
            stopAnalogClock(); // Stop the analog clock if the tab is not focused
            stopDigitalClock(); // Stop the digital clock if the tab is not focused
        }
    });

    function displayClock() {
        const analogClock = document.getElementById("analogClock");
        const digitalClock = document.getElementById("digitalClock");

        if (clocktype === "analog") {
            analogClock.style.display = "block";  // Show the analog clock
            digitalClock.style.display = "none";  // Hide the digital clock
        } else if (clocktype === "digital") {
            digitalClock.style.display = "block";  // Show the digital clock
            analogClock.style.display = "none";    // Hide the analog clock
        }
    }

    // ----------------------- End of clock display -------------------------

    // Save and load toggle state
    document.addEventListener("DOMContentLoaded", function () {
        const timeformatField = document.getElementById("timeformatField");
        const hourcheckbox = document.getElementById("12hourcheckbox");
        const digitalCheckbox = document.getElementById("digitalCheckbox");
        const greetingCheckbox = document.getElementById("greetingcheckbox");
        const greetingField = document.getElementById("greetingField");

        if (localStorage.getItem("greetingEnabled") === null) {
            localStorage.setItem("greetingEnabled", "true");
        }

        greetingCheckbox.checked = localStorage.getItem("greetingEnabled") === "true";
        greetingCheckbox.disabled = localStorage.getItem("clocktype") !== "digital";

        digitalCheckbox.addEventListener("change", function () {
            saveCheckboxState("digitalCheckboxState", digitalCheckbox);
            if (digitalCheckbox.checked) {
                timeformatField.classList.remove("inactive");
                greetingField.classList.remove("inactive");
                greetingCheckbox.disabled = false; // Enable greeting toggle
                localStorage.setItem("clocktype", "digital");
                clocktype = localStorage.getItem("clocktype");
                displayClock();
                stopAnalogClock();
                startDigitalClock();
                updatedigiClock();
                saveActiveStatus("timeformatField", "active");
                saveActiveStatus("greetingField", "active");
            } else {
                timeformatField.classList.add("inactive");
                greetingField.classList.add("inactive");
                greetingCheckbox.disabled = true; // Disable greeting toggle
                localStorage.setItem("clocktype", "analog");
                clocktype = localStorage.getItem("clocktype");
                stopDigitalClock();
                startAnalogClock();
                updateanalogclock();
                displayClock();
                saveActiveStatus("timeformatField", "inactive");
                saveActiveStatus("greetingField", "inactive");
            }
        });

        hourcheckbox.addEventListener("change", function () {
            saveCheckboxState("hourcheckboxState", hourcheckbox);
            if (hourcheckbox.checked) {
                localStorage.setItem("hourformat", "true");
            } else {
                localStorage.setItem("hourformat", "false");
            }
        });

        greetingCheckbox.addEventListener("change", () => {
            localStorage.setItem("greetingEnabled", greetingCheckbox.checked);
            updatedigiClock();
        });

        loadCheckboxState("digitalCheckboxState", digitalCheckbox);
        loadCheckboxState("hourcheckboxState", hourcheckbox);
        loadActiveStatus("timeformatField", timeformatField);
        loadActiveStatus("greetingField", greetingField);
    });
}
