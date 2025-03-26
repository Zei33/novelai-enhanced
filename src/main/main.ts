import 'dotenv/config';
import { app, BrowserWindow, ipcMain } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec, spawn, ChildProcess } from 'child_process';
import { NovelAIAPI } from '#api/NovelAIAPI';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = dirname(dirname(__dirname)); // src/main -> dist/main -> project root

let mainWindow: BrowserWindow | null;
let remixProcess: ChildProcess | null = null;
let serverStarted = false;

// Start the Remix development server
function startRemixServer(): Promise<void> {
	return new Promise((resolve, reject) => {
		if (process.env.NODE_ENV !== 'development') {
			resolve();
			return;
		}

		console.log('Starting Remix development server...');
		
		// Use npm/pnpm/yarn executable based on what's available
		const npmCmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
		
		// Start the Remix server as a child process
		remixProcess = spawn(npmCmd, ['remix', 'vite:dev'], {
			cwd: projectRoot,
			stdio: 'pipe', // Pipe the output to parent process
			shell: true,
			env: {
				...process.env,
				NODE_ENV: 'development',
				BROWSER: 'none', // Prevent opening browser
				// Force a single React instance, which helps avoid hook issues
				REMIX_DEV_ORIGIN: 'http://localhost:5173',
				FORCE_COLOR: '1'
			}
		});
		
		// Log server output
		remixProcess.stdout?.on('data', (data) => {
			const output = data.toString().trim();
			console.log(`[Remix Server] ${output}`);
			
			// Check for server ready indicators with more detailed logging
			if (!serverStarted) {
				// More permissive ready detection
				if (
					output.includes('Local:') || 
					output.includes('ready in') ||
					output.includes('Network:') ||
					output.includes('5173') ||
					output.includes('VITE') ||
					output.includes('Remix')
				) {
					serverStarted = true;
					console.log('[Remix Server] Server ready detected!');
					// Give the server a moment to fully initialize
					setTimeout(() => {
						console.log('[Remix Server] Proceeding with initialization...');
						resolve();
					}, 100);
				}
			}
		});
		
		remixProcess.stderr?.on('data', (data) => {
			console.error(`[Remix Server Error] ${data}`);
		});
		
		remixProcess.on('error', (error) => {
			console.error('[Remix Server] Failed to start:', error);
			reject(error);
		});
		
		// Add a timeout just in case the server doesn't report ready
		setTimeout(() => {
			if (!serverStarted) {
				console.log('[Remix Server] Timeout reached - continuing anyway');
				resolve();
			}
		}, 30000); // Increased timeout to 30 seconds
	});
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: join(projectRoot, 'dist', 'preload', 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
			// Keep sandbox enabled for security, especially important for production
			sandbox: true,
			devTools: process.env.NODE_ENV === 'development',
			// Add web security settings
			webSecurity: true,
		},
	});

	// Set CSP header for the main window
	mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Content-Security-Policy': [
					process.env.NODE_ENV === 'development'
						? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' ws: wss: http: https:;"
						: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self';"
				]
			}
		});
	});

	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL('http://localhost:5173/');
		// Allow some time for the server to initialize fully before loading
		setTimeout(() => {
			if (mainWindow) {
				mainWindow.webContents.openDevTools();
			}
		}, 1000);
	} else {
		// TODO: Needs to be updated when ready for packaging.
		mainWindow.loadFile(join(projectRoot, 'build', 'index.html'));
	}

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

// Setup API and IPC handlers
function setupIPC() {
	// Initialize the NovelAI API with a default token if available
	let api = new NovelAIAPI(process.env.API_TOKEN || '');

	// Handle setting API key from the renderer process
	ipcMain.handle('set-api-key', async (event, apiKey: string) => {
		try {
			// Reinitialize the API with the new key
			api = new NovelAIAPI(apiKey);
			console.log('API key updated successfully');
			return { success: true };
		} catch (error) {
			console.error('Error setting API key:', error);
			return { error: 'Failed to set API key' };
		}
	});

	// Register IPC handlers
	ipcMain.handle('suggest-tags', async (event, prompt: string) => {
		try {
			const response = await api.image.suggestTags({
				model: 'nai-diffusion-4-full',
				prompt: prompt
			});
			console.log(response);
			return response;
		} catch (error) {
			console.error('Error in suggest-tags API call:', error);
			return { error: 'Failed to suggest tags' };
		}
	});
}

// Clean up processes when app quits
function cleanupProcesses() {
	if (remixProcess) {
		console.log('Shutting down Remix server...');
		
		// Kill the Remix server process
		if (process.platform === 'win32') {
			// On Windows, we need to use taskkill to kill the process tree
			exec(`taskkill /pid ${remixProcess.pid} /T /F`, (error) => {
				if (error) console.error('Error killing Remix process:', error);
			});
		} else {
			// On Unix systems, we can kill the process group
			remixProcess.kill('SIGTERM');
		}
		
		remixProcess = null;
	}
}

// Register cleanup handlers
app.on('before-quit', cleanupProcesses);
app.on('will-quit', cleanupProcesses);

// Start the app
app.whenReady().then(async () => {
	if (process.env.NODE_ENV === 'development') {
		// Start Remix server before creating window
		await startRemixServer();
	}
	
	createWindow();
	setupIPC();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) createWindow();
});

