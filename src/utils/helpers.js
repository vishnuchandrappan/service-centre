export const getStoredItem = (key, defaultValue) => {
  return window.localStorage.getItem(key) || defaultValue;
};

export const storeItem = (key, value) => {
  window.localStorage.setItem(key, value);
};
