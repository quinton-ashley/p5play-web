const log = console.log;
const { app, BrowserWindow, dialog, exec, ipcMain, net, shell, protocol } = require('electron');
const fs = require('node:fs/promises');
const path = require('path');
const os = require('os');
const mime = require('mime-types');

const express = require('express');
const xp = express();
let server;

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

function startServer(event, projectFolder) {
	return new Promise((resolve, reject) => {
		if (server) resolve(true);

		xp.use(express.static(projectFolder));

		server = xp.listen(7529, () => {
			console.log('Server started on port 7529');
			resolve(true);
		});
	});
}

async function readDirRecursive(dir) {
	let items = await fs.readdir(dir, { withFileTypes: true });
	let files = [];

	for (let item of items) {
		if (item.name[0] == '.') continue;

		let fullPath = path.join(dir, item.name);

		if (item.isDirectory()) {
			if (item.name == 'node_modules') continue;
			let dirFiles = await readDirRecursive(fullPath);
			files.push(...dirFiles);
		} else {
			let fileType = mime.lookup(fullPath) || 'text/plain';
			let stats = await fs.stat(fullPath);
			files.push({
				name: item.name,
				path: fullPath.slice(dir.length + 1),
				isFile: true,
				type: fileType,
				size: stats.size,
				lastModified: stats.mtime.getTime()
			});
		}
	}

	return files;
}

async function selectFolder(event, title) {
	const result = await dialog.showOpenDialog({
		title: title || 'Select a folder',
		properties: ['openDirectory']
	});

	if (result.filePaths.length === 0) {
		return null; // User did not select a folder
	}

	let dir = result.filePaths[0];
	let files = await readDirRecursive(dir);
	dir = dir.replace(/\\/g, '/');

	return { dir, files };
}

async function readFile(event, fullPath) {
	return await fs.readFile(fullPath, 'utf-8');
}

async function writeFile(event, fullPath, content) {
	return await fs.writeFile(fullPath, content, 'utf-8');
}

// shell.showItemInFolder('C:Users/sdkca');

function resizeWindow(event, width, height) {
	const fw = BrowserWindow.getFocusedWindow();

	const { w, h } = fw.getSize();
	if (width < w && height < h) return;

	fw.setContentSize(width, height, true);
}

function openInBrowser(event, url) {
	shell.openExternal(url);
}

function createWindow(event, url) {
	const w = new BrowserWindow({
		fullscreen: true,
		resizable: true
	});
	if (url.startsWith('http')) {
		w.loadURL(url);
	} else {
		w.loadFile(path.join(__dirname, url));
	}
}

// protocol.registerSchemesAsPrivileged([
// 	{
// 		scheme: 'file',
// 		privileges: {
// 			standard: true,
// 			secure: true,
// 			supportFetchAPI: true
// 		}
// 	}
// ]);

app.on('ready', () => {
	// protocol.handle('file', (req) => {
	// 	// const url = req.url.slice(7); /* all urls start with 'file://' */
	// 	const url = req.url;
	// 	log(url);
	// 	return net.fetch(url);
	// });

	// const _fetch = net.fetch;
	// net.fetch = (url, options) => {
	// 	log(url);
	// 	return _fetch(url, options);
	// };

	const ipAddress = getIpAddress();
	const homeDir = os.homedir();
	ipcMain.handle('getIpAddress', () => ipAddress);
	ipcMain.handle('getHomeDir', () => homeDir);

	ipcMain.handle('selectFolder', selectFolder);
	ipcMain.handle('startServer', startServer);
	ipcMain.handle('resizeWindow', resizeWindow);
	ipcMain.handle('readFile', readFile);
	ipcMain.handle('writeFile', writeFile);
	ipcMain.handle('openInBrowser', openInBrowser);
	ipcMain.handle('createWindow', createWindow);

	const mainWindow = new BrowserWindow({
		useContentSize: true,
		width: 500,
		height: 132,
		resizable: true,
		icon: 'logo.png',
		webPreferences: {
			preload: path.join(__dirname, 'bridge.js')
		}
	});

	mainWindow.loadFile(path.join(__dirname, '../editor/index.html'));

	mainWindow.webContents.openDevTools();
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('before-quit', () => {
	if (server) server.close();
});
