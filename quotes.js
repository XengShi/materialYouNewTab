const apiUrl = "https://dummyjson.com/quotes?limit=50";
const quotesContainer = document.querySelector('.quotesContainer');
const authorName = document.querySelector('.autherName span');

// Set a maximum character limit for quotes
const MIN_QUOTE_LENGTH = 75;
const MAX_QUOTE_LENGTH = 125;

async function fetchAndDisplayQuote() {
    let displayedQuote = JSON.parse(localStorage.getItem("storedQuote"));
    if (!displayedQuote || (Date.now() - displayedQuote.timestamp > 300000)) {
        try {
            // Fetch the response from the DummyJSON API
            const randnum = (Math.floor(Math.random() * 30)) * 50;
            const response = await fetch(apiUrl+'&skip='+randnum);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            // Parse the JSON data
            var data = await response.json();
            do {
                const randnum = (Math.floor(Math.random() * 50));
                displayedQuote = data.quotes[randnum];
            } while (displayedQuote.quote.length > MAX_QUOTE_LENGTH || displayedQuote.quote.length < MIN_QUOTE_LENGTH);

            // Save the data to local storage
            displayedQuote.timestamp = Date.now();
            localStorage.setItem("storedQuote", JSON.stringify(displayedQuote));
    
            // Update the HTML content
            quotesContainer.textContent = `"${displayedQuote.quote}"`;
            authorName.textContent = displayedQuote.author;

        } catch (error) {
            // Fallback for error scenarios
            console.error("Error fetching quotes:", error);
            quotesContainer.textContent = "Discover possibilities, spark creativity, and embrace the joy of browsing with every new tab you open!";
            authorName.textContent = "XengShi";
        }
    } else {
        // Update the HTML content
        quotesContainer.textContent = `"${displayedQuote.quote}"`;
        authorName.textContent = displayedQuote.author;
    }
}

// Check localStorage and fetch a quote if allowed
if (localStorage.getItem("motivationalQuotesVisible") !== "false") {
    fetchAndDisplayQuote();
}
