/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Constants to detect the browser and platform details

// Check if the browser is Firefox
const isFirefox = typeof browser !== "undefined" && navigator.userAgent.toLowerCase().includes("firefox");

const isFirefoxAll = navigator.userAgent.toLowerCase().includes("firefox"); // For website and live preview

// Check if the browser is Chromium-based
const isChromiumBased = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime) && !isFirefox;

// Check if the browser is Edge
const isEdge = /Edg/.test(navigator.userAgent);

// Check if the browser is Brave
const isBrave = !!(navigator.brave && navigator.brave.isBrave());

// Check if the browser is Opera
const isOpera = /OPR/.test(navigator.userAgent);

// Check if the browser is Chrome
const isChrome = (/Chrome|CriOS/.test(navigator.userAgent)) && /Google Inc/.test(navigator.vendor) && !isEdge && !isBrave && !isOpera;

// Check if the browser is Safari
const isSafari = /Safari/.test(navigator.userAgent) && !isChromiumBased && /Apple Computer/.test(navigator.vendor);

// Check if the operating system is macOS
const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.platform);

// Check if the device is a desktop (not mobile)
const isDesktop = !/Android|iPhone|iPad|iPod/.test(navigator.userAgent);
