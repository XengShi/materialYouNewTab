/* Select DOM elements for the opacity bar control */
const opacityBar = document.querySelector('.opacityBar');
const slider = document.getElementById('opacitySlider');
const opacityLevel = document.getElementById('opacityLevel');
const opacityBarControl = document.getElementById('opacityBarControl');
const targetClasses = ['bgLightTint'];
const boxes = targetClasses.flatMap(className =>
    Array.from(document.getElementsByClassName(className))
);
const uniqueBoxes = [...new Set(boxes)];

/* Convert hex color to RGBA format with specified alpha */
function hexToRgba(hex, alpha) {
    const bigint = parseInt(hex.replace('#', ''), 16); // Parse hex to integer
    const r = (bigint >> 16) & 255; // Extract red component
    const g = (bigint >> 8) & 255; // Extract green component
    const b = bigint & 255; // Extract blue component
    return `rgba(${r}, ${g}, ${b}, ${alpha})`; // Return RGBA string
}

/* Convert RGB color string to hex format */
function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g); // Extract numbers from rgb(r, g, b) string
    if (!result || result.length < 3) return '#ffffff'; // Return white if invalid
    const r = parseInt(result[0]).toString(16).padStart(2, '0'); // Convert red to hex
    const g = parseInt(result[1]).toString(16).padStart(2, '0'); // Convert green to hex
    const b = parseInt(result[2]).toString(16).padStart(2, '0'); // Convert blue to hex
    return `#${r}${g}${b}`; // Return hex color
}

/* Apply opacity to background of target elements */
function applyOpacity(value) {
    const opacity = value / 100;
    uniqueBoxes.forEach(box => {
        const computedStyle = getComputedStyle(box);
        const bgColor = computedStyle.backgroundColor;
        const hexColor = bgColor.startsWith('rgb') ? rgbToHex(bgColor) : '#ffffff';
        const rgbaColor = hexToRgba(hexColor, opacity);
        box.style.backgroundColor = rgbaColor;
    });
}

/* Update slider position and apply opacity */
function setSliderPosition(percentage) {
    const posPercent = Math.min(100, Math.max(20, percentage));
    slider.style.width = `${posPercent}%`; 
    applyOpacity(posPercent);
    opacityLevel.textContent = `${Math.round(posPercent)}%`;
    localStorage.setItem('bgOpacity', posPercent);
}

/* Handle drag or click events to adjust slider position */
function handleDrag(e) {
    e.preventDefault();
    let clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const rect = opacityBar.getBoundingClientRect();
    let newPos = clientX - rect.left;
    if (newPos < 0) newPos = 0;
    if (newPos > rect.width) newPos = rect.width;
    const percentage = (newPos / rect.width) * 100;
    setSliderPosition(percentage);
}

/* Start drag interaction for mouse or touch */
function startDrag() {
    function onMove(e) {
        handleDrag(e); // Handle movement during drag
    }
    function onEnd() {
        // Clean up event listeners when drag ends
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchend', onEnd);
    }
    // Add event listeners for drag movement and end
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);
}

/* Add event listeners for slider interactions */
slider.addEventListener('mousedown', e => {
    e.preventDefault();
    startDrag();
});
slider.addEventListener('touchstart', e => {
    e.preventDefault();
    startDrag();
});
opacityBar.addEventListener('click', e => {
    handleDrag(e);
});


const savedOpacity = localStorage.getItem('bgOpacity') || 90;
setSliderPosition(Number(savedOpacity));


/* Update visibility of opacity bar control based on data-bg attribute */
function updateOpacityControlVisibility() {
    const isWallpaper = document.body.getAttribute('data-bg') === 'wallpaper'; 
    opacityBarControl.classList.toggle('visible', isWallpaper);
    if (!isWallpaper) {
        applyOpacity(100); 
    } else {
        const savedOpacity = localStorage.getItem('bgOpacity') || 90; 
        setSliderPosition(Number(savedOpacity));
    }
}

/* Initialize opacity control visibility and slider position */
updateOpacityControlVisibility();

/* Observe changes to data-bg attribute on body */
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-bg') {
            updateOpacityControlVisibility();
        }
    });
});

/* Set up observer to watch for data-bg attribute changes */
observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-bg']
});
