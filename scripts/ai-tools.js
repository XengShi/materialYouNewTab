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
    { id: "deepseek", visible: true, order: 4 },
    { id: "perplexity", visible: false, order: 5 },
    { id: "grok", visible: false, order: 6 },
    { id: "metaAI", visible: false, order: 7 },
    { id: "qwen", visible: false, order: 8 },
    { id: "firefly", visible: false, order: 9 }
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
const aiToolsEditField = document.getElementById("aiToolsEditField");

// Animation helper function
function animateReorder(element1, element2, direction) {
    return new Promise((resolve) => {
        // Get the current positions
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();

        // Calculate the distance to move
        const distance = Math.abs(rect1.top - rect2.top);

        // Set CSS custom properties for the distance
        element1.style.setProperty("--move-distance", `${distance}px`);
        element2.style.setProperty("--move-distance", `${distance}px`);

        // Get button references
        const element1UpBtn = element1.querySelector(".reorder-up");
        const element1DownBtn = element1.querySelector(".reorder-down");
        const element2UpBtn = element2.querySelector(".reorder-up");
        const element2DownBtn = element2.querySelector(".reorder-down");

        // Disable interactions
        element1.style.pointerEvents = "none";
        element2.style.pointerEvents = "none";

        // Add animation classes
        if (direction === "up") {
            element1.classList.add("reorder-animate-up");
            element2.classList.add("reorder-animate-down");
        } else {
            element1.classList.add("reorder-animate-down");
            element2.classList.add("reorder-animate-up");
        }

        // Update button states at halfway point
        setTimeout(() => {
            [element1UpBtn.disabled, element2UpBtn.disabled] = [element2UpBtn.disabled, element1UpBtn.disabled];
            [element1DownBtn.disabled, element2DownBtn.disabled] = [element2DownBtn.disabled, element1DownBtn.disabled];
        }, 150);

        // Complete animation
        setTimeout(() => {
            // Perform DOM swap
            if (direction === "up") {
                aiToolsForm.insertBefore(element1, element2);
            } else {
                aiToolsForm.insertBefore(element2, element1);
            }

            // Clean up
            [element1, element2].forEach(el => {
                el.classList.remove("reorder-animate-up", "reorder-animate-down");
                el.style.removeProperty("--move-distance");
                el.style.pointerEvents = "";
            });

            updateReorderButtonStates();
            resolve();
        }, 300);
    });
}

// Function to save AI tools settings
function saveAIToolsSettings() {
    const aiToolsSettings = [];
    const toolOptions = document.querySelectorAll(".ai-tool-option");

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
    let settingsToApply;

    if (!savedSettings || !Array.isArray(savedSettings)) {
        // Initialize with default values if no settings exist
        settingsToApply = aiTools.map(tool => tool.visible ? tool.id : { [tool.id]: false });
        localStorage.setItem("aiToolsSettings", JSON.stringify(settingsToApply));
    } else {
        settingsToApply = savedSettings;
    }

    // Create a map of current tool elements for quick lookup
    const toolElements = new Map();
    const allToolLinks = aiToolName.querySelectorAll("a");
    allToolLinks.forEach(link => {
        const toolId = [...link.children].find(el => aiToolsRaw.some(t => t.id === el.id))?.id;
        if (toolId) toolElements.set(toolId, link);
    });

    // Clear container
    aiToolName.innerHTML = "";

    // Append tools in order based on settings
    settingsToApply.forEach(item => {
        let toolId, isVisible;

        if (typeof item === "string") {
            toolId = item;
            isVisible = true;
        } else {
            toolId = Object.keys(item)[0];
            isVisible = false;
        }

        const toolElement = toolElements.get(toolId);
        if (toolElement) {
            toolElement.style.display = isVisible ? "flex" : "none";
            aiToolName.appendChild(toolElement);
        }
    });
}

// Function to generate the AI Tools settings form elements
function generateAIToolsForm(settings) {
    aiToolsForm.innerHTML = "";

    // Create form elements
    settings.forEach((settingItem, index) => {
        let toolId, isVisible;

        if (typeof settingItem === "string") {
            toolId = settingItem;
            isVisible = true;
        } else {
            toolId = Object.keys(settingItem)[0];
            isVisible = false;
        }

        const originalTool = aiTools.find(t => t.id === toolId);
        const toolLabel = originalTool?.label || toolId;

        const toolOption = document.createElement("div");
        toolOption.className = "ai-tool-option";
        toolOption.dataset.toolId = toolId;
        toolOption.innerHTML = `
            <div class="ai-tool-controls">
                <input type="checkbox" id="setting_${toolId}" ${isVisible ? "checked" : ""}>
                <label for="setting_${toolId}">${toolLabel}</label>
            </div>
            <div class="ai-tool-reorder">
                <button type="button" class="reorder-up" ${index === 0 ? "disabled" : ""}>▲</button>
                <button type="button" class="reorder-down" ${index === settings.length - 1 ? "disabled" : ""}>▼</button>
            </div>
        `;
        aiToolsForm.appendChild(toolOption);
    });

    // Single event listener for all reorder buttons
    aiToolsForm.addEventListener("click", async (event) => {
        const upButton = event.target.closest(".reorder-up");
        const downButton = event.target.closest(".reorder-down");

        if (!upButton && !downButton) return;

        const toolOption = event.target.closest(".ai-tool-option");
        if (!toolOption) return;

        // Skip if button is disabled or animation in progress
        if (event.target.disabled || event.target.dataset.animating === "true") return;
        event.target.dataset.animating = "true";

        if (upButton) {
            const prevToolOption = toolOption.previousElementSibling;
            if (prevToolOption) {
                await animateReorder(toolOption, prevToolOption, "up");
            }
        } else if (downButton) {
            const nextToolOption = toolOption.nextElementSibling;
            if (nextToolOption) {
                await animateReorder(toolOption, nextToolOption, "down");
            }
        }

        event.target.dataset.animating = "false";
    });

    updateReorderButtonStates();
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
    aiToolsSettingsModal.style.display = "block";
    aiToolsSettingsOverlay.style.display = "block";
}

// Function to update the enabled/disabled state of reorder buttons
function updateReorderButtonStates() {
    const toolOptions = document.querySelectorAll(".ai-tool-option");

    toolOptions.forEach((option, index) => {
        const upButton = option.querySelector(".reorder-up");
        const downButton = option.querySelector(".reorder-down");

        if (upButton) {
            // Disable the first up button
            upButton.disabled = index === 0;
        }

        if (downButton) {
            // Disable the last down button
            downButton.disabled = index === toolOptions.length - 1;
        }
    });
}

// Function to close settings modal
function closeAIToolsSettings() {
    aiToolsSettingsModal.style.display = "none";
    aiToolsSettingsOverlay.style.display = "none";
}

// Function to toggle AI Tools panel
function toggleAITools(event) {
    const shortcutsCheckbox = document.getElementById("shortcutsCheckbox");
    const isAIToolVisible = aiToolName.style.display === "flex";

    // Prevent outside click handler from triggering
    if (event) event.stopPropagation();

    if (isAIToolVisible) {
        // Hide AI Tool panel
        if (shortcutsCheckbox.checked) {
            shortcuts.style.display = "flex";
        } else {
            shortcuts.style.display = "none";
        }

        aiToolName.style.opacity = "0";
        aiToolName.style.gap = "0";
        aiToolName.style.transform = "translateX(-100%)";

        setTimeout(() => {
            aiToolName.style.display = "none";
        }, 500);
    } else {
        // Show AI Tool panel
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

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
    // Apply saved settings
    applyAIToolsSettings();

    // Allow horizontal scrolling with the mouse wheel
    aiToolsCont.addEventListener("wheel", (event) => {
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

        // Animate the list reset
        const toolsList = document.querySelector(".ai-tools-list");
        const toolOptions = document.querySelectorAll(".ai-tool-option");

        // Add shake animation to the entire list
        toolsList.style.animation = "resetShake 0.6s ease-in-out";

        // Staggered fade effect for each option
        toolOptions.forEach((option, index) => {
            setTimeout(() => {
                option.style.animation = "resetFlash 0.4s ease-in-out";

                // Update checkbox during animation
                const toolId = option.dataset.toolId;
                const checkbox = document.getElementById(`setting_${toolId}`);
                const defaultTool = aiTools.find(t => t.id === toolId);

                if (defaultTool && checkbox) {
                    checkbox.checked = defaultTool.visible;
                }
            }, index * 50); // Stagger by 50ms
        });

        // Briefly disable the reset button to prevent multiple clicks
        resetAISettingsBtn.disabled = true;

        // Clean up all animation properties and restore button
        setTimeout(() => {
            toolsList.style.animation = "";
            toolOptions.forEach(option => {
                option.style.animation = "";
                option.style.transform = "";
                option.style.backgroundColor = "";
            });
            resetAISettingsBtn.disabled = false;
        }, 700);
    });

    // Save button in settings modal
    saveAISettingsBtn.addEventListener("click", function () {
        const newSettings = [];
        const toolOptions = document.querySelectorAll(".ai-tool-option");

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
            showAIToolsSettings();
        } else {
            aiToolsCont.style.display = "none";
            saveDisplayStatus("aiToolsDisplayStatus", "none");
            aiToolsEditField.classList.add("inactive");
        }
    });

    // Load saved state
    loadCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
    loadDisplayStatus("aiToolsDisplayStatus", aiToolsCont);
    if (aiToolsCheckbox.checked) {
        aiToolsEditField.classList.remove("inactive");
    } else {
        aiToolsEditField.classList.add("inactive");
    }

    // Collapse when clicking outside toolsCont
    document.addEventListener("click", (event) => {
        if (!aiToolName.contains(event.target) && aiToolName.style.display === "flex") {
            toggleAITools();
        }
    });
});
