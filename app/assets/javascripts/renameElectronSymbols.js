
//require('electron-cookies');

// Rename the symbols introduced by Electron (in case the webapp is run through Electron) to avoid conflicts
// with angular
// (see http://electron.atom.io/docs/v0.36.7/faq/electron-faq/#i-can-not-use-jqueryrequirejsmeteorangularjs-in-electron)
window.nodeRequire = window.require;
delete window.require;
delete window.exports;
delete window.module;
