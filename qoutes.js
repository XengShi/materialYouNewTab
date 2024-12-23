const apiUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/quotes/");
const quotesContainer = document.querySelector('.qoutesContainer');
const authorName = document.querySelector('.autherName span');

async function fetchAndDisplayQuote() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const quotes = JSON.parse(data.contents);

        // Filter quotes
        const filteredQuotes = quotes.filter(quote => {
            const charCount = quote.q.length;
            return charCount > 70 && charCount < 125;
        });

        // Select a quote: filtered quote or fallback
        const selectedQuote = filteredQuotes.length > 0 
            ? filteredQuotes[0] 
            : quotes[0];

        // Update the HTML content
        quotesContainer.textContent = selectedQuote.q;
        authorName.textContent = selectedQuote.a;

    } catch (error) {
        console.error("Error fetching quotes:", error);
        quotesContainer.textContent = "Something went wrong while fetching quotes. Please refresh the page or check the developer console for more details.";
        authorName.textContent = "XengShi";
    }
}

if (localStorage.getItem("motivationalQuotesVisible") !== "false") {
    fetchAndDisplayQuote();
}