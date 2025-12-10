// inject
let _fullscreen = false;

Element.prototype.requestFullscreen = function () {
 window.parent.postMessage({ action: 'requestFullscreen' }, '*');
};

document.exitFullscreen = function () {
 window.parent.postMessage({ action: 'exitFullscreen' }, '*');
};

Object.defineProperty(document, 'fullscreenElement', {
 get: () => _fullscreen ? document.body : null
});

window.addEventListener('message', e => {
 if (e.data.action === 'fullscreenState') _fullscreen = e.data.value;
});

const get_current_domain = () =>
 window.location.pathname.match(/\/website\/([^\/]+)/)?.[1] || '';

window.navigate = (url) => {
  window.parent.postMessage({action: 'navigate', url: url}, '*');
};
