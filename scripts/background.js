const opacityBar = document.querySelector('.opacityBar');
const slider = document.getElementById('opacitySlider');
const opacityLevel = document.getElementById('opacityLevel');
const targetClasses = ['bgLightTint'];
const boxes = targetClasses.flatMap(className =>
  Array.from(document.getElementsByClassName(className))
);
const uniqueBoxes = [...new Set(boxes)];

function hexToRgba(hex, alpha) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result || result.length < 3) return '#ffffff';
  const r = parseInt(result[0]).toString(16).padStart(2, '0');
  const g = parseInt(result[1]).toString(16).padStart(2, '0');
  const b = parseInt(result[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

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

function setSliderPosition(percentage) {
    const posPercent = Math.min(100, Math.max(20, percentage));
    slider.style.width = `${posPercent}%`;
    applyOpacity(posPercent);
    opacityLevel.textContent = `${Math.round(posPercent)}%`;
    localStorage.setItem('bgOpacity', posPercent);
}


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

const savedOpacity = localStorage.getItem('bgOpacity') || 100;
setSliderPosition(Number(savedOpacity));
