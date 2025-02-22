/* 
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program. 
 * If not, see <https://www.gnu.org/licenses/>.
 */

// ------------------------ Bookmark System -----------------------------------
// DOM Variables
const bookmarkButton = document.getElementById("bookmarkButton");
const bookmarkSidebar = document.getElementById("bookmarkSidebar");
const bookmarkList = document.getElementById("bookmarkList");
const bookmarkSearch = document.getElementById("bookmarkSearch");
const bookmarkSearchClearButton = document.getElementById("clearSearchButton");
const bookmarkViewGrid = document.getElementById("bookmarkViewGrid");
const bookmarkViewList = document.getElementById("bookmarkViewList");

var bookmarksAPI;
if (isFirefox) {
    bookmarksAPI = browser.bookmarks;
} else if (isChromiumBased) {
    bookmarksAPI = chrome.bookmarks;
}

document.addEventListener("DOMContentLoaded", function () {

    bookmarkButton.addEventListener("click", function () {
        toggleBookmarkSidebar();
        bookmarkSearchClearButton.click();
    });

    bookmarkViewGrid.addEventListener("click", function () {
        if (!bookmarkGridCheckbox.checked) bookmarkGridCheckbox.click();
    });

    bookmarkViewList.addEventListener("click", function () {
        if (bookmarkGridCheckbox.checked) bookmarkGridCheckbox.click();
    });

    document.addEventListener("click", function (event) {
        if (!bookmarkSidebar.contains(event.target) && !bookmarkButton.contains(event.target) && bookmarkSidebar.classList.contains("open")) {
            toggleBookmarkSidebar();
        }
    });

    bookmarkSearch.addEventListener("input", function () {
        const searchTerm = bookmarkSearch.value.toLowerCase();
        const bookmarks = bookmarkList.querySelectorAll("li[data-url], li.folder"); // Include both bookmarks and folders

        Array.from(bookmarks).forEach(function (bookmark) {
            const text = bookmark.textContent.toLowerCase();
            const url = bookmark.dataset.url ? bookmark.dataset.url.toLowerCase() : "";
            const isFolder = bookmark.classList.contains("folder");

            // Show bookmarks if the search term matches either the name or the URL
            if (!isFolder && (text.includes(searchTerm) || url.includes(searchTerm))) {
                bookmark.style.display = ""; // Show matching bookmarks
            } else if (isFolder) {
                // For folders, check if any child bookmarks match the search
                const childBookmarks = bookmark.querySelectorAll("li[data-url]");
                let hasVisibleChild = false;
                Array.from(childBookmarks).forEach(function (childBookmark) {
                    const childText = childBookmark.textContent.toLowerCase();
                    const childUrl = childBookmark.dataset.url ? childBookmark.dataset.url.toLowerCase() : "";
                    if (childText.includes(searchTerm) || childUrl.includes(searchTerm)) {
                        hasVisibleChild = true;
                        childBookmark.style.display = ""; // Show matching child bookmarks
                    } else {
                        childBookmark.style.display = "none"; // Hide non-matching child bookmarks
                    }
                });

                if (hasVisibleChild) {
                    bookmark.style.display = ""; // Show folder if it has matching child bookmarks
                    bookmark.classList.add("open"); // Open folder to show matching child bookmarks
                } else {
                    bookmark.style.display = "none"; // Hide folder if no child matches
                    bookmark.classList.remove("open");
                }
            } else {
                bookmark.style.display = "none"; // Hide non-matching bookmarks
            }
        });

        if (searchTerm === "") {
            // Reset display for all bookmarks and folders
            Array.from(bookmarks).forEach(function (bookmark) {
                bookmark.style.display = "";
                if (bookmark.classList.contains("folder")) {
                    bookmark.classList.remove("open");
                    const childList = bookmark.querySelector("ul");
                    if (childList) {
                        childList.classList.add("hidden");
                    }
                }
            });
        }

        // Show or hide the clear button based on the search term
        bookmarkSearchClearButton.style.display = searchTerm ? "inline" : "none";
    });

    bookmarkSearchClearButton.addEventListener("click", function () {
        bookmarkSearch.value = "";
        bookmarkSearch.dispatchEvent(new Event("input")); // Trigger input event to clear search results
    });

    function toggleBookmarkSidebar() {
        bookmarkSidebar.classList.toggle("open");
        bookmarkButton.classList.toggle("rotate");

        if (bookmarkSidebar.classList.contains("open")) {
            loadBookmarks();
        }
    }

    // Function to load bookmarks
    function loadBookmarks() {
        if (!bookmarksAPI || !bookmarksAPI.getTree) {
            console.error("Bookmarks API is unavailable. Please check permissions or context.");
            return;
        }

        bookmarksAPI.getTree().then(bookmarkTreeNodes => {
            // Clear the current list
            bookmarkList.innerHTML = "";

            // Display the "Recently Added" folder
            if (bookmarksAPI.getRecent) {
                bookmarksAPI.getRecent(8).then(recentBookmarks => {
                    if (recentBookmarks.length > 0) {
                        const recentAddedFolder = {
                            title: "Recently Added",
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
                // Extract the "Main bookmarks" node and display its Children
                const mainBookmarks = bookmarkTreeNodes[0]?.children?.find(node => node.title === default_folder);

                if (mainBookmarks && mainBookmarks.children) {
                    bookmarkList.appendChild(displayBookmarks(mainBookmarks.children));
                }

                // Extract the other "Bookmarks" folders and display them
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
        let list = document.createElement("ul");

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
            if (node.id === "1") {
                continue;
            }
            if (node.children && node.children.length > 0) {
                let folderItem = document.createElement("li");

                // Use the SVG icon from HTML
                const folderIcon = document.getElementById("folderIconTemplate").cloneNode(true);
                folderIcon.removeAttribute("id"); // Remove the id to prevent duplicates
                folderItem.appendChild(folderIcon);

                folderItem.appendChild(document.createTextNode(node.title));
                folderItem.classList.add("folder");

                // Add event listener for unfolding/folding
                folderItem.addEventListener("click", function (event) {
                    event.stopPropagation();
                    folderItem.classList.toggle("open");
                    const subList = folderItem.querySelector("ul");
                    if (subList) {
                        subList.classList.toggle("hidden");
                    }
                });

                let subList = displayBookmarks(node.children);
                subList.classList.add("hidden");
                folderItem.appendChild(subList);

                list.appendChild(folderItem);
            } else if (node.url) {
                let item = document.createElement("li");
                item.dataset.url = node.url; // Add URL as dataset for search functionality
                let link = document.createElement("a");
                link.href = node.url;
                let span = document.createElement("span");
                span.textContent = node.title;

                let favicon = document.createElement("img");
                favicon.src = `https://www.google.com/s2/favicons?domain=${new URL(node.url).hostname}&sz=48`;
                favicon.classList.add("favicon");
                favicon.onerror = () => {
                    favicon.src = "./svgs/shortcuts_icons/offline.svg";
                };

                // Create the delete button
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "✖";
                deleteButton.classList.add("bookmark-delete-button");

                deleteButton.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (confirm(`${(translations[currentLanguage]?.deleteBookmark || translations["en"].deleteBookmark).replace("{title}", node.title || node.url)}`)) {
                        if (isFirefox) {
                            // Firefox API (Promise-based)
                            bookmarksAPI.remove(node.id).then(() => {
                                item.remove(); // Remove the item from the DOM
                            }).catch(err => {
                                console.error("Error removing bookmark:", err);
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
                link.addEventListener("click", function (event) {
                    if (event.ctrlKey || event.metaKey) {
                        // Open in a new tab
                        event.preventDefault();
                        if (isFirefox) {
                            browser.tabs.create({ url: node.url, active: false });
                        } else if (isChromiumBased) {
                            chrome.tabs.create({ url: node.url, active: false });
                        } else {
                            window.open(node.url, "_blank");
                        }
                    } else {
                        // Open in the current tab
                        event.preventDefault();
                        if (isFirefox) {
                            browser.tabs.update({ url: node.url });
                        } else if (isChromiumBased) {
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

        list.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        return list;
    }
});

// ------------------------ End of Bookmark System -----------------------------------

// Save and load the state of the bookmarks toggle
document.addEventListener("DOMContentLoaded", function () {
    const bookmarksCheckbox = document.getElementById("bookmarksCheckbox");
    const bookmarkGridCheckbox = document.getElementById("bookmarkGridCheckbox");

    bookmarksCheckbox.addEventListener("change", function () {
        let bookmarksPermission;
        if (isFirefox) {
            bookmarksPermission = browser.permissions;
        } else if (isChromiumBased) {
            bookmarksPermission = chrome.permissions;
        }
        if (bookmarksPermission !== undefined) {
            if (bookmarksCheckbox.checked) {
                bookmarksPermission.contains({
                    permissions: ["bookmarks"]
                }, function (alreadyGranted) {
                    if (alreadyGranted) {
                        bookmarkButton.style.display = "flex";
                        saveDisplayStatus("bookmarksDisplayStatus", "flex");
                        saveCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
                    } else {
                        bookmarksPermission.request({
                            permissions: ["bookmarks"]
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
        } else {
            alert(translations[currentLanguage]?.UnsupportedBrowser || translations['en'].UnsupportedBrowser);
            bookmarksCheckbox.checked = false;
            saveCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
            return;
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

    loadCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
    loadDisplayStatus("bookmarksDisplayStatus", bookmarkButton);
    loadCheckboxState("bookmarkGridCheckboxState", bookmarkGridCheckbox);
})

// Keyboard shortcut for bookmarks
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" && event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA" && event.target.isContentEditable !== true) {
        if (bookmarksCheckbox.checked) {
            bookmarkButton.click();
        } else {
            bookmarksCheckbox.click();
        }
    }
});
