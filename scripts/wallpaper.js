/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Get the current language from localStorage
const currentLanguage = localStorage.getItem("selectedLanguage") || "en";

// -------------------------- Wallpaper -----------------------------
const dbName = "ImageDB";
const storeName = "backgroundImages";
const timestampKey = "lastUpdateTime"; // Key to store last update time
const imageTypeKey = "imageType"; // Key to store the type of image ("random" or "upload")

// Open IndexedDB database
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore(storeName);
        };
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject("Database error: " + event.target.errorCode);
    });
}

// Save image Blob, timestamp, and type to IndexedDB
async function saveImageToIndexedDB(imageBlob, isRandom) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        store.put(imageBlob, "backgroundImage"); // Save Blob
        store.put(new Date().toISOString(), timestampKey);
        store.put(isRandom ? "random" : "upload", imageTypeKey);

        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject("Transaction error: " + event.target.errorCode);
    });
}

// Load image Blob, timestamp, and type from IndexedDB
async function loadImageAndDetails() {
    const db = await openDatabase();
    return Promise.all([
        getFromStore(db, "backgroundImage"),
        getFromStore(db, timestampKey),
        getFromStore(db, imageTypeKey)
    ]);
}

function getFromStore(db, key) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject("Request error: " + event.target.errorCode);
    });
}

// Clear image data from IndexedDB
async function clearImageFromIndexedDB() {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        store.delete("backgroundImage");
        store.delete(timestampKey);
        store.delete(imageTypeKey);

        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject("Delete error: " + event.target.errorCode);
    });
}

// Handle file input and save image as upload
document.getElementById("imageUpload").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file); // Create temporary Blob URL
        const image = new Image();

        image.onload = function () {
            document.body.style.setProperty("--bg-image", `url(${imageUrl})`);
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
const RANDOM_IMAGE_URL = "https://picsum.photos/1920/1080";

async function applyRandomImage(showConfirmation = true) {
    if (showConfirmation && !confirm(translations[currentLanguage]?.confirmWallpaper || translations["en"].confirmWallpaper)) {
        return;
    }
    try {
        const response = await fetch(RANDOM_IMAGE_URL);
        const blob = await response.blob(); // Get Blob from response
        const imageUrl = URL.createObjectURL(blob);

        document.body.style.setProperty("--bg-image", `url(${imageUrl})`);
        await saveImageToIndexedDB(blob, true);
        updateTextBackground(true);
        setTimeout(() => URL.revokeObjectURL(imageUrl), 1500); // Delay URL revocation
    } catch (error) {
        console.error("Error fetching random image:", error);
    }
}

// Function to update solid background behind userText, date, greeting and shortcut names
function updateTextBackground(hasWallpaper) {
    const userText = document.getElementById("userText");
    const date = document.getElementById("date");
    const shortcuts = document.querySelectorAll(".shortcuts .shortcut-name");

    if (hasWallpaper) {
        document.body.setAttribute('data-bg','wallpaper')
    } else {
        document.body.setAttribute('data-bg','color')
    }

    // Update styles for userText and date
    [userText, date].forEach(element => {
        if (hasWallpaper) {
            element.style.backgroundColor = "var(--accentLightTint-blue)";
            element.style.padding = "2px 12px";
            element.style.width = "fit-content";
            element.style.borderRadius = "10px";
            element.style.fontSize = "1.32rem";
        } else {
            element.style.backgroundColor = ""; // Reset to default
            element.style.padding = "";
            element.style.width = "";
            element.style.borderRadius = "";
            element.style.fontSize = "";
        }
    });

    // Update styles for shortcuts
    shortcuts.forEach(shortcut => {
        shortcut.style.backgroundColor = hasWallpaper ? "var(--accentLightTint-blue)" : "";
        shortcut.style.padding = hasWallpaper ? "0px 6px" : "";
        shortcut.style.borderRadius = hasWallpaper ? "5px" : "";
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

            if (imageType === "upload") {
                document.body.style.setProperty("--bg-image", `url(${imageUrl})`);
                updateTextBackground(true);
                return;
            }

            if (lastUpdate.toDateString() !== now.toDateString()) {
                // Refresh random image if a new day
                applyRandomImage(false);
            } else {
                // Reapply the saved random image
                document.body.style.setProperty("--bg-image", `url(${imageUrl})`);
                updateTextBackground(true);
            }

            // Clean up the Blob URL after setting the background
            setTimeout(() => URL.revokeObjectURL(imageUrl), 1500);
        })
        .catch((error) => {
            console.error("Error loading image details:", error);
            updateTextBackground(false);
        });
}

// Event listeners for buttons
document.getElementById("uploadTrigger").addEventListener("click", () => document.getElementById("imageUpload").click());
document.getElementById("clearImage").addEventListener("click", function () {
    loadImageAndDetails()
        .then(([blob]) => {
            if (!blob) {
                alert(translations[currentLanguage]?.Nobackgroundset || translations["en"].Nobackgroundset);
                return;
            }
            const confirmationMessage = translations[currentLanguage]?.clearbackgroundimage || translations["en"].clearbackgroundimage;
            if (confirm(confirmationMessage)) {
                clearImageFromIndexedDB()
                    .then(() => {
                        document.body.style.removeProperty("--bg-image");
                        updateTextBackground(false);
                    })
                    .catch((error) => console.error(error));
            }
        })
        .catch((error) => console.error(error));
});
document.getElementById("randomImageTrigger").addEventListener("click", applyRandomImage);

// Start image check on page load
checkAndUpdateImage();
// ------------------------ End of BG Image --------------------------