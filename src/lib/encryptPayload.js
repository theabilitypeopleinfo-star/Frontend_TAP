/**
 * Helper to convert Uint8Array or ArrayBuffer to a Base64 string.
 */
function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Converts a 64-hex string or 32-char string to a 32-byte Uint8Array.
 */
function parseKeyToBytes(keyStr) {
  // Default fallback key (64 hex characters / 32 bytes) if environment variable is missing
  const defaultKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  const effectiveKey = (keyStr || defaultKey).trim();

  // 64 hex characters (32 bytes in hex)
  if (/^[0-9a-fA-F]{64}$/.test(effectiveKey)) {
    const bytes = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      bytes[i] = parseInt(effectiveKey.substring(i * 2, i * 2 + 2), 16);
    }
    return bytes;
  }

  // UTF-8 string (32 bytes)
  const encoded = new TextEncoder().encode(effectiveKey);
  if (encoded.length === 32) {
    return encoded;
  }

  throw new Error('VITE_ENCRYPTION_KEY must be a 64-character hex string or 32-byte string.');
}

/**
 * Encrypts a JSON payload using AES-256-GCM via Web Crypto API (crypto.subtle).
 * 
 * Returns base64-encoded { iv, ciphertext, authTag, encoding: 'base64' }
 * matching backend/lib/crypto.ts.
 *
 * @param {Record<string, unknown>} data - Form payload object
 * @returns {Promise<{iv: string, ciphertext: string, authTag: string, encoding: string}>}
 */
export async function encryptPayload(data) {
  const envKey = import.meta.env.VITE_ENCRYPTION_KEY;
  const keyBytes = parseKeyToBytes(envKey);

  // Import raw key for AES-GCM encryption
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  // Generate random 12-byte IV per submission
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Encode JSON stringified payload
  const plaintextBytes = new TextEncoder().encode(JSON.stringify(data));

  // Encrypt payload (Web Crypto AES-GCM appends 16-byte authTag at the end of ciphertext)
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
      tagLength: 128, // 16 bytes authentication tag
    },
    cryptoKey,
    plaintextBytes
  );

  const encryptedArray = new Uint8Array(encryptedBuffer);
  const tagLength = 16;
  const ciphertextBytes = encryptedArray.slice(0, encryptedArray.length - tagLength);
  const authTagBytes = encryptedArray.slice(encryptedArray.length - tagLength);

  return {
    iv: bufferToBase64(iv),
    ciphertext: bufferToBase64(ciphertextBytes),
    authTag: bufferToBase64(authTagBytes),
    encoding: 'base64',
  };
}
