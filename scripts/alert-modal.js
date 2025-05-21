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

    const blurOverlay = document.createElement("div");
    blurOverlay.id = "prompt-modal-blur";

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
    document.body.appendChild(blurOverlay);
    document.body.appendChild(modalContainer);
})();

// Function for alert and confirm
function alertPrompt(message, isAlert = true, okText, cancelText) {
    return new Promise((resolve) => {
        const modalContainer = document.getElementById("prompt-modal-container");
        const blurOverlay = document.getElementById("prompt-modal-blur");
        const messageElement = document.getElementById("prompt-modal-message");
        const buttonContainer = document.getElementById("prompt-modal-buttons");
        const bookmarkContainer = document.getElementById("bookmarkSidebar");

        // Clear previous message
        messageElement.innerHTML = "";

        // Handle newlines by splitting & appending text nodes
        message.split("\n").forEach((line, index) => {
            if (index > 0) messageElement.appendChild(document.createElement("br"));
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
        okButton.onclick = closeModal.bind(null, true);

        buttonContainer.appendChild(okButton);

        let cancelButton = null;
        // If it's a confirm modal, add Cancel button
        if (!isAlert) {
            cancelButton = document.createElement("button");
            cancelButton.textContent = cancelText;
            cancelButton.classList.add("prompt-modal-button", "prompt-modal-cancel");
            cancelButton.onclick = closeModal.bind(null, false);

            buttonContainer.appendChild(cancelButton);
        }

        modalContainer.style.display = "flex";
        blurOverlay.style.display = "block";

        // Disable background interaction
        document.body.style.pointerEvents = "none";
        if (bookmarkContainer) bookmarkContainer.style.pointerEvents = "none";
        modalContainer.style.pointerEvents = "auto";

        // Focus OK button by default and track last focused button
        let lastFocusedButton = okButton;
        okButton.focus();

        // Prevent focus loss when clicking outside or on non-buttons
        function preventFocusLoss(event) {
            const isInsideModal = modalContainer.contains(event.target);
            const isButton = event.target.classList.contains("prompt-modal-button");

            if (!isInsideModal || !isButton) {
                event.preventDefault();
                lastFocusedButton.focus(); // Restore focus to the last button
            }
        }

        document.addEventListener("mousedown", preventFocusLoss);

        // Handle keyboard events
        function handleKeydown(event) {
            if (event.key === "Enter") {
                if (document.activeElement === okButton) {
                    closeModal(true);
                } else if (document.activeElement === cancelButton) {
                    closeModal(false);
                }
            } else if (event.key === "Escape") {
                closeModal(isAlert ? undefined : false);
            } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                const buttons = buttonContainer.querySelectorAll("button");
                let index = [...buttons].indexOf(document.activeElement);
                if (event.key === "ArrowRight") {
                    index = (index + 1) % buttons.length;
                } else if (event.key === "ArrowLeft") {
                    index = (index - 1 + buttons.length) % buttons.length;
                }
                buttons[index].focus();
                lastFocusedButton = buttons[index];
            }
        }

        document.addEventListener("keydown", handleKeydown);

        function closeModal(result) {
            modalContainer.style.display = "none";
            blurOverlay.style.display = "none";
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("mousedown", preventFocusLoss);
            document.body.style.pointerEvents = "auto";
            if (bookmarkContainer) bookmarkContainer.style.pointerEvents = "auto";
            resolve(result);
        }
    });
}

// Wrapper function for confirm
function confirmPrompt(message, okText, cancelText) {
    return alertPrompt(message, false, okText, cancelText);
}

const agreeText = translations[currentLanguage]?.agreeText || translations["en"].agreeText;
const cancelText = translations[currentLanguage]?.cancelText || translations["en"].cancelText;
//const saveText = translations[currentLanguage]?.saveAPI || translations["en"].saveAPI;
//const deleteText = translations[currentLanguage]?.deleteText || translations["en"].deleteText;
