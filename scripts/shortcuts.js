/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

document.addEventListener("DOMContentLoaded", function () {
    // Maximum number of shortcuts allowed
    const MAX_SHORTCUTS_ALLOWED = 50;

    // Minimum number of  shorcutDarkColor allowed
    const MIN_SHORTCUTS_ALLOWED = 1;

    // The new shortcut placeholder info
    const PLACEHOLDER_SHORTCUT_NAME = "New shortcut";
    const PLACEHOLDER_SHORTCUT_URL = "https://github.com/XengShi/materialYouNewTab";

    // The placeholder for an empty shortcut
    const SHORTCUT_NAME_PLACEHOLDER = "Shortcut Name";
    const SHORTCUT_URL_PLACEHOLDER = "Shortcut URL";

    const SHORTCUT_PRESET_NAMES = ["Youtube", "Gmail", "Telegram", "WhatsApp", "Twitter", "Discord"];
    const SHORTCUT_PRESET_URLS_AND_LOGOS = new Map([["youtube.com", `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" class="accentColor shorcutDarkColor"/>
                <g style="transform: scale(0.6); transform-origin: center;">
                <path class="bgLightTint" id="darkLightTint" fill-rule="evenodd"
                    d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z" />
                </g>
            </svg>
            `], ["mail.google.com", `
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
            `], ["x.com", `
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path class="accentColor shorcutDarkColor"
                    d="M10 0C15.5286 0 20 4.47143 20 10C20 15.5286 15.5286 20 10 20C4.47143 20 0 15.5286 0 10C0 4.47143 4.47143 0 10 0ZM8.17143 15.2714C12.6 15.2714 15.0286 11.6 15.0286 8.41429V8.1C15.5 7.75714 15.9143 7.32857 16.2286 6.84286C15.8 7.02857 15.3286 7.15714 14.8429 7.22857C15.3429 6.92857 15.7286 6.45714 15.9 5.9C15.4286 6.17143 14.9143 6.37143 14.3714 6.48571C13.9286 6.01429 13.3 5.72857 12.6143 5.72857C11.2857 5.72857 10.2 6.81429 10.2 8.14286C10.2 8.32857 10.2143 8.51429 10.2714 8.68571C8.27143 8.58571 6.48571 7.62857 5.3 6.17143C5.1 6.52857 4.97143 6.94286 4.97143 7.38571C4.97143 8.21429 5.4 8.95714 6.04286 9.38571C5.64286 9.38571 5.27143 9.27143 4.95714 9.08571V9.11429C4.95714 10.2857 5.78571 11.2571 6.88571 11.4857C6.68571 11.5429 6.47143 11.5714 6.25714 11.5714C6.1 11.5714 5.95714 11.5571 5.8 11.5286C6.1 12.4857 7 13.1857 8.04286 13.2C7.21429 13.8429 6.17143 14.2286 5.04286 14.2286C4.84286 14.2286 4.65714 14.2286 4.47143 14.2C5.52857 14.8857 6.8 15.2857 8.15714 15.2857"
                    fill="#617859"/>
            </svg>
            `], ["discord.com/app", `
            <svg fill="none" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" class="accentColor shorcutDarkColor"/>
                <g style="transform: scale(0.75); transform-origin: center;">
                <path class="bgLightTint" id="darkLightTint"
                    d="M19.303 5.337A17.3 17.3 0 0 0 14.963 4c-.191.329-.403.775-.552 1.125a16.6 16.6 0 0 0-4.808 0C9.454 4.775 9.23 4.329 9.05 4a17 17 0 0 0-4.342 1.337C1.961 9.391 1.218 13.35 1.59 17.255a17.7 17.7 0 0 0 5.318 2.664a13 13 0 0 0 1.136-1.836c-.627-.234-1.22-.52-1.794-.86c.149-.106.297-.223.435-.34c3.46 1.582 7.207 1.582 10.624 0c.149.117.287.234.435.34c-.573.34-1.167.626-1.793.86a13 13 0 0 0 1.135 1.836a17.6 17.6 0 0 0 5.318-2.664c.457-4.52-.722-8.448-3.1-11.918M8.52 14.846c-1.04 0-1.889-.945-1.889-2.101s.828-2.102 1.89-2.102c1.05 0 1.91.945 1.888 2.102c0 1.156-.838 2.1-1.889 2.1m6.974 0c-1.04 0-1.89-.945-1.89-2.101s.828-2.102 1.89-2.102c1.05 0 1.91.945 1.889 2.102c0 1.156-.828 2.1-1.89 2.1" />
                </g>
            </svg>
            `]]);

    const SHORTCUT_DELETE_BUTTON_HTML = `
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-12q-15.3 0-25.65-10.29Q192-716.58 192-731.79t10.35-25.71Q212.7-768 228-768h156v-12q0-15.3 10.35-25.65Q404.7-816 420-816h120q15.3 0 25.65 10.35Q576-795.3 576-780v12h156q15.3 0 25.65 10.29Q768-747.42 768-732.21t-10.35 25.71Q747.3-696 732-696h-12v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM419.79-288q15.21 0 25.71-10.35T456-324v-264q0-15.3-10.29-25.65Q435.42-624 420.21-624t-25.71 10.35Q384-603.3 384-588v264q0 15.3 10.29 25.65Q404.58-288 419.79-288Zm120 0q15.21 0 25.71-10.35T576-324v-264q0-15.3-10.29-25.65Q555.42-624 540.21-624t-25.71 10.35Q504-603.3 504-588v264q0 15.3 10.29 25.65Q524.58-288 539.79-288ZM312-696v480-480Z"/>
                </svg>
            </button>
            `;

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
                filter: grayscale(1);
                mix-blend-mode: screen;
                }`;

    /* ------ Element selectors ------ */

    const shortcuts = document.getElementById("shortcuts-section");
    const shortcutsCheckbox = document.getElementById("shortcutsCheckbox");
    const shortcutEditField = document.getElementById("shortcutEditField");
    const adaptiveIconField = document.getElementById("adaptiveIconField");
    const adaptiveIconToggle = document.getElementById("adaptiveIconToggle");
    const shortcutSettingsContainer = document.getElementById("shortcutList"); // shortcuts in settings
    const shortcutsContainer = document.getElementById("shortcutsContainer"); // shortcuts in page
    const newShortcutButton = document.getElementById("newShortcutButton");
    const resetShortcutsButton = document.getElementById("resetButton");
    const iconStyle = document.getElementById("iconStyle");

    // const flexMonitor = document.getElementById("flexMonitor"); // monitors whether shortcuts have flex-wrap flexed
    // const defaultHeight = document.getElementById("defaultMonitor").clientHeight; // used to compare to previous element

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
     * 3. Keydown, which moves the focus to the URL field when the user presses "Enter" in the name field,
     * and removes all focus to save the changes when the user presses "Enter" in the URL field.
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
            if (e.key === "Enter") {
                inputs[1].focus();  // Move focus to the URL
            }
        });
        inputs[1].addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
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

        // Normalize and encode URL
        const normalizedUrl = encodeURI(
            url.startsWith('https://') || url.startsWith('http://') ? url : 'https://' + url
        );

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
            logo.src = "./svgs/shortcuts_icons/github-shortcut.svg";
        } else {
            logo.src = GOOGLE_FAVICON_API_FALLBACK(hostname);

            // Handle image loading error on offline scenario
            logo.onerror = () => {
                logo.src = "./svgs/shortcuts_icons/offline.svg";
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
        const logoHtml = SHORTCUT_PRESET_URLS_AND_LOGOS.get(url.replace("https://", ""));
        if (!logoHtml) return null;

        const template = document.createElement("template");
        template.innerHTML = logoHtml.trim();
        return template.content.firstElementChild;
    }

    /* ------ Event Listeners ------ */
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

    let focusTimeoutId;
    newShortcutButton.addEventListener("click", () => {
        newShortcut();

        // Scroll to the new shortcut and focus on the URL input
        const allEntries = document.querySelectorAll('.shortcutSettingsEntry');
        const lastEntry = allEntries[allEntries.length - 1];
        const urlInput = lastEntry.querySelector('input.URL');

        urlInput.scrollIntoView({ behavior: "smooth", block: "center" });

        clearTimeout(focusTimeoutId);
        focusTimeoutId = setTimeout(() => {
            urlInput.focus();
        }, 800);
    });

    resetShortcutsButton.addEventListener("click", () => {
        resetShortcuts();

        // If newShortcutButton was previously inactive, reactivate it
        if (newShortcutButton.classList.contains("inactive")) {
            newShortcutButton.classList.remove("inactive");
        }

        // Animate the reset button
        const svgElement = resetShortcutsButton.querySelector("svg");
        svgElement.classList.toggle("rotateResetButton");
        setTimeout(() => {
            svgElement.classList.remove("rotateResetButton");
        }, 300);
    });

    // Load and apply the saved checkbox states and display statuses
    loadCheckboxState("shortcutsCheckboxState", shortcutsCheckbox);
    loadActiveStatus("shortcutEditField", shortcutEditField);
    loadActiveStatus("adaptiveIconField", adaptiveIconField);
    loadDisplayStatus("shortcutsDisplayStatus", shortcuts);
    loadShortcuts();
});