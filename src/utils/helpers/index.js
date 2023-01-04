export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const debounce = (func, wait = 1000) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
};
