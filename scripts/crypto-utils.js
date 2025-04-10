/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// Encryption Utilities using Web Crypto API: Functions for encrypting and decrypting data securely.

/**
 * Encrypts the given data using the given key with AES-GCM encryption and returns an object containing the encrypted data and the initialization vector used.
 * @param {string} data - The data to encrypt.
 * @param {CryptoKey} key - The key to use for encryption.
 * @returns {Promise<{ cipherText: string, iv: string }>} - A Promise that resolves with an object containing the encrypted data and the initialization vector used.
 */

async function encryptData(data, key) {
    const enc = new TextEncoder();
    const encodedData = enc.encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(16)); // Initialization vector
    const algorithm = { name: "AES-GCM", iv };

    const cipherText = await crypto.subtle.encrypt(algorithm, key, encodedData);
    return {
        cipherText: Array.from(new Uint8Array(cipherText)).map(byte => String.fromCharCode(byte)).join(''),
        iv: Array.from(iv).map(byte => String.fromCharCode(byte)).join('')
    };
}


/**
 * Decrypts the given encrypted data using the given key and initialization vector (iv).
 * @param {string} encrypted - The encrypted data to decrypt.
 * @param {string} ivString - The initialization vector (iv) used for encryption.
 * @param {CryptoKey} key - The key used for encryption.
 * @returns {Promise<string>} - The decrypted data as a string.
 */

async function decryptData(encrypted, ivString, key) {
    const dec = new TextDecoder();
    const iv = new Uint8Array([...ivString].map(char => char.charCodeAt(0)));
    const algorithm = { name: "AES-GCM", iv };

    const buffer = Uint8Array.from([...encrypted].map(char => char.charCodeAt(0)));
    const decryptedData = await crypto.subtle.decrypt(algorithm, key, buffer);
    return dec.decode(decryptedData);
}


/**
 * Generates a new AES-GCM encryption key with a length of 256 bits.
 * The key can be used for both encryption and decryption operations.
 * The generated key is extractable, allowing it to be exported.
 * @returns {Promise<CryptoKey>} - A Promise that resolves to the generated CryptoKey.
 */

async function generateKey() {
    return crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );
}


/**
 * Retrieves an AES-GCM encryption key from localStorage, generating and storing a new one if not found.
 * If a key is not already stored, a new one is generated, exported, and saved in localStorage.
 * The stored key is imported and returned for encryption and decryption operations.
 * @returns {Promise<CryptoKey>} - A Promise that resolves to the imported CryptoKey.
 */

async function getKey() {
    if (!localStorage.getItem('cryptoKey')) {
        const key = await generateKey();
        const exportedKey = await crypto.subtle.exportKey('raw', key);
        localStorage.setItem('cryptoKey', Array.from(new Uint8Array(exportedKey)).map(byte => String.fromCharCode(byte)).join(''));
    }

    const importedKey = Uint8Array.from(localStorage.getItem('cryptoKey').split('').map(char => char.charCodeAt(0)));
    return crypto.subtle.importKey(
        'raw',
        importedKey,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
    );
}
