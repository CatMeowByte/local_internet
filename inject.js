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

window.navigate = url => {
 window.parent.postMessage({
  action: 'navigate',
  url,
  domain: get_current_domain(),
  current_path: window.location.pathname
 }, '*');
};

const original_replaceState = history.replaceState.bind(history);
history.replaceState = function(state, title, url) {
 original_replaceState(state, title, url);
 if (url && url.startsWith('?')) {
  window.parent.postMessage({action: 'url_changed', query: url}, '*');
 }
};

const original_pushState = history.pushState.bind(history);
history.pushState = function(state, title, url) {
 original_pushState(state, title, url);
 if (url && url.startsWith('?')) {
  window.parent.postMessage({action: 'url_changed', query: url}, '*');
 }
};