const apiUrl = "https://dummyjson.com/quotes/random";
const quotesContainer = document.querySelector('.quotesContainer');
const authorName = document.querySelector('.autherName span');

async function fetchAndDisplayQuote() {
    try {
        // Fetch the response from the DummyJSON API
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        // Parse the JSON data
        const data = await response.json();

        // Update the HTML content
        quotesContainer.textContent = `"${data.quote}"`;
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
