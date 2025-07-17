/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Select DOM elements
const opacityBar = document.querySelector(".opacityBar");
const slider = document.getElementById("opacitySlider");
const opacityLevel = document.getElementById("opacityLevel");
const opacityBarControl = document.getElementById("opacityBarControl");

// Set slider position and update CSS variable for transparency
function setSliderPosition(percentage) {
    const posPercent = Math.min(100, Math.max(20, percentage));
    slider.style.width = `${posPercent}%`;
    opacityLevel.textContent = `${localizeNumbers(Math.round(posPercent).toString(), currentLanguage)}%`;
    document.documentElement.style.setProperty("--transparency", `${Math.round(posPercent)}%`);
    localStorage.setItem("bgOpacity", posPercent);
}

// Handle drag or click interaction on opacity bar
function handleDrag(e) {
    const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
    const rect = opacityBar.getBoundingClientRect();
    let newPos = isRTL
        ? rect.right - clientX  // distance from right edge
        : clientX - rect.left;  // distance from left edge
    newPos = Math.max(0, Math.min(rect.width, newPos));
    const percentage = +((newPos / rect.width) * 100).toFixed(2);
    setSliderPosition(percentage);
}

// Start listening for drag events
function startDrag() {
    const onMove = e => handleDrag(e);
    const onEnd = () => {
        ["mousemove", "touchmove"].forEach(evt => document.removeEventListener(evt, onMove));
        ["mouseup", "touchend"].forEach(evt => document.removeEventListener(evt, onEnd));
    };

    ["mousemove", "touchmove"].forEach(evt => document.addEventListener(evt, onMove));
    ["mouseup", "touchend"].forEach(evt => document.addEventListener(evt, onEnd));
}

// Click or touch on bar: move slider and enable drag
["mousedown", "touchstart"].forEach(evt => {
    opacityBar.addEventListener(evt, e => {
        e.preventDefault();
        handleDrag(e);
        startDrag();
    }, { passive: false });
});

// Initialize with saved opacity value or default to 90%
const savedOpacity = localStorage.getItem("bgOpacity") || 90;
setSliderPosition(Number(savedOpacity));
