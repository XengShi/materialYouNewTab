/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */


const apiUrl = "https://quotes-api-self.vercel.app/quote/";
// Credits: https://github.com/well300/quotes-api

const quotesContainer = document.querySelector('.quotesContainer');
const authorName = document.querySelector('.authorName span');

// Set character limits for quotes
const MIN_QUOTE_LENGTH = 60;
const MAX_QUOTE_LENGTH = 140;
const QUOTE_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

// Default quotes for offline or error scenarios
const defaultQuotes = [
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { quote: "Keep your face always toward the sunshine and shadows will fall behind you.", author: "Walt Whitman" },
    { quote: "Since light travels faster than sound, some people appear bright until you hear them speak.", author: "Alan Dundes" }
];

// Fetch and display a quote
async function fetchAndDisplayQuote() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        let { quote, author } = data;

        // Check if the quote length meets the criteria
        if (quote.length + author.length >= MIN_QUOTE_LENGTH && quote.length + author.length <= MAX_QUOTE_LENGTH) {
            const quoteData = { quote, author };

            // Store in local storage
            localStorage.setItem("currentQuote", JSON.stringify(quoteData));
            localStorage.setItem("lastQuoteUpdate", Date.now().toString());

            // Display the quote
            displayQuote(quoteData);
        } else {
            // Fetch again if the quote does not meet character length requirements
            fetchAndDisplayQuote();
        }
    } catch (error) {
        console.error("Error fetching quote:", error);
        useDefaultQuote();
    }
}

// Display a quote on the page
function displayQuote(quoteData) {
    const { quote, author } = quoteData || defaultQuotes[0];
    quotesContainer.textContent = quote;
    authorName.textContent = author;
}

// Use a default quote in case of errors
function useDefaultQuote() {
    let defaultQuoteIndex = parseInt(localStorage.getItem("defaultQuoteIndex")) || 0;
    const fallback = defaultQuotes[defaultQuoteIndex];

    defaultQuoteIndex = (defaultQuoteIndex + 1) % defaultQuotes.length;

    localStorage.setItem("defaultQuoteIndex", defaultQuoteIndex.toString());
    localStorage.setItem("currentQuote", JSON.stringify(fallback));
    localStorage.setItem("lastQuoteUpdate", Date.now().toString());

    displayQuote(fallback);
}

// Refresh the quote if needed
function refreshQuoteIfNeeded() {
    const lastUpdated = parseInt(localStorage.getItem("lastQuoteUpdate")) || 0;
    const now = Date.now();

    if ((now - lastUpdated) >= QUOTE_REFRESH_INTERVAL) {
        fetchAndDisplayQuote()
            .catch(() => {
                useDefaultQuote();
            });
    } else {
        const currentQuote = JSON.parse(localStorage.getItem("currentQuote") || "null");
        if (currentQuote) {
            displayQuote(currentQuote);
        } else {
            fetchAndDisplayQuote()
                .catch(() => {
                    useDefaultQuote();
                });
        }
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

    let quoteInterval = null;
    const clearQuotes = () => {
        localStorage.removeItem("currentQuote"); // Remove stored quote
        localStorage.removeItem("lastQuoteUpdate");
        localStorage.removeItem("defaultQuoteIndex");

        if (quoteInterval) {
            clearInterval(quoteInterval);
            quoteInterval = null;
        }
    }

    // Function to update quotes visibility
    const updateMotivationalQuotesState = () => {
        const isHideSearchWithEnabled = hideSearchWith.checked;
        const isMotivationalQuotesEnabled = motivationalQuotesCheckbox.checked;

        // Save state to localStorage
        localStorage.setItem("motivationalQuotesVisible", isMotivationalQuotesEnabled);

        if (!isHideSearchWithEnabled) {
            quotesToggle.classList.add("inactive");
            motivationalQuotesCont.style.display = "none";
            clearQuotes();
            return;
        }

        quotesToggle.classList.remove("inactive");
        searchWithContainer.style.display = isMotivationalQuotesEnabled ? "none" : "flex";
        motivationalQuotesCont.style.display = isMotivationalQuotesEnabled ? "flex" : "none";

        if (isMotivationalQuotesEnabled) {
            refreshQuoteIfNeeded();

            if (!quoteInterval) {
                quoteInterval = setInterval(refreshQuoteIfNeeded, 60 * 1000);
            }
        } else clearQuotes();
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
