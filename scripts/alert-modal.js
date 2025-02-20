/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */


// Create modal container if not already present
(function setupCustomModal() {
    if (document.getElementById("prompt-modal-container")) return;

    const modalContainer = document.createElement("div");
    modalContainer.id = "prompt-modal-container";

    const modalBox = document.createElement("div");
    modalBox.id = "prompt-modal-box";

    const messageElement = document.createElement("p");
    messageElement.id = "prompt-modal-message";

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "prompt-modal-buttons";

    modalBox.appendChild(messageElement);
    modalBox.appendChild(buttonContainer);
    modalContainer.appendChild(modalBox);
    document.body.appendChild(modalContainer);
})();

// Function for alert and confirm
function alertPrompt(message, isAlert = true, okText, cancelText) {
    return new Promise((resolve) => {
        const modalContainer = document.getElementById("prompt-modal-container");
        const messageElement = document.getElementById("prompt-modal-message");
        const buttonContainer = document.getElementById("prompt-modal-buttons");

        // Clear previous message
        messageElement.innerHTML = "";

        // Safely handle newlines by splitting & appending text nodes
        message.split("\n").forEach((line, index) => {
            if (index > 0) messageElement.appendChild(document.createElement("br")); // Add line breaks safely
            messageElement.appendChild(document.createTextNode(line));
        });

        buttonContainer.innerHTML = ""; // Clear buttons

        // Default button text with translations
        if (isAlert) {
            okText = okText || translations[currentLanguage]?.okText || translations["en"].okText;
        } else {
            okText = okText || translations[currentLanguage]?.yesText || translations["en"].yesText;
            cancelText = cancelText || translations[currentLanguage]?.noText || translations["en"].noText;
        }

        // Create OK button
        const okButton = document.createElement("button");
        okButton.textContent = okText;
        okButton.classList.add("prompt-modal-button", "prompt-modal-ok");
        okButton.onclick = () => {
            modalContainer.style.display = "none";
            resolve(isAlert ? undefined : true); // Resolve `true` only if confirm modal
        };

        buttonContainer.appendChild(okButton);

        // If it's a confirm modal, add Cancel button
        if (!isAlert) {
            const cancelButton = document.createElement("button");
            cancelButton.textContent = cancelText;
            cancelButton.classList.add("prompt-modal-button", "prompt-modal-cancel");
            cancelButton.onclick = () => {
                modalContainer.style.display = "none";
                resolve(false);
            };

            buttonContainer.appendChild(cancelButton);
        }

        modalContainer.style.display = "flex";
    });
}

// Wrapper function for confirm
function confirmPrompt(message, okText, cancelText) {
    return alertPrompt(message, false, okText, cancelText);
}
