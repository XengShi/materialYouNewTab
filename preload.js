// Set Loading Screen Color before Everything Loads
document.documentElement.style.setProperty('--Loading-Screen-Color',localStorage.getItem('LoadingScreenColor') || "#bbd6fd");

// Set Zoom Value before everything Loads
if (chrome) document.documentElement.style.zoom = (((localStorage.getItem('zoomLevel') || 100) - 25) / 75) * (1 - 0.6) + 0.6;