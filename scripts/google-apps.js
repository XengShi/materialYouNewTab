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
    
    // Replace Chrome Web Store with Firefox Add-ons in Firefox
    if (isFirefox) {
        const chromeWebStoreLink = document.querySelector('a[href="https://chromewebstore.google.com/"]');
        if (chromeWebStoreLink) {
            // Update the href to Firefox Add-ons
            chromeWebStoreLink.href = "https://addons.mozilla.org/en-US/firefox/";
            
            // Update the icon
            const menuIcon = chromeWebStoreLink.querySelector('.menuicon svg');
            if (menuIcon) {
                menuIcon.innerHTML = '<path fill="currentColor" d="M21.634 11.138a2.16 2.16 0 0 1-.343 1.282c-.57.982-1.759 1.838-3.318 1.838-1.563 0-3.347-.857-4.858-2.37-1.425-1.424-2.292-2.84-2.292-4.392 0-1.521.867-2.764 2.345-3.322.254-.096.52-.144.79-.144.466 0 .945.14 1.397.42-1.717.124-2.92 1.568-2.92 3.322 0 1.552.867 2.97 2.292 4.392.656.657 1.427 1.227 2.208 1.68.783.454 1.575.69 2.292.69.717 0 1.322-.236 1.762-.69.254-.264.466-.567.645-.908zm-1.426-5.879c.254.264.466.567.645.908.18.34.28.7.343 1.05a2.16 2.16 0 0 1-.343 1.282c-.57.982-1.759 1.838-3.318 1.838-1.563 0-3.347-.857-4.858-2.37-1.425-1.424-2.292-2.84-2.292-4.392 0-1.521.867-2.764 2.345-3.322.254-.096.52-.144.79-.144.466 0 .945.14 1.397.42-1.717.124-2.92 1.568-2.92 3.322 0 1.552.867 2.97 2.292 4.392.656.657 1.427 1.227 2.208 1.68.783.454 1.575.69 2.292.69.717 0 1.322-.236 1.762-.69.254-.264.466-.567.645-.908.18-.34.28-.7.343-1.05a2.16 2.16 0 0 1-.343-1.282c.063-.35.164-.71.343-1.05.18-.34.391-.644.645-.908.254-.264.53-.49.825-.675.296-.185.6-.33.913-.435-.313-.105-.617-.25-.913-.435a5.73 5.73 0 0 1-.825-.675 5.73 5.73 0 0 1-.645-.908 4.5 4.5 0 0 1-.343-1.05c.063-.35.164-.71.343-1.05.18-.34.391-.644.645-.908-1.717.124-2.92 1.568-2.92 3.322 0 1.552.867 2.97 2.292 4.392.656.657 1.427 1.227 2.208 1.68.783.454 1.575.69 2.292.69.717 0 1.322-.236 1.762-.69z"/>';
            }
            
            // Update the labels
            const shortLabel = chromeWebStoreLink.querySelector('.label.short.one');
            const fullLabel = chromeWebStoreLink.querySelector('.label.full');
            
            if (shortLabel) {
                shortLabel.textContent = "Firefox ...";
            }
            
            if (fullLabel) {
                fullLabel.innerHTML = "Firefox<br>Add-ons";
            }
        }
    }

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