const apiUrl = "https://dummyjson.com/quotes?limit=50";
const quotesContainer = document.querySelector('.quotesContainer');
const authorName = document.querySelector('.authorName span');

// Set character limits for quotes
const MIN_QUOTE_LENGTH = 75;
const MAX_QUOTE_LENGTH = 125;
const QUOTE_REFRESH_INTERVAL = 10 * 60 * 1000;; // 10 minutes in milliseconds

// Default quotes for offline or error scenarios
const defaultQuotes = [
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { quote: "Keep your face always toward the sunshine and shadows will fall behind you.", author: "Walt Whitman" }
];

// Cache variables
let cachedQuotes = [];
let quoteIndex = 0;

async function fetchAndStoreQuotes() {
    try {
        const randnum = Math.floor(Math.random() * 28) * 50;
        const response = await fetch(`${apiUrl}&skip=${randnum}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        // Extract and filter quotes from the response
        const filteredQuotes = data.quotes.filter(quote =>
            quote.quote.length >= MIN_QUOTE_LENGTH && quote.quote.length <= MAX_QUOTE_LENGTH
        );

        if (filteredQuotes.length > 0) {
            localStorage.setItem("allQuotes", JSON.stringify(filteredQuotes));
            cachedQuotes = filteredQuotes; // Update cache
            quoteIndex = 0; // Reset index in cache
        }
    } catch (error) {
        console.error("Error fetching quotes:", error);
        // Use default quotes in case of an error
        localStorage.setItem("allQuotes", JSON.stringify(defaultQuotes));
        cachedQuotes = defaultQuotes; // Update cache
        quoteIndex = 0; // Reset index in cache
    }

    // After fetching, ensure lastQuoteUpdate is set
    localStorage.setItem("lastQuoteUpdate", Date.now().toString());
}

function displayQuote(quote) {
    if (!quote || !quote.quote || !quote.author) {
        const fallback = defaultQuotes[0];
        quotesContainer.textContent = `"${fallback.quote}"`;
        authorName.textContent = fallback.author;
        return;
    }
    quotesContainer.textContent = `"${quote.quote}"`;
    authorName.textContent = quote.author;
}

function displayNextQuote() {
    // If cache is empty, populate it from localStorage
    if (cachedQuotes.length === 0) {
        cachedQuotes = JSON.parse(localStorage.getItem("allQuotes") || "[]");
    }

    // Check if we need to fetch new quotes
    if (cachedQuotes.length === 0) {
        fetchAndStoreQuotes().then(() => displayNextQuote());
        return;
    }

    // Display the current quote
    const quoteToShow = cachedQuotes[quoteIndex]; // Use the correct index
    if (quoteToShow) {
        displayQuote(quoteToShow);
    }

    // Remove the displayed quote from the list
    cachedQuotes.splice(quoteIndex, 1); // Remove the current quote
    localStorage.setItem("allQuotes", JSON.stringify(cachedQuotes)); // Update localStorage

    // Update the index
    quoteIndex = Math.max(quoteIndex, cachedQuotes.length); // Prevent index overflow

    // Fetch new quotes if none are left
    if (cachedQuotes.length === 0) {
        fetchAndStoreQuotes();
    }
}

function refreshQuoteIfNeeded() {
    const lastUpdated = parseInt(localStorage.getItem("lastQuoteUpdate") || "0", 10);
    const now = Date.now();

    if (now - lastUpdated >= QUOTE_REFRESH_INTERVAL) {
        displayNextQuote();
        localStorage.setItem("lastQuoteUpdate", now.toString()); // Update the timestamp immediately
    }
}

// Initial load
if (localStorage.getItem("motivationalQuotesVisible") !== "false") {
    cachedQuotes = JSON.parse(localStorage.getItem("allQuotes") || "[]"); // Populate cache from localStorage

    if (cachedQuotes.length === 0) {
        fetchAndStoreQuotes().then(() => {
            displayNextQuote(); // Display immediately after fetching
        });
    } else {
        displayNextQuote(); // Display the first quote
        refreshQuoteIfNeeded(); // Check for 10-minute refresh immediately
    }

    setInterval(refreshQuoteIfNeeded, 60 * 1000); // Check every minute
}
