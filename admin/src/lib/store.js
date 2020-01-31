const storage = window.localStorage || window.sessionStorage;

export default {
  getItem(key) {
    return storage.getItem(key);
  },

  setItem(key, value) {
    storage.setItem(key, value);
  },

  removeItem(key) {
    storage.removeItem(key);
  },
};
