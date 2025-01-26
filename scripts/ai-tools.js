/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// When User click on "AI-Tools"
const aiToolName = document.getElementById("toolsCont");
const shortcuts = document.getElementById("shortcutsContainer");

function toggleShortcuts(event) {
    const shortcutsCheckbox = document.getElementById("shortcutsCheckbox");

    if (shortcutsCheckbox.checked) {
        if (aiToolName.style.display === "flex") {
            shortcuts.style.display = "flex";
            aiToolName.style.opacity = "0";
            aiToolName.style.gap = "0";
            aiToolName.style.transform = "translateX(-100%)";

            setTimeout(() => {
                aiToolName.style.display = "none";
                shortcuts.style.display = "flex";
            }, 500);
        } else {
            shortcuts.style.display = "none";
            aiToolName.style.display = "flex";
            setTimeout(() => {
                aiToolName.style.opacity = "1";
                aiToolName.style.transform = "translateX(0)";
            }, 1);
            setTimeout(() => {
                aiToolName.style.gap = "12px";
            }, 300);
        }
    } else {
        if (aiToolName.style.display === "flex") {
            shortcuts.style.display = "none";
            aiToolName.style.opacity = "0";
            aiToolName.style.gap = "0";
            aiToolName.style.transform = "translateX(-100%)";
            setTimeout(() => {
                aiToolName.style.display = "none";
            }, 500);
        } else {
            shortcuts.style.display = "none";
            aiToolName.style.display = "flex";
            setTimeout(() => {
                aiToolName.style.opacity = "1";
                aiToolName.style.transform = "translateX(0)";
            }, 1);
            setTimeout(() => {
                aiToolName.style.gap = "12px";
            }, 300);
        }
    }
    // Prevent outside click handler from triggering
    if (event) event.stopPropagation();
}

// Allow horizontal scrolling with the mouse wheel
const scrollContainer = document.getElementById('aiToolsCont');

// Add a listener for the wheel event
scrollContainer.addEventListener('wheel', (event) => {
    // Check if the container is scrollable in x-axis
    if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        if (event.deltaY !== 0) {
            event.preventDefault(); // Prevent vertical scrolling
            // Apply the deltaY from the wheel event to horizontal scroll
            scrollContainer.scrollLeft += event.deltaY;
        }
    }
}, { passive: false });

// Collapse when clicking outside toolsCont
document.addEventListener("click", (event) => {
    if (!aiToolName.contains(event.target) && aiToolName.style.display === "flex") {
        toggleShortcuts();
    }
});

document.getElementById("aiToolsIcon").onclick = toggleShortcuts;

// Save and load checkbox state
document.addEventListener("DOMContentLoaded", function () {
    const aiToolsCont = document.getElementById("aiToolsCont");
    const aiToolsCheckbox = document.getElementById("aiToolsCheckbox");

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

    loadCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
    loadDisplayStatus("aiToolsDisplayStatus", aiToolsCont);
});
