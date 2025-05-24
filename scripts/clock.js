/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

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
    let clocktype;
    let intervalId;
    // Retrieve current time and calculate initial angles
    var currentTime = new Date();
    var initialSeconds = currentTime.getSeconds();
    var initialMinutes = currentTime.getMinutes();
    var initialHours = currentTime.getHours();

    // Initialize cumulative rotations
    let cumulativeSecondRotation = initialSeconds * 6;
    let cumulativeMinuteRotation = initialMinutes * 6 + (initialSeconds / 10);
    let cumulativeHourRotation = (30 * initialHours + initialMinutes / 2);

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
                ur: `${dayName}، ${dayOfMonth} ${monthName}`,
                de: `${dayName}, ${dayOfMonth}. ${monthName}`,
                fa: `${dayName}، ${localizedDayOfMonth} ${monthName}`, // e.g., شنبه، ۲۵ اسفند
                default: `${dayName.substring(0, 3)}, ${monthName.substring(0, 3)} ${dayOfMonth}`	// Sun, Dec 22
            };
            document.getElementById("date").innerText = dateDisplay[currentLanguage] || dateDisplay.default;
        }
    }

    function updateanalogclock() {
        var currentTime = new Date();
        var initialSeconds = currentTime.getSeconds();
        var initialMinutes = currentTime.getMinutes();
        var initialHours = currentTime.getHours();
        let secondreset = false;
        let hourreset = false;
        let minreset = false;

        // Initialize cumulative rotations
        let cumulativeSecondRotation = initialSeconds * 6; // 6° per second
        let cumulativeMinuteRotation = initialMinutes * 6 + (initialSeconds / 10); // 6° per minute + adjustment for seconds
        let cumulativeHourRotation = (30 * initialHours + initialMinutes / 2); // 30° per hour + adjustment for minutes

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
        if (cumulativeSecondRotation === 0) {
            document.getElementById("second").style.transition = "transform 1s ease";
            document.getElementById("second").style.transform = `rotate(361deg)`;
            secondreset = true;
        } else {
            document.getElementById("second").style.transition = "transform 1s ease";
            document.getElementById("second").style.transform = `rotate(${cumulativeSecondRotation}deg)`;
        }

        if (cumulativeMinuteRotation === 0) {
            document.getElementById("minute").style.transition = "transform 1s ease";
            document.getElementById("minute").style.transform = `rotate(361deg)`;
            minreset = true;
        } else if (minreset !== true) {
            document.getElementById("minute").style.transition = "transform 1s ease";
            document.getElementById("minute").style.transform = `rotate(${cumulativeMinuteRotation}deg)`;
        }

        if (cumulativeHourRotation === 0 && currentTime.getHours() === 0 && currentTime.getMinutes() === 0) {
            document.getElementById("hour").style.transition = "none"; // Instantly reset at midnight
            document.getElementById("hour").style.transform = `rotate(0deg)`;
            hourreset = true;
        } else if (hourreset !== true) {
            document.getElementById("hour").style.transition = "transform 1s ease";
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

        // Determine the translated short date string based on language
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
            vi: `${dayOfMonth} ${dayName}`,
            idn: `${dayOfMonth} ${dayName}`,
            fr: `${dayName} ${dayOfMonth}`, // Mardi 11
            hu: `${dayName} ${dayOfMonth}`, // Kedd 11
            ur: `${dayName}، ${dayOfMonth}`,
            de: `${dayOfMonth}. ${dayName}`,
            fa: `${dayName} ${localizedDayOfMonth}`, // e.g. شنبه ۲۵
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

            if (currentLanguage === "fa") {
                // Farsi specific AM/PM or equivalent
                period = realHours < 12 ? "ق.ظ" : "ب.ظ"; // قبل از ظهر / بعد از ظهر
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
    updateanalogclock();
    setInterval(updatedigiClock, 1000); // Update digital clock every second

    // Start or stop clocks based on clock type and visibility state
    if (clocktype === "digital") {
        updatedigiClock();
    } else if (clocktype === "analog") {
        if (document.visibilityState === "visible") {
            startClock();
            updateDate(); // Immediately update date when clock is analog
        }
    }

    // Event listener for visibility change
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible") {
            startClock(); // Start the clock if the tab is focused
            updateDate(); // Update date when the tab becomes visible
        } else {
            stopClock(); // Stop the clock if the tab is not focused
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
                stopClock();
                saveActiveStatus("timeformatField", "active");
                saveActiveStatus("greetingField", "active");
            } else {
                timeformatField.classList.add("inactive");
                greetingField.classList.add("inactive");
                greetingCheckbox.disabled = true; // Disable greeting toggle
                localStorage.setItem("clocktype", "analog");
                clocktype = localStorage.getItem("clocktype");
                stopClock();
                startClock();
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
