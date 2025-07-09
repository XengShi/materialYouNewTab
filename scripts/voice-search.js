/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

//  -----------Voice Search------------
function isSupportedBrowser() {
    return (isChrome || isEdge) && isDesktop && !isBrave;
}

// Set the initial state of the mic icon and checkbox based on saved state or supported browser
const micIcon = document.getElementById("micIcon");
const micIconCheckbox = document.getElementById("micIconCheckbox");

// Check if there's a saved state in localStorage
const savedState = localStorage.getItem("micIconVisible");
let isMicIconVisible;

// If saved state exists, use it; otherwise, fallback to initial state based on browser support
if (savedState !== null) {
    isMicIconVisible = savedState === "true";
} else {
    // Default state: Hide mic icon if browser is not supported
    isMicIconVisible = isSupportedBrowser();
    // Save the initial state based on the user agent
    localStorage.setItem("micIconVisible", isMicIconVisible);
}

// Set the checkbox state based on the saved or default state
micIconCheckbox.checked = !isMicIconVisible; // Checked hides the mic icon
if (isMicIconVisible) {
    micIcon.style.display = "block";  // Mic icon is displayed
} else {
    micIcon.style.display = "none";   // Hide the mic icon
}

// Function to toggle mic icon visibility
function toggleMicIconVisibility(isVisible) {
    micIcon.style.display = isVisible ? "block" : "none";
    localStorage.setItem("micIconVisible", isVisible); // Save to localStorage
}

// Toggle mic icon display based on checkbox state
micIconCheckbox.addEventListener("change", () => {
    const isChecked = micIconCheckbox.checked;
    toggleMicIconVisibility(!isChecked); // Checked hides the mic icon

    // Only initialize Web Speech API if the mic icon is visible
    if (!isChecked) {
        initializeSpeechRecognition();
    }
});

// Function to initialize Web Speech API if supported
function initializeSpeechRecognition() {
    const searchInput = document.getElementById("searchQ");
    const resultBox = document.getElementById("resultBox");
    const currentLanguage = getLanguageStatus("selectedLanguage") || "en";

    // Check if the browser supports SpeechRecognition API
    const isSpeechRecognitionAvailable = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

    if (isSpeechRecognitionAvailable) {
        // Initialize SpeechRecognition (cross-browser compatibility)
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;  // Stop recognition after first result
        recognition.interimResults = true; // Enable interim results for live transcription
        recognition.lang = currentLanguage; // Set the language dynamically based on selected language

        let isRecognizing = false; // Flag to check if recognition is active

        // When speech recognition starts
        recognition.onstart = () => {
            isRecognizing = true; // Set the flag to indicate recognition is active
            const selectedRadio = document.querySelector(".colorPlate:checked");
            if (selectedRadio.value !== "dark") {
                micIcon.style.color = "var(--darkerColor-blue)";
                // micIcon.style.transform = "scale(1.05)";
            }
            searchInput.placeholder = `${translations[currentLanguage]?.listenPlaceholder || translations["en"].listenPlaceholder}`;
            micIcon.classList.add("micActive");
        };

        // When speech recognition results are available (including interim results)
        recognition.onresult = (event) => {
            let transcript = "";
            // Loop through results to build the transcript text
            for (let i = 0; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript; // Append each piece of the transcript
            }
            // Display the interim result in the search input
            searchInput.value = transcript;
            // Trigger the input event manually to update suggestions
            searchInput.dispatchEvent(new Event("input"));
            // If the result is final, hide the result box
            if (event.results[event.results.length - 1].isFinal) {
                resultBox.style.display = "none"; // Hide result box after final input
            }
        };

        // When an error occurs during speech recognition
        recognition.onerror = (event) => {
            console.error("Speech recognition error: ", event.error);
            isRecognizing = false; // Reset flag on error
        };

        // When speech recognition ends (either by user or automatically)
        recognition.onend = () => {
            isRecognizing = false; // Reset the flag to indicate recognition has stopped
            micIcon.style.color = "var(--darkColor-blue)"; // Reset mic color
            // micIcon.style.transform = "scale(1)"; // Reset scaling
            micIcon.classList.remove("micActive");
            searchInput.placeholder = `${translations[currentLanguage]?.searchPlaceholder || translations["en"].searchPlaceholder}`;
        };

        // Start speech recognition when mic icon is clicked
        micIcon.addEventListener("click", () => {
            if (isRecognizing) {
                recognition.stop(); // Stop recognition if it's already listening
            } else {
                recognition.start(); // Start recognition if it's not already listening
            }
        });
    } else {
        console.info("Speech Recognition API not supported in this browser.");
    }
}

// Initialize SpeechRecognition only if the mic icon is visible
if (!micIconCheckbox.checked) {
    initializeSpeechRecognition();
}
//  -----------End of Voice Search------------