const opacityBar = document.querySelector('.opacityBar');
const slider = document.getElementById('opacitySlider');
const opacityLevel = document.getElementById('opacityLevel');
const opacityBarControl = document.getElementById('opacityBarControl');

/* Update CSS variable for transparency */
function setSliderPosition(percentage) {
  const posPercent = Math.min(100, Math.max(20, percentage));
  slider.style.width = `${posPercent}%`;
  opacityLevel.textContent = `${Math.round(posPercent)}%`;
  document.documentElement.style.setProperty('--transparency', `${Math.round(posPercent)}%`);
  localStorage.setItem('bgOpacity', posPercent);
}

/* Handle drag or click on opacity bar */
function handleDrag(e) {
  e.preventDefault();
  const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
  const rect = opacityBar.getBoundingClientRect();
  let newPos = clientX - rect.left;
  newPos = Math.max(0, Math.min(rect.width, newPos));
  const percentage = (newPos / rect.width) * 100;
  setSliderPosition(percentage);
}

/* Start drag interaction */
function startDrag() {
  function onMove(e) {
    handleDrag(e);
  }
  function onEnd() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('mouseup', onEnd);
    document.removeEventListener('touchend', onEnd);
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove);
  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchend', onEnd);
}

/* Add event listeners */
slider.addEventListener('mousedown', e => {
  e.preventDefault();
  startDrag();
});
slider.addEventListener('touchstart', e => {
  e.preventDefault();
  startDrag();
});
opacityBar.addEventListener('click', handleDrag);

/* Toggle visibility based on data-bg */
function updateOpacityBarControlVisibility() {
    const isWallpaper = document.body.getAttribute('data-bg') === 'wallpaper'; 
    if (opacityBarControl) {
        opacityBarControl.classList.toggle('visible', isWallpaper);
    }
}

/* Watch for data-bg changes */
const observer = new MutationObserver(() => updateOpacityBarControlVisibility());
observer.observe(document.body, {
  attributes: true,
  attributeFilter: ['data-bg']
});

/* Initialize */
updateOpacityBarControlVisibility();
const savedOpacity = localStorage.getItem('bgOpacity') || 90;
setSliderPosition(Number(savedOpacity));
