/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Map color values to icon paths
const iconPaths = Object.fromEntries(
    ["blue", "brown", "cyan", "dark", "green", "orange", "peach", "pink", "purple", "red", "silver", "yellow"]
        .map(color => [color, `./favicon/${color}.png`])
);

// Function to update the extension icon based on browser
const updateExtensionIcon = (colorValue, isCustom = false) => {
    let iconPath = isCustom ? localStorage.getItem(`favicon_${colorValue}`) : iconPaths[colorValue];

    if (!iconPath) return;

    if (isFirefox) {
        browser.browserAction.setIcon({ path: iconPath });
    } else if (isChromiumBased) {
        chrome.action.setIcon({ path: iconPath });
    } else if (isSafari) {
        safari.extension.setToolbarIcon({ path: iconPath });
    }
};

// Function to update the favicon for custom colors
const updateFaviconForCustomColor = (hexColor) => {
    const faviconLink = document.querySelector("link[rel='icon']");
    if (!faviconLink) return;

    // Check if cached version exists
    const cachedFavicon = localStorage.getItem(`favicon_${hexColor}`);
    if (cachedFavicon) {
        faviconLink.href = cachedFavicon;
        updateExtensionIcon(hexColor, true);
        return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "./favicon/blue.png"; // Base reference icon

    img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        // Draw the base icon
        ctx.drawImage(img, 0, 0);

        // Extract pixel data
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        // Convert custom hex color to HSL
        let [targetH, targetS, targetL] = rgbToHsl(...hexToRgb(hexColor));

        // Apply H and S transformations (keep original L)
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) { // Only non-transparent pixels
                let [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);

                let blendFactor = 0.9;
                let newS = s * (1 - blendFactor) + targetS * blendFactor; // Blend saturation

                [data[i], data[i + 1], data[i + 2]] = hslToRgb(targetH, newS, l); // Apply new H and S
            }
        }

        ctx.putImageData(imageData, 0, 0);

        // Convert to data URL
        const newFavicon = canvas.toDataURL("image/png");
        faviconLink.href = newFavicon;

        // Remove previous cached favicons (if any)
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("favicon_")) {
                localStorage.removeItem(key);
            }
        });

        // Store the new favicon
        localStorage.setItem(`favicon_${hexColor}`, newFavicon);
        updateExtensionIcon(hexColor, true);
    };
};

// HEX to RGB conversion
const hexToRgb = (hex) => {
    hex = hex.replace("#", "");
    return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16)
    ];
};

// RGB to HSL conversion
const rgbToHsl = (r, g, b) => {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
};

// HSL to RGB conversion
const hslToRgb = (h, s, l) => {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};