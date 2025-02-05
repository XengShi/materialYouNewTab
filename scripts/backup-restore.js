/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

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
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}${String(date.getMonth() + 1).padStart(2, "0")}${date.getFullYear()}`;
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
        alert(translations[currentLanguage]?.failedbackup || translations["en"].failedbackup + error.message);
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
                alert(translations[currentLanguage]?.invalidBackup || translations["en"].invalidBackup);
                return;
            }

            await restoreData(backup);

            alert(translations[currentLanguage]?.restorecompleted || translations["en"].restorecompleted);
            location.reload();
        } catch (error) {
            alert(translations[currentLanguage]?.restorefailed || translations["en"].restorefailed + error.message);
        }
    };
    reader.readAsText(file);
}

function isValidBackupFile(backup) {
    // Check if localStorage and indexedDB exist and are objects
    return !(typeof backup.localStorage !== "object" || typeof backup.indexedDB !== "object");
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
    const [metadata, data] = base64.split(",");
    const mime = metadata.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
}

// ------------------- Reset Settings ----------------------------
const resetbtn = document.getElementById("resetsettings");

// Clear localStorage and reload the page
resetbtn.addEventListener("click", () => {
    if (confirm(translations[currentLanguage]?.confirmRestore || translations["en"].confirmRestore)) {
        localStorage.clear();
        location.reload();
    }
});
