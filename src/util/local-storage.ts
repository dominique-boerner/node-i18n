/**
 * Set a value in the localStorage.
 *
 * @param {any} key - the key which should be set.
 * @param {any} value - the value which should be set.
 */
export function setLocalStorage(key: any, value: any) {
  localStorage.setItem(key, value);
}

/**
 * Get a value from the localStorage.
 *
 * @param {any} key - the key.
 * @param {any} defaultValue - a value, which should be returned, if the key doesn't exist. (default "")
 */
export function getLocalStorage(key: any, defaultValue = "") {
  return localStorage.getItem(key) ?? defaultValue;
}
