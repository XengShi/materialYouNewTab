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
    if (isFirefoxAll) {
        const chromeWebStoreLink = document.getElementById("chromeWebstoreLink");
        // Update the href to Firefox Add-ons
        chromeWebStoreLink.href = "https://addons.mozilla.org/en-US/firefox/";

        // Update the icon
        const menuIcon = chromeWebStoreLink.querySelector('.menuicon svg path');
        menuIcon.setAttribute("d", "M14.906 1.149c-1.865 1.293-3.077 3.465-3.275 5.717a4.58 4.58 0 0 1 3.874 1.423c.298.313 1.763 1.68.58.969c-.428-.264-1.907-.462-1.77-.184c2.481 1.311 2.858 5.05.913 6.984c-1.923 1.97-5.52 1.676-7.169-.507c-.492-.694-1.104-1.641-.79-2.502c.704-1.28 2.272-1.545 3.596-1.609c.545-.3 1.78-1.285.512-1.499c-1.014-.45-1.933-1.078-2.684-1.896c-.954-.543-.194-2.49-.532-2.79c-.96.323-1.837 1.538-2.508 1.791c-.589-.66-.043-2.24-.471-2.495c-2.456 1.626-3.848 4.54-3.954 7.444c-.007-.42.237-1.711.044-.633c-.44 3.838 1.493 7.805 4.705 9.93c3.627 2.513 8.803 2.43 12.342-.21c3.097-2.193 4.885-6.117 4.389-9.897c-.249-2.101-1.036-4.364-2.88-5.576c.53 1.035.877 2.156 1.096 3.295c-.866-2.9-3.901-5.144-5.076-7.18c-.3-.434-.324-1.28-.942-.575m.356.068c.446 1.833 4.066 4.606 5.286 7.46c.53 1.302.188 2.67-.387 3.897c-.366.773-1.346 2.119-1.76 2.228c.528-1.837.006-4.063-1.39-5.243c-.365-1.087-1.606-1.816-2.258-2.932a5.02 5.02 0 0 1 .509-5.41");

        // Update the labels
        const shortLabel = chromeWebStoreLink.querySelector('.label.short.one');
        const fullLabel = chromeWebStoreLink.querySelector('.label.full');

        shortLabel.textContent = "Firefox ...";
        fullLabel.innerHTML = "Firefox<br>Add-ons";
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