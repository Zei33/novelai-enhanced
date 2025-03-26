"use strict";
const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('api', {
    ping: () => 'pong from Electron!',
});
