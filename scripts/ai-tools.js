/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Define the list of available AI tools and their default visibility
const aiToolsRaw = [
    { id: "chatGPT", visible: true },
    { id: "gemini", visible: true },
    { id: "copilot", visible: true },
    { id: "claude", visible: true },
    { id: "grok", visible: true },
    { id: "metaAI", visible: true },
    { id: "deepseek", visible: true },
    { id: "qwen", visible: false },
    { id: "perplexity", visible: false }
];
// Translations for AI tools
const aiTools = aiToolsRaw.map(tool => ({
    ...tool,
    label: translations[currentLanguage]?.[tool.id] || translations["en"][tool.id]
}));

// DOM Elements
const aiToolName = document.getElementById("toolsCont");
const shortcuts = document.getElementById("shortcutsContainer");
const aiToolsIcon = document.getElementById("aiToolsIcon");
const aiToolsSettingsModal = document.getElementById("aiToolsSettingsModal");
const aiToolsSettingsOverlay = document.getElementById("aiToolsSettingsOverlay");
const aiToolsForm = document.getElementById("aiToolsForm");
const closeAISettingsBtn = document.getElementById("closeAISettingsBtn");
const resetAISettingsBtn = document.getElementById("resetAISettingsBtn");
const saveAISettingsBtn = document.getElementById("saveAISettingsBtn");
const aiToolsEditButton = document.getElementById("aiToolsEditButton");
const aiToolsCont = document.getElementById("aiToolsCont");

// Function to show AI Tools settings modal
function showAIToolsSettings() {
    // Clear previous form content
    aiToolsForm.innerHTML = "";

    // Load saved settings or use defaults
    let savedSettings = JSON.parse(localStorage.getItem("aiToolsVisibility") || "{}");

    // Create a toggle for each AI tool
    aiTools.forEach(tool => {
        // Use saved setting or default if not saved
        const isVisible = savedSettings[tool.id] !== undefined ? savedSettings[tool.id] : tool.visible;

        const toolOption = document.createElement('div');
        toolOption.className = 'ai-tool-option';
        toolOption.innerHTML = `
            <input type="checkbox" id="setting_${tool.id}" ${isVisible ? 'checked' : ''}>
            <label for="setting_${tool.id}">${tool.label}</label>
        `;

        aiToolsForm.appendChild(toolOption);
    });

    // Show modal and overlay
    aiToolsSettingsModal.style.display = 'block';
    aiToolsSettingsOverlay.style.display = 'block';
}

// Function to close settings modal
function closeAIToolsSettings() {
    aiToolsSettingsModal.style.display = 'none';
    aiToolsSettingsOverlay.style.display = 'none';
}

// Function to apply saved visibility settings
function applyAIToolsVisibility() {
    const savedSettings = JSON.parse(localStorage.getItem("aiToolsVisibility") || "{}");

    aiTools.forEach(tool => {
        const element = document.getElementById(tool.id)?.parentElement;
        if (element) {
            const isVisible = savedSettings[tool.id] !== undefined ? savedSettings[tool.id] : tool.visible;
            element.style.display = isVisible ? "flex" : "none";
        }
    });
}

// Function to toggle AI Tools panel
function toggleAITools(event) {
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

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
    // Apply saved visibility settings
    applyAIToolsVisibility();

    // Allow horizontal scrolling with the mouse wheel
    aiToolsCont.addEventListener('wheel', (event) => {
        // Check if the container is scrollable in x-axis
        if (aiToolsCont.scrollWidth > aiToolsCont.clientWidth) {
            if (event.deltaY !== 0) {
                event.preventDefault(); // Prevent vertical scrolling
                // Apply the deltaY from the wheel event to horizontal scroll
                aiToolsCont.scrollLeft += event.deltaY;
            }
        }
    }, { passive: false });

    // AI Tools icon click handler
    aiToolsIcon.addEventListener("click", toggleAITools);

    // AI Tools edit button click handler
    aiToolsEditButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenuBar();
        showAIToolsSettings();
    });

    // Close button in settings modal
    closeAISettingsBtn.addEventListener("click", closeAIToolsSettings);

    // Reset button in settings modal
    resetAISettingsBtn.addEventListener("click", function () {
        aiTools.forEach(tool => {
            document.getElementById(`setting_${tool.id}`).checked = tool.visible;
        });
    });

    // Save button in settings modal
    saveAISettingsBtn.addEventListener("click", function () {
        const newSettings = {};
        aiTools.forEach(tool => {
            newSettings[tool.id] = document.getElementById(`setting_${tool.id}`).checked;
        });

        // Save settings to localStorage
        localStorage.setItem("aiToolsVisibility", JSON.stringify(newSettings));

        // Apply new settings
        applyAIToolsVisibility();

        // Close modal
        closeAIToolsSettings();
    });

    // Settings overlay click handler
    aiToolsSettingsOverlay.addEventListener("click", closeAIToolsSettings);

    // Handle checkbox state for AI Tools visibility
    const aiToolsCheckbox = document.getElementById("aiToolsCheckbox");

    aiToolsCheckbox.addEventListener("change", function () {
        saveCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
        if (aiToolsCheckbox.checked) {
            aiToolsCont.style.display = "flex";
            saveDisplayStatus("aiToolsDisplayStatus", "flex");
            aiToolsEditField.classList.remove("inactive");
            saveActiveStatus("aiToolsEditField", "active")
        } else {
            aiToolsCont.style.display = "none";
            saveDisplayStatus("aiToolsDisplayStatus", "none");
            aiToolsEditField.classList.add("inactive");
            saveActiveStatus("aiToolsEditField", "inactive")
            toggleAITools();
        }
    });

    // Load saved state
    loadCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
    loadDisplayStatus("aiToolsDisplayStatus", aiToolsCont);
    loadActiveStatus("aiToolsEditField", aiToolsEditField);

    // Collapse when clicking outside toolsCont
    document.addEventListener("click", (event) => {
        if (!aiToolName.contains(event.target) && aiToolName.style.display === "flex") {
            toggleAITools();
        }
    });
});
