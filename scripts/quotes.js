/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Multilingual quotes API.
const metadataUrl = "https://xengshi.github.io/multilingual-quotes-api/minified/metadata.json";
const baseQuoteUrl = "https://xengshi.github.io/multilingual-quotes-api/minified/";

const quotesContainer = document.querySelector(".quotesContainer");
const authorName = document.querySelector(".authorName span");

const MAX_QUOTE_LENGTH = 140;
let lastKnownLanguage = null;

// Clear all quotes-related data from localStorage
function clearQuotesStorage() {
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
        if (key.startsWith("quotes_")) {
            localStorage.removeItem(key);
        }
    });

    // Clear the quotes display
    quotesContainer.textContent = "";
    authorName.textContent = "";
}

// Check if quotes data needs to be refreshed
function shouldRefreshQuotes(lang, quotesData, metadata) {
    // Check if quotes data exists and is an array
    if (!quotesData || !Array.isArray(quotesData) || quotesData.length === 0) {
        return true;
    }

    // Check if we have stored timestamp for this language
    const storedTimestamp = localStorage.getItem(`quotes_${lang}_timestamp`);
    if (!storedTimestamp) {
        return true;
    }

    // Check if metadata has been updated since our last fetch
    const metadataTimestamp = localStorage.getItem("quotes_metadata_timestamp");
    if (!metadataTimestamp || metadataTimestamp !== metadata.lastUpdated) {
        // Metadata changed, but check if THIS language's count changed
        const storedQuoteCount = localStorage.getItem(`quotes_${lang}_count`);
        const currentCount = metadata.files[`${lang}.json`].count || 0;

        if (!storedQuoteCount || parseInt(storedQuoteCount) !== currentCount) {
            return true;
        }
    }

    // Time-based validation
    const now = Date.now();
    const timeDiff = now - new Date(storedTimestamp).getTime();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const oneDay = 24 * 60 * 60 * 1000;

    const fileInfo = metadata.files[`${lang}.json`];
    const quoteCount = fileInfo ? fileInfo.count : 0;

    // For languages with less than 100 quotes, check daily
    if (quoteCount < 100 && timeDiff > oneDay) {
        return true;
    }

    // For languages with 100+ quotes, check weekly
    if (quoteCount >= 100 && timeDiff > sevenDays) {
        return true;
    }

    return false;
}

// Fetch metadata from the API
async function fetchMetadata() {
    try {
        const response = await fetch(metadataUrl);
        const metadata = await response.json();
        return metadata;
    } catch (error) {
        console.error("Error fetching metadata:", error);
        throw error;
    }
}

// Fetch quotes for a specific language and store them locally
async function fetchQuotes(lang, metadata) {
    try {
        const url = `${baseQuoteUrl}${lang}.json`;
        const response = await fetch(url);
        const quotes = await response.json();

        // Store quotes and timestamp in localStorage
        localStorage.setItem(`quotes_${lang}`, JSON.stringify(quotes));
        localStorage.setItem(`quotes_${lang}_timestamp`, new Date().toISOString());

        // Store metadata timestamp to track when we last checked for updates
        localStorage.setItem("quotes_metadata_timestamp", metadata.lastUpdated);

        // Store the quote count for this language
        const quoteCount = metadata.files[`${lang}.json`].count || quotes.length;
        localStorage.setItem(`quotes_${lang}_count`, quoteCount.toString());

        return quotes;
    } catch (error) {
        console.error(`Error fetching quotes for ${lang}:`, error);
        throw error;
    }
}

// Get quotes for the current language with fallback logic
async function getQuotesForLanguage(forceRefresh = false) {
    try {
        // Check if language has changed
        const languageChanged = lastKnownLanguage !== null && lastKnownLanguage !== currentLanguage;
        if (languageChanged) {
            forceRefresh = true;
        }

        // Update last known language
        lastKnownLanguage = currentLanguage;

        // First, fetch the latest metadata to check for updates
        const metadata = await fetchMetadata();

        let targetLang = currentLanguage;
        let quotesData = null;

        // Determine which language to use based on quote availability
        if (currentLanguage !== "en") {
            const langFile = metadata.files[`${currentLanguage}.json`];
            if (!langFile || langFile.count < 100) {
                targetLang = "en";
            }
        }

        // If language changed, clear old data for the previous language
        if (languageChanged) {
            clearQuotesStorage();
        }

        // Try to get stored quotes first
        const storedQuotes = localStorage.getItem(`quotes_${targetLang}`);
        if (storedQuotes) {
            quotesData = JSON.parse(storedQuotes);
        }

        // Check if we need to fetch new quotes
        if (forceRefresh || shouldRefreshQuotes(targetLang, quotesData, metadata)) {
            quotesData = await fetchQuotes(targetLang, metadata);

            // Clear other language data after successfully fetching new data
            if (!languageChanged) {
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith("quotes_") && !key.includes(targetLang) && key !== "quotes_metadata_timestamp") {
                        localStorage.removeItem(key);
                    }
                });
            }
        }

        return quotesData;
    } catch (error) {
        console.error("Error getting quotes:", error);
        // Return fallback quote if everything fails
        return [{ quote: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" }];
    }
}

// Display a random quote that meets the length requirements
function displayRandomQuote(quotes) {
    if (!quotes || quotes.length === 0) {
        quotesContainer.textContent = "Don’t watch the clock; do what it does. Keep going.";
        authorName.textContent = "Sam Levenson";
        return;
    }

    let selectedQuote;
    const maxAttempts = 15; // Prevent infinite loop

    // Try to find a quote that fits within the character limit
    for (let attempts = 0; attempts < maxAttempts; attempts++) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        selectedQuote = quotes[randomIndex];

        const totalLength = selectedQuote.quote.length + selectedQuote.author.length;
        if (totalLength <= MAX_QUOTE_LENGTH) {
            break;
        }
    }

    // Display the selected quote
    quotesContainer.textContent = selectedQuote.quote;
    authorName.textContent = selectedQuote.author;
}

// Main function to load and display a quote
async function loadAndDisplayQuote(forceRefresh = false) {
    try {
        const quotes = await getQuotesForLanguage(forceRefresh);
        displayRandomQuote(quotes);
    } catch (error) {
        console.error("Error loading quote:", error);
        // Display fallback quote on any error
        quotesContainer.textContent = "Don’t watch the clock; do what it does. Keep going.";
        authorName.textContent = "Sam Levenson";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const hideSearchWith = document.getElementById("shortcut_switchcheckbox");
    const quotesToggle = document.getElementById("quotesToggle");
    const motivationalQuotesCont = document.getElementById("motivationalQuotesCont");
    const motivationalQuotesCheckbox = document.getElementById("motivationalQuotesCheckbox");
    const searchWithContainer = document.getElementById("search-with-container");

    // Load states from localStorage
    hideSearchWith.checked = localStorage.getItem("showShortcutSwitch") === "true";
    motivationalQuotesCheckbox.checked = localStorage.getItem("motivationalQuotesVisible") !== "false";

    // Initialize language tracking
    lastKnownLanguage = currentLanguage;

    // Function to update quotes visibility and handle state changes
    const updateMotivationalQuotesState = () => {
        const isHideSearchWithEnabled = hideSearchWith.checked;
        const isMotivationalQuotesEnabled = motivationalQuotesCheckbox.checked;

        // Save state to localStorage
        localStorage.setItem("motivationalQuotesVisible", isMotivationalQuotesEnabled);

        // Handle visibility based on settings
        if (!isHideSearchWithEnabled) {
            quotesToggle.classList.add("inactive");
            motivationalQuotesCont.style.display = "none";
            clearQuotesStorage();
            return;
        }

        // Update UI visibility
        quotesToggle.classList.remove("inactive");
        searchWithContainer.style.display = isMotivationalQuotesEnabled ? "none" : "flex";
        motivationalQuotesCont.style.display = isMotivationalQuotesEnabled ? "flex" : "none";

        // Load quotes if motivational quotes are enabled
        if (isMotivationalQuotesEnabled) {
            loadAndDisplayQuote(false);
        } else {
            clearQuotesStorage();
        }
    };

    // Apply initial state
    updateMotivationalQuotesState();

    // Event Listeners
    hideSearchWith.addEventListener("change", () => {
        searchWithContainer.style.display = "flex";
        updateMotivationalQuotesState();
    });

    motivationalQuotesCheckbox.addEventListener("change", updateMotivationalQuotesState);
});
