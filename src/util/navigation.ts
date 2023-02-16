/**
 * Open an external page in the browser.
 *
 * @param {string} url - the url to open
 * @param {boolean} newTab - if the url should be opened in a new tab (default false)
 */
export function navigateToExternal(url: string, newTab = false) {
  window.open(url, newTab ? "_blank" : "self");
}
