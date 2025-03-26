const { contextBridge, ipcRenderer } = require('electron');

// Create global initialization object to help with app startup
contextBridge.exposeInMainWorld('electronAppInit', {
	isElectron: true,
	platform: process.platform
});

// Expose API methods
contextBridge.exposeInMainWorld('api', {
	suggestTags: async (prompt: string) => {
		return await ipcRenderer.invoke('suggest-tags', prompt);
	},
	setApiKey: async (apiKey: string) => {
		return await ipcRenderer.invoke('set-api-key', apiKey);
	},
});
