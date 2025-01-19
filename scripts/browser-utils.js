/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Constants to detect the browser and platform details

// Check if the browser is Chrome
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

// Check if the browser is Firefox
const isFirefox = typeof browser !== "undefined" || navigator.userAgent.toLowerCase().includes("firefox");

// Check if the browser is Edge
const isEdge = /Edg/.test(navigator.userAgent);

// Check if the browser is Brave
const isBrave = navigator.brave && navigator.brave.isBrave;

// Check if the browser is Chromium-based
const isChromiumBased = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime) && !isBrave && !isEdge;

// Check if the browser is Opera
const isOpera = /OPR/.test(navigator.userAgent) && /Opera/.test(navigator.vendor);

// Check if the operating system is macOS
const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.platform);

// Check if the device is a desktop (not mobile)
const isDesktop = !/Android|iPhone|iPad|iPod/.test(navigator.userAgent);