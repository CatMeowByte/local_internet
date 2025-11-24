// inject
let _fs=false;
Element.prototype.requestFullscreen=function(){window.parent.postMessage({action:'requestFullscreen'},'*');};
document.exitFullscreen=function(){window.parent.postMessage({action:'exitFullscreen'},'*');};
Object.defineProperty(document,'fullscreenElement',{get:()=>_fs?document.body:null});
window.addEventListener('message',e=>{if(e.data.action==='fullscreenState')_fs=e.data.value;});
