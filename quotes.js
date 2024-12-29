const apiUrl = "https://dummyjson.com/quotes/random";
const quotesContainer = document.querySelector('.quotesContainer');
const authorName = document.querySelector('.autherName span');

// Set a maximum character limit for quotes
const MAX_QUOTE_LENGTH = 120;

async function fetchAndDisplayQuote() {
    try {
        // Fetch the response from the DummyJSON API
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        // Parse the JSON data
        const data = await response.json();

        // Truncate the quote if it exceeds the max length
        const displayedQuote = data.quote.length > MAX_QUOTE_LENGTH
            ? data.quote.slice(0, MAX_QUOTE_LENGTH) + "..."
            : data.quote;

        // Update the HTML content
        quotesContainer.textContent = `"${displayedQuote}"`;
        authorName.textContent = data.author;

    } catch (error) {
        // Fallback for error scenarios
        console.error("Error fetching quotes:", error);
        quotesContainer.textContent = "Discover possibilities, spark creativity, and embrace the joy of browsing with every new tab you open!";
        authorName.textContent = "XengShi";
    }
}

// Check localStorage and fetch a quote if allowed
if (localStorage.getItem("motivationalQuotesVisible") !== "false") {
    fetchAndDisplayQuote();
}
