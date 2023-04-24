const log = console.log;
const { app, ipcMain, dialog, shell, BrowserWindow } = require('electron');
const { access } = require('node:fs/promises');
const path = require('path');
const os = require('os');

const express = require('express');
const xp = express();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

function getIpAddress() {
	const ifaces = os.networkInterfaces();
	let ipAddress = null;
	for (const ifname in ifaces) {
		for (const iface of ifaces[ifname]) {
			if (iface.family === 'IPv4' && !iface.internal) {
				ipAddress = iface.address;
			}
		}
	}
	return ipAddress;
}

async function startServer(event, projectFolder) {
	if (!(await access(projectFolder + '/index.html'))) {
		return;
	}

	xp.use(express.static(projectFolder));

	xp.listen(7529, () => {
		console.log('Server started on port 7529');
	});
	return true;
}

function openBrowser(event, url) {
	shell.openExternal(url);
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		// width: 800,
		width: 1400,
		height: 600,
		icon: 'logo.png',
		webPreferences: {
			preload: path.join(__dirname, 'bridge.js')
		}
	});

	mainWindow.loadFile(path.join(__dirname, '../editor/index.html'));

	mainWindow.webContents.openDevTools();
};

async function selectFolder(event, title) {
	const result = await dialog.showOpenDialog({
		title: title || 'Select a folder',
		properties: ['openDirectory']
	});
	return result.filePaths[0];
}

app.on('ready', () => {
	const ipAddress = getIpAddress();
	const homeDir = os.homedir();

	ipcMain.handle('getIpAddress', () => ipAddress);
	ipcMain.handle('getHomeDir', () => homeDir);
	ipcMain.handle('selectFolder', selectFolder);
	ipcMain.handle('startServer', startServer);
	ipcMain.handle('openBrowser', openBrowser);

	createWindow();
});

app.on('window-all-closed', () => {
	app.quit();
});
