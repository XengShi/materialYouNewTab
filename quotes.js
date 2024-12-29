const apiUrl = "https://dummyjson.com/quotes?limit=50";
const quotesContainer = document.querySelector('.quotesContainer');
const authorName = document.querySelector('.authorName span');

// Set character limits for quotes
const MIN_QUOTE_LENGTH = 75;
const MAX_QUOTE_LENGTH = 125;
const QUOTE_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

// Default quotes for offline or error scenarios
const defaultQuotes = [
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { quote: "Keep your face always toward the sunshine and shadows will fall behind you.", author: "Walt Whitman" }
];

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

        // Save the filtered quotes to localStorage
        if (filteredQuotes.length > 0) {
            localStorage.setItem("allQuotes", JSON.stringify(filteredQuotes));
            localStorage.setItem("quoteIndex", "0"); // Reset the index
        }
    } catch (error) {
        console.error("Error fetching quotes:", error);
        // Use default quotes in case of an error
        localStorage.setItem("allQuotes", JSON.stringify(defaultQuotes));
        localStorage.setItem("quoteIndex", "0"); // Reset the index
    }
}

function displayQuote(quote) {
    quotesContainer.textContent = `"${quote.quote}"`;
    authorName.textContent = quote.author;
}

function displayNextQuote() {
    const storedQuotes = JSON.parse(localStorage.getItem("allQuotes") || "[]");
    let quoteIndex = parseInt(localStorage.getItem("quoteIndex") || "0", 10);

    // Check if we need to fetch new quotes
    if (storedQuotes.length === 0 || quoteIndex >= storedQuotes.length) {
        fetchAndStoreQuotes().then(() => displayNextQuote());
        return;
    }

    // Display the current quote
    const quoteToShow = storedQuotes[quoteIndex];
    displayQuote(quoteToShow);

    // Remove the displayed quote from the list in localStorage
    storedQuotes.splice(quoteIndex, 1); // Remove the current quote

    // Update the index for the next quote
    localStorage.setItem("allQuotes", JSON.stringify(storedQuotes));
    quoteIndex++;
    localStorage.setItem("quoteIndex", quoteIndex.toString());
}

function refreshQuoteIfNeeded() {
    const lastUpdated = parseInt(localStorage.getItem("lastQuoteUpdate") || "0", 10);
    const now = Date.now();

    // Check if 10 minutes have passed since the last update
    if (now - lastUpdated >= QUOTE_REFRESH_INTERVAL) {
        displayNextQuote();
        localStorage.setItem("lastQuoteUpdate", now.toString());
    }
}

// Initial load
if (localStorage.getItem("motivationalQuotesVisible") !== "false") {
    const storedQuotes = JSON.parse(localStorage.getItem("allQuotes") || "[]");

    if (storedQuotes.length === 0) {
        fetchAndStoreQuotes().then(() => {
            localStorage.setItem("lastQuoteUpdate", Date.now().toString());
            displayNextQuote(); // Display the first quote immediately
        });
    } else {
        // Display the first quote immediately on reload
        const quoteIndex = parseInt(localStorage.getItem("quoteIndex") || "0", 10);
        const quoteToShow = storedQuotes[quoteIndex];
        displayQuote(quoteToShow);

        refreshQuoteIfNeeded(); // Set up the 5-minute refresh logic
    }

    // Set an interval to refresh the quote every minute
    setInterval(refreshQuoteIfNeeded, 60 * 1000); // Check every minute
}
