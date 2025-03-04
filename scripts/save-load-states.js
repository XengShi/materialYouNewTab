/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

/* ------ Helper functions for saving and loading states ------ */

// Function to save checkbox state to localStorage
function saveCheckboxState(key, checkbox) {
    localStorage.setItem(key, checkbox.checked ? "checked" : "unchecked");
}

const bookmarkGridCheckbox = document.getElementById("bookmarkGridCheckbox");
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
    localStorage.setItem(key, activeStatus);
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
