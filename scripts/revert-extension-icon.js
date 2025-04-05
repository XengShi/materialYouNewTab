// DELETE this file after next update

// Function to revert the extension icon to default blue one
const iconPath = "./favicon/icon128.png";
let iconUpdated = false;

const updateExtensionIcon = () => {
    if (iconUpdated) return;

    if (typeof browser !== "undefined" && browser.browserAction) {
        browser.browserAction.setIcon({ path: iconPath });
    } else if (typeof chrome !== "undefined" && chrome.action) {
        chrome.action.setIcon({ path: iconPath });
    }
    iconUpdated = true;
};

updateExtensionIcon();