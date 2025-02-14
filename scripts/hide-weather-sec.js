function isSupportedBrowser() {
    return (isChrome || isEdge) && isDesktop && !isBrave;
}

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // Select the section and checkbox
    const hideWeather = document.getElementById("hideWeather");
    const hideWeatherCheckbox = document.getElementById("hideWeatherCheckbox");

    if (!hideWeather) {
        console.error("Element with ID 'hideWeather' not found.");
        return;
    }

    if (!hideWeatherCheckbox) {
        console.error("Element with ID 'hideWeatherCheckbox' not found.");
        return;
    }

    console.log("Elements successfully retrieved:", { hideWeather, hideWeatherCheckbox });

    // Retrieve saved state from localStorage
    const savedState = localStorage.getItem("hideWeatherVisible");
    let isHideWeatherVisible = false;

    if (savedState !== null) {
        isHideWeatherVisible = JSON.parse(savedState); // Convert string to boolean
        console.log("Retrieved hideWeatherVisible from localStorage:", isHideWeatherVisible);
    } else {
        // Default state: Hide weather section if browser is not supported
        isHideWeatherVisible = isSupportedBrowser();
        localStorage.setItem("hideWeatherVisible", JSON.stringify(isHideWeatherVisible));
        console.log("No saved state found. Using isSupportedBrowser():", isHideWeatherVisible);
    }

    // Set checkbox state
    hideWeatherCheckbox.checked = !isHideWeatherVisible;
    console.log("Checkbox checked state set to:", hideWeatherCheckbox.checked);

    // Function to toggle weather section visibility
    function toggleHideWeatherVisibility(isVisible) {
        console.log("Toggling hideWeather visibility. New state:", isVisible);
        hideWeather.style.display = isVisible ? "block" : "none";
        localStorage.setItem("hideWeatherVisible", JSON.stringify(isVisible));
    }

    // Apply initial visibility
    toggleHideWeatherVisibility(isHideWeatherVisible);

    // Event listener for checkbox toggle
    hideWeatherCheckbox.addEventListener("change", () => {
        const isChecked = hideWeatherCheckbox.checked;
        console.log("Checkbox changed. New checked state:", isChecked);
        toggleHideWeatherVisibility(!isChecked);
    });
});
