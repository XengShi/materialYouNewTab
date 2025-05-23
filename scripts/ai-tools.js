/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Define the list of available AI tools and their default visibility
const aiToolsRaw = [
    { id: "chatGPT", visible: true, order: 0 },
    { id: "gemini", visible: true, order: 1 },
    { id: "copilot", visible: true, order: 2 },
    { id: "claude", visible: true, order: 3 },
    { id: "grok", visible: true, order: 4 },
    { id: "metaAI", visible: true, order: 5 },
    { id: "deepseek", visible: true, order: 6 },
    { id: "qwen", visible: false, order: 7 },
    { id: "perplexity", visible: false, order: 8 },
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

// Function to save AI tools settings
function saveAIToolsSettings() {
    const aiToolsSettings = [];
    const toolOptions = document.querySelectorAll('.ai-tool-option');

    // Save each tool's visibility based on current order
    toolOptions.forEach((option) => {
        const toolId = option.dataset.toolId;
        const isVisible = document.getElementById(`setting_${toolId}`).checked;

        // Add to array based on visibility
        if (isVisible) {
            // For visible tools, just add the ID string
            aiToolsSettings.push(toolId);
        } else {
            // For hidden tools, add an object with the ID as key and false as value
            const hiddenTool = {};
            hiddenTool[toolId] = false;
            aiToolsSettings.push(hiddenTool);
        }
    });

    // Save settings to localStorage
    localStorage.setItem("aiToolsSettings", JSON.stringify(aiToolsSettings));
}

// Function to apply saved settings (visibility and order)
function applyAIToolsSettings() {
    const savedSettings = JSON.parse(localStorage.getItem("aiToolsSettings") || "null");
    if (!savedSettings || !Array.isArray(savedSettings)) {
        // If no settings found, initialize with default values
        const defaultSettings = aiTools.map(tool => {
            if (tool.visible) {
                return tool.id;
            } else {
                const hiddenTool = {};
                hiddenTool[tool.id] = false;
                return hiddenTool;
            }
        });
        localStorage.setItem("aiToolsSettings", JSON.stringify(defaultSettings));
        return;
    }

    // First, set display:none for all tools to temporarily hide them
    const allToolLinks = aiToolName.querySelectorAll('a');
    allToolLinks.forEach(link => {
        link.style.display = "none";
    });

    // Create fragment for reordering
    const fragment = document.createDocumentFragment();

    // Process each item in the saved settings array
    savedSettings.forEach(item => {
        let toolId, isVisible;

        if (typeof item === 'string') {
            // It's a visible tool
            toolId = item;
            isVisible = true;
        } else {
            // It's an object with a hidden tool
            toolId = Object.keys(item)[0];
            isVisible = false;
        }

        // Find and append the tool element
        const labelElement = document.getElementById(toolId);
        if (labelElement) {
            const linkElement = labelElement.closest('a');
            if (linkElement) {
                const clone = linkElement.cloneNode(true);
                clone.style.display = isVisible ? "flex" : "none";
                fragment.appendChild(clone);
            }
        }
    });

    // Replace contents with reordered tools
    while (aiToolName.firstChild) {
        aiToolName.removeChild(aiToolName.firstChild);
    }
    aiToolName.appendChild(fragment);
}

// Function to generate form elements for AI tools
function generateAIToolsForm(settings) {
    // Clear previous form content
    aiToolsForm.innerHTML = "";

    // Create a toggle for each AI tool
    settings.forEach((settingItem, index) => {
        let toolId, isVisible;

        if (typeof settingItem === 'string') {
            toolId = settingItem;
            isVisible = true;
        } else {
            toolId = Object.keys(settingItem)[0];
            isVisible = false;
        }

        const originalTool = aiTools.find(t => t.id === toolId);
        const toolLabel = originalTool ? originalTool.label : toolId;

        const toolOption = document.createElement('div');
        toolOption.className = 'ai-tool-option';
        toolOption.dataset.toolId = toolId;
        toolOption.innerHTML = `
            <div class="ai-tool-controls">
                <input type="checkbox" id="setting_${toolId}" ${isVisible ? 'checked' : ''}>
                <label for="setting_${toolId}">${toolLabel}</label>
            </div>
            <div class="ai-tool-reorder">
                <button type="button" class="reorder-up" style="visibility: ${index === 0 ? 'hidden' : 'visible'}">▲</button>
                <button type="button" class="reorder-down" style="visibility: ${index === settings.length - 1 ? 'hidden' : 'visible'}">▼</button>
            </div>
        `;
        aiToolsForm.appendChild(toolOption);
    });

    // Add event listeners for reorder buttons
    document.querySelectorAll('.reorder-up').forEach(button => {
        button.addEventListener('click', function () {
            const toolOption = this.closest('.ai-tool-option');
            const prevToolOption = toolOption.previousElementSibling;

            if (prevToolOption) {
                aiToolsForm.insertBefore(toolOption, prevToolOption);
                updateReorderButtonStates();
            }
        });
    });

    document.querySelectorAll('.reorder-down').forEach(button => {
        button.addEventListener('click', function () {
            const toolOption = this.closest('.ai-tool-option');
            const nextToolOption = toolOption.nextElementSibling;

            if (nextToolOption) {
                aiToolsForm.insertBefore(nextToolOption, toolOption);
                updateReorderButtonStates();
            }
        });
    });
}

// Function to show AI Tools settings modal
function showAIToolsSettings() {
    // Clear previous form content
    aiToolsForm.innerHTML = "";

    // Load saved tool order and visibility or initialize from defaults
    let savedSettings = JSON.parse(localStorage.getItem("aiToolsSettings") || "null");

    // If no settings exist, create from aiTools
    if (!savedSettings || !Array.isArray(savedSettings)) {
        savedSettings = aiTools.map(tool => {
            if (tool.visible) {
                return tool.id;
            } else {
                const hiddenTool = {};
                hiddenTool[tool.id] = false;
                return hiddenTool;
            }
        });
    }

    // Generate the form with the saved settings
    generateAIToolsForm(savedSettings);

    // Show modal and overlay
    aiToolsSettingsModal.style.display = 'block';
    aiToolsSettingsOverlay.style.display = 'block';
}

// Function to update the enabled/disabled state of reorder buttons
function updateReorderButtonStates() {
    const toolOptions = document.querySelectorAll('.ai-tool-option');

    toolOptions.forEach((option, index) => {
        const upButton = option.querySelector('.reorder-up');
        const downButton = option.querySelector('.reorder-down');

        if (upButton) {
            // Hide the first up button
            upButton.style.visibility = index === 0 ? 'hidden' : 'visible';
        }

        if (downButton) {
            // Hide the last down button
            downButton.style.visibility = index === toolOptions.length - 1 ? 'hidden' : 'visible';
        }
    });
}

// Function to close settings modal
function closeAIToolsSettings() {
    aiToolsSettingsModal.style.display = 'none';
    aiToolsSettingsOverlay.style.display = 'none';
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
    // Apply saved settings
    applyAIToolsSettings();

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
        // Create default settings
        const defaultSettings = aiTools.map(tool => {
            if (tool.visible) {
                return tool.id;
            } else {
                const hiddenTool = {};
                hiddenTool[tool.id] = false;
                return hiddenTool;
            }
        });

        // Generate the form with default settings
        generateAIToolsForm(defaultSettings);
    });

    // Save button in settings modal
    saveAISettingsBtn.addEventListener("click", function () {
        const newSettings = [];
        const toolOptions = document.querySelectorAll('.ai-tool-option');

        // Save each tool's visibility based on current order in the form
        toolOptions.forEach((option) => {
            const toolId = option.dataset.toolId;
            const isVisible = document.getElementById(`setting_${toolId}`).checked;

            // Add to array based on visibility
            if (isVisible) {
                // For visible tools, just add the ID string
                newSettings.push(toolId);
            } else {
                // For hidden tools, add an object with the ID as key and false as value
                const hiddenTool = {};
                hiddenTool[toolId] = false;
                newSettings.push(hiddenTool);
            }
        });

        // Save settings to localStorage
        localStorage.setItem("aiToolsSettings", JSON.stringify(newSettings));

        // Apply new settings
        applyAIToolsSettings();

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
