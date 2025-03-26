import 'dotenv/config';
import { app, BrowserWindow } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = dirname(dirname(__dirname)); // src/main -> dist/main -> project root

let mainWindow: BrowserWindow | null;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: join(projectRoot, 'dist', 'preload', 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: true,
			devTools: true,
		},
	});

	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL('http://localhost:5173/');
		mainWindow.webContents.openDevTools();
	} else {
		// TODO: Needs to be updated when ready for packaging.
		mainWindow.loadFile(join(projectRoot, 'build', 'index.html'));
	}

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

// Kill the dev server process when app quits in development mode
if (process.env.NODE_ENV === 'development') {
	app.on('will-quit', () => {
		// Find and kill processes on port 5173 (Remix dev server)
		if (process.platform === 'darwin' || process.platform === 'linux') {
			exec('lsof -i :5173 -t | xargs kill -9');
		} else if (process.platform === 'win32') {
			exec('FOR /F "tokens=5" %P IN (\'netstat -ano ^| findstr :5173\') DO taskkill /F /PID %P');
		}
	});
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) createWindow();
});

