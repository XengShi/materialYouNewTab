const apiUrl = "https://quotes-api-self.vercel.app/quote/";
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

// Sanitize quote text
function sanitizeQuote(quote) {
    // Remove trailing ” if there is no matching opening “
    if (quote.endsWith("”") && !quote.includes("“")) {
        quote = quote.slice(0, -1);
    }
    return quote;
}

// Fetch and display a quote
async function fetchAndDisplayQuote() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        let { quote, author } = data;

        // Sanitize the quote
        quote = sanitizeQuote(quote);

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

// Initial load
if (localStorage.getItem("motivationalQuotesVisible") !== "false") {
    refreshQuoteIfNeeded(); // Display a quote immediately if possible
    setInterval(refreshQuoteIfNeeded, 60 * 1000); // Check every minute
}
