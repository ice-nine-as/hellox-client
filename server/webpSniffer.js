/* Adapted from https://stackoverflow.com/a/27232658. */
(function () {
  var elem = document.createElement('canvas');
  if (Boolean(elem.getContext && elem.getContext('2d')) &&
      elem.toDataURL('image/webp').indexOf('data:image/webp') === 0)
  {
    document.firstElementChild.classList.add('webp');
  }
})();