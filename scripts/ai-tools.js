/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// when User click on "AI-Tools"
const element = document.getElementById("toolsCont");
const shortcuts = document.getElementById("shortcutsContainer");

function toggleShortcuts(event) {
    const shortcutsCheckbox = document.getElementById("shortcutsCheckbox");

    if (shortcutsCheckbox.checked) {
        if (element.style.display === "flex") {
            shortcuts.style.display = "flex";
            element.style.opacity = "0";
            element.style.gap = "0";
            element.style.transform = "translateX(-100%)";

            setTimeout(() => {
                element.style.display = "none";
                shortcuts.style.display = "flex";
            }, 500);
        } else {
            shortcuts.style.display = "none";
            element.style.display = "flex";
            setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateX(0)";
            }, 1);
            setTimeout(() => {
                element.style.gap = "12px";
            }, 300);
        }
    } else {
        if (element.style.display === "flex") {
            shortcuts.style.display = "none";
            element.style.opacity = "0";
            element.style.gap = "0";
            element.style.transform = "translateX(-100%)";
            setTimeout(() => {
                element.style.display = "none";
            }, 500);
        } else {
            shortcuts.style.display = "none";
            element.style.display = "flex";
            setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateX(0)";
            }, 1);
            setTimeout(() => {
                element.style.gap = "12px";
            }, 300);
        }
    }
    // Prevent outside click handler from triggering
    if (event) event.stopPropagation();
}


// Collapse when clicking outside toolsCont
document.addEventListener("click", (event) => {
    if (!element.contains(event.target) && element.style.display === "flex") {
        toggleShortcuts();
    }
});

document.getElementById("0NIHK").onclick = toggleShortcuts;

//


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
