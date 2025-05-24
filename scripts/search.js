/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

const searchbar = document.getElementById("searchbar");
const searchInput = document.getElementById("searchQ");

// Showing border or outline when you click on the searchbar
searchbar.addEventListener("click", function (event) {
    event.stopPropagation();
    searchbar.classList.add("active");

    if (!event.target.closest(".dropdown-btn")) {
        searchInput.focus();
    }
});

document.addEventListener("click", function (event) {
    // Check if the clicked element is not the searchbar
    if (!searchbar.contains(event.target)) {
        searchbar.classList.remove("active");
    }
});

// Search mode function
const searchWith = document.getElementById("searchWithHint");
const searchEngines = document.querySelectorAll(".searchEnginesContainer .search-engine");
const searchEnginesContainer = document.querySelector(".searchEnginesContainer");
let activeSearchMode = localStorage.getItem("activeSearchMode") || "search-with";

searchWith.addEventListener("click", function (event) {
    activeSearchMode = (activeSearchMode === "search-with") ? "search-on" : "search-with";
    searchEnginesContainer.classList.toggle("show");
    toggleSearchEngines(activeSearchMode);

    event.stopPropagation();
    searchInput.focus();
    searchbar.classList.add("active");

    setTimeout(() => {
        searchEnginesContainer.classList.remove("show");
    }, 300);
});

function toggleSearchEngines(category) {
    const defaultItems = {
        "search-with": "engine0",
        "search-on": "engine5",
    };
    const checkeditem = localStorage.getItem(`selectedSearchEngine-${category}`) || defaultItems[category];
    const searchModeName = category === "search-with" ? "searchWithHint" : "searchOnHint";
    searchWith.innerText = translations[currentLanguage][searchModeName] || translations["en"][searchModeName];

    searchEngines.forEach(engine => {
        if (engine.getAttribute("data-category") === category) {
            engine.style.display = "flex";
        } else {
            engine.style.display = "none";
        }

        if (engine.lastElementChild.value === checkeditem) {
            const radioBtn = engine.querySelector('input[type="radio"]');
            radioBtn.checked = true;
            radioBtn.dispatchEvent(new Event("change"));
        }
    });
}

// Search function
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".dropdown-content");

    dropdown.addEventListener("click", (event) => {
        if (dropdown.style.display === "block") {
            event.stopPropagation();
            dropdown.style.display = "none";
            searchInput.focus();
        }
    })

    document.addEventListener("click", (event) => {
        if (dropdown.style.display === "block") {
            event.stopPropagation();
            dropdown.style.display = "none";
        }
    })

    document.querySelector(".dropdown-btn").addEventListener("click", function () {
        const resultBox = document.getElementById("resultBox");
        if (resultBox.classList.toString().includes("show")) return;

        // Clear selected state and reset index when dropdown opens
        dropdownItems.forEach(item => item.classList.remove("selected"));
        selectedIndex = -1;

        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    const enterBTN = document.getElementById("enterBtn");
    const searchEngineRadio = document.getElementsByName("search-engine");
    const searchDropdowns = document.querySelectorAll('[id$="-dropdown"]:not(*[data-default])');
    const defaultEngine = document.querySelector('#default-dropdown-item div[id$="-dropdown"]');

    const sortDropdown = () => {
        // Change the elements to the array
        const elements = Array.from(searchDropdowns);

        // Sort the dropdown
        const sortedDropdowns = elements.sort((a, b) => {
            const engineA = parseInt(a.getAttribute("data-engine"), 10);
            const engineB = parseInt(b.getAttribute("data-engine"), 10);

            return engineA - engineB;
        })

        // get the parent
        const parent = sortedDropdowns[0]?.parentNode;

        // Append the items if parent exists.
        if (parent) {
            sortedDropdowns.forEach(item => parent.appendChild(item));
        }
    }

    // This will add event listener for click in the search bar
    searchDropdowns.forEach(element => {
        element.addEventListener("click", () => {
            const engine = element.getAttribute("data-engine");
            const radioButton = document.querySelector(`input[type="radio"][value="engine${engine}"]`);
            const selector = `*[data-engine-name=${element.getAttribute("data-engine-name")}]`;

            radioButton.checked = true;

            // Swap the dropdown and sort them
            swapDropdown(selector);
            sortDropdown()

            localStorage.setItem(`selectedSearchEngine-${radioButton.parentElement.dataset.category}`, radioButton.value);
            localStorage.setItem(`activeSearchMode`, radioButton.parentElement.dataset.category);
        });
    });

    // Make entire search-engine div clickable
    document.querySelectorAll(".search-engine").forEach((engineDiv) => {
        engineDiv.addEventListener("click", (event) => {
            event.stopPropagation();
            const radioButton = engineDiv.querySelector('input[type="radio"]');

            radioButton.checked = true;

            const radioButtonValue = radioButton.value.charAt(radioButton.value.length - 1);

            const selector = `[data-engine="${radioButtonValue}"]`;

            // Swap the dropdown
            swapDropdown(selector);
            sortDropdown();

            localStorage.setItem(`selectedSearchEngine-${radioButton.parentElement.dataset.category}`, radioButton.value);
            localStorage.setItem(`activeSearchMode`, radioButton.parentElement.dataset.category);

            searchInput.focus();
            searchbar.classList.add("active");
        });
    });

    /**
     * Swap attributes and contents between the default engine and a selected element.
     * @param {HTMLElement} defaultEngine - The current default engine element.
     * @param {HTMLElement} selectedElement - The clicked or selected element.
     */
    function swapDropdown(selectedElement) {
        // Swap innerHTML
        const element = document.querySelector(selectedElement);
        const tempHTML = defaultEngine.innerHTML;
        defaultEngine.innerHTML = element.innerHTML;
        element.innerHTML = tempHTML;

        // Swap attributes
        ["data-engine", "data-engine-name", "id"].forEach(attr => {
            const tempAttr = defaultEngine.getAttribute(attr);
            defaultEngine.setAttribute(attr, element.getAttribute(attr));
            element.setAttribute(attr, tempAttr);
        });
    }

    // Function to perform search
    function performSearch() {
        var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
        var searchTerm = searchInput.value;
        const languageCode = (localStorage.getItem("selectedLanguage") || "en").slice(0, 2);
        var searchEngines = {
            engine1: "https://www.google.com/search?q=",
            engine2: "https://duckduckgo.com/?q=",
            engine3: "https://bing.com/?q=",
            engine4: "https://search.brave.com/search?q=",
            engine5: "https://www.youtube.com/results?search_query=",
            engine6: "https://www.google.com/search?tbm=isch&q=",
            engine7: "https://www.reddit.com/search/?q=",
            engine8: `https://${languageCode}.wikipedia.org/wiki/Special:Search?search=`,
            engine9: "https://www.quora.com/search?q="
        };

        if (searchTerm !== "") {
            if (selectedOption === "engine0") {
                try {
                    if (isFirefox) {
                        browser.search.query({ text: searchTerm });
                    } else {
                        chrome.search.query({ text: searchTerm });
                    }
                } catch (error) {
                    // Fallback to Google if an error occurs
                    var fallbackUrl = searchEngines.engine1 + encodeURIComponent(searchTerm);
                    window.location.href = fallbackUrl;
                }
            } else {
                var searchUrl = searchEngines[selectedOption] + encodeURIComponent(searchTerm);
                window.location.href = searchUrl;
            }
        }
    }

    // Event listeners
    enterBTN.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    // Set selected search engine from local storage
    let activeSearchMode = localStorage.getItem("activeSearchMode") || "search-with";
    const storedSearchEngine = localStorage.getItem(`selectedSearchEngine-${activeSearchMode}`);

    toggleSearchEngines(activeSearchMode);

    if (storedSearchEngine) {
        // Find Serial Number - SN with the help of charAt.
        const storedSearchEngineSN = storedSearchEngine.charAt(storedSearchEngine.length - 1);
        const defaultDropdownSN = document.querySelector("*[data-default]").getAttribute("data-engine");

        // check if the default selected search engine is same as the stored one.
        if (storedSearchEngineSN !== defaultDropdownSN) {
            // The following line will find out the appropriate dropdown for the selected search engine.
            const selector = `*[data-engine="${storedSearchEngineSN}"]`;

            swapDropdown(selector);
            sortDropdown();
        }

        const selectedRadioButton = document.querySelector(`input[name="search-engine"][value="${storedSearchEngine}"]`);
        if (selectedRadioButton) {
            selectedRadioButton.checked = true;
        }
    }

    const dropdownItems = document.querySelectorAll(".dropdown-item:not(*[data-default])");
    let selectedIndex = -1;

    // Function to update the selected item
    function updateSelection() {
        // let hasSelected = [];
        dropdownItems.forEach((item, index) => {

            item.addEventListener("mouseenter", () => {
                item.classList.add("selected");
            })
            item.addEventListener("mouseleave", () => {
                item.classList.remove("selected");
            })

            if (index === selectedIndex) {
                item.focus()
                item.classList.add("selected");
            } else {
                item.focus()
                item.classList.remove("selected");
            }
        });
    }

    // Event listener for keydown events to navigate up/down
    document.querySelector(".dropdown").addEventListener("keydown", function (event) {
        if (dropdown.style.display === "block") {
            if (event.key === "ArrowDown") {
                event.preventDefault();  // Prevent the page from scrolling
                selectedIndex = (selectedIndex + 1) % dropdownItems.length; // Move down, loop around

                // Scroll the newly selected item into view
                const activeElement = dropdownItems[selectedIndex];
                activeElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
            } else if (event.key === "ArrowUp") {
                event.preventDefault();  // Prevent the page from scrolling
                selectedIndex = (selectedIndex - 1 + dropdownItems.length) % dropdownItems.length; // Move up, loop around

                // Scroll the newly selected item into view
                const activeElement = dropdownItems[selectedIndex];
                activeElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
            } else if (event.key === "Enter") {
                const selectedItem = document.querySelector(".dropdown-content .selected");
                const engine = selectedItem.getAttribute("data-engine");
                const radioButton = document.querySelector(`input[type="radio"][value="engine${engine}"]`);

                radioButton.checked = true;

                // Swap the dropdown and sort them
                swapDropdown(`*[data-engine="${engine}"]`);
                sortDropdown();

                localStorage.setItem("selectedSearchEngine", radioButton.value);

                // Close the dropdown after selection
                dropdown.style.display = "none";
                searchInput.focus();
            }
            updateSelection();
        }
    });

    // Initial setup for highlighting
    updateSelection();

    // Event listener for search engine radio buttons
    searchEngineRadio.forEach((radio) => {
        radio.addEventListener("change", () => {
            const selectedOption = document.querySelector('input[name="search-engine"]:checked');
            localStorage.setItem(`selectedSearchEngine-${selectedOption.parentElement.dataset.category}`, selectedOption.value);
            localStorage.setItem(`activeSearchMode`, selectedOption.parentElement.dataset.category);
        });
    });

    /* ------ Event Listeners for Searchbar dropdown ------ */
    const searchIconContainer = document.querySelectorAll(".searchIcon");

    const showEngineContainer = () => {
        searchIconContainer[1].style.display = "none";
        searchIconContainer[0].style.display = "block";
        document.getElementById("search-with-container").style.visibility = "visible";
    }

    const hideEngineContainer = () => {
        searchIconContainer[0].style.display = "none";
        searchIconContainer[1].style.display = "block";
        document.getElementById("search-with-container").style.visibility = "hidden";
    }

    const initShortCutSwitch = (element) => {
        if (element.checked) {
            hideEngineContainer();
            localStorage.setItem("showShortcutSwitch", true)
        } else {
            showEngineContainer();
            localStorage.setItem("showShortcutSwitch", false)
        }
    }

    // Hiding Search Icon And Search With Options for Search switch shortcut
    const hideSearchWith = document.getElementById("shortcut_switchcheckbox");
    hideSearchWith.addEventListener("change", (e) => {
        initShortCutSwitch(e.target);

        // Fetch active search mode from storage
        let activeSearchMode = localStorage.getItem("activeSearchMode") || "search-with";
        toggleSearchEngines(activeSearchMode);

        // Get the selected search engine from localStorage
        const storedSearchEngine = localStorage.getItem(`selectedSearchEngine-${activeSearchMode}`);

        // Find the corresponding radio button
        const selectedRadioButton = document.querySelector(`input[name="search-engine"][value="${storedSearchEngine}"]`);
        selectedRadioButton.checked = true;

        // Ensure UI is updated properly
        const storedSearchEngineSN = storedSearchEngine.charAt(storedSearchEngine.length - 1);
        const selector = `*[data-engine="${storedSearchEngineSN}"]`;

        swapDropdown(selector);
        sortDropdown();
    });

    // Intialize shortcut switch
    if (localStorage.getItem("showShortcutSwitch")) {
        const isShortCutSwitchEnabled = localStorage.getItem("showShortcutSwitch").toString() === "true";
        document.getElementById("shortcut_switchcheckbox").checked = isShortCutSwitchEnabled;

        if (isShortCutSwitchEnabled) {
            hideEngineContainer();
        } else if (!isShortCutSwitchEnabled) {
            showEngineContainer()
        }
    } else {
        localStorage.setItem("showShortcutSwitch", false);
    }

    initShortCutSwitch(hideSearchWith);
});

document.addEventListener("keydown", function (event) {
    // Prevent shortcut if modal, menu, or bookmarks sidebar is open
    const modalContainer = document.getElementById("prompt-modal-container");
    if (
        modalContainer?.style.display === "flex" ||
        menuBar.style.display !== "none" ||
        bookmarkSidebar.classList.contains("open")
    ) {
        return;
    }

    if (event.key === "/" && event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA" && event.target.isContentEditable !== true) {
        event.preventDefault();
        searchInput.focus();
        searchbar.classList.add("active");
    }
});
