export const saveStorage = (key,value) => {
  if(typeof value === 'string' && value.length > 0) {
    localStorage.setItem(key, value);
  }
}

export const getStorage = (key) => {
  return localStorage.getItem(key);
}

export const removeStorage = (key) => {
  localStorage.removeItem(key);
}