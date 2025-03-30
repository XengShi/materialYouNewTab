/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// ------------------------Google App Menu-----------------------------------
const iconContainer = document.getElementById("iconContainer");
const googleAppsCont = document.getElementById("googleAppsCont");

// Toggle menu and tooltip visibility
googleAppsCont.addEventListener("click", function (event) {
    const isMenuVisible = iconContainer.style.display === "grid";

    // Toggle menu visibility
    iconContainer.style.display = isMenuVisible ? "none" : "grid";

    // Add or remove the class to hide the tooltip
    if (!isMenuVisible) {
        googleAppsCont.classList.add("menu-open"); // Hide tooltip
    } else {
        googleAppsCont.classList.remove("menu-open"); // Restore tooltip
    }

    event.stopPropagation();
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const isClickInside =
        iconContainer.contains(event.target) || googleAppsCont.contains(event.target);

    if (!isClickInside && iconContainer.style.display === "grid") {
        iconContainer.style.display = "none"; // Hide menu
        googleAppsCont.classList.remove("menu-open"); // Restore tooltip
    }
});
// ------------------------End of Google App Menu Setup-----------------------------------

// Save and load toggle state
document.addEventListener("DOMContentLoaded", function () {
    const googleAppsCont = document.getElementById("googleAppsCont");
    const googleAppsCheckbox = document.getElementById("googleAppsCheckbox");

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
    loadCheckboxState("googleAppsCheckboxState", googleAppsCheckbox);
    loadDisplayStatus("googleAppsDisplayStatus", googleAppsCont);
});