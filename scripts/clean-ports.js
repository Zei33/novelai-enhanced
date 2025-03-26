/**
 * This script cleans up any processes using the Remix development port
 * to ensure a clean start for Electron development
 */

import { exec } from 'child_process';
import { platform } from 'os';

const PORT = 5173;

function cleanPorts() {
	console.log(`Cleaning up any processes using port ${PORT}...`);
	
	if (platform() === 'win32') {
		// Windows command
		exec(`FOR /F "tokens=5" %P IN ('netstat -ano ^| findstr :${PORT}') DO taskkill /F /PID %P`, (error, stdout) => {
			if (error) {
				// It's normal to get an error if no processes are found
				console.log('No processes found or cleanup completed.');
				return;
			}
			console.log(`Cleaned up processes on port ${PORT}`);
			if (stdout) console.log(stdout);
		});
	} else {
		// macOS/Linux command
		exec(`lsof -i :${PORT} -t | xargs kill -9 2>/dev/null || true`, (error, stdout) => {
			if (error) {
				// It's normal to get an error if no processes are found
				console.log('No processes found or cleanup completed.');
				return;
			}
			console.log(`Cleaned up processes on port ${PORT}`);
			if (stdout) console.log(stdout);
		});
	}
}

cleanPorts(); 