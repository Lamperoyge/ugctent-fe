export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const debounce = (func, wait = 1000) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(this, arguments);
    }, wait);
  };
};

export function getPathArray(path) {
  return path.split(/[[\].]+/).filter(Boolean);
}

export function isVideo(url) {
  const regex = /^https?:\/\/.*\/.*\.(mp4|mkv|flv|avi|mov|wmv)[^\/]*$/;
  return regex.test(url);
}
