/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 */

document.addEventListener("DOMContentLoaded", function () {
    // Constants
    const MAX_SHORTCUTS = 50;
    const PLACEHOLDER = {
        name: "New shortcut",
        url: "https://github.com/XengShi/materialYouNewTab",
        inputName: "Shortcut Name",
        inputUrl: "Shortcut URL"
    };

    // DOM Elements
    const dom = {
        shortcuts: document.getElementById("shortcuts-section"),
        shortcutsCheckbox: document.getElementById("shortcutsCheckbox"),
        shortcutEditField: document.getElementById("shortcutEditField"),
        adaptiveIconField: document.getElementById("adaptiveIconField"),
        adaptiveIconToggle: document.getElementById("adaptiveIconToggle"),
        shortcutSettingsContainer: document.getElementById("shortcutList"),
        shortcutsContainer: document.getElementById("shortcutsContainer"),
        newShortcutButton: document.getElementById("newShortcutButton"),
        resetShortcutsButton: document.getElementById("resetButton"),
    };

    // Preset Data
    const presets = [
        {
            name: "Youtube",
            url: "youtube.com",
            domains: ["youtube.com", "m.youtube.com", "youtu.be"],
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" class="accentColor shorcutDarkColor"/><g style="transform: scale(0.6); transform-origin: center;"><path class="bgLightTint" id="darkLightTint" fill-rule="evenodd"
                    d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z"/></g></svg>`
        },
        {
            name: "Gmail",
            url: "mail.google.com",
            domains: ["gmail.com", "mail.google.com"],
            svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" class="accentColor shorcutDarkColor"/><g style="transform: scale(0.58); transform-origin: center;"><path class="bgLightTint" id="darkLightTint" 
                    d="m8.606 13.6 3.396 2.323 3.274-2.259 7.338 7.24q-.29.095-.614.096H2c-.264 0-.516-.052-.747-.144zM24 7.652V19a2 2 0 0 1-.18.83l-7.193-7.097zM0 7.715l7.25 4.958-7.123 7.03A2.04 2.04 0 0 1 0 19ZM22 3a2 2 0 0 1 2 2v.704l-12.002 8.274L0 5.772V5a2 2 0 0 1 2-2Z"/></g></svg>`
        },
        {
            name: "Telegram",
            url: "web.telegram.org",
            domains: ["telegram.org", "t.me", "web.telegram.org"],
            svg: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path class="accentColor shorcutDarkColor"
                    d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38Z"/></svg>`
        },
        {
            name: "WhatsApp",
            url: "web.whatsapp.com",
            domains: ["whatsapp.com", "web.whatsapp.com", "api.whatsapp.com"],
            svg: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path class="accentColor shorcutDarkColor"
                    d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.953 9.953 0 0 1-5.03-1.355L.004 20l1.352-4.968A9.953 9.953 0 0 1 0 10C0 4.477 4.477 0 10 0ZM6.592 5.3l-.2.008a.961.961 0 0 0-.372.1 1.293 1.293 0 0 0-.294.228c-.12.113-.188.211-.261.306a2.73 2.73 0 0 0-.566 1.678c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.97 2.742.214.213.424.427.65.626a9.448 9.448 0 0 0 3.84 2.046l.568.087c.185.01.37-.004.556-.013a1.99 1.99 0 0 0 .833-.231c.131-.067.259-.14.383-.22 0 0 .043-.028.125-.09.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.402-.621a.497.497 0 0 0-.176-.041.482.482 0 0 0-.378.127c-.005-.002-.072.055-.795.931a.35.35 0 0 1-.368.13 1.432 1.432 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.108a6.028 6.028 0 0 1-1.575-1.003c-.126-.11-.243-.23-.363-.346a6.298 6.298 0 0 1-1.02-1.268l-.059-.095a.923.923 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41c.11-.14.203-.276.263-.373.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249a4.439 4.439 0 0 0-.162-.016 3.385 3.385 0 0 0-.403.004l.201-.008.001.001Z"/></svg>`
        },
        {
            name: "Twitter",
            url: "x.com",
            domains: ["twitter.com", "x.com"],
            svg: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path class="accentColor shorcutDarkColor"
                    d="M10 0c5.529 0 10 4.471 10 10s-4.471 10-10 10S0 15.529 0 10 4.471 0 10 0ZM8.171 15.271c4.429 0 6.858-3.671 6.858-6.857V8.1a4.783 4.783 0 0 0 1.2-1.257c-.429.186-.9.314-1.386.386.5-.3.886-.772 1.057-1.329a5.215 5.215 0 0 1-1.529.586 2.405 2.405 0 0 0-1.757-.757A2.42 2.42 0 0 0 10.2 8.143c0 .186.014.371.071.543-2-.1-3.785-1.057-4.971-2.515-.2.358-.329.772-.329 1.215 0 .828.429 1.571 1.072 2-.4 0-.772-.115-1.086-.3v.028c0 1.172.829 2.143 1.929 2.372a2.3 2.3 0 0 1-.629.085c-.157 0-.3-.014-.457-.042.3.957 1.2 1.657 2.243 1.671a4.883 4.883 0 0 1-3 1.029c-.2 0-.386 0-.572-.029a6.765 6.765 0 0 0 3.686 1.086"/></svg>`
        },
        {
            name: "Discord",
            url: "discord.com/app",
            domains: ["discord.com", "discord.gg", "discordapp.com"],
            svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" class="accentColor shorcutDarkColor"/><g style="transform: scale(0.75); transform-origin: center;"><path class="bgLightTint" id="darkLightTint"
                    d="M19.303 5.337A17.3 17.3 0 0 0 14.963 4c-.191.329-.403.775-.552 1.125a16.6 16.6 0 0 0-4.808 0C9.454 4.775 9.23 4.329 9.05 4a17 17 0 0 0-4.342 1.337C1.961 9.391 1.218 13.35 1.59 17.255a17.7 17.7 0 0 0 5.318 2.664 13 13 0 0 0 1.136-1.836c-.627-.234-1.22-.52-1.794-.86.149-.106.297-.223.435-.34 3.46 1.582 7.207 1.582 10.624 0 .149.117.287.234.435.34-.573.34-1.167.626-1.793.86a13 13 0 0 0 1.135 1.836 17.6 17.6 0 0 0 5.318-2.664c.457-4.52-.722-8.448-3.1-11.918M8.52 14.846c-1.04 0-1.889-.945-1.889-2.101s.828-2.102 1.89-2.102c1.05 0 1.91.945 1.888 2.102 0 1.156-.838 2.1-1.889 2.1m6.974 0c-1.04 0-1.89-.945-1.89-2.101s.828-2.102 1.89-2.102c1.05 0 1.91.945 1.889 2.102 0 1.156-.828 2.1-1.89 2.1"/></g></svg>`
        }
    ];

    // Cache for shortcuts data
    let shortcutsCache = [];

    // Initialization
    loadSettings();
    setupEventListeners();
    loadShortcuts();

    // Loads all settings from localStorage and applies them
    function loadSettings() {
        loadCheckboxState("shortcutsCheckboxState", dom.shortcutsCheckbox);
        loadCheckboxState("adaptiveIconToggle", dom.adaptiveIconToggle);
        loadActiveStatus("shortcutEditField", dom.shortcutEditField);
        loadActiveStatus("adaptiveIconField", dom.adaptiveIconField);
        loadDisplayStatus("shortcutsDisplayStatus", dom.shortcuts);

        // Apply adaptive icon style if enabled
        if (dom.adaptiveIconToggle.checked) {
            dom.shortcutsContainer.classList.add("adaptive-icons");
        } else {
            dom.shortcutsContainer.classList.remove("adaptive-icons");
        }
    }

    // Sets up all event listeners
    function setupEventListeners() {
        // Checkbox events
        dom.shortcutsCheckbox.addEventListener("change", handleShortcutsToggle);
        dom.adaptiveIconToggle.addEventListener("change", handleAdaptiveIconToggle);

        // Button events
        dom.newShortcutButton.addEventListener("click", handleNewShortcutClick);
        dom.resetShortcutsButton.addEventListener("click", resetShortcuts);
    }

    // Handles the new shortcut button click with animation and focus
    let focusTimeoutId;
    function handleNewShortcutClick() {
        if (this.classList.contains("inactive")) return;

        const currentAmount = parseInt(localStorage.getItem("shortcutAmount")) || shortcutsCache.length;
        if (currentAmount >= MAX_SHORTCUTS) return;

        addNewShortcut();

        // Scroll to the new shortcut and focus on the URL input
        const allEntries = document.querySelectorAll(".shortcutSettingsEntry");
        const lastEntry = allEntries[allEntries.length - 1];
        const urlInput = lastEntry.querySelector("input.URL");

        urlInput.scrollIntoView({ behavior: "smooth", block: "center" });

        clearTimeout(focusTimeoutId);
        const modalContainer = document.getElementById("prompt-modal-container");
        focusTimeoutId = setTimeout(() => {
            if (modalContainer?.style.display !== "flex")
                urlInput.focus();
        }, 800);
    }

    // Loads shortcuts from localStorage or uses presets if none exist
    function loadShortcuts() {
        const amount = localStorage.getItem("shortcutAmount") || presets.length;
        const deleteInactive = amount <= 1;

        shortcutsCache = [];

        for (let i = 0; i < amount; i++) {
            const name = localStorage.getItem(`shortcutName${i}`) || (presets[i] ? presets[i].name : PLACEHOLDER.name);
            const url = localStorage.getItem(`shortcutURL${i}`) || (presets[i] ? presets[i].url : PLACEHOLDER.url);

            shortcutsCache.push({ name, url });

            const entry = createShortcutEntry(name, url, deleteInactive, i);
            dom.shortcutSettingsContainer.appendChild(entry);
            renderShortcut(name, url, i);
        }

        // Disable new shortcut button if max reached
        if (amount >= MAX_SHORTCUTS) {
            dom.newShortcutButton.classList.add("inactive");
        }

        setupDragAndDrop();
    }

    // Creates a shortcut entry element for the settings panel
    function createShortcutEntry(name, url, deleteInactive, index) {
        const entry = document.createElement("div");
        entry.className = "shortcutSettingsEntry";
        entry.draggable = true;
        entry._index = index;

        entry.innerHTML = `
            <div class="grip-container" draggable="true">
                <svg stroke="currentColor" width="18" height="18" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                    <circle cy="2.5" cx="5.5" r=".75"/>
                    <circle cy="8" cx="5.5" r=".75"/>
                    <circle cy="13.5" cx="5.5" r=".75"/>
                    <circle cy="2.5" cx="10.5" r=".75"/>
                    <circle cy="8" cx="10.5" r=".75"/>
                    <circle cy="13.5" cx="10.5" r=".75"/>
                </svg>
            </div>
            <div>
                <input class="shortcutName" placeholder="${PLACEHOLDER.inputName}" value="${escapeHtml(name)}">
                <input class="URL" placeholder="${PLACEHOLDER.inputUrl}" value="${escapeHtml(url)}">
            </div>
            <div class="delete">
                <button class="${deleteInactive ? 'inactive' : ''}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M7.8 20.4q-.742 0-1.271-.529Q6 19.343 6 18.6v-12h-.3q-.383 0-.641-.257-.259-.258-.259-.638t.259-.643Q5.317 4.8 5.7 4.8h3.9v-.3q0-.383.259-.641.258-.259.641-.259h3q.383 0 .641.259.259.258.259.641v.3h3.9q.383 0 .641.257.259.257.259.638 0 .38-.259.643-.258.262-.641.262H18v11.99q0 .76-.529 1.285-.529.525-1.271.525Zm8.4-13.8H7.8v12h8.4zm-5.705 10.2q.38 0 .643-.259.262-.259.262-.641V9.3q0-.383-.257-.641-.258-.259-.638-.259t-.643.259Q9.6 8.917 9.6 9.3v6.6q0 .383.257.641.258.259.638.259Zm3 0q.38 0 .643-.259.262-.259.262-.641V9.3q0-.383-.257-.641-.258-.259-.638-.259t-.643.259q-.262.258-.262.641v6.6q0 .383.257.641.258.259.638.259ZM7.8 6.6v12z"/>
                    </svg>
                </button>
            </div>
        `;

        const inputs = entry.querySelectorAll("input");
        attachInputListeners(inputs, entry);

        const deleteBtn = entry.querySelector(".delete button");
        deleteBtn.addEventListener("click", () => deleteShortcut(entry));

        return entry;
    }

    // Renders a shortcut in the main view
    function renderShortcut(name, url, index) {
        const normalizedUrl = normalizeUrl(url);
        const shortcut = document.createElement("div");
        shortcut.className = "shortcuts";
        shortcut._index = index;

        shortcut.innerHTML = `
            <a href="${normalizedUrl}">
                <div class="shortcutLogoContainer">
                    ${getLogoHtml(normalizedUrl)}
                </div>
                <span class="shortcut-name">${escapeHtml(name)}</span>
            </a>
        `;

        if (index < dom.shortcutsContainer.children.length) {
            dom.shortcutsContainer.replaceChild(shortcut, dom.shortcutsContainer.children[index]);
        } else {
            dom.shortcutsContainer.appendChild(shortcut);
        }
    }

    // Escapes HTML to prevent XSS
    function escapeHtml(unsafe) {
        return unsafe.replace(/[&<>"']/g, match => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match]));
    }

    // Normalizes URLs to ensure they're valid
    function normalizeUrl(url) {
        url = url.trim();
        return encodeURI(
            url.startsWith("https://") || url.startsWith("http://") ? url : `https://${url}`
        );
    }

    // Gets the appropriate logo HTML for a given URL
    function getLogoHtml(url) {
        const hostname = new URL(normalizeUrl(url)).hostname.replace("www.", "");

        if (hostname === "github.com") {
            return `<img src="./svgs/github-shortcut.svg" alt="">`;
        }

        // Check presets for matching domain
        const preset = presets.find(p => p.domains.includes(hostname));
        if (preset) {
            return preset.svg;
        }

        // Fetch favicon from Google 
        return `<img src="https://s2.googleusercontent.com/s2/favicons?domain_url=https://${hostname}&sz=256" 
                onerror="this.src='./svgs/offline.svg'" alt="">`;
    }

    // Attaches event listeners to shortcut input fields
    function attachInputListeners(inputs, entry) {
        inputs.forEach(input => {
            input.addEventListener("blur", () => {
                saveShortcut(entry);
                renderShortcut(
                    entry.querySelector(".shortcutName").value,
                    entry.querySelector(".URL").value,
                    entry._index
                );
            });
            input.addEventListener("focus", e => e.target.select());
        });

        inputs[0].addEventListener("keydown", e => e.key === "Enter" && inputs[1].focus());
        inputs[1].addEventListener("keydown", e => e.key === "Enter" && e.target.blur());
    }

    // Drag and drop functionality for reordering shortcuts
    function setupDragAndDrop() {
        let draggedElement = null;
        let autoScrollInterval = null;
        let dragOffset = { x: 0, y: 0 };
        let isReordering = false;
        let pendingReorder = false;
        let isDragging = false;

        // Cache element positions for smooth gliding animation
        function cachePositions() {
            const map = new Map();
            const entries = dom.shortcutSettingsContainer.querySelectorAll('.shortcutSettingsEntry');
            for (const el of entries) {
                map.set(el, el.getBoundingClientRect().top);
            }
            return map;
        }

        // Animate smooth gliding effect for sibling elements
        function animateGlide(oldPositions) {
            const entries = [...dom.shortcutSettingsContainer.children];
            const newPositions = new Map();

            // Batch read
            entries.forEach(el => {
                if (el !== draggedElement) {
                    newPositions.set(el, el.getBoundingClientRect().top);
                }
            });

            // Batch write
            entries.forEach(el => {
                if (el === draggedElement) return;
                const oldTop = oldPositions.get(el);
                const newTop = newPositions.get(el);
                if (oldTop !== undefined && newTop !== undefined) {
                    const delta = oldTop - newTop;
                    if (delta !== 0) {
                        el.style.transition = 'none';
                        el.style.transform = `translateY(${delta}px)`;
                        requestAnimationFrame(() => {
                            el.style.transition = 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)';
                            el.style.transform = 'none';
                        });
                    }
                }
            });
        }

        // Auto-scroll functionality
        function handleAutoScroll(clientY) {
            const container = dom.shortcutSettingsContainer;
            const containerRect = container.getBoundingClientRect();
            const scrollThreshold = 50; // pixels from edge to trigger scroll
            const scrollSpeed = 5; // pixels per frame

            // Clear existing interval
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }

            // Check if we need to scroll up
            if (clientY - containerRect.top < scrollThreshold && container.scrollTop > 0) {
                autoScrollInterval = setInterval(() => {
                    container.scrollTop = Math.max(0, container.scrollTop - scrollSpeed);
                }, 16); // ~60fps
            }
            // Check if we need to scroll down
            else if (containerRect.bottom - clientY < scrollThreshold &&
                container.scrollTop < container.scrollHeight - container.clientHeight) {
                autoScrollInterval = setInterval(() => {
                    const maxScroll = container.scrollHeight - container.clientHeight;
                    container.scrollTop = Math.min(maxScroll, container.scrollTop + scrollSpeed);
                }, 16); // ~60fps
            }
        }

        // Stop auto-scroll
        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        // Helper function for drag and drop with cached rect
        let dragElementsCache = [];
        let cacheTimestamp = 0;

        function getSortedElements() {
            const now = Date.now();
            // Cache for 16ms (one frame) to avoid repeated getBoundingClientRect calls
            if (now - cacheTimestamp < 16) {
                return dragElementsCache;
            }

            dragElementsCache = [...dom.shortcutSettingsContainer.querySelectorAll(".shortcutSettingsEntry:not(.dragging)")]
                .map(el => ({
                    element: el,
                    rect: el.getBoundingClientRect()
                }));
            cacheTimestamp = now;
            return dragElementsCache;
        }

        function getDragAfterElement(y) {
            const elements = getSortedElements();
            let low = 0, high = elements.length - 1;

            while (low <= high) {
                const mid = (low + high) >>> 1;
                const middleY = elements[mid].rect.top + elements[mid].rect.height / 2;
                y < middleY ? high = mid - 1 : low = mid + 1;
            }

            return elements[low]?.element || null;
        }

        // Insert element with smooth animation
        function insertElementWithAnimation(element, targetElement, insertBefore = true) {
            const oldPositions = cachePositions();
            const container = dom.shortcutSettingsContainer;

            // Perform DOM insertion
            if (targetElement) {
                if (insertBefore) {
                    // Insert before target element
                    container.insertBefore(element, targetElement);
                } else {
                    // Insert after target element
                    container.insertBefore(element, targetElement.nextSibling);
                }
            } else {
                // Append to end if no target element
                container.appendChild(element);
            }

            animateGlide(oldPositions);
            pendingReorder = true;
        }

        // Common drag logic for both mouse and touch
        function handleDragMove(clientX, clientY) {
            if (!isReordering || !draggedElement) return;

            // Handle auto-scroll
            handleAutoScroll(clientY);

            const afterElement = getDragAfterElement(clientY);

            // Add null/undefined check
            if (afterElement === null || afterElement === undefined) {
                // Move to end
                insertElementWithAnimation(draggedElement, null, false);
                return;
            }

            // Check if we need to reorder
            if (afterElement && afterElement !== draggedElement) {
                // Only move if it's actually a different position
                if (afterElement.previousSibling !== draggedElement) {
                    insertElementWithAnimation(draggedElement, afterElement, true);
                }
            } else if (!afterElement) {
                // Move to end if no after element
                const lastElement = dom.shortcutSettingsContainer.lastElementChild;
                if (lastElement && lastElement !== draggedElement) {
                    insertElementWithAnimation(draggedElement, null, false);
                }
            }
        }

        // Common cleanup logic
        function cleanup() {
            stopAutoScroll();

            // Remove CSS classes
            if (draggedElement) {
                draggedElement.classList.remove("dragging");
            }

            // Only update if we actually made changes
            if (pendingReorder) {
                updateShortcutIndices();
                saveShortcutOrder();
                pendingReorder = false;
            }

            // Reset state
            dom.shortcutSettingsContainer.classList.remove("dragging-ongoing");
            isReordering = false;
            isDragging = false;
            draggedElement = null;
        }

        // ==== MOUSE EVENTS ====
        dom.shortcutSettingsContainer.addEventListener("dragstart", e => {
            const item = e.target.closest(".shortcutSettingsEntry");
            if (item) {
                isReordering = true;
                draggedElement = item;

                // Calculate drag offset
                const rect = item.getBoundingClientRect();
                dragOffset.x = e.clientX - rect.left;
                dragOffset.y = e.clientY - rect.top;

                dom.shortcutSettingsContainer.classList.add("dragging-ongoing");

                // Add CSS classes for styling
                setTimeout(() => {
                    item.classList.add("dragging");
                }, 0);

                e.dataTransfer.effectAllowed = "move";
            }
        });

        dom.shortcutSettingsContainer.addEventListener("dragover", e => {
            e.preventDefault();
            handleDragMove(e.clientX, e.clientY);
        });

        dom.shortcutSettingsContainer.addEventListener("dragend", e => {
            if (!isReordering || !draggedElement) return;
            cleanup();
        });

        // Global event listeners for cleanup
        document.addEventListener("dragend", () => {
            if (isReordering) {
                cleanup();
            }
        });

        // Handle window blur for cleanup
        window.addEventListener("blur", () => {
            if (isReordering || isDragging) {
                cleanup();
            }
        });
    }

    // Updates indices of all shortcut entries after reordering
    function updateShortcutIndices() {
        document.querySelectorAll(".shortcutSettingsEntry").forEach((entry, index) => {
            entry._index = index;
        });
    }

    // Saves the new shortcut order to localStorage
    function saveShortcutOrder() {
        const entries = dom.shortcutSettingsContainer.querySelectorAll(".shortcutSettingsEntry");
        const newOrder = Array.from(entries).map(entry => ({
            name: entry.querySelector(".shortcutName").value,
            url: entry.querySelector(".URL").value
        }));

        // Only save if order has changed
        if (hasOrderChanged(newOrder)) {
            localStorage.setItem("shortcutAmount", newOrder.length.toString());
            newOrder.forEach((item, index) => {
                localStorage.setItem(`shortcutName${index}`, item.name);
                localStorage.setItem(`shortcutURL${index}`, item.url);
            });

            shortcutsCache = newOrder;
            renderAllShortcuts(newOrder);
        }
    }

    // Checks if the shortcut order has changed
    function hasOrderChanged(newOrder) {
        if (newOrder.length !== shortcutsCache.length) return true;

        return newOrder.some((item, index) => {
            const cached = shortcutsCache[index];
            return item.name !== cached.name || item.url !== cached.url;
        });
    }

    // Renders all shortcuts in the main view
    function renderAllShortcuts(order) {
        const fragment = document.createDocumentFragment();

        order.forEach((item, index) => {
            const shortcut = document.createElement("div");
            shortcut.className = "shortcuts";
            shortcut._index = index;
            shortcut.innerHTML = `
            <a href="${normalizeUrl(item.url)}">
                <div class="shortcutLogoContainer">
                    ${getLogoHtml(item.url)}
                </div>
                <span class="shortcut-name">${escapeHtml(item.name)}</span>
            </a>
        `;
            fragment.appendChild(shortcut);
        });

        dom.shortcutsContainer.innerHTML = "";
        dom.shortcutsContainer.appendChild(fragment);
    }

    // Handles the shortcuts toggle checkbox change
    function handleShortcutsToggle() {
        const isChecked = this.checked;
        saveCheckboxState("shortcutsCheckboxState", this);

        dom.shortcuts.style.display = isChecked ? "flex" : "none";
        saveDisplayStatus("shortcutsDisplayStatus", isChecked ? "flex" : "none");

        dom.shortcutEditField.classList.toggle("inactive", !isChecked);
        saveActiveStatus("shortcutEditField", isChecked ? "active" : "inactive");

        dom.adaptiveIconField.classList.toggle("inactive", !isChecked);
        saveActiveStatus("adaptiveIconField", isChecked ? "active" : "inactive");
    }

    // Handles the adaptive icon toggle checkbox change
    function handleAdaptiveIconToggle() {
        saveCheckboxState("adaptiveIconToggle", this);
        if (this.checked) {
            dom.shortcutsContainer.classList.add("adaptive-icons");
        } else {
            dom.shortcutsContainer.classList.remove("adaptive-icons");
        }
    }

    // Adds a new shortcut
    function addNewShortcut() {
        const currentAmount = parseInt(localStorage.getItem("shortcutAmount")) || shortcutsCache.length;
        if (currentAmount >= MAX_SHORTCUTS) return;

        const newAmount = currentAmount + 1;
        localStorage.setItem("shortcutAmount", newAmount.toString());

        if (currentAmount >= 1) {
            document.querySelectorAll(".delete button.inactive").forEach(b => {
                b.classList.remove("inactive");
            });
        }

        if (newAmount === MAX_SHORTCUTS) {
            dom.newShortcutButton.classList.add("inactive");
        }

        const entry = createShortcutEntry(PLACEHOLDER.name, PLACEHOLDER.url, false, currentAmount);
        dom.shortcutSettingsContainer.appendChild(entry);

        saveShortcut(entry);
        renderShortcut(PLACEHOLDER.name, PLACEHOLDER.url, currentAmount);
    }

    // Deletes a shortcut
    function deleteShortcut(entry) {
        const currentAmount = parseInt(localStorage.getItem("shortcutAmount")) || shortcutsCache.length;
        if (currentAmount <= 1) return;

        const index = entry._index;
        entry.remove();
        dom.shortcutsContainer.removeChild(dom.shortcutsContainer.children[index]);

        // Update localStorage
        localStorage.setItem("shortcutAmount", (currentAmount - 1).toString());
        for (let i = index; i < currentAmount - 1; i++) {
            const nextEntry = dom.shortcutSettingsContainer.children[i];
            nextEntry._index = i;
            saveShortcut(nextEntry);
        }
        localStorage.removeItem(`shortcutName${currentAmount - 1}`);
        localStorage.removeItem(`shortcutURL${currentAmount - 1}`);

        if (currentAmount - 1 === 1) {
            document.querySelectorAll(".delete button").forEach(b => {
                b.classList.add("inactive");
            });
        }

        dom.newShortcutButton.classList.remove("inactive");
    }

    // Resets all shortcuts to default
    async function resetShortcuts() {
        if (!(await confirmPrompt(translations[currentLanguage]?.resetShortcutsPrompt || translations["en"].resetShortcutsPrompt)))
            return;

        // Animation for shortcut elements
        const shortcutEntries = [...dom.shortcutSettingsContainer.querySelectorAll('.shortcutSettingsEntry')];
        shortcutEntries.forEach(el => el.classList.add("reset-shift-animation"));

        // Animation for reset button
        const svg = dom.resetShortcutsButton.querySelector("svg");
        svg.classList.add("rotate-animation");

        // Clear storage
        for (let i = 0; i < (localStorage.getItem("shortcutAmount") || 0); i++) {
            localStorage.removeItem(`shortcutName${i}`);
            localStorage.removeItem(`shortcutURL${i}`);
        }
        localStorage.removeItem("shortcutAmount");

        // Wait for animations of shortcut elements to complete
        await new Promise(resolve => setTimeout(resolve, 300));

        // Reset UI
        dom.shortcutSettingsContainer.innerHTML = "";
        dom.shortcutsContainer.innerHTML = "";
        dom.newShortcutButton.classList.remove("inactive");
        setTimeout(() => svg.classList.remove("rotate-animation"), 500);

        // Reload
        loadShortcuts();
    }

    // Saves a single shortcut to localStorage
    function saveShortcut(entry) {
        localStorage.setItem(`shortcutName${entry._index}`, entry.querySelector(".shortcutName").value);
        localStorage.setItem(`shortcutURL${entry._index}`, entry.querySelector(".URL").value);
    }
});
