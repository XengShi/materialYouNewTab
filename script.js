/* 
 * Material You NewTab
 * Copyright (c) 2023-2024 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program. 
 * If not, see <https://www.gnu.org/licenses/>.
 */

let proxyurl;
let clocktype;
let hourformat;
window.addEventListener('DOMContentLoaded', async () => {
    // Cache DOM elements
    const userAPIInput = document.getElementById("userAPI");
    const userLocInput = document.getElementById("userLoc");
    const userProxyInput = document.getElementById("userproxy");
    const saveAPIButton = document.getElementById("saveAPI");
    const saveLocButton = document.getElementById("saveLoc");
    const resetbtn = document.getElementById("resetsettings");
    const saveProxyButton = document.getElementById("saveproxy");

    // Load saved data from localStorage
    const savedApiKey = localStorage.getItem("weatherApiKey");
    const savedLocation = localStorage.getItem("weatherLocation");
    const savedProxy = localStorage.getItem("proxy");

    // Pre-fill input fields with saved data
    if (savedLocation) userLocInput.value = savedLocation;
    if (savedApiKey) userAPIInput.value = savedApiKey;

    const defaultProxyURL = 'https://mynt-proxy.rhythmcorehq.com'; //Default proxy url
    if (savedProxy && savedProxy !== defaultProxyURL) {
        userProxyInput.value = savedProxy;
    }

    // Function to simulate button click on Enter key press
    function handleEnterPress(event, buttonId) {
        if (event.key === 'Enter') {
            document.getElementById(buttonId).click();
        }
    }

    // Add event listeners for handling Enter key presses
    userAPIInput.addEventListener('keydown', (event) => handleEnterPress(event, 'saveAPI'));
    userLocInput.addEventListener('keydown', (event) => handleEnterPress(event, 'saveLoc'));
    userProxyInput.addEventListener('keydown', (event) => handleEnterPress(event, 'saveproxy'));

    // Save API key to localStorage
    saveAPIButton.addEventListener("click", () => {
        const apiKey = userAPIInput.value.trim();
        localStorage.setItem("weatherApiKey", apiKey);
        userAPIInput.value = "";
        location.reload();
    });

    // Save location to localStorage
    saveLocButton.addEventListener("click", () => {
        const userLocation = userLocInput.value.trim();
        localStorage.setItem("weatherLocation", userLocation);
        userLocInput.value = "";
        location.reload();
    });

    // Reset settings (clear localStorage)
    resetbtn.addEventListener("click", () => {
        if (confirm(translations[currentLanguage]?.confirmRestore || translations['en'].confirmRestore)) {
            localStorage.clear();
            location.reload();
        }
    });

    // Save the proxy to localStorage
    saveProxyButton.addEventListener("click", () => {
        const proxyurl = userProxyInput.value.trim();

        // If the input is empty, use the default proxy.
        if (proxyurl === "") {
            proxyurl = defaultProxyURL;
        } else {
            // Validate if input starts with 'http://' or 'https://'
            if (!(proxyurl.startsWith("http://") || proxyurl.startsWith("https://"))) {
                // Automatically correct input by adding 'http://' if not present
                proxyurl = "http://" + proxyurl;
            }

            // Remove trailing slash if exists
            if (proxyurl.endsWith("/")) {
                proxyurl = proxyurl.slice(0, -1);  // Remove the last character ("/")
            }
        }

        // Set the proxy in localStorage, clear the input, and reload the page
        localStorage.setItem("proxy", proxyurl);
        userProxyInput.value = "";
        location.reload();
    });

    // Default Weather API key
    const weatherApiKeys = [
        // 'd36ce712613d4f21a6083436240910', hit call limit for Dec 2024, uncomment it in Jan 2025
        // 'db0392b338114f208ee135134240312',
        // 'de5f7396db034fa2bf3140033240312',
        // 'c64591e716064800992140217240312',
        // '9b3204c5201b4b4d8a2140330240312',
        // 'eb8a315c15214422b60140503240312',
        // 'cd148ebb1b784212b74140622240312',
        // '7ae67e219af54df2840140801240312',	UNCOMMENT ALL ON JAN 01
        '0a6bc8a404224c8d89953341241912',
        'f59e58d7735d4739ae953115241912'
    ];
    const defaultApiKey = weatherApiKeys[Math.floor(Math.random() * weatherApiKeys.length)];

    // Determine API key and proxy URL to use
    const apiKey = savedApiKey || defaultApiKey;
    proxyurl = savedProxy || defaultProxyURL;

    // Determine the location to use
    let currentUserLocation = savedLocation;

    // If no saved location, fetch the IP-based location
    if (!currentUserLocation) {
        try {
            const geoLocation = 'https://ipinfo.io/json/';
            const locationData = await fetch(geoLocation);
            const parsedLocation = await locationData.json();

            currentUserLocation = parsedLocation.loc;
        } catch (error) {
            currentUserLocation = "auto:ip"; // Fallback if fetching location fails
        }
    }

    const currentLanguage = getLanguageStatus('selectedLanguage') || 'en';

    try {
        let parsedData = JSON.parse(localStorage.getItem("weatherParsedData"));
        const weatherParsedTime = parseInt(localStorage.getItem("weatherParsedTime"));
        const weatherParsedLocation = localStorage.getItem("weatherParsedLocation");
        const weatherParsedLang = localStorage.getItem("weatherParsedLang");
        
        if (!parsedData || ((Date.now() - weatherParsedTime) > 600000) || (weatherParsedLocation !== currentUserLocation) || (weatherParsedLang !== currentLanguage)) {
            // Fetch weather data using Weather API
            let weatherApi = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${currentUserLocation}&aqi=no&lang=${currentLanguage}`;
            let data = await fetch(weatherApi);
            parsedData = await data.json();
            if (!parsedData.error) {
                // Extract only the necessary fields before saving
                const filteredData = {
                    location: {
                        name: parsedData.location.name,
                    },
                    current: {
                        condition: {
                            text: parsedData.current.condition.text,
                            icon: parsedData.current.condition.icon,
                        },
                        temp_c: parsedData.current.temp_c,
                        temp_f: parsedData.current.temp_f,
                        humidity: parsedData.current.humidity,
                        feelslike_c: parsedData.current.feelslike_c,
                        feelslike_f: parsedData.current.feelslike_f,
                    },
                };
                // Save filtered weather data to localStorage
                localStorage.setItem("weatherParsedData", JSON.stringify(filteredData));
                localStorage.setItem("weatherParsedTime", Date.now()); // Save time of last fetching
                localStorage.setItem("weatherParsedLocation", currentUserLocation); // Save user location
                localStorage.setItem("weatherParsedLang", currentLanguage); // Save language preference
            }
            UpdateWeather();
        } else {
            setTimeout(UpdateWeather, 25);
        }

        function UpdateWeather() {
            // Weather data
            const conditionText = parsedData.current.condition.text;
            const tempCelsius = Math.round(parsedData.current.temp_c);
            const tempFahrenheit = Math.round(parsedData.current.temp_f);
            const humidity = parsedData.current.humidity;
            const feelsLikeCelsius = parsedData.current.feelslike_c;
            const feelsLikeFahrenheit = parsedData.current.feelslike_f;

            // Update DOM elements with the weather data
            document.getElementById("conditionText").textContent = conditionText;

            // Localize and display temperature and humidity
            const localizedHumidity = localizeNumbers(humidity.toString(), currentLanguage);
            const localizedTempCelsius = localizeNumbers(tempCelsius.toString(), currentLanguage);
            const localizedFeelsLikeCelsius = localizeNumbers(feelsLikeCelsius.toString(), currentLanguage);
            const localizedTempFahrenheit = localizeNumbers(tempFahrenheit.toString(), currentLanguage);
            const localizedFeelsLikeFahrenheit = localizeNumbers(feelsLikeFahrenheit.toString(), currentLanguage);

            // Set humidity level
            const humidityLabel = translations[currentLanguage]?.humidityLevel || translations['en'].humidityLevel; // Fallback to English if translation is missing
            document.getElementById("humidityLevel").textContent = `${humidityLabel} ${localizedHumidity}%`;

            // Event Listener for the Fahrenheit toggle
            const fahrenheitCheckbox = document.getElementById("fahrenheitCheckbox");
            const updateTemperatureDisplay = () => {
                const tempElement = document.getElementById("temp");
                const feelsLikeElement = document.getElementById("feelsLike");
                const feelsLikeLabel = translations[currentLanguage]?.feelsLike || translations['en'].feelsLike;

                if (fahrenheitCheckbox.checked) {
                    // Update temperature
                    tempElement.textContent = localizedTempFahrenheit;
                    const tempUnitF = document.createElement("span");
                    tempUnitF.className = "tempUnit";
                    tempUnitF.textContent = "°F";
                    tempElement.appendChild(tempUnitF);

                    // Update feels like
                    const feelsLikeFUnit = currentLanguage === 'cs' ? ' °F' : '°F';
                    feelsLikeElement.textContent = `${feelsLikeLabel} ${localizedFeelsLikeFahrenheit}${feelsLikeFUnit}`;
                } else {
                    // Update temperature
                    tempElement.textContent = localizedTempCelsius;
                    const tempUnitC = document.createElement("span");
                    tempUnitC.className = "tempUnit";
                    tempUnitC.textContent = "°C";
                    tempElement.appendChild(tempUnitC);

                    // Update feels like
                    const feelsLikeCUnit = currentLanguage === 'cs' ? ' °C' : '°C';
                    feelsLikeElement.textContent = `${feelsLikeLabel} ${localizedFeelsLikeCelsius}${feelsLikeCUnit}`;
                }
            };
            updateTemperatureDisplay();

            // Setting weather Icon
            const newWIcon = parsedData.current.condition.icon;
            const weatherIcon = newWIcon.replace("//cdn", "https://cdn");
            document.getElementById("wIcon").src = weatherIcon;

            // Define minimum width for the slider based on the language
            const humidityMinWidth = {
                idn: '47%',
                en: '42%', // Default for English and others
            };
            const slider = document.getElementById("slider");
            slider.style.minWidth = humidityMinWidth[currentLanguage] || humidityMinWidth['en'];

            // Set slider width based on humidity
            if (humidity > 40) {
                slider.style.width = `calc(${humidity}% - 60px)`;
            }

            // Update location
            var city = parsedData.location.name;
            // var city = "Thiruvananthapuram";
            var maxLength = 10;
            var limitedText = city.length > maxLength ? city.substring(0, maxLength) + "..." : city;
            document.getElementById("location").textContent = limitedText;
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
});
// ---------------------------end of weather stuff--------------------

// ------------------------Google App Menu-----------------------------------
const iconContainer = document.getElementById("iconContainer");
const googleAppsCont = document.getElementById("googleAppsCont");

// Toggle menu and tooltip visibility
googleAppsCont.addEventListener("click", function (event) {
    const isMenuVisible = iconContainer.style.display === 'grid';

    // Toggle menu visibility
    iconContainer.style.display = isMenuVisible ? 'none' : 'grid';

    // Add or remove the class to hide the tooltip
    if (!isMenuVisible) {
        googleAppsCont.classList.add('menu-open'); // Hide tooltip
    } else {
        googleAppsCont.classList.remove('menu-open'); // Restore tooltip
    }

    event.stopPropagation();
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const isClickInside =
        iconContainer.contains(event.target) || googleAppsCont.contains(event.target);

    if (!isClickInside && iconContainer.style.display === 'grid') {
        iconContainer.style.display = 'none'; // Hide menu
        googleAppsCont.classList.remove('menu-open'); // Restore tooltip
    }
});
// ------------------------End of Google App Menu Setup-----------------------------------

// ------------------------ Bookmark System -----------------------------------
// DOM Variables
const bookmarkButton = document.getElementById('bookmarkButton');
const bookmarkSidebar = document.getElementById('bookmarkSidebar');
const bookmarkList = document.getElementById('bookmarkList');
const bookmarkSearch = document.getElementById('bookmarkSearch');
const bookmarkSearchClearButton = document.getElementById('clearSearchButton');
const bookmarkViewGrid = document.getElementById('bookmarkViewGrid');
const bookmarkViewList = document.getElementById('bookmarkViewList');

const isFirefox = typeof browser !== 'undefined';
var bookmarksAPI;
if (isFirefox && browser.bookmarks) {
    bookmarksAPI = browser.bookmarks;
} else if (typeof chrome !== 'undefined' && chrome.bookmarks) {
    bookmarksAPI = chrome.bookmarks;
} else {
    console.log("Bookmarks API is either not supported in this browser or permission is not granted by the user.");
}

document.addEventListener('DOMContentLoaded', function () {

    bookmarkButton.addEventListener('click', function () {
        toggleBookmarkSidebar();
        bookmarkSearchClearButton.click();
    });

    bookmarkViewGrid.addEventListener('click', function () {
        if (!bookmarkGridCheckbox.checked) bookmarkGridCheckbox.click();
    });

    bookmarkViewList.addEventListener('click', function () {
        if (bookmarkGridCheckbox.checked) bookmarkGridCheckbox.click();
    });

    document.addEventListener('click', function (event) {
        if (!bookmarkSidebar.contains(event.target) && !bookmarkButton.contains(event.target) && bookmarkSidebar.classList.contains('open')) {
            toggleBookmarkSidebar();
        }
    });

    bookmarkSearch.addEventListener('input', function () {
        const searchTerm = bookmarkSearch.value.toLowerCase();
        const bookmarks = bookmarkList.querySelectorAll('li[data-url], li.folder'); // Include both bookmarks and folders

        Array.from(bookmarks).forEach(function (bookmark) {
            const text = bookmark.textContent.toLowerCase();
            const url = bookmark.dataset.url ? bookmark.dataset.url.toLowerCase() : '';
            const isFolder = bookmark.classList.contains('folder');

            // Show bookmarks if the search term matches either the name or the URL
            if (!isFolder && (text.includes(searchTerm) || url.includes(searchTerm))) {
                bookmark.style.display = ''; // Show matching bookmarks
            } else if (isFolder) {
                // For folders, check if any child bookmarks match the search
                const childBookmarks = bookmark.querySelectorAll('li[data-url]');
                let hasVisibleChild = false;
                Array.from(childBookmarks).forEach(function (childBookmark) {
                    const childText = childBookmark.textContent.toLowerCase();
                    const childUrl = childBookmark.dataset.url ? childBookmark.dataset.url.toLowerCase() : '';
                    if (childText.includes(searchTerm) || childUrl.includes(searchTerm)) {
                        hasVisibleChild = true;
                        childBookmark.style.display = ''; // Show matching child bookmarks
                    } else {
                        childBookmark.style.display = 'none'; // Hide non-matching child bookmarks
                    }
                });

                if (hasVisibleChild) {
                    bookmark.style.display = ''; // Show folder if it has matching child bookmarks
                    bookmark.classList.add('open'); // Open folder to show matching child bookmarks
                } else {
                    bookmark.style.display = 'none'; // Hide folder if no child matches
                    bookmark.classList.remove('open');
                }
            } else {
                bookmark.style.display = 'none'; // Hide non-matching bookmarks
            }
        });

        if (searchTerm === '') {
            // Reset display for all bookmarks and folders
            Array.from(bookmarks).forEach(function (bookmark) {
                bookmark.style.display = '';
                if (bookmark.classList.contains('folder')) {
                    bookmark.classList.remove('open');
                    const childList = bookmark.querySelector('ul');
                    if (childList) {
                        childList.classList.add('hidden');
                    }
                }
            });
        }

        // Show or hide the clear button based on the search term
        bookmarkSearchClearButton.style.display = searchTerm ? 'inline' : 'none';
    });

    bookmarkSearchClearButton.addEventListener('click', function () {
        bookmarkSearch.value = '';
        bookmarkSearch.dispatchEvent(new Event('input')); // Trigger input event to clear search results
    });

    function toggleBookmarkSidebar() {
        bookmarkSidebar.classList.toggle('open');
        bookmarkButton.classList.toggle('rotate');

        if (bookmarkSidebar.classList.contains('open')) {
            loadBookmarks();
        }
    };
    // Function to load bookmarks
    function loadBookmarks() {
        if (!bookmarksAPI || !bookmarksAPI.getTree) {
            console.error("Bookmarks API is unavailable. Please check permissions or context.");
            return;
        }

        bookmarksAPI.getTree().then(bookmarkTreeNodes => {
            // Clear the current list
            bookmarkList.innerHTML = '';

            // Display the "Recently Added" folder
            if (bookmarksAPI.getRecent) {
                bookmarksAPI.getRecent(8).then(recentBookmarks => {
                    if (recentBookmarks.length > 0) {
                        const recentAddedFolder = {
                            title: 'Recently Added',
                            children: recentBookmarks
                        };
                        bookmarkList.appendChild(displayBookmarks([recentAddedFolder]));
                    }
                });
            }

            // For Firefox: "Bookmarks Menu" and "Other Bookmarks" are distinct nodes
            if (isFirefox) {
                const toolbarNode = bookmarkTreeNodes[0]?.children?.find(node => node.title === "Bookmarks Toolbar");
                const menuNode = bookmarkTreeNodes[0]?.children?.find(node => node.title === "Bookmarks Menu");
                const otherNode = bookmarkTreeNodes[0]?.children?.find(node => node.title === "Other Bookmarks");

                if (toolbarNode?.children) {
                    bookmarkList.appendChild(displayBookmarks(toolbarNode.children));
                }
                if (menuNode?.children) {
                    bookmarkList.appendChild(displayBookmarks(menuNode.children));
                }
                if (otherNode?.children) {
                    bookmarkList.appendChild(displayBookmarks(otherNode.children));
                }
            } else {
                let default_folder = "Bookmarks bar";
                if (isEdge) {
                    default_folder = "Favorites bar";
                } else if (isBrave) {
                    default_folder = "Bookmarks";
                }
                // Extract the 'Main bookmarks' node and display its Children
                const mainBookmarks = bookmarkTreeNodes[0]?.children?.find(node => node.title === default_folder);

                if (mainBookmarks && mainBookmarks.children) {
                    bookmarkList.appendChild(displayBookmarks(mainBookmarks.children));
                }

                // Extract the other 'Bookmarks' folders and display them
                const bookmarksBar = bookmarkTreeNodes.find(node => node.id === "0");
                if (bookmarksBar && bookmarksBar.children) {
                    bookmarkList.appendChild(displayBookmarks(bookmarksBar.children));
                }
            }
        }).catch(err => {
            console.error("Error loading bookmarks:", err);
        });
    }

    function displayBookmarks(bookmarkNodes) {
        let list = document.createElement('ul');

        // Separate folders and bookmarks
        const folders = bookmarkNodes.filter(node => node.children && node.children.length > 0);
        const bookmarks = bookmarkNodes.filter(node => node.url);

        // Sort folders and bookmarks separately
        folders.sort((a, b) => a.title.localeCompare(b.title));
        bookmarks.sort((a, b) => a.title.localeCompare(b.title));

        // Sort folders and bookmarks separately by dateAdded
        // folders.sort((a, b) => (a.dateAdded || 0) - (b.dateAdded || 0));
        // bookmarks.sort((a, b) => (a.dateAdded || 0) - (b.dateAdded || 0));

        // Combine folders and bookmarks, placing folders first
        const sortedNodes = [...folders, ...bookmarks];

        for (let node of sortedNodes) {
            if (node.id === "1") { continue; }
            if (node.children && node.children.length > 0) {
                let folderItem = document.createElement('li');

                // Use the SVG icon from HTML
                const folderIcon = document.getElementById('folderIconTemplate').cloneNode(true);
                folderIcon.removeAttribute('id'); // Remove the id to prevent duplicates
                folderItem.appendChild(folderIcon);

                folderItem.appendChild(document.createTextNode(node.title));
                folderItem.classList.add('folder');

                // Add event listener for unfolding/folding
                folderItem.addEventListener('click', function (event) {
                    event.stopPropagation();
                    folderItem.classList.toggle('open');
                    const subList = folderItem.querySelector('ul');
                    if (subList) {
                        subList.classList.toggle('hidden');
                    }
                });

                let subList = displayBookmarks(node.children);
                subList.classList.add('hidden');
                folderItem.appendChild(subList);

                list.appendChild(folderItem);
            } else if (node.url) {
                let item = document.createElement('li');
                item.dataset.url = node.url; // Add URL as dataset for search functionality
                let link = document.createElement('a');
                link.href = node.url;
                let span = document.createElement('span');
                span.textContent = node.title;

                let favicon = document.createElement('img');
                favicon.src = `https://www.google.com/s2/favicons?domain=${new URL(node.url).hostname}&sz=48`;
                favicon.classList.add('favicon');
                favicon.onerror = () => {
                    favicon.src = "./shortcuts_icons/offline.svg";
                };

                // Create the delete button
                let deleteButton = document.createElement('button');
                deleteButton.textContent = '✖';
                deleteButton.classList.add('bookmark-delete-button');

                deleteButton.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (confirm(`${(translations[currentLanguage]?.deleteBookmark || translations['en'].deleteBookmark)} "${node.title || node.url}"?`)) {
                        if (isFirefox) {
                            // Firefox API (Promise-based)
                            bookmarksAPI.remove(node.id).then(() => {
                                item.remove(); // Remove the item from the DOM
                            }).catch(err => {
                                console.error("Error removing bookmark in Firefox:", err);
                            });
                        } else {
                            // Chrome API (Callback-based)
                            bookmarksAPI.remove(node.id, function () {
                                item.remove(); // Remove the item from the DOM
                            });
                        }
                    }
                });

                link.appendChild(favicon);
                link.appendChild(span);
                item.appendChild(link);
                item.appendChild(deleteButton); // Add delete button to the item

                // Open links in the current tab or new tab if ctrl pressed
                link.addEventListener('click', function (event) {
                    if (event.ctrlKey || event.metaKey) {
                        // Open in a new tab
                        event.preventDefault();
                        if (isFirefox) {
                            browser.tabs.create({ url: node.url, active: false });
                        } else if (isChrome) {
                            chrome.tabs.create({ url: node.url, active: false });
                        } else {
                            window.open(node.url, '_blank');
                        }
                    } else {
                        // Open in the current tab
                        event.preventDefault();
                        if (isFirefox) {
                            browser.tabs.update({ url: node.url });
                        } else if (isChrome) {
                            chrome.tabs.update({ url: node.url }, function () {
                            });
                        } else {
                            window.location.href = node.url;
                        }
                    }
                });
                list.appendChild(item);
            }
        }

        list.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        return list;
    }  
});

// ------------------------ End of Bookmark System -----------------------------------

// ----------------------------------- To Do List ----------------------------------------

// DOM Variables
const todoContainer = document.getElementById("todoContainer");
const todoListCont = document.getElementById("todoListCont");
const todoulList = document.getElementById("todoullist");
const todoAdd = document.getElementById("todoAdd");
const todoInput = document.getElementById("todoInput");
let todoList = {}; // Initialize todoList JSON

// Add event listeners for Add button click or Enter key press
todoAdd.addEventListener("click", addtodoItem);
todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addtodoItem();
    }
});

// Utility function to sanitize input
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Function to add items to the TODO list
function addtodoItem() {
    const inputText = todoInput.value.trim(); // Remove useless whitespaces
    if (inputText === '') {
        return; // Return the function when the input is empty
    }
    const t = "t" + Date.now(); // Generate a Unique ID
    const rawText = inputText;
    todoList[t] = { title: rawText, status: "pending", pinned: false }; // Add data to the JSON variable
    const li = createTodoItemDOM(t, rawText, "pending", false); // Create List item
    todoulList.appendChild(li); // Append the new item to the DOM immediately
    todoInput.value = ''; // Clear Input
    SaveToDoData(); // Save changes
}

function createTodoItemDOM(id, title, status, pinned) {
    let li = document.createElement('li');
    li.innerHTML = sanitizeInput(title); // Sanitize before rendering in DOM
    const removebtn = document.createElement("span"); // Create the Cross Icon
    removebtn.setAttribute("class", "todoremovebtn");
    removebtn.textContent = "\u00d7";
    li.appendChild(removebtn); // Add the cross icon to the LI tag
    li.setAttribute("class", "todolistitem");
    if (status === 'completed') {
        li.classList.add("checked");
    }
    const pinbtn = document.createElement("span"); // Create the Cross Icon
    pinbtn.setAttribute("class", "todopinbtn");
    li.appendChild(pinbtn); // Add the cross icon to the LI tag
    if (pinned) {
        li.classList.add("pinned");
    }
    li.setAttribute("data-todoitem", id); // Set a data attribute to the li so that we can uniquely identify which li has been modified or deleted
    return li; // Return the created `li` element
}

// Event delegation for task check and remove
todoulList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked"); // Check the clicked LI tag
        let id = event.target.dataset.todoitem;
        todoList[id].status = ((todoList[id].status === "completed") ? "pending" : "completed"); // Update status
        SaveToDoData(); // Save Changes
    } else if (event.target.classList.contains('todoremovebtn')) {
        let id = event.target.parentElement.dataset.todoitem;
        event.target.parentElement.remove(); // Remove the clicked LI tag
        delete todoList[id]; // Remove the deleted List item data
        SaveToDoData(); // Save Changes
    } else if (event.target.classList.contains('todopinbtn')) {
        event.target.parentElement.classList.toggle("pinned"); // Check the clicked LI tag
        let id = event.target.parentElement.dataset.todoitem;
        todoList[id].pinned = ((todoList[id].pinned === true) ? false : true); // Update status
        SaveToDoData(); // Save Changes
    }
});

// Save JSON to local Storage
function SaveToDoData() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
// Fetch saved JSON and create list items using it
function ShowToDoList() {
    try {
        todoList = JSON.parse(localStorage.getItem("todoList")) || {}; // Parse stored data or initialize empty
        const fragment = document.createDocumentFragment(); // Create a DocumentFragment
        for (let id in todoList) {
            const todo = todoList[id];
            const li = createTodoItemDOM(id, todo.title, todo.status, todo.pinned); // Create `li` elements
            fragment.appendChild(li); // Add `li` to the fragment
        }
        todoulList.appendChild(fragment); // Append all `li` to the `ul` at once
    } catch (error) {
        console.error("Error loading from localStorage:", error);
        localStorage.setItem("todoList", '{}'); // Reset corrupted data
    }
}

// Code to reset the List on the Next Day
let todoLastUpdateDate = localStorage.getItem("todoLastUpdateDate"); // Get the date of last update
let todoCurrentDate = new Date().toLocaleDateString(); // Get current date
if (todoLastUpdateDate === todoCurrentDate) {
    ShowToDoList();
} else {
    // Modify the list when last update date and the current date does not match
    localStorage.setItem("todoLastUpdateDate", todoCurrentDate);
    todoList = JSON.parse(localStorage.getItem("todoList")) || {};
    for (let id in todoList) {
        if (todoList[id].pinned == false) {
            if (todoList[id].status == "completed") {
                delete todoList[id]; // Remove the Unpinned and Completed list item data
            }
        } else {
            todoList[id].status = "pending"; // Reset status of pinned items
        }
    }
    SaveToDoData();
    ShowToDoList();
}

// Toggle menu and tooltip visibility
todoListCont.addEventListener("click", function (event) {
    const isMenuVisible = todoContainer.style.display === 'grid';

    // Toggle menu visibility
    todoContainer.style.display = isMenuVisible ? 'none' : 'grid';

    // Add or remove the class to hide the tooltip
    if (!isMenuVisible) {
        todoListCont.classList.add('menu-open'); // Hide tooltip
        todoInput.focus(); // Auto focus on input box
    } else {
        todoListCont.classList.remove('menu-open'); // Restore tooltip
    }
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const isClickInside =
        todoContainer.contains(event.target) || todoListCont.contains(event.target) || event.target.classList.contains('todoremovebtn');

    if (!isClickInside && todoContainer.style.display === 'grid') {
        todoContainer.style.display = 'none'; // Hide menu
        todoListCont.classList.remove('menu-open'); // Restore tooltip
    }

    event.stopPropagation();
});

// ------------------------------- End of To Do List -------------------------------------

// Retrieve current time and calculate initial angles
var currentTime = new Date();
var initialSeconds = currentTime.getSeconds();
var initialMinutes = currentTime.getMinutes();
var initialHours = currentTime.getHours();

// Initialize cumulative rotations
let cumulativeSecondRotation = initialSeconds * 6; // 6° par seconde
let cumulativeMinuteRotation = initialMinutes * 6 + (initialSeconds / 10); // 6° par minute + ajustement pour les secondes
let cumulativeHourRotation = (30 * initialHours + initialMinutes / 2); // 30° par heure + ajustement pour les minutes

// Apply initial rotations (no need to wait 1s now)
document.getElementById("second").style.transform = `rotate(${cumulativeSecondRotation}deg)`;
document.getElementById("minute").style.transform = `rotate(${cumulativeMinuteRotation}deg)`;
document.getElementById("hour").style.transform = `rotate(${cumulativeHourRotation}deg)`;

let intervalId;
let secondreset = false;
let hourreset = false;
let minreset = false;

function initializeClockType() {
    const savedClockType = localStorage.getItem("clocktype");
    clocktype = savedClockType ? savedClockType : "analog"; // Default to "analog" if nothing is saved
    localStorage.setItem("clocktype", clocktype); // Ensure it's set in local storage
}
// Call this function to initialize the clock type
initializeClockType();

function updateDate() {
    if (clocktype === "analog") {
        var currentTime = new Date();
        var dayOfWeek = currentTime.getDay();
        var dayOfMonth = currentTime.getDate();
        var month = currentTime.getMonth();

        // Define the current language
        var currentLanguage = getLanguageStatus('selectedLanguage') || 'en';

        // Get the translated name of the day
        var dayName;
        if (
            translations[currentLanguage] &&
            translations[currentLanguage].days &&
            translations[currentLanguage].days[dayOfWeek]
        ) {
            dayName = translations[currentLanguage].days[dayOfWeek];
        } else {
            dayName = translations['en'].days[dayOfWeek]; // Fallback to English day name
        }

        // Get the translated name of the month
        var monthName;
        if (
            translations[currentLanguage] &&
            translations[currentLanguage].months &&
            translations[currentLanguage].months[month]
        ) {
            monthName = translations[currentLanguage].months[month];
        } else {
            monthName = translations['en'].months[month]; // Fallback to English month name
        }

        // Localize the day of the month
        var localizedDayOfMonth = localizeNumbers(dayOfMonth.toString(), currentLanguage);

        const dateDisplay = {
            bn: `${dayName}, ${localizedDayOfMonth} ${monthName}`,
            mr: `${dayName}, ${localizedDayOfMonth} ${monthName}`,
            zh: `${monthName}${dayOfMonth}日${dayName}`,
            cs: `${dayName}, ${dayOfMonth}. ${monthName}`,
            hi: `${dayName}, ${dayOfMonth} ${monthName}`,
            it: `${dayName.substring(0, 3)} ${dayOfMonth} ${monthName.substring(0, 3)}`,
            ja: `${dayName.substring(0, 1)}, ${monthName}${dayOfMonth}`,
            ko: `${dayName.substring(0, 1)}, ${monthName} ${dayOfMonth}일`,
            pt: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
            ru: `${dayName.substring(0, 2)}, ${dayOfMonth} ${monthName.substring(0, 4)}.`,
            es: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
            tr: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName}`,
            uz: `${dayName.substring(0, 3)}, ${dayOfMonth}-${monthName}`,
            vi: `${dayName}, Ngày ${dayOfMonth} ${monthName}`,
            idn: `${dayName}, ${dayOfMonth} ${monthName}`,
            fr: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`, // Jeudi, 5 avril
            az: `${dayName.substring(0, 3)}, ${dayOfMonth} ${monthName.substring(0, 3)}`,
            sl: `${dayName}, ${dayOfMonth}. ${monthName.substring(0, 3)}.`,
            default: `${dayName.substring(0, 3)}, ${monthName.substring(0, 3)} ${dayOfMonth}`	// Sun, Dec 22
        };
        document.getElementById("date").innerText = dateDisplay[currentLanguage] || dateDisplay.default;
    }
}

function updateanalogclock() {
    var currentTime = new Date();
    var initialSeconds = currentTime.getSeconds();
    var initialMinutes = currentTime.getMinutes();
    var initialHours = currentTime.getHours();

    // Initialize cumulative rotations
    let cumulativeSecondRotation = initialSeconds * 6; // 6° per second
    let cumulativeMinuteRotation = initialMinutes * 6 + (initialSeconds / 10); // 6° per minute + adjustment for seconds
    let cumulativeHourRotation = (30 * initialHours + initialMinutes / 2); // 30° per hour + adjustment for minutes
    if (secondreset) {
        document.getElementById("second").style.transition = "none";
        document.getElementById("second").style.transform = `rotate(0deg)`;
        secondreset = false;
        return;
    }
    if (minreset) {
        document.getElementById("minute").style.transition = "none";
        document.getElementById("minute").style.transform = `rotate(0deg)`;
        minreset = false;
        return;
    }
    if (hourreset) {
        document.getElementById("hour").style.transition = "none";
        document.getElementById("hour").style.transform = `rotate(0deg)`;
        hourreset = false;
        return;
    }
    if (cumulativeSecondRotation == 0) {
        document.getElementById("second").style.transition = "transform 1s ease";
        document.getElementById("second").style.transform = `rotate(361deg)`;
        secondreset = true;
    } else if (secondreset != true) {
        document.getElementById("second").style.transition = "transform 1s ease";
        document.getElementById("second").style.transform = `rotate(${cumulativeSecondRotation}deg)`;
    }

    if (cumulativeMinuteRotation == 0) {
        document.getElementById("minute").style.transition = "transform 1s ease";
        document.getElementById("minute").style.transform = `rotate(361deg)`;
        minreset = true;
    } else if (minreset != true) {
        document.getElementById("minute").style.transition = "transform 1s ease";
        document.getElementById("minute").style.transform = `rotate(${cumulativeMinuteRotation}deg)`;
    }

    if (cumulativeHourRotation == 0 && currentTime.getHours() === 0 && currentTime.getMinutes() === 0) {
        document.getElementById("hour").style.transition = "none"; // Instantly reset at midnight
        document.getElementById("hour").style.transform = `rotate(0deg)`;
        hourreset = true;
    } else if (hourreset != true) {
        document.getElementById("hour").style.transition = "transform 1s ease";
        document.getElementById("hour").style.transform = `rotate(${cumulativeHourRotation}deg)`;
    }
    // Update date immediately
    updateDate();
}

function getGreeting() {
    const currentHour = new Date().getHours();
    let greetingKey;

    // Determine the greeting key based on the current hour
    if (currentHour < 12) {
        greetingKey = 'morning';
    } else if (currentHour < 17) {
        greetingKey = 'afternoon';
    } else {
        greetingKey = 'evening';
    }

    // Get the user's language setting
    const userLang = getLanguageStatus('selectedLanguage') || 'en'; // Default to English

    // Check if the greeting is available for the selected language
    if (
        translations[userLang] &&
        translations[userLang].greeting &&
        translations[userLang].greeting[greetingKey]
    ) {
        return translations[userLang].greeting[greetingKey];
    } else {
        // Fallback to English greeting if the userLang or greeting key is missing
        return translations['en'].greeting[greetingKey];
    }
}

function updatedigiClock() {
    const hourformatstored = localStorage.getItem("hourformat");
    let hourformat = hourformatstored === "true"; // Default to false if null
    const greetingCheckbox = document.getElementById("greetingcheckbox");
    const isGreetingEnabled = localStorage.getItem("greetingEnabled") === "true";
    greetingCheckbox.checked = isGreetingEnabled;

    const now = new Date();
    const dayOfWeek = now.getDay(); // Get day of the week (0-6)
    const dayOfMonth = now.getDate(); // Get current day of the month (1-31)

    const currentLanguage = getLanguageStatus('selectedLanguage') || 'en';

    // Get translated day name
    let dayName;
    if (
        translations[currentLanguage] &&
        translations[currentLanguage].days &&
        translations[currentLanguage].days[dayOfWeek]
    ) {
        dayName = translations[currentLanguage].days[dayOfWeek];
    } else {
        dayName = translations['en'].days[dayOfWeek]; // Fallback to English day name
    }

    // Localize the day of the month
    const localizedDayOfMonth = localizeNumbers(dayOfMonth.toString(), currentLanguage);

    // Determine the translated short date string based on language
    const dateFormats = {
        az: `${dayName} ${dayOfMonth}`,
        bn: `${dayName}, ${localizedDayOfMonth}`,
        mr: `${dayName}, ${localizedDayOfMonth}`,
        zh: `${dayOfMonth}日${dayName}`,
        cs: `${dayName}, ${dayOfMonth}.`,
        hi: `${dayName}, ${dayOfMonth}`,
        ja: `${dayOfMonth} ${dayName.substring(0, 1)}`,
        ko: `${dayOfMonth} ${dayName.substring(0, 1)}`,
        pt: `${dayName}, ${dayOfMonth}`,
        ru: `${dayOfMonth} ${dayName.substring(0, 2)}`,
        vi: `${dayOfMonth} ${dayName}`,
        idn: `${dayOfMonth} ${dayName}`,
        fr: `${dayName} ${dayOfMonth}`, // Mardi 11
        default: `${dayOfMonth} ${dayName.substring(0, 3)}`,	// 24 Thu
    };
    const dateString = dateFormats[currentLanguage] || dateFormats.default;

    // Handle time formatting based on the selected language
    let timeString;
    let period = ''; // For storing AM/PM equivalent

    // Array of languages to use 'en-US' format
    const specialLanguages = ['tr', 'zh', 'ja', 'ko']; // Languages with NaN in locale time format
    const localizedLanguages = ['bn', 'mr'];
    // Force the 'en-US' format for Bengali, otherwise, it will be localized twice, resulting in NaN

    // Set time options and determine locale based on the current language
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: hourformat };
    const locale = specialLanguages.includes(currentLanguage) || localizedLanguages.includes(currentLanguage) ? 'en-US' : currentLanguage;
    timeString = now.toLocaleTimeString(locale, timeOptions);

    // Split the time and period (AM/PM) if in 12-hour format
    if (hourformat) {
        [timeString, period] = timeString.split(' '); // Split AM/PM if present
    }

    // Split the hours and minutes from the localized time string
    let [hours, minutes] = timeString.split(':');

    // Remove leading zero from hours in 12-hour format
    if (hourformat) {
        hours = parseInt(hours, 10).toString(); // Remove leading zero
    }

    // Localize hours and minutes for the selected language
    const localizedHours = localizeNumbers(hours, currentLanguage);
    const localizedMinutes = localizeNumbers(minutes, currentLanguage);

    // Update the hour, colon, and minute text elements
    document.getElementById('digihours').textContent = localizedHours;
    document.getElementById('digicolon').textContent = ':'; // Static colon
    document.getElementById('digiminutes').textContent = localizedMinutes;

    // Manually set the period for special languages if 12-hour format is enabled
    if (hourformat && specialLanguages.includes(currentLanguage)) {
        period = parseInt(hours, 10) < 12 ? 'AM' : 'PM';
    }

    // Display AM/PM if in 12-hour format
    if (hourformat) {
        document.getElementById('amPm').textContent = period; // Show AM/PM based on calculated period
    } else {
        document.getElementById('amPm').textContent = ''; // Clear AM/PM for 24-hour format
    }

    // Update the translated date
    document.getElementById('digidate').textContent = dateString;

    const clocktype1 = localStorage.getItem("clocktype");
    if (clocktype1 === "digital" && isGreetingEnabled) {
        document.getElementById("date").innerText = getGreeting();
    } else if (clocktype1 === "digital") {
        document.getElementById("date").innerText = ""; // Hide the greeting
    }
}

// Function to start the clock
function startClock() {
    if (!intervalId) { // Only set interval if not already set
        intervalId = setInterval(updateanalogclock, 500);
    }
}

// Function to stop the clock
function stopClock() {
    clearInterval(intervalId);
    intervalId = null; // Reset intervalId
}

// Initial clock display
displayClock();
setInterval(updatedigiClock, 1000); // Update digital clock every second

// Start or stop clocks based on clock type and visibility state
if (clocktype === "digital") {
    updatedigiClock();
} else if (clocktype === "analog") {
    if (document.visibilityState === 'visible') {
        startClock();
        updateDate(); // Immediately update date when clock is analog
    }
}

// Event listener for visibility change
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'visible') {
        startClock(); // Start the clock if the tab is focused
        updateDate(); // Update date when the tab becomes visible
    } else {
        stopClock(); // Stop the clock if the tab is not focused
    }
});

function displayClock() {
    const analogClock = document.getElementById('analogClock');
    const digitalClock = document.getElementById('digitalClock');

    if (clocktype === 'analog') {
        analogClock.style.display = 'block'; // Show the analog clock
        digitalClock.style.display = 'none';  // Hide the digital clock
    } else if (clocktype === 'digital') {
        digitalClock.style.display = 'block';  // Show the digital clock
        analogClock.style.display = 'none';     // Hide the analog clock
    }
}

// Call updateanalogclock when the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    updateanalogclock();
});

// End of clock display

document.addEventListener("DOMContentLoaded", () => {
    const userTextDiv = document.getElementById("userText");
    const userTextCheckbox = document.getElementById("userTextCheckbox");

    // Load and apply the checkbox state
    const isUserTextVisible = localStorage.getItem("userTextVisible") !== "false";
    userTextCheckbox.checked = isUserTextVisible;
    userTextDiv.style.display = isUserTextVisible ? "block" : "none";

    // Toggle userText display based on checkbox state
    userTextCheckbox.addEventListener("change", () => {
        const isVisible = userTextCheckbox.checked;
        userTextDiv.style.display = isVisible ? "block" : "none";
        localStorage.setItem("userTextVisible", isVisible);
    });

    // Set the default language to English if no language is saved
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    applyLanguage(savedLang);

    // Load the stored text if it exists
    const storedValue = localStorage.getItem("userText");
    if (storedValue) {
        userTextDiv.textContent = storedValue;
    } else {
        // Fallback to the placeholder based on the selected language
        const placeholder = userTextDiv.dataset.placeholder || translations['en'].userText; // Fallback to English
        userTextDiv.textContent = placeholder;
    }

    // Handle input event
    userTextDiv.addEventListener("input", function () {
        localStorage.setItem("userText", userTextDiv.textContent);
    });

    // Remove placeholder text when the user starts editing
    userTextDiv.addEventListener("focus", function () {
        if (userTextDiv.textContent === userTextDiv.dataset.placeholder) {
            userTextDiv.textContent = "";  // Clear the placeholder when focused
        }
    });

    // Restore placeholder if the user leaves the div empty after editing
    userTextDiv.addEventListener("blur", function () {
        if (userTextDiv.textContent === "") {
            userTextDiv.textContent = userTextDiv.dataset.placeholder;  // Show the placeholder again if empty
        }
    });
});

// Showing border or outline when you click on the searchbar
const searchbar = document.getElementById('searchbar');
searchbar.addEventListener('click', function (event) {
    event.stopPropagation(); // Stop the click event from propagating to the document
    searchbar.classList.add('active');
});

document.addEventListener('click', function (event) {
    // Check if the clicked element is not the searchbar
    if (!searchbar.contains(event.target)) {
        searchbar.classList.remove('active');
    }
});

// Search function
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector('.dropdown-content');

    document.addEventListener('click', (event) => {
        if (dropdown.style.display == "block") {
            event.stopPropagation();
            dropdown.style.display = 'none';
        }
    })

    document.querySelector('.dropdown-btn').addEventListener('click', function (event) {
        const resultBox = document.getElementById('resultBox');
        if (resultBox.classList.toString().includes('show')) return;
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    const enterBTN = document.getElementById("enterBtn");
    const searchInput = document.getElementById("searchQ");
    const searchEngineRadio = document.getElementsByName("search-engine");
    const searchDropdowns = document.querySelectorAll('[id$="-dropdown"]:not(*[data-default])');
    const defaultEngine = document.querySelector('#default-dropdown-item div[id$="-dropdown"]');

    const sortDropdown = () => {
        // Change the elements to the array
        const elements = Array.from(searchDropdowns);

        // Sort the dropdown
        const sortedDropdowns = elements.sort((a, b) => {
            const engineA = parseInt(a.getAttribute('data-engine'), 10);
            const engineB = parseInt(b.getAttribute('data-engine'), 10);

            return engineA - engineB;
        })

        // get the parent
        const parent = sortedDropdowns[0]?.parentNode;

        // Append the items. if parent exists.
        if (parent) {
            sortedDropdowns.forEach(item => parent.appendChild(item));
        }
    }

    // This will add event listener for click in the search bar
    searchDropdowns.forEach(element => {
        element.addEventListener('click', () => {
            const engine = element.getAttribute('data-engine');
            const radioButton = document.querySelector(`input[type="radio"][value="engine${engine}"]`);
            const selector = `*[data-engine-name=${element.getAttribute('data-engine-name')}]`;

            // console.log(element, selector);

            radioButton.checked = true;

            // Swap The dropdown. and sort them
            swapDropdown(selector);
            sortDropdown()

            localStorage.setItem("selectedSearchEngine", radioButton.value);
        });
    });

    // Make entire search-engine div clickable
    document.querySelectorAll(".search-engine").forEach((engineDiv) => {
        engineDiv.addEventListener("click", () => {
            const radioButton = engineDiv.querySelector('input[type="radio"]');

            radioButton.checked = true;

            const radioButtonValue = radioButton.value.charAt(radioButton.value.length - 1);

            const selector = `[data-engine="${radioButtonValue}"]`;

            // Swap The dropdown.
            swapDropdown(selector);
            sortDropdown()

            localStorage.setItem("selectedSearchEngine", radioButton.value);
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
        ['data-engine', 'data-engine-name', 'id'].forEach(attr => {
            const tempAttr = defaultEngine.getAttribute(attr);
            defaultEngine.setAttribute(attr, element.getAttribute(attr));
            element.setAttribute(attr, tempAttr);
        });
    }

    // Function to perform search
    function performSearch() {
        var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
        var searchTerm = searchInput.value;
        var searchEngines = {
            engine1: 'https://www.google.com/search?q=',
            engine2: 'https://duckduckgo.com/?q=',
            engine3: 'https://bing.com/?q=',
            engine4: 'https://search.brave.com/search?q=',
            engine5: 'https://www.youtube.com/results?search_query='
        };

        if (searchTerm !== "") {
            var searchUrl = searchEngines[selectedOption] + encodeURIComponent(searchTerm);
            window.location.href = searchUrl;
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
    const storedSearchEngine = localStorage.getItem("selectedSearchEngine");

    if (storedSearchEngine) {
        // Find Serial Number - SN with the help of charAt.
        const storedSearchEngineSN = storedSearchEngine.charAt(storedSearchEngine.length - 1);
        const defaultDropdownSN = document.querySelector('*[data-default]').getAttribute('data-engine');

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

    const dropdownItems = document.querySelectorAll('.dropdown-item:not(*[data-default])');
    let selectedIndex = -1;

    // Function to update the selected item
    function updateSelection() {
        // let hasSelected = [];
        dropdownItems.forEach((item, index) => {

            item.addEventListener('mouseenter', () => {
                item.classList.add('selected');
            })
            item.addEventListener('mouseleave', () => {
                item.classList.remove('selected');
            })

            if (index === selectedIndex) {
                item.focus()
                item.classList.add('selected');
            } else {
                item.focus()
                item.classList.remove('selected');
            }
        });
    }

    // Event listener for keydown events to navigate up/down
    document.querySelector('.dropdown').addEventListener('keydown', function (event) {
        if (dropdown.style.display == "block") {
            if (event.key === 'ArrowDown') {
                selectedIndex = (selectedIndex + 1) % dropdownItems.length; // Move down, loop around
            } else if (event.key === 'ArrowUp') {
                selectedIndex = (selectedIndex - 1 + dropdownItems.length) % dropdownItems.length; // Move up, loop around
            } else if (event.key === "Enter") {
                const selector = '.dropdown-content .selected';
                const engine = element.getAttribute('data-engine');
                const radioButton = document.querySelector(`input[type="radio"][value="engine${engine}"]`);

                radioButton.checked = true;

                // Swap The dropdown. and sort them
                swapDropdown(selector);
                sortDropdown()
            }
            updateSelection();
        }
    });

    // Initial setup for highlighting
    updateSelection();

    // Event listener for search engine radio buttons
    searchEngineRadio.forEach((radio) => {
        radio.addEventListener("change", () => {
            const selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
            localStorage.setItem("selectedSearchEngine", selectedOption);
        });
    });
    // -----Theme stay changed even if user reload the page---
    //  🔴🟠🟡🟢🔵🟣⚫️⚪️🟤
    const storedTheme = localStorage.getItem(themeStorageKey);
    if (storedTheme) {
        applySelectedTheme(storedTheme);
        const selectedRadioButton = document.querySelector(`.colorPlate[value="${storedTheme}"]`);
        if (selectedRadioButton) {
            selectedRadioButton.checked = true;
        }
    }
    // Remove Loading Screen When the DOM and the Theme has Loaded
    document.getElementById('LoadingScreen').style.display = "none";
    // it is necessary for some elements not to blink when the page is reloaded
    setTimeout(() => {
        document.documentElement.classList.add('theme-transition');
    }, 25);
});

//  -----------Voice Search------------
// Function to detect Chrome and Edge on desktop
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
const isEdge = /Edg/.test(navigator.userAgent);
const isBrave = navigator.brave && navigator.brave.isBrave; // Detect Brave
// const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const isDesktop = !/Android|iPhone|iPad|iPod/.test(navigator.userAgent); // Check if the device is not mobile
function isSupportedBrowser() {
    return (isChrome || isEdge) && isDesktop && !isBrave;
}

// Set the initial state of the mic icon and checkbox based on saved state or supported browser
const micIcon = document.getElementById("micIcon");
const micIconCheckbox = document.getElementById("micIconCheckbox");

// Check if there's a saved state in localStorage
const savedState = localStorage.getItem("micIconVisible");
let isMicIconVisible;

// If saved state exists, use it; otherwise, fallback to initial state based on browser support
if (savedState !== null) {
    isMicIconVisible = savedState === "true";
} else {
    // Default state: Hide mic icon if browser is not supported
    isMicIconVisible = isSupportedBrowser();
    // Save the initial state based on the user agent
    localStorage.setItem("micIconVisible", isMicIconVisible);
}

// Set the checkbox state based on the saved or default state
micIconCheckbox.checked = !isMicIconVisible; // Checked hides the mic icon
micIcon.style.visibility = isMicIconVisible ? "visible" : "hidden";

// Function to toggle mic icon visibility
function toggleMicIconVisibility(isVisible) {
    micIcon.style.visibility = isVisible ? "visible" : "hidden";
    localStorage.setItem("micIconVisible", isVisible); // Save to localStorage
}

// Toggle mic icon display based on checkbox state
micIconCheckbox.addEventListener("change", () => {
    const isChecked = micIconCheckbox.checked;
    toggleMicIconVisibility(!isChecked); // Checked hides the mic icon

    // Only initialize Web Speech API if the mic icon is visible
    if (!isChecked) {
        initializeSpeechRecognition();
    }
});

// Function to initialize Web Speech API if supported
function initializeSpeechRecognition() {
    const searchInput = document.getElementById("searchQ");
    const resultBox = document.getElementById("resultBox");
    const currentLanguage = getLanguageStatus('selectedLanguage') || 'en';

    // Check if the browser supports SpeechRecognition API
    const isSpeechRecognitionAvailable = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

    if (isSpeechRecognitionAvailable) {
        // Initialize SpeechRecognition (cross-browser compatibility)
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;  // Stop recognition after first result
        recognition.interimResults = true; // Enable interim results for live transcription
        recognition.lang = currentLanguage; // Set the language dynamically based on selected language

        let isRecognizing = false; // Flag to check if recognition is active

        // When speech recognition starts
        recognition.onstart = () => {
            isRecognizing = true; // Set the flag to indicate recognition is active
            const selectedRadio = document.querySelector('.colorPlate:checked');
            if (selectedRadio.value !== 'dark') {
                micIcon.style.color = 'var(--darkerColor-blue)';
                // micIcon.style.transform = 'scale(1.05)';
            }
            searchInput.placeholder = `${translations[currentLanguage]?.listenPlaceholder || translations['en'].listenPlaceholder}`;
            micIcon.classList.add('micActive');
        };

        // When speech recognition results are available (including interim results)
        recognition.onresult = (event) => {
            let transcript = '';
            // Loop through results to build the transcript text
            for (let i = 0; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript; // Append each piece of the transcript
            }
            // Display the interim result in the search input
            searchInput.value = transcript;
            // Trigger the input event manually to update suggestions
            searchInput.dispatchEvent(new Event("input"));
            // If the result is final, hide the result box
            if (event.results[event.results.length - 1].isFinal) {
                resultBox.style.display = 'none'; // Hide result box after final input
            }
        };

        // When an error occurs during speech recognition
        recognition.onerror = (event) => {
            console.error('Speech recognition error: ', event.error);
            isRecognizing = false; // Reset flag on error
        };

        // When speech recognition ends (either by user or automatically)
        recognition.onend = () => {
            isRecognizing = false; // Reset the flag to indicate recognition has stopped
            micIcon.style.color = 'var(--darkColor-blue)'; // Reset mic color
            // micIcon.style.transform = 'scale(1)'; // Reset scaling
            micIcon.classList.remove('micActive');
            searchInput.placeholder = `${translations[currentLanguage]?.searchPlaceholder || translations['en'].searchPlaceholder}`;
        };

        // Start speech recognition when mic icon is clicked
        micIcon.addEventListener('click', () => {
            if (isRecognizing) {
                recognition.stop(); // Stop recognition if it's already listening
            } else {
                recognition.start(); // Start recognition if it's not already listening
            }
        });
    } else {
        console.warn('Speech Recognition API not supported in this browser.');
    }
}

// Initialize SpeechRecognition only if the mic icon is visible
if (!micIconCheckbox.checked) {
    initializeSpeechRecognition();
}
//  -----------End of Voice Search------------


// Function to apply the selected theme
const radioButtons = document.querySelectorAll('.colorPlate');
const themeStorageKey = 'selectedTheme';
const storedTheme = localStorage.getItem(themeStorageKey);
// const radioButtons = document.querySelectorAll('.colorPlate');
// const themeStorageKey = 'selectedTheme'; // For predefined themes
const customThemeStorageKey = 'customThemeColor'; // For color picker
// const storedTheme = localStorage.getItem(themeStorageKey);
const storedCustomColor = localStorage.getItem(customThemeStorageKey);

let darkThemeStyleTag; // Variable to store the dynamically added style tag

const resetDarkTheme = () => {
    // Remove the dark theme class
    document.documentElement.classList.remove('dark-theme');

    // Remove the injected dark theme style tag
    if (darkThemeStyleTag) {
        darkThemeStyleTag.remove();
        darkThemeStyleTag = null;
    }

    // Reset inline styles that were applied specifically for dark mode
    const resetElements = [
        "searchQ",
        "searchIconDark",
        "darkFeelsLikeIcon",
        "menuButton",
        "menuCloseButton",
        "closeBtnX"
    ];

    resetElements.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.removeAttribute('style');
        }
    });

    // Reset fill color for elements with the class "accentColor"
    const accentElements = document.querySelectorAll('.accentColor');
    accentElements.forEach((element) => {
        element.style.fill = ''; // Reset fill color
    });
    // Reset the CSS variables to default (for non-dark themes)
    document.documentElement.style.setProperty('--bg-color-blue', '#ffffff');
    document.documentElement.style.setProperty('--accentLightTint-blue', '#E2EEFF');
    document.documentElement.style.setProperty('--darkerColor-blue', '#3569b2');
    document.documentElement.style.setProperty('--darkColor-blue', '#4382EC');
    document.documentElement.style.setProperty('--textColorDark-blue', '#1b3041');
    document.documentElement.style.setProperty('--whitishColor-blue', '#ffffff');
};



const applySelectedTheme = (colorValue) => {
    // If the selected theme is not dark, reset dark theme styles
    if (colorValue !== "dark") {
        resetDarkTheme();

        // Apply styles for other themes (not dark)
        if (colorValue === "blue") {
            document.documentElement.style.setProperty('--bg-color-blue', '#BBD6FD');
            document.documentElement.style.setProperty('--accentLightTint-blue', '#E2EEFF');
            document.documentElement.style.setProperty('--darkerColor-blue', '#3569b2');
            document.documentElement.style.setProperty('--darkColor-blue', '#4382EC');
            document.documentElement.style.setProperty('--textColorDark-blue', '#1b3041');
            document.documentElement.style.setProperty('--whitishColor-blue', '#ffffff');
        } else {
            document.documentElement.style.setProperty('--bg-color-blue', `var(--bg-color-${colorValue})`);
            document.documentElement.style.setProperty('--accentLightTint-blue', `var(--accentLightTint-${colorValue})`);
            document.documentElement.style.setProperty('--darkerColor-blue', `var(--darkerColor-${colorValue})`);
            document.documentElement.style.setProperty('--darkColor-blue', `var(--darkColor-${colorValue})`);
            document.documentElement.style.setProperty('--textColorDark-blue', `var(--textColorDark-${colorValue})`);
            document.documentElement.style.setProperty('--whitishColor-blue', `var(--whitishColor-${colorValue})`);
        }
    }

    // If the selected theme is dark
    else if (colorValue === "dark") {
        // Apply dark theme styles using CSS variables
        document.documentElement.style.setProperty('--bg-color-blue', `var(--bg-color-${colorValue})`);
        document.documentElement.style.setProperty('--accentLightTint-blue', `var(--accentLightTint-${colorValue})`);
        document.documentElement.style.setProperty('--darkerColor-blue', `var(--darkerColor-${colorValue})`);
        document.documentElement.style.setProperty('--darkColor-blue', `var(--darkColor-${colorValue})`);
        document.documentElement.style.setProperty('--textColorDark-blue', `var(--textColorDark-${colorValue})`);

        // Add dark theme styles for specific elements
        darkThemeStyleTag = document.createElement('style');
        darkThemeStyleTag.textContent = `
            .dark-theme .search-engine input[type="radio"]:checked {
                background-color: #2a2a2a;
                border: 2px solid #919191;
            }

            .dark-theme .search-engine input[type="radio"] {
                background-color: #9d9d9d   ;
                border: 0px solid #000000;
            }

            .dark-theme .colorsContainer {
                background-color: #212121;
            }

            .dark-theme #themeButton {
                background-color: #212121;
            }

            .dark-theme #themeIconSvg, .dark-theme #languageSelectorIconSvg {
                fill: #cdcdcd !important;
            }

            .dark-theme .languageIcon,
            .dark-theme .languageSelector {
                background-color: #212121;
                scrollbar-color: var(--darkerColor-blue) transparent;
            }

            .dark-theme .languageSelector::-webkit-scrollbar-thumb,
            .dark-theme .languageSelector::-webkit-scrollbar-thumb:hover {
                background-color: var(--darkerColor-blue);
            }

            .dark-theme .bottom a {
                color: #a1a1a1;
            }

            .dark-theme .ttcont input {
                background-color: #212121 !important;
            }

            .dark-theme input:checked + .toggle {
                background-color: #aaaaaa;
            }

            .dark-theme .tilesCont .tiles {
                color: #e8e8e8;
            }

            .dark-theme .resetbtn:hover {
                background-color: var(--bg-color-dark);
            }

            .dark-theme .resetbtn:active {
                background-color: #4e4e4e;
            }

            .dark-theme .savebtn:hover {
                background-color: var(--bg-color-dark);
            }

            .dark-theme .tiles:hover {
                background-color: var(--bg-color-dark);
            }

            .dark-theme .bottom a:hover {
                color: var(--darkerColor-blue);
            }

            .dark-theme #searchQ {
                color: #fff;
            }

            .dark-theme .searchbar.active {
                outline: 2px solid #696969;
            }

            .dark-theme #searchIconDark {
                fill: #bbb !important;
            }
	    
            .dark-theme .dropdown-item.selected:not(*[data-default]):before {
                background-color: #707070;
            }

            .dark-theme .tilesContainer .tiles {
                background-color: #212121;
            }

            .dark-theme #darkFeelsLikeIcon {
                fill: #fff !important;
            }

            .dark-theme .humidityBar .thinLine {
                background-color: #aaaaaa;
            }

            .dark-theme .search-engine .darkIconForDarkTheme, .dark-theme .aiDarkIcons {
                fill: #bbbbbb !important;
            }

            .dark-theme .divider {
                background-color: #cdcdcd;
            }
    
            .dark-theme .shorcutDarkColor {
                fill: #3c3c3c !important;
            }

            .dark-theme #darkLightTint {
                fill: #bfbfbf;
            }

            .dark-theme .strokecolor {
	            stroke: #3c3c3c;
            }

            .dark-theme .shortcutsContainer .shortcuts .shortcutLogoContainer {
                background: radial-gradient(circle, #bfbfbf 44%, #000 64%);
            }

            .dark-theme .digiclock {
                fill: #909090;
            }

     	    .dark-theme .uploadButton,
            .dark-theme .randomButton {
                background-color: var(--darkColor-blue);
                color: var(--whitishColor-dark);
            }
	    
            .dark-theme .clearButton{
                color: #d6d6d6;
            }

            .dark-theme .clearButton:hover {
                background-color: var(--whitishColor-dark);
            }

            .dark-theme .clearButton:active {
                color: #0e0e0e;
            }

            .dark-theme .backupRestoreBtn {
                background-color: var(--darkColor-dark);
            }

            .dark-theme .backupRestoreBtn:hover,
            .dark-theme .uploadButton:hover,
            .dark-theme .randomButton:hover,
            .dark-theme #todoAdd:hover {
                background-color: var(--bg-color-dark);
            }
            
            .dark-theme .uploadButton:active,
            .dark-theme .randomButton:active,
            .dark-theme .backupRestoreBtn:active,
            .dark-theme .resetbtn:active {
                background-color: #0e0e0e;
            }
	    
            .dark-theme .todolistitem .todoremovebtn {
                color:#616161;
            }

            .dark-theme .todolistitem .todoremovebtn:hover {
                color:#888888;
            }

            .dark-theme .bookmark-view-as-container .bookmark-view-as-button {
                color: var(--textColorDark-blue) !important;
            }

            .dark-theme #bookmarkSearch{
                background-color: #212121 !important;
            }

            .dark-theme .bookmark-search-container::after {
                filter: none;
            }

            .dark-theme .bookmark-button svg {
                fill: var(--textColorDark-blue);
            }

	    .dark-theme #bookmarkList:is(.grid-view) li a:has(.favicon)::after,
            .dark-theme #bookmarkList:is(.grid-view) li a:has(.favicon)::before {
                background: var(--darkColor-dark);
            }

	    .dark-theme .favicon {
                filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
            }

     	    .dark-theme .micIcon {
                background-color: var(--whitishColor-dark);
            }

            .dark-theme #minute, .dark-theme #minute::after, .dark-theme #second::after {
                background-color: #909090;
            }

            .dark-theme .dot-icon {
                fill: #bfbfbf;
            }

            .dark-theme .menuicon {
                color: #c2c2c2;
            }

            .dark-theme #menuButton {
                border: 6px solid var(--accentLightTint-blue);
                box-shadow:
                    inset 0 0 0 4px #858585,
                    inset 0 0 0 9.7px var(--accentLightTint-blue),
                    inset 0 0 0 40px #bfbfbf;
            }

            .dark-theme #menuCloseButton, .dark-theme #menuCloseButton:hover {
                background-color: var(--darkColor-dark);
            }

            .dark-theme #menuCloseButton .icon {
                background-color: #cdcdcd;
            }

            .dark-theme #closeBtnX {
                border: 2px solid #bdbdbd;
                border-radius: 100px;
            }

            .dark-theme body {
                background-color: #000000;
            }
            
            .dark-theme #HangNoAlive {
                fill: #c2c2c2 !important;
            }

            .dark-theme .tempUnit {
                color: #dadada;
            }

            .dark-theme #githab,
            .dark-theme #sujhaw {
                fill: #b1b1b1;
            }

            .dark-theme .resultItem.active {
                background-color: var(--darkColor-dark);;
            }
        `;
        document.head.appendChild(darkThemeStyleTag);

        // Apply dark theme class
        document.documentElement.classList.add('dark-theme');

        // Change fill color for elements with the class "accentColor"
        const accentElements = document.querySelectorAll('.accentColor');
        accentElements.forEach((element) => {
            element.style.fill = '#212121';
        });
    }


    // Change the extension icon based on the selected theme
    const iconPaths = ["blue", "yellow", "red", "green", "cyan", "orange", "purple", "pink", "brown", "silver", "grey", "dark"]
        .reduce((acc, color) => {
            acc[color] = `./favicon/${color}.png`;
            return acc;
        }, {});

    // Function to update the extension icon based on browser
    const updateExtensionIcon = (colorValue) => {
        if (typeof browser !== "undefined" && browser.browserAction) {
            // Firefox
            browser.browserAction.setIcon({ path: iconPaths[colorValue] });
        } else if (typeof chrome !== "undefined" && chrome.action) {
            // Chromium-based: Chrome, Edge, Brave
            chrome.action.setIcon({ path: iconPaths[colorValue] });
        } else if (typeof safari !== "undefined") {
            // Safari
            safari.extension.setToolbarIcon({ path: iconPaths[colorValue] });
        }
    };
    updateExtensionIcon(colorValue);

    // Change the favicon dynamically
    const faviconLink = document.querySelector("link[rel='icon']");
    if (faviconLink && iconPaths[colorValue]) {
        faviconLink.href = iconPaths[colorValue];
    }
    ApplyLoadingColor();
};

// ----Color Picker || ColorPicker----
function darkenHexColor(hex, factor = 0.6) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.floor(r * (1 - factor));
    g = Math.floor(g * (1 - factor));
    b = Math.floor(b * (1 - factor));
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

function lightenHexColor(hex, factor = 0.85) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.floor(r + (255 - r) * factor);
    g = Math.floor(g + (255 - g) * factor);
    b = Math.floor(b + (255 - b) * factor);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}

function lightestColor(hex, factor = 0.95) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.floor(r + (255 - r) * factor);
    g = Math.floor(g + (255 - g) * factor);
    b = Math.floor(b + (255 - b) * factor);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}

function isNearWhite(hex, threshold = 240) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return r > threshold && g > threshold && b > threshold;
}

// ---- Color Picker || ColorPicker----

const applyCustomTheme = (color) => {

    adjustedColor = color;
    if (isNearWhite(color)) {
        adjustedColor = '#696969'; // Light gray if near white
    }
    const darkerColorHex = darkenHexColor(adjustedColor);
    const lighterColorHex = lightenHexColor(adjustedColor, 0.85);
    const lightTin = lightestColor(adjustedColor, 0.95);

    // resetDarkTheme();
    document.documentElement.style.setProperty('--bg-color-blue', lighterColorHex);
    document.documentElement.style.setProperty('--accentLightTint-blue', lightTin);
    document.documentElement.style.setProperty('--darkerColor-blue', darkerColorHex);
    document.documentElement.style.setProperty('--darkColor-blue', adjustedColor);
    document.documentElement.style.setProperty('--textColorDark-blue', darkerColorHex);
    document.documentElement.style.setProperty('--whitishColor-blue', '#ffffff');
    document.getElementById("rangColor").style.borderColor = color;
    document.getElementById('dfChecked').checked = false;
    ApplyLoadingColor();
};

// Load theme on page reload// Load theme on page reload
window.addEventListener('load', function () {
    // console.log('Page loaded, stored theme:', storedTheme);
    // console.log('Page loaded, stored custom color:', storedCustomColor);
    if (storedTheme) {
        applySelectedTheme(storedTheme);
    } else if (storedCustomColor) {
        applyCustomTheme(storedCustomColor);
    }
});

// Handle radio button changes
const handleThemeChange = function () {
    if (this.checked) {
        const colorValue = this.value;
        // console.log('Radio button changed, selected theme:', colorValue);
        localStorage.setItem(themeStorageKey, colorValue);
        localStorage.removeItem(customThemeStorageKey); // Clear custom theme
        applySelectedTheme(colorValue);
    }
};

// Remove any previously attached listeners and add only one
radioButtons.forEach(radioButton => {
    radioButton.removeEventListener('change', handleThemeChange); // Remove if already attached
    radioButton.addEventListener('change', handleThemeChange);    // Add fresh listener
});

// Handle color picker changes
const handleColorPickerChange = function (event) {
    const selectedColor = event.target.value;
    // console.log('Color picker changed, selected color:', selectedColor);
    resetDarkTheme(); // Clear dark theme if active
    localStorage.setItem(customThemeStorageKey, selectedColor); // Save custom color
    localStorage.removeItem(themeStorageKey); // Clear predefined theme
    applyCustomTheme(selectedColor);

    // Uncheck all radio buttons
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
};

// Add listeners for color picker
colorPicker.removeEventListener('input', handleColorPickerChange); // Ensure no duplicate listeners
colorPicker.addEventListener('input', handleColorPickerChange);
// colorPicker.addEventListener('change', function () {
//     // console.log('Final color applied:', colorPicker.value);
//     location.reload();
// });



// end of Function to apply the selected theme

// -------------------------- Wallpaper -----------------------------
const dbName = 'ImageDB';
const storeName = 'backgroundImages';
const timestampKey = 'lastUpdateTime'; // Key to store last update time
const imageTypeKey = 'imageType'; // Key to store the type of image ('random' or 'upload')

// Open IndexedDB database
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore(storeName);
        };
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject('Database error: ' + event.target.errorCode);
    });
}

// Save image Blob, timestamp, and type to IndexedDB
async function saveImageToIndexedDB(imageBlob, isRandom) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        store.put(imageBlob, 'backgroundImage'); // Save Blob
        store.put(new Date().toISOString(), timestampKey);
        store.put(isRandom ? 'random' : 'upload', imageTypeKey);

        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject('Transaction error: ' + event.target.errorCode);
    });
}

// Load image Blob, timestamp, and type from IndexedDB
async function loadImageAndDetails() {
    const db = await openDatabase();
    return Promise.all([
        getFromStore(db, 'backgroundImage'),
        getFromStore(db, timestampKey),
        getFromStore(db, imageTypeKey)
    ]);
}
function getFromStore(db, key) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject('Request error: ' + event.target.errorCode);
    });
}

// Clear image data from IndexedDB
async function clearImageFromIndexedDB() {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        store.delete('backgroundImage');
        store.delete(timestampKey);
        store.delete(imageTypeKey);

        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject('Delete error: ' + event.target.errorCode);
    });
}

// Handle file input and save image as upload
document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file); // Create temporary Blob URL
        const image = new Image();

        image.onload = function () {
            document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
            saveImageToIndexedDB(file, false)
                .then(() => {
                    updateTextBackground(true);
                    URL.revokeObjectURL(imageUrl); // Clean up memory
                })
                .catch(error => console.error(error));
        };

        image.src = imageUrl;
    }
});

// Fetch and apply random image as background
const RANDOM_IMAGE_URL = 'https://picsum.photos/1920/1080';
const currentLanguage = getLanguageStatus('selectedLanguage') || 'en';
async function applyRandomImage(showConfirmation = true) {
    if (showConfirmation && !confirm(translations[currentLanguage]?.confirmWallpaper || translations['en'].confirmWallpaper)) {
        return;
    }
    try {
        const response = await fetch(RANDOM_IMAGE_URL);
        const blob = await response.blob(); // Get Blob from response
        const imageUrl = URL.createObjectURL(blob);

        document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
        await saveImageToIndexedDB(blob, true);
        updateTextBackground(true);
        setTimeout(() => URL.revokeObjectURL(imageUrl), 1500); // Delay URL revocation
    } catch (error) {
        console.error('Error fetching random image:', error);
    }
}

// Function to update solid background behind userText, date, greeting and shortcut names
function updateTextBackground(hasWallpaper) {
    const userText = document.getElementById('userText');
    const date = document.getElementById('date');
    const shortcuts = document.querySelectorAll('.shortcuts .shortcut-name');

    // Update styles for userText and date
    [userText, date].forEach(element => {
        if (hasWallpaper) {
            element.style.backgroundColor = 'var(--accentLightTint-blue)';
            element.style.padding = '2px 12px';
            element.style.width = 'fit-content';
            element.style.borderRadius = '10px';
            element.style.fontSize = '1.32rem';
        } else {
            element.style.backgroundColor = ''; // Reset to default
            element.style.padding = '';
            element.style.width = '';
            element.style.borderRadius = '';
            element.style.fontSize = '';
        }
    });

    // Update styles for shortcuts
    shortcuts.forEach(shortcut => {
        shortcut.style.backgroundColor = hasWallpaper ? 'var(--accentLightTint-blue)' : '';
        shortcut.style.padding = hasWallpaper ? '0px 6px' : '';
        shortcut.style.borderRadius = hasWallpaper ? '5px' : '';
    });
}

// Check and update image on page load
function checkAndUpdateImage() {
    loadImageAndDetails()
        .then(([blob, savedTimestamp, imageType]) => {
            const now = new Date();
            const lastUpdate = new Date(savedTimestamp);

            // No image or invalid data
            if (!blob || !savedTimestamp || isNaN(lastUpdate)) {
                updateTextBackground(false);
                return;
            }

            // Create a new Blob URL dynamically
            const imageUrl = URL.createObjectURL(blob);

            if (imageType === 'upload') {
                document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
                updateTextBackground(true);
                return;
            }

            if (lastUpdate.toDateString() !== now.toDateString()) {
                // Refresh random image if a new day
                applyRandomImage(false);
            } else {
                // Reapply the saved random image
                document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
                updateTextBackground(true);
            }

            // Clean up the Blob URL after setting the background
            setTimeout(() => URL.revokeObjectURL(imageUrl), 1500);
        })
        .catch((error) => {
            console.error('Error loading image details:', error);
            updateTextBackground(false);
        });
}

// Event listeners for buttons
document.getElementById('uploadTrigger').addEventListener('click', () => document.getElementById('imageUpload').click());
document.getElementById('clearImage').addEventListener('click', function () {
    loadImageAndDetails()
        .then(([blob]) => {
            if (!blob) {
                alert(translations[currentLanguage]?.Nobackgroundset || translations['en'].Nobackgroundset);
                return;
            }
            const confirmationMessage = translations[currentLanguage]?.clearbackgroundimage || translations['en'].clearbackgroundimage;
            if (confirm(confirmationMessage)) {
                clearImageFromIndexedDB()
                    .then(() => {
                        document.body.style.removeProperty('--bg-image');
                        updateTextBackground(false);
                    })
                    .catch((error) => console.error(error));
            }
        })
        .catch((error) => console.error(error));
});
document.getElementById('randomImageTrigger').addEventListener('click', applyRandomImage);

// Start image check on page load
checkAndUpdateImage();
// ------------------------ End of BG Image --------------------------

// -------------------- Backup-Restore Settings ----------------------
document.getElementById("backupBtn").addEventListener("click", backupData);
document.getElementById("restoreBtn").addEventListener("click", () => document.getElementById("fileInput").click());
document.getElementById("fileInput").addEventListener("change", validateAndRestoreData);

// Backup data from localStorage and IndexedDB
async function backupData() {
    try {
        const backup = { localStorage: {}, indexedDB: {} };

        // Backup localStorage
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                backup.localStorage[key] = localStorage.getItem(key);
            }
        }

        // Backup IndexedDB (ImageDB)
        backup.indexedDB = await backupIndexedDB();

        // Generate filename with current date (format: DDMMYYYY)
        const date = new Date();
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${date.getFullYear()}`;
        const fileName = `NewTab_Backup_${formattedDate}.json`;

        // Create and download the backup file
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("Backup completed successfully!");
    } catch (error) {
        alert(translations[currentLanguage]?.failedbackup || translations['en'].failedbackup + error.message);
    }
}

// Validate and restore data from a backup file
async function validateAndRestoreData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const backup = JSON.parse(e.target.result);

            // Validate the structure of the JSON file
            if (!isValidBackupFile(backup)) {
                alert(translations[currentLanguage]?.invalidBackup || translations['en'].invalidBackup);
                return;
            }

            await restoreData(backup);

            alert(translations[currentLanguage]?.restorecompleted || translations['en'].restorecompleted);
            location.reload();
        } catch (error) {
            alert(translations[currentLanguage]?.restorefailed || translations['en'].restorefailed + error.message);
        }
    };
    reader.readAsText(file);
}

function isValidBackupFile(backup) {
    // Check if localStorage and indexedDB exist and are objects
    if (typeof backup.localStorage !== "object" || typeof backup.indexedDB !== "object") {
        return false;
    }
    return true;
}

// Backup IndexedDB: Extract data from ImageDB -> backgroundImages
async function backupIndexedDB() {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const data = {};

        store.getAllKeys().onsuccess = (keysEvent) => {
            const keys = keysEvent.target.result;

            if (!keys.length) {
                resolve({});
                return;
            }

            let pending = keys.length;
            keys.forEach(key => {
                store.get(key).onsuccess = (getEvent) => {
                    const value = getEvent.target.result;
                    if (value instanceof Blob) {
                        // Convert Blob to Base64 for JSON compatibility
                        const reader = new FileReader();
                        reader.onload = () => {
                            data[key] = { blob: reader.result, isBlob: true };
                            if (--pending === 0) resolve(data);
                        };
                        reader.readAsDataURL(value);
                    } else {
                        data[key] = value;
                        if (--pending === 0) resolve(data);
                    }
                };
            });
        };

        transaction.onerror = () => reject(transaction.error);
    });
}

// Restore IndexedDB: Clear and repopulate ImageDB -> backgroundImages
async function restoreIndexedDB(data) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        store.clear();
        const entries = Object.entries(data);
        let pending = entries.length;

        if (pending === 0) {
            resolve(); // If no data to restore, resolve immediately
            return;
        }

        entries.forEach(([key, value]) => {
            if (value.isBlob) {
                // Convert Base64 back to Blob
                const blob = base64ToBlob(value.blob);
                store.put(blob, key);
            } else {
                store.put(value, key);
            }

            if (--pending === 0) resolve();
        });

        transaction.onerror = () => reject(transaction.error);
    });
}

// Restore data for both localStorage and IndexedDB
async function restoreData(backup) {
    // Clear localStorage before restoring
    localStorage.clear();

    // Restore localStorage from backup
    if (backup.localStorage) {
        Object.keys(backup.localStorage).forEach(key => {
            localStorage.setItem(key, backup.localStorage[key]);
        });
    }

    // Restore IndexedDB from backup
    if (backup.indexedDB) {
        await restoreIndexedDB(backup.indexedDB);
    }
}

// Helper: Convert Base64 string to Blob
function base64ToBlob(base64) {
    const [metadata, data] = base64.split(',');
    const mime = metadata.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
}
// -------------------End of Settings ------------------------------

// when User click on "AI-Tools"
const element = document.getElementById("toolsCont");
const shortcuts = document.getElementById("shortcutsContainer");

function toggleShortcuts(event) {
    const shortcutsCheckbox = document.getElementById("shortcutsCheckbox");

    if (shortcutsCheckbox.checked) {
        if (element.style.display === "flex") {
            shortcuts.style.display = 'flex';
            element.style.opacity = "0";
            element.style.gap = "0";
            element.style.transform = "translateX(-100%)";

            setTimeout(() => {
                element.style.display = "none";
                shortcuts.style.display = 'flex';
            }, 500);
        } else {
            shortcuts.style.display = 'none';
            element.style.display = "flex";
            setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateX(0)";
            }, 1);
            setTimeout(() => {
                element.style.gap = "12px";
            }, 300);
        }
    } else {
        if (element.style.display === "flex") {
            shortcuts.style.display = 'none';
            element.style.opacity = "0";
            element.style.gap = "0";
            element.style.transform = "translateX(-100%)";
            setTimeout(() => {
                element.style.display = "none";
            }, 500);
        } else {
            shortcuts.style.display = 'none';
            element.style.display = "flex";
            setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateX(0)";
            }, 1);
            setTimeout(() => {
                element.style.gap = "12px";
            }, 300);
        }
    }
    // Prevent outside click handler from triggering
    if (event) event.stopPropagation();
}

// Collapse when clicking outside toolsCont
document.addEventListener("click", (event) => {
    if (!element.contains(event.target) && element.style.display === "flex") {
        toggleShortcuts();
    }
});

document.getElementById("0NIHK").onclick = toggleShortcuts;

// ------------Search Suggestions---------------

// Show the result box
function showResultBox() {
    resultBox.classList.add('show');
    resultBox.style.display = "block";
}

// Hide the result box
function hideResultBox() {
    resultBox.classList.remove('show');
    //resultBox.style.display = "none";
}

showResultBox();
hideResultBox();

document.getElementById("searchQ").addEventListener("input", async function () {
    const searchsuggestionscheckbox = document.getElementById("searchsuggestionscheckbox");
    if (searchsuggestionscheckbox.checked) {
        var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
        var searchEngines = {
            engine1: 'https://www.google.com/search?q=',
            engine2: 'https://duckduckgo.com/?q=',
            engine3: 'https://bing.com/?q=',
            engine4: 'https://search.brave.com/search?q=',
            engine5: 'https://www.youtube.com/results?search_query='
        };
        const query = this.value;
        const resultBox = document.getElementById("resultBox");

        if (query.length > 0) {
            try {
                // Fetch autocomplete suggestions
                const suggestions = await getAutocompleteSuggestions(query);

                if (suggestions == "") {
                    hideResultBox();
                } else {
                    // Clear the result box
                    resultBox.innerHTML = '';

                    // Add suggestions to the result box
                    suggestions.forEach((suggestion, index) => {
                        const resultItem = document.createElement("div");
                        resultItem.classList.add("resultItem");
                        resultItem.textContent = suggestion;
                        resultItem.setAttribute("data-index", index);
                        resultItem.onclick = () => {
                            var resultlink = searchEngines[selectedOption] + encodeURIComponent(suggestion);
                            window.location.href = resultlink;
                        };
                        resultBox.appendChild(resultItem);
                    });

                    // Check if the dropdown of search shortcut is open
                    const dropdown = document.querySelector('.dropdown-content');

                    if (dropdown.style.display == "block") {
                        dropdown.style.display = "none";
                    }


                    showResultBox();
                }
            } catch (error) {
                // Handle the error (if needed)
            }
        } else {
            hideResultBox();
        }
    }
});

let isMouseOverResultBox = false;
// Track mouse entry and exit within the resultBox
resultBox.addEventListener("mouseenter", () => {
    isMouseOverResultBox = true;
    // Remove keyboard highlight
    const activeItem = resultBox.querySelector(".active");
    if (activeItem) {
        activeItem.classList.remove("active");
    }
});

resultBox.addEventListener("mouseleave", () => {
    isMouseOverResultBox = false;
});

document.getElementById("searchQ").addEventListener("keydown", function (e) {
    if (isMouseOverResultBox) {
        return; // Ignore keyboard events if the mouse is in the resultBox
    }
    const activeItem = resultBox.querySelector(".active");
    let currentIndex = activeItem ? parseInt(activeItem.getAttribute("data-index")) : -1;

    if (resultBox.children.length > 0) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (activeItem) {
                activeItem.classList.remove("active");
            }
            currentIndex = (currentIndex + 1) % resultBox.children.length;
            resultBox.children[currentIndex].classList.add("active");

            // Ensure the active item is visible within the result box
            const activeElement = resultBox.children[currentIndex];
            activeElement.scrollIntoView({ block: "nearest" });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (activeItem) {
                activeItem.classList.remove("active");
            }
            currentIndex = (currentIndex - 1 + resultBox.children.length) % resultBox.children.length;
            resultBox.children[currentIndex].classList.add("active");

            // Ensure the active item is visible within the result box
            const activeElement = resultBox.children[currentIndex];
            activeElement.scrollIntoView({ block: "nearest" });
        } else if (e.key === "Enter" && activeItem) {
            e.preventDefault();
            activeItem.click();
        }
    }
});

function getClientParam() {
    const userAgent = navigator.userAgent.toLowerCase();

    // Check for different browsers and return the corresponding client parameter
    if (userAgent.includes("firefox")) {
        return "firefox";
    } else if (userAgent.includes("chrome") || userAgent.includes("crios")) {
        return "chrome";
    } else if (userAgent.includes("safari")) {
        return "safari";
    } else if (userAgent.includes("edge") || userAgent.includes("edg")) {
        return "firefox";
    } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
        return "opera";
    } else {
        return "firefox";  // Default to Firefox client if the browser is not recognized
    }
}

async function getAutocompleteSuggestions(query) {
    const clientParam = getClientParam(); // Get the browser client parameter dynamically
    var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
    var searchEnginesapi = {
        engine1: `https://www.google.com/complete/search?client=${clientParam}&q=${encodeURIComponent(query)}`,
        engine2: `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`,
        engine3: `https://www.google.com/complete/search?client=${clientParam}&q=${encodeURIComponent(query)}`,
        engine4: `https://search.brave.com/api/suggest?q=${encodeURIComponent(query)}&rich=true&source=web`,
        engine5: `https://www.google.com/complete/search?client=${clientParam}&ds=yt&q=${encodeURIComponent(query)}`
    };
    const useproxyCheckbox = document.getElementById("useproxyCheckbox");
    let apiUrl = searchEnginesapi[selectedOption];
    if (useproxyCheckbox.checked) {
        apiUrl = `${proxyurl}/proxy?url=${encodeURIComponent(apiUrl)}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (selectedOption === 'engine4') {
            const suggestions = data[1].map(item => {
                if (item.is_entity) {
                    return `${item.q} - ${item.name} (${item.category ? item.category : "No category"})`;
                } else {
                    return item.q;
                }
            });
            return suggestions;
        } else {

            return data[1];
        }
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        return [];
    }
}

// Hide results when clicking outside
document.addEventListener("click", function (event) {
    const searchbar = document.getElementById("searchbar");
    // const resultBox = document.getElementById("resultBox");

    if (!searchbar.contains(event.target)) {
        hideResultBox();
    }
});
// ------------End of Search Suggestions---------------

// ------------Showing & Hiding Menu-bar ---------------
const menuButton = document.getElementById("menuButton");
const menuBar = document.getElementById("menuBar");
const menuCont = document.getElementById("menuCont");
const optCont = document.getElementById("optCont");
const overviewPage = document.getElementById("overviewPage");
const shortcutEditPage = document.getElementById("shortcutEditPage");

function pageReset() {
    optCont.scrollTop = 0;
    overviewPage.style.transform = "translateX(0)";
    overviewPage.style.opacity = "1";
    overviewPage.style.display = "block";
    shortcutEditPage.style.transform = "translateX(120%)";
    shortcutEditPage.style.opacity = "0";
    shortcutEditPage.style.display = "none";
}

const closeMenuBar = () => {
    requestAnimationFrame(() => {
        optCont.style.opacity = "0"
        optCont.style.transform = "translateX(100%)"
    });
    setTimeout(() => {
        requestAnimationFrame(() => {
            menuBar.style.opacity = "0"
            menuCont.style.transform = "translateX(100%)"
        });
    }, 14);
    setTimeout(() => {
        menuBar.style.display = "none";
    }, 555);
}

const openMenuBar = () => {
    setTimeout(() => {
        menuBar.style.display = "block";
        pageReset();
    });
    setTimeout(() => {
        requestAnimationFrame(() => {
            menuBar.style.opacity = "1"
            menuCont.style.transform = "translateX(0px)"
        });
    }, 7);
    setTimeout(() => {
        requestAnimationFrame(() => {
            optCont.style.opacity = "1"
            optCont.style.transform = "translateX(0px)"
        });
    }, 11);
}

menuButton.addEventListener("click", () => {
    if (menuBar.style.display === 'none' || menuBar.style.display === '') {
        openMenuBar();
    } else {
        closeMenuBar();
    }
});

//   ----------Hiding Menu Bar--------
menuBar.addEventListener("click", (event) => {
    if (event.target === menuBar) {
        closeMenuBar()
    }
});

// Hiding Menu Bar when user click on close button --------
document.getElementById("menuCloseButton").onclick = () => {
    closeMenuBar()
}

// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {


    /* ------ Constants ------ */

    // maximum number of shortcuts allowed
    const MAX_SHORTCUTS_ALLOWED = 50;

    // minimum number of  shorcutDarkColor allowed
    const MIN_SHORTCUTS_ALLOWED = 1;

    // The new shortcut placeholder info
    const PLACEHOLDER_SHORTCUT_NAME = "New shortcut";
    const PLACEHOLDER_SHORTCUT_URL = "https://github.com/XengShi/materialYouNewTab";

    // The placeholder for an empty shortcut
    const SHORTCUT_NAME_PLACEHOLDER = "Shortcut Name";
    const SHORTCUT_URL_PLACEHOLDER = "Shortcut URL";

    const SHORTCUT_PRESET_NAMES = ["Youtube", "Gmail", "Telegram", "WhatsApp", "Instagram", "Twitter"];
    const SHORTCUT_PRESET_URLS_AND_LOGOS = Object.freeze(new Map([["youtube.com", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor shorcutDarkColor"
                    d="M11.6698 9.82604L9.33021 8.73437C9.12604 8.63958 8.95833 8.74583 8.95833 8.97187V11.0281C8.95833 11.2542 9.12604 11.3604 9.33021 11.2656L11.6688 10.174C11.874 10.0781 11.874 9.92188 11.6698 9.82604ZM10 0C4.47708 0 0 4.47708 0 10C0 15.5229 4.47708 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47708 15.5229 0 10 0ZM10 14.0625C4.88125 14.0625 4.79167 13.601 4.79167 10C4.79167 6.39896 4.88125 5.9375 10 5.9375C15.1187 5.9375 15.2083 6.39896 15.2083 10C15.2083 13.601 15.1187 14.0625 10 14.0625Z"
                    fill="#617859"/>
            </svg>`], ["mail.google.com", `
            <svg fill="none" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	            <circle cx="12" cy="12" r="12" class="accentColor shorcutDarkColor"/>
                <g transform="translate(12, 12) scale(0.7) translate(-10, -10)">
	            <path class="bgLightTint" id="darkLightTint" fill-rule="evenodd"
                    d="m7.172 11.334l2.83 1.935l2.728-1.882l6.115 6.033q-.242.079-.512.08H1.667c-.22 0-.43-.043-.623-.12zM20 6.376v9.457c0 .247-.054.481-.15.692l-5.994-5.914zM0 6.429l6.042 4.132l-5.936 5.858A1.7 1.7 0 0 1 0 15.833zM18.333 2.5c.92 0 1.667.746 1.667 1.667v.586L9.998 11.648L0 4.81v-.643C0 3.247.746 2.5 1.667 2.5z" />
                </g>
            </svg>
            `], ["web.telegram.org", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor shorcutDarkColor"
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.64 6.8C14.49 8.38 13.84 12.22 13.51 13.99C13.37 14.74 13.09 14.99 12.83 15.02C12.25 15.07 11.81 14.64 11.25 14.27C10.37 13.69 9.87 13.33 9.02 12.77C8.03 12.12 8.67 11.76 9.24 11.18C9.39 11.03 11.95 8.7 12 8.49C12.0069 8.45819 12.006 8.42517 11.9973 8.3938C11.9886 8.36244 11.9724 8.33367 11.95 8.31C11.89 8.26 11.81 8.28 11.74 8.29C11.65 8.31 10.25 9.24 7.52 11.08C7.12 11.35 6.76 11.49 6.44 11.48C6.08 11.47 5.4 11.28 4.89 11.11C4.26 10.91 3.77 10.8 3.81 10.45C3.83 10.27 4.08 10.09 4.55 9.9C7.47 8.63 9.41 7.79 10.38 7.39C13.16 6.23 13.73 6.03 14.11 6.03C14.19 6.03 14.38 6.05 14.5 6.15C14.6 6.23 14.63 6.34 14.64 6.42C14.63 6.48 14.65 6.66 14.64 6.8Z"
                    fill="#617859"/>
            </svg>
            `], ["web.whatsapp.com", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor shorcutDarkColor"
                    d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C8.23279 20.0029 6.49667 19.5352 4.97001 18.645L0.00401407 20L1.35601 15.032C0.465107 13.5049 -0.00293838 11.768 1.38802e-05 10C1.38802e-05 4.477 4.47701 0 10 0ZM6.59201 5.3L6.39201 5.308C6.26254 5.31589 6.13599 5.3499 6.02001 5.408C5.91153 5.46943 5.81251 5.54622 5.72601 5.636C5.60601 5.749 5.53801 5.847 5.46501 5.942C5.09514 6.4229 4.89599 7.01331 4.89901 7.62C4.90101 8.11 5.02901 8.587 5.22901 9.033C5.63801 9.935 6.31101 10.89 7.19901 11.775C7.41301 11.988 7.62301 12.202 7.84901 12.401C8.9524 13.3725 10.2673 14.073 11.689 14.447L12.257 14.534C12.442 14.544 12.627 14.53 12.813 14.521C13.1043 14.506 13.3886 14.4271 13.646 14.29C13.777 14.2225 13.9048 14.1491 14.029 14.07C14.029 14.07 14.072 14.042 14.154 13.98C14.289 13.88 14.372 13.809 14.484 13.692C14.567 13.606 14.639 13.505 14.694 13.39C14.772 13.227 14.85 12.916 14.882 12.657C14.906 12.459 14.899 12.351 14.896 12.284C14.892 12.177 14.803 12.066 14.706 12.019L14.124 11.758C14.124 11.758 13.254 11.379 12.722 11.137C12.6663 11.1127 12.6067 11.0988 12.546 11.096C12.4776 11.089 12.4085 11.0967 12.3433 11.1186C12.2781 11.1405 12.2183 11.1761 12.168 11.223C12.163 11.221 12.096 11.278 11.373 12.154C11.3315 12.2098 11.2744 12.2519 11.2088 12.2751C11.1433 12.2982 11.0723 12.3013 11.005 12.284C10.9399 12.2665 10.876 12.2445 10.814 12.218C10.69 12.166 10.647 12.146 10.562 12.11C9.98808 11.8595 9.4567 11.5211 8.98701 11.107C8.86101 10.997 8.74401 10.877 8.62401 10.761C8.2306 10.3842 7.88774 9.95801 7.60401 9.493L7.54501 9.398C7.50264 9.33416 7.46837 9.2653 7.44301 9.193C7.40501 9.046 7.50401 8.928 7.50401 8.928C7.50401 8.928 7.74701 8.662 7.86001 8.518C7.97001 8.378 8.06301 8.242 8.12301 8.145C8.24101 7.955 8.27801 7.76 8.21601 7.609C7.93601 6.925 7.64601 6.244 7.34801 5.568C7.28901 5.434 7.11401 5.338 6.95501 5.319C6.90101 5.313 6.84701 5.307 6.79301 5.303C6.65872 5.29633 6.52415 5.29766 6.39001 5.307L6.59101 5.299L6.59201 5.3Z"
                    fill="#617859"/>
            </svg>
            `], ["instagram.com", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8.44" class="strokecolor" stroke-width="3" fill="none" />
                <g transform="translate(10, 10) scale(0.85) translate(-10, -10)">
                <path class="accentColor shorcutDarkColor"
                    d="M10 0C4.44444 0 0 4.44444 0 10C0 15.5556 4.44444 20 10 20C15.5556 20 20 15.5556 20 10C20 4.44444 15.5556 0 10 0ZM10 7.77778C11.2222 7.77778 12.2222 8.77778 12.2222 10C12.2222 11.2222 11.2222 12.2222 10 12.2222C8.77778 12.2222 7.77778 11.2222 7.77778 10C7.77778 8.77778 8.77778 7.77778 10 7.77778ZM13.1111 5.55556C13.1111 4.77778 13.7778 4.22222 14.4444 4.22222C15.1111 4.22222 15.7778 4.88889 15.7778 5.55556C15.7778 6.22222 15.2222 6.88889 14.4444 6.88889C13.6667 6.88889 13.1111 6.33333 13.1111 5.55556ZM10 17.7778C5.66667 17.7778 2.22222 14.3333 2.22222 10H5.55556C5.55556 12.4444 7.55556 14.4444 10 14.4444C12.4444 14.4444 14.4444 12.4444 14.4444 10H17.7778C17.7778 14.3333 14.3333 17.7778 10 17.7778Z" fill="#617859"/>
                </g>
            </svg>
            `], ["x.com", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor shorcutDarkColor"
                    d="M10 0C15.5286 0 20 4.47143 20 10C20 15.5286 15.5286 20 10 20C4.47143 20 0 15.5286 0 10C0 4.47143 4.47143 0 10 0ZM8.17143 15.2714C12.6 15.2714 15.0286 11.6 15.0286 8.41429V8.1C15.5 7.75714 15.9143 7.32857 16.2286 6.84286C15.8 7.02857 15.3286 7.15714 14.8429 7.22857C15.3429 6.92857 15.7286 6.45714 15.9 5.9C15.4286 6.17143 14.9143 6.37143 14.3714 6.48571C13.9286 6.01429 13.3 5.72857 12.6143 5.72857C11.2857 5.72857 10.2 6.81429 10.2 8.14286C10.2 8.32857 10.2143 8.51429 10.2714 8.68571C8.27143 8.58571 6.48571 7.62857 5.3 6.17143C5.1 6.52857 4.97143 6.94286 4.97143 7.38571C4.97143 8.21429 5.4 8.95714 6.04286 9.38571C5.64286 9.38571 5.27143 9.27143 4.95714 9.08571V9.11429C4.95714 10.2857 5.78571 11.2571 6.88571 11.4857C6.68571 11.5429 6.47143 11.5714 6.25714 11.5714C6.1 11.5714 5.95714 11.5571 5.8 11.5286C6.1 12.4857 7 13.1857 8.04286 13.2C7.21429 13.8429 6.17143 14.2286 5.04286 14.2286C4.84286 14.2286 4.65714 14.2286 4.47143 14.2C5.52857 14.8857 6.8 15.2857 8.15714 15.2857"
                    fill="#617859"/>
            </svg>
            `]]));

    const SHORTCUT_DELETE_BUTTON_HTML = Object.freeze(`
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-12q-15.3 0-25.65-10.29Q192-716.58 192-731.79t10.35-25.71Q212.7-768 228-768h156v-12q0-15.3 10.35-25.65Q404.7-816 420-816h120q15.3 0 25.65 10.35Q576-795.3 576-780v12h156q15.3 0 25.65 10.29Q768-747.42 768-732.21t-10.35 25.71Q747.3-696 732-696h-12v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM419.79-288q15.21 0 25.71-10.35T456-324v-264q0-15.3-10.29-25.65Q435.42-624 420.21-624t-25.71 10.35Q384-603.3 384-588v264q0 15.3 10.29 25.65Q404.58-288 419.79-288Zm120 0q15.21 0 25.71-10.35T576-324v-264q0-15.3-10.29-25.65Q555.42-624 540.21-624t-25.71 10.35Q504-603.3 504-588v264q0 15.3 10.29 25.65Q524.58-288 539.79-288ZM312-696v480-480Z"/>
                </svg>
            </button>
            `);

    // const FAVICON_CANDIDATES = (hostname) => [
    //     `https://${hostname}/apple-touch-icon-180x180.png`,
    //     `https://${hostname}/apple-touch-icon-120x120.png`,
    //     `https://${hostname}/apple-touch-icon.png`
    // ];

    const GOOGLE_FAVICON_API_FALLBACK = (hostname) =>
        `https://s2.googleusercontent.com/s2/favicons?domain_url=https://${hostname}&sz=256`;

    // const FAVICON_REQUEST_TIMEOUT = 5000;

    const ADAPTIVE_ICON_CSS = `.shortcutsContainer .shortcuts .shortcutLogoContainer img {
                height: calc(100% / sqrt(2)) !important;
                width: calc(100% / sqrt(2)) !important;
                }`;


    /* ------ Element selectors ------ */

    const shortcuts = document.getElementById("shortcuts-section");
    const aiToolsCont = document.getElementById("aiToolsCont");
    const googleAppsCont = document.getElementById("googleAppsCont");
    const shortcutsCheckbox = document.getElementById("shortcutsCheckbox");
    const proxybypassField = document.getElementById("proxybypassField");
    const proxyinputField = document.getElementById("proxyField");
    const useproxyCheckbox = document.getElementById("useproxyCheckbox");
    const searchsuggestionscheckbox = document.getElementById("searchsuggestionscheckbox");
    const shortcutEditField = document.getElementById("shortcutEditField");
    const adaptiveIconField = document.getElementById("adaptiveIconField");
    const adaptiveIconToggle = document.getElementById("adaptiveIconToggle");
    const bookmarksCheckbox = document.getElementById("bookmarksCheckbox");
    const aiToolsCheckbox = document.getElementById("aiToolsCheckbox");
    const googleAppsCheckbox = document.getElementById("googleAppsCheckbox");
    const todoListCheckbox = document.getElementById("todoListCheckbox");
    const bookmarkGridCheckbox = document.getElementById("bookmarkGridCheckbox");
    const timeformatField = document.getElementById("timeformatField");
    const hourcheckbox = document.getElementById("12hourcheckbox");
    const digitalCheckbox = document.getElementById("digitalCheckbox");
    const fahrenheitCheckbox = document.getElementById("fahrenheitCheckbox");
    const shortcutEditButton = document.getElementById("shortcutEditButton");
    const backButton = document.getElementById("backButton");
    const shortcutSettingsContainer = document.getElementById("shortcutList"); // shortcuts in settings
    const shortcutsContainer = document.getElementById("shortcutsContainer"); // shortcuts in page
    const newShortcutButton = document.getElementById("newShortcutButton");
    const resetShortcutsButton = document.getElementById("resetButton");
    const iconStyle = document.getElementById("iconStyle");

    // const flexMonitor = document.getElementById("flexMonitor"); // monitors whether shortcuts have flex-wrap flexed
    // const defaultHeight = document.getElementById("defaultMonitor").clientHeight; // used to compare to previous element

    /* ------ Helper functions for saving and loading states ------ */

    // Function to save checkbox state to localStorage
    function saveCheckboxState(key, checkbox) {
        localStorage.setItem(key, checkbox.checked ? "checked" : "unchecked");
    }

    // Function to load and apply checkbox state from localStorage
    function loadCheckboxState(key, checkbox) {
        const savedState = localStorage.getItem(key);
        checkbox.checked = savedState === "checked";
        if (key === "bookmarkGridCheckboxState") {
            if (!savedState) {
                bookmarkGridCheckbox.click();
            } else {
                bookmarkGridCheckbox.click();
                bookmarkGridCheckbox.click();
            }
        }
    }

    // Function to save display status to localStorage
    function saveDisplayStatus(key, displayStatus) {
        localStorage.setItem(key, displayStatus);
    }

    // Function to load and apply display status from localStorage
    function loadDisplayStatus(key, element) {
        const savedStatus = localStorage.getItem(key);
        if (savedStatus === "flex") {
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    }

    // Function to save activeness status to localStorage
    function saveActiveStatus(key, activeStatus) {
        localStorage.setItem(key, activeStatus)
    }

    // Function to load and apply activeness status from localStorage
    function loadActiveStatus(key, element) {
        const savedStatus = localStorage.getItem(key);
        if (savedStatus === "active") {
            element.classList.remove("inactive");
        } else {
            element.classList.add("inactive");
        }
    }


    /* ------ Loading shortcuts ------ */

    /**
    * Function to load and apply all shortcut names and URLs from localStorage
    *
    * Iterates through the stored shortcuts and replaces the settings entry for the preset shortcuts with the
    * stored ones.
    * It then calls apply for all the shortcuts, to synchronize the changes settings entries with the actual shortcut
    * container.
    */

    function loadShortcuts() {
        let amount = localStorage.getItem("shortcutAmount");

        const presetAmount = SHORTCUT_PRESET_NAMES.length;

        if (amount === null) { // first time opening
            amount = presetAmount;
            localStorage.setItem("shortcutAmount", amount.toString());
        } else {
            amount = parseInt(amount);
        }

        // If we are not allowed to add more shortcuts.
        if (amount >= MAX_SHORTCUTS_ALLOWED) newShortcutButton.className = "inactive";

        // If we are not allowed to delete anymore, all delete buttons should be deactivated.
        const deleteInactive = amount <= MIN_SHORTCUTS_ALLOWED;

        for (let i = 0; i < amount; i++) {

            const name = localStorage.getItem("shortcutName" + i.toString()) || SHORTCUT_PRESET_NAMES[i];
            const url = localStorage.getItem("shortcutURL" + i.toString()) ||
                [...SHORTCUT_PRESET_URLS_AND_LOGOS.keys()][i];

            const newSettingsEntry = createShortcutSettingsEntry(name, url, deleteInactive, i);

            // Save the index for the future
            newSettingsEntry._index = i;

            shortcutSettingsContainer.appendChild(newSettingsEntry);

            applyShortcut(newSettingsEntry);
        }
    }


    /* ------ Creating shortcut elements ------ */

    /**
    * Function that creates a div to be used in the shortcut edit panel of the settings.
    *
    * @param name The name of the shortcut
    * @param url The URL of the shortcut
    * @param deleteInactive Whether the delete button should be active
    * @param i The index of the shortcut
    * @returns {HTMLDivElement} The div to be used in the settings
    */
    function createShortcutSettingsEntry(name, url, deleteInactive, i) {
        const deleteButtonContainer = document.createElement("div");
        deleteButtonContainer.className = "delete";
        deleteButtonContainer.innerHTML = SHORTCUT_DELETE_BUTTON_HTML;

        const deleteButton = deleteButtonContainer.children[0];
        if (deleteInactive) deleteButton.className = "inactive";
        deleteButton.addEventListener(
            "click",
            (e) => deleteShortcut(e.target.closest(".shortcutSettingsEntry"))
        );

        const shortcutName = document.createElement("input");
        shortcutName.className = "shortcutName";
        shortcutName.placeholder = SHORTCUT_NAME_PLACEHOLDER;
        shortcutName.value = name;
        const shortcutUrl = document.createElement("input");
        shortcutUrl.className = "URL";
        shortcutUrl.placeholder = SHORTCUT_URL_PLACEHOLDER;
        shortcutUrl.value = url;

        attachEventListenersToInputs([shortcutName, shortcutUrl]);

        const textDiv = document.createElement("div");
        textDiv.append(shortcutName, shortcutUrl);

        const entryDiv = document.createElement("div");
        entryDiv.className = "shortcutSettingsEntry";
        entryDiv.append(textDiv, deleteButtonContainer);

        entryDiv._index = i;

        return entryDiv;
    }

    /**
    * This function creates a shortcut to be used for the shortcut container on the main page.
    *
    * @param shortcutName The name of the shortcut
    * @param shortcutUrl The url of the shortcut
    * @param i The index of the shortcut
    */
    function createShortcutElement(shortcutName, shortcutUrl, i) {
        const shortcut = document.createElement("a");
        shortcut.href = shortcutUrl;

        const name = document.createElement("span");
        name.className = "shortcut-name"
        name.textContent = shortcutName;

        let icon = getCustomLogo(shortcutUrl);

        if (!icon) { // if we had to pick the fallback, attempt to get a better image in the background.
            icon = getFallbackFavicon(shortcutUrl);
            // getBestIconUrl(shortcutUrl).then((iconUrl) => icon.src = iconUrl).catch();
        }

        const iconContainer = document.createElement("div");
        iconContainer.className = "shortcutLogoContainer";
        iconContainer.appendChild(icon);

        shortcut.append(iconContainer, name);

        const shortcutContainer = document.createElement("div");
        shortcutContainer.className = "shortcuts";
        shortcutContainer.appendChild(shortcut);
        shortcutContainer._index = i;

        return shortcutContainer;
    }


    /* ------ Attaching event listeners to shortcut settings ------ */

    /**
    * Function to attach all required event listeners to the shortcut edit inputs in the settings.
    *
    * It adds three event listeners to each of the two inputs:
    * 1. Blur, to save changes to the shortcut automatically.
    * 2. Focus, to select all text in the input field when it is selected.
    * 3. Keydown, which moves the focus to the URL field when the user presses 'Enter' in the name field,
    * and removes all focus to save the changes when the user presses 'Enter' in the URL field.
    *
    * @param inputs a list of the two inputs these listeners should be applied to.
    */
    function attachEventListenersToInputs(inputs) {
        inputs.forEach(input => {
            // save and apply when done
            input.addEventListener("blur", (e) => {
                const shortcut = e.target.closest(".shortcutSettingsEntry");
                saveShortcut(shortcut);
                applyShortcut(shortcut);
            });
            // select all content on click:
            input.addEventListener("focus", (e) => e.target.select());
        });
        inputs[0].addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                inputs[1].focus();  // Move focus to the URL
            }
        });
        inputs[1].addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                e.target.blur();  // Blur the input field
            }
        });
    }


    /* ------ Saving and applying changes to shortcuts ------ */

    /**
    * This function stores a shortcut by saving its values in the settings panel to the local storage.
    *
    * @param shortcut The shortcut to be saved
    */
    function saveShortcut(shortcut) {
        const name = shortcut.querySelector("input.shortcutName").value;
        const url = shortcut.querySelector("input.URL").value;

        localStorage.setItem("shortcutName" + shortcut._index, name);
        localStorage.setItem("shortcutURL" + shortcut._index, url);
    }

    /**
    * This function applies a change that has been made in the settings panel to the real shortcut in the container
    *
    * @param shortcut The shortcut to be applied.
    */
    function applyShortcut(shortcut) {
        const shortcutName = shortcut.querySelector("input.shortcutName").value;
        let url = shortcut.querySelector("input.URL").value.trim();

        // URL validation function
        function isValidUrl(url) {
            const pattern = /^(https:\/\/|http:\/\/)?(([a-zA-Z\d-]+\.)+[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3})(\/[^\s]*)?$/i;
            return pattern.test(url);
        }

        // Validate URL before normalizing
        if (!isValidUrl(url)) {
            // alert("Invalid URL. Please enter a valid URL with http or https protocol.");
            url = "https://xengshi.github.io/materialYouNewTab/docs/PageNotFound.html";
        }

        // Normalize URL if valid
        const normalizedUrl = url.startsWith('https://') || url.startsWith('http://') ? url : 'https://' + url;

        const i = shortcut._index;

        const shortcutElement = createShortcutElement(shortcutName, normalizedUrl, i);

        if (i < shortcutsContainer.children.length) {
            shortcutsContainer.replaceChild(shortcutElement, shortcutsContainer.children[i]);
        } else {
            shortcutsContainer.appendChild(shortcutElement);
        }
    }

    /* ------ Adding, deleting, and resetting shortcuts ------ */

    /**
    * This function creates a new shortcut in the settings panel, then saves and applies it.
    */
    function newShortcut() {
        const currentAmount = parseInt(localStorage.getItem("shortcutAmount"));
        const newAmount = currentAmount + 1;

        if (newAmount > MAX_SHORTCUTS_ALLOWED) return;

        // If the delete buttons were deactivated, reactivate them.
        if (currentAmount === MIN_SHORTCUTS_ALLOWED) {
            shortcutSettingsContainer.querySelectorAll(".delete button.inactive")
                .forEach(b => b.classList.remove("inactive"));
        }

        // If we have reached the max, deactivate the add button.
        if (newAmount === MAX_SHORTCUTS_ALLOWED) newShortcutButton.className = "inactive"

        // Save the new amount
        localStorage.setItem("shortcutAmount", newAmount.toString());

        // create placeholder div
        const shortcut = createShortcutSettingsEntry(
            PLACEHOLDER_SHORTCUT_NAME, PLACEHOLDER_SHORTCUT_URL, false, currentAmount
        );

        shortcutSettingsContainer.appendChild(shortcut);

        saveShortcut(shortcut);
        applyShortcut(shortcut);
    }

    /**
    * This function deletes a shortcut and shifts all indices of the following shortcuts back by one.
    *
    * @param shortcut The shortcut to be deleted.
    */
    function deleteShortcut(shortcut) {
        const newAmount = (localStorage.getItem("shortcutAmount") || 0) - 1;
        if (newAmount < MIN_SHORTCUTS_ALLOWED) return;

        const i = shortcut._index;

        // If we had previously deactivated it, reactivate the add button
        newShortcutButton.classList.remove("inactive");

        // Remove the shortcut from the DOM
        shortcut.remove();
        shortcutsContainer.removeChild(shortcutsContainer.children[i]);

        // Update localStorage by shifting all the shortcuts after the deleted one and update the index
        for (let j = i; j < newAmount; j++) {
            const shortcutEntry = shortcutSettingsContainer.children[j];
            shortcutEntry._index--;
            saveShortcut(shortcutEntry);
        }

        // Remove the last shortcut from storage, as it has now moved up
        localStorage.removeItem("shortcutName" + (newAmount));
        localStorage.removeItem("shortcutURL" + (newAmount));

        // Disable delete buttons if minimum number reached
        if (newAmount === MIN_SHORTCUTS_ALLOWED) {
            shortcutSettingsContainer.querySelectorAll(".delete button")
                .forEach(button => button.className = "inactive");
        }

        // Update the shortcutAmount in localStorage
        localStorage.setItem("shortcutAmount", (newAmount).toString());
    }

    /**
    * This function resets shortcuts to their original state, namely the presets.
    *
    * It does this by deleting all shortcut-related data, then reloading the shortcuts.
    */
    function resetShortcuts() {
        for (let i = 0; i < (localStorage.getItem("shortcutAmount") || 0); i++) {
            localStorage.removeItem("shortcutName" + i);
            localStorage.removeItem("shortcutURL" + i);
        }
        shortcutSettingsContainer.innerHTML = "";
        shortcutsContainer.innerHTML = "";
        localStorage.removeItem("shortcutAmount");
        loadShortcuts();
    }


    /* ------ Shortcut favicon handling ------ */

    /**
    * This function verifies whether a URL for a favicon is valid.
    *
    * It does this by creating an image and setting the URL as the src, as fetch would be blocked by CORS.
    *
    * @param urls the array of potential URLs of favicons
    * @returns {Promise<unknown>}
    */
    // function filterFavicon(urls) {
    //     return new Promise((resolve, reject) => {
    //         let found = false;

    //         for (const url of urls) {
    //             const img = new Image();
    //             img.referrerPolicy = "no-referrer"; // Don't send referrer data
    //             img.src = url;

    //             img.onload = () => {
    //                 if (!found) { // Make sure to resolve only once
    //                     found = true;
    //                     resolve(url);
    //                 }
    //             };
    //         }

    //         // If none of the URLs worked after all have been tried
    //         setTimeout(() => {
    //             if (!found) {
    //                 reject();
    //             }
    //         }, FAVICON_REQUEST_TIMEOUT);
    //     });
    // }

    /**
    * This function returns the url to the favicon of a website, given a URL.
    *
    * @param urlString The url of the website for which the favicon is requested
    * @return {Promise<String>} Potentially the favicon url
    */
    // async function getBestIconUrl(urlString) {
    //     const hostname = new URL(urlString).hostname;
    //     try {
    //         // Wait for filterFavicon to resolve with a valid URL
    //         return await filterFavicon(FAVICON_CANDIDATES(hostname));
    //     } catch (error) {
    //         return Promise.reject();
    //     }
    // }

    /**
    * This function uses Google's API to immediately get a favicon,
    * to be used while loading the real one and as a fallback.
    *
    * @param urlString the url of the website for which the favicon is requested
    * @returns {HTMLImageElement} The img element representing the favicon
    */
    function getFallbackFavicon(urlString) {
        const logo = document.createElement("img");
        const hostname = new URL(urlString).hostname;

        if (hostname === "github.com") {
            logo.src = "./shortcuts_icons/github-shortcut.svg";
        } else if (urlString === "https://xengshi.github.io/materialYouNewTab/docs/PageNotFound.html") {
            // Special case for invalid URLs
            logo.src = "./shortcuts_icons/invalid-url.svg";
        } else {
            logo.src = GOOGLE_FAVICON_API_FALLBACK(hostname);

            // Handle image loading error on offline scenario
            logo.onerror = () => {
                logo.src = "./shortcuts_icons/offline.svg";
            };
        }

        return logo;
    }

    /**
    * This function returns the custom logo for the url associated with a preset shortcut.
    *
    * @param url The url of the shortcut.
    * @returns {Element|null} The logo if it was found, otherwise null.
    */
    function getCustomLogo(url) {
        const html = SHORTCUT_PRESET_URLS_AND_LOGOS.get(url.replace("https://", ""));
        if (!html) return null;

        const template = document.createElement("template");
        template.innerHTML = html.trim();
        return template.content.firstElementChild;
    }

    /* ------ Proxy ------ */

    /**
    * This function shows the proxy disclaimer.
    */
    function showProxyDisclaimer() {
        const message = translations[currentLanguage]?.ProxyDisclaimer || translations['en'].ProxyDisclaimer;

        return confirm(message);
    }

    /* ------ Event Listeners ------ */
    const searchIconContainer = document.querySelectorAll('.searchIcon');

    const showEngineContainer = () => {
        searchIconContainer[1].style.display = 'none';
        searchIconContainer[0].style.display = 'block';
        document.getElementById('search-with-container').style.visibility = 'visible';
    }

    const hideEngineContainer = () => {
        searchIconContainer[0].style.display = 'none';
        searchIconContainer[1].style.display = 'block';
        document.getElementById('search-with-container').style.visibility = 'hidden';
    }

    const initShortCutSwitch = (element) => {
        if (element.checked) {
            hideEngineContainer();
            localStorage.setItem('showShortcutSwitch', true)
        } else {
            showEngineContainer();
            localStorage.setItem('showShortcutSwitch', false)
        }
    }

    // ---------- Code for Hiding Search Icon And Search With Options for Search switch shortcut --------
    const element = document.getElementById('shortcut_switchcheckbox');
    element.addEventListener('change', (e) => {
        initShortCutSwitch(e.target);
    })

    // Intialize shortcut switch
    if (localStorage.getItem('showShortcutSwitch')) {
        const isShortCutSwitchEnabled = localStorage.getItem('showShortcutSwitch').toString() == 'true';
        document.getElementById('shortcut_switchcheckbox').checked = isShortCutSwitchEnabled;

        if (isShortCutSwitchEnabled) {
            hideEngineContainer();
        }
        else if (!isShortCutSwitchEnabled) {
            showEngineContainer()
        }
    }
    else {
        localStorage.setItem('showShortcutSwitch', false);
    }

    initShortCutSwitch(element);

    // Add change event listeners for the checkboxes
    shortcutsCheckbox.addEventListener("change", function () {
        saveCheckboxState("shortcutsCheckboxState", shortcutsCheckbox);
        if (shortcutsCheckbox.checked) {
            shortcuts.style.display = "flex";
            saveDisplayStatus("shortcutsDisplayStatus", "flex");
            shortcutEditField.classList.remove("inactive");
            saveActiveStatus("shortcutEditField", "active");
            adaptiveIconField.classList.remove("inactive");
            saveActiveStatus("adaptiveIconField", "active");
        } else {
            shortcuts.style.display = "none";
            saveDisplayStatus("shortcutsDisplayStatus", "none");
            shortcutEditField.classList.add("inactive");
            saveActiveStatus("shortcutEditField", "inactive");
            adaptiveIconField.classList.add("inactive");
            saveActiveStatus("adaptiveIconField", "inactive");
        }
    });

    searchsuggestionscheckbox.addEventListener("change", function () {
        saveCheckboxState("searchsuggestionscheckboxState", searchsuggestionscheckbox);
        if (searchsuggestionscheckbox.checked) {
            proxybypassField.classList.remove("inactive");
            saveActiveStatus("proxybypassField", "active");
        } else {
            proxybypassField.classList.add("inactive");
            saveActiveStatus("proxybypassField", "inactive");
            useproxyCheckbox.checked = false;
            saveCheckboxState("useproxyCheckboxState", useproxyCheckbox);
            proxyinputField.classList.add("inactive");
            saveActiveStatus("proxyinputField", "inactive");
        }
    });

    if (localStorage.getItem("greetingEnabled") === null) {
        localStorage.setItem("greetingEnabled", "true");
    }
    const greetingCheckbox = document.getElementById("greetingcheckbox");
    const greetingField = document.getElementById("greetingField");
    greetingCheckbox.checked = localStorage.getItem("greetingEnabled") === "true";
    greetingCheckbox.disabled = localStorage.getItem("clocktype") !== "digital";

    digitalCheckbox.addEventListener("change", function () {
        saveCheckboxState("digitalCheckboxState", digitalCheckbox);
        if (digitalCheckbox.checked) {
            timeformatField.classList.remove("inactive");
            greetingField.classList.remove("inactive");
            greetingCheckbox.disabled = false; // Enable greeting toggle
            localStorage.setItem("clocktype", "digital");
            clocktype = localStorage.getItem("clocktype");
            displayClock();
            stopClock();
            saveActiveStatus("timeformatField", "active");
            saveActiveStatus("greetingField", "active");
        } else {
            timeformatField.classList.add("inactive");
            greetingField.classList.add("inactive");
            greetingCheckbox.disabled = true; // Disable greeting toggle
            localStorage.setItem("clocktype", "analog");
            clocktype = localStorage.getItem("clocktype");
            stopClock();
            startClock();
            displayClock();
            saveActiveStatus("timeformatField", "inactive");
            saveActiveStatus("greetingField", "inactive");
        }
    });

    hourcheckbox.addEventListener("change", function () {
        saveCheckboxState("hourcheckboxState", hourcheckbox);
        if (hourcheckbox.checked) {
            localStorage.setItem("hourformat", "true");
        } else {
            localStorage.setItem("hourformat", "false");
        }
    });

    greetingCheckbox.addEventListener("change", () => {
        localStorage.setItem("greetingEnabled", greetingCheckbox.checked);
        updatedigiClock();
    });

    useproxyCheckbox.addEventListener("change", function () {
        if (useproxyCheckbox.checked) {
            // Show the disclaimer and check the user's choice
            const userConfirmed = showProxyDisclaimer();
            if (userConfirmed) {
                // Only enable the proxy if the user confirmed
                saveCheckboxState("useproxyCheckboxState", useproxyCheckbox);
                proxyinputField.classList.remove("inactive");
                saveActiveStatus("proxyinputField", "active");
            } else {
                // Revert the checkbox state if the user did not confirm
                useproxyCheckbox.checked = false;
            }
        } else {
            // If the checkbox is unchecked, disable the proxy
            saveCheckboxState("useproxyCheckboxState", useproxyCheckbox);
            proxyinputField.classList.add("inactive");
            saveActiveStatus("proxyinputField", "inactive");
        }
    });

    // Load checkbox state
    loadCheckboxState("adaptiveIconToggle", adaptiveIconToggle);
    // Apply CSS based on initial state
    document.head.appendChild(iconStyle);
    iconStyle.textContent = adaptiveIconToggle.checked ? ADAPTIVE_ICON_CSS : "";

    // Add event listener for checkbox
    adaptiveIconToggle.addEventListener("change", function () {
        saveCheckboxState("adaptiveIconToggle", adaptiveIconToggle);
        if (adaptiveIconToggle.checked) {
            iconStyle.textContent = ADAPTIVE_ICON_CSS;
        } else {
            iconStyle.textContent = "";
        }
    });

    bookmarksCheckbox.addEventListener("change", function () {
        let bookmarksPermission;
        if (isFirefox && browser.permissions && isDesktop) {
            bookmarksPermission = browser.permissions;
        } else if (isChrome || isEdge || isBrave && chrome.permissions && isDesktop) {
            bookmarksPermission = chrome.permissions;
        } else {
            alert(translations[currentLanguage]?.UnsupportedBrowser || translations['en'].UnsupportedBrowser);
            bookmarksCheckbox.checked = false;
            saveCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
            return;
        }
        if (bookmarksPermission !== undefined) {
            if (bookmarksCheckbox.checked) {
                bookmarksPermission.contains({
                    permissions: ['bookmarks']
                }, function (alreadyGranted) {
                    if (alreadyGranted) {
                        bookmarkButton.style.display = "flex";
                        saveDisplayStatus("bookmarksDisplayStatus", "flex");
                        saveCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
                    } else {
                        bookmarksPermission.request({
                            permissions: ['bookmarks']
                        }, function (granted) {
                            if (granted) {
                                bookmarksAPI = chrome.bookmarks;
                                bookmarkButton.style.display = "flex";
                                saveDisplayStatus("bookmarksDisplayStatus", "flex");
                                saveCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
                            } else {
                                bookmarksCheckbox.checked = false;
                                saveCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
                            }
                        });
                    }
                });
            } else {
                bookmarkButton.style.display = "none";
                saveDisplayStatus("bookmarksDisplayStatus", "none");
                saveCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
            }
        }
    });

    aiToolsCheckbox.addEventListener("change", function () {
        saveCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
        if (aiToolsCheckbox.checked) {
            aiToolsCont.style.display = "flex";
            saveDisplayStatus("aiToolsDisplayStatus", "flex");
        } else {
            aiToolsCont.style.display = "none";
            saveDisplayStatus("aiToolsDisplayStatus", "none");
            toggleShortcuts()
        }
    });

    googleAppsCheckbox.addEventListener("change", function () {
        saveCheckboxState("googleAppsCheckboxState", googleAppsCheckbox);
        if (googleAppsCheckbox.checked) {
            googleAppsCont.style.display = "flex";
            saveDisplayStatus("googleAppsDisplayStatus", "flex");
        } else {
            googleAppsCont.style.display = "none";
            saveDisplayStatus("googleAppsDisplayStatus", "none");
        }
    });

    bookmarkGridCheckbox.addEventListener("change", function () {
        saveCheckboxState("bookmarkGridCheckboxState", bookmarkGridCheckbox);
        if (bookmarkGridCheckbox.checked) {
            bookmarkList.classList.add("grid-view");
        } else {
            bookmarkList.classList.remove("grid-view");
        }
    });

    todoListCheckbox.addEventListener("change", function () {
        saveCheckboxState("todoListCheckboxState", todoListCheckbox);
        if (todoListCheckbox.checked) {
            todoListCont.style.display = "flex";
            saveDisplayStatus("todoListDisplayStatus", "flex");
        } else {
            todoListCont.style.display = "none";
            saveDisplayStatus("todoListDisplayStatus", "none");
        }
    });

    fahrenheitCheckbox.addEventListener("change", function () {
        saveCheckboxState("fahrenheitCheckboxState", fahrenheitCheckbox);
    });

    newShortcutButton.addEventListener("click", () => newShortcut());

    resetShortcutsButton.addEventListener("click", () => resetShortcuts());


    /* ------ Page Transitions & Animations ------ */

    // When clicked, open new page by sliding it in from the right.
    shortcutEditButton.onclick = () => {
        setTimeout(() => {
            shortcutEditPage.style.display = "block"
        });
        requestAnimationFrame(() => {
            overviewPage.style.transform = "translateX(-120%)"
            overviewPage.style.opacity = "0"
        });
        setTimeout(() => {
            requestAnimationFrame(() => {
                shortcutEditPage.style.transform = "translateX(0)"
                shortcutEditPage.style.opacity = "1"
            });
        }, 50);
        setTimeout(() => {
            overviewPage.style.display = "none";
        }, 650);
    }

    // Close page by sliding it away to the right.
    backButton.onclick = () => {
        setTimeout(() => {
            overviewPage.style.display = "block"
        });
        requestAnimationFrame(() => {
            shortcutEditPage.style.transform = "translateX(120%)";
            shortcutEditPage.style.opacity = "0";
        });
        setTimeout(() => {
            requestAnimationFrame(() => {
                overviewPage.style.transform = "translateX(0)";
                overviewPage.style.opacity = "1";
            });
        }, 50);
        setTimeout(() => {
            shortcutEditPage.style.display = "none";
        }, 650);
    }

    // Rotate reset button when clicked
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => {
        resetButton.querySelector('svg').classList.toggle('rotateResetButton');
    });

    /* ------ Loading ------ */

    // Load and apply the saved checkbox states and display statuses
    loadCheckboxState("shortcutsCheckboxState", shortcutsCheckbox);
    loadActiveStatus("shortcutEditField", shortcutEditField);
    loadActiveStatus("adaptiveIconField", adaptiveIconField);
    loadCheckboxState("searchsuggestionscheckboxState", searchsuggestionscheckbox);
    loadCheckboxState("useproxyCheckboxState", useproxyCheckbox);
    loadCheckboxState("digitalCheckboxState", digitalCheckbox);
    loadCheckboxState("hourcheckboxState", hourcheckbox);
    loadActiveStatus("proxyinputField", proxyinputField);
    loadActiveStatus("timeformatField", timeformatField);
    loadActiveStatus("greetingField", greetingField);
    loadActiveStatus("proxybypassField", proxybypassField);
    loadCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
    loadCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
    loadCheckboxState("googleAppsCheckboxState", googleAppsCheckbox);
    loadCheckboxState("todoListCheckboxState", todoListCheckbox);
    loadDisplayStatus("shortcutsDisplayStatus", shortcuts);
    loadDisplayStatus("bookmarksDisplayStatus", bookmarkButton);
    loadDisplayStatus("aiToolsDisplayStatus", aiToolsCont);
    loadDisplayStatus("googleAppsDisplayStatus", googleAppsCont);
    loadDisplayStatus("todoListDisplayStatus", todoListCont);
    loadCheckboxState("fahrenheitCheckboxState", fahrenheitCheckbox);
    loadCheckboxState("bookmarkGridCheckboxState", bookmarkGridCheckbox);
    loadShortcuts();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight' && event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
        if (bookmarksCheckbox.checked) {
            bookmarkButton.click();
        } else {
            bookmarksCheckbox.click();
        }
    }
});

document.addEventListener('keydown', function (event) {
    const searchInput = document.getElementById('searchQ');
    const searchBar = document.querySelector('.searchbar');
    if (event.key === '/' && event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
        event.preventDefault();
        searchInput.focus();
        searchBar.classList.add('active');
    }
});
//------------------------- LoadingScreen -----------------------//

function ApplyLoadingColor() {
    let LoadingScreenColor = getComputedStyle(document.body).getPropertyValue("background-color");
    localStorage.setItem('LoadingScreenColor', LoadingScreenColor);
}
