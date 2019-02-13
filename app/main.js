'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
    // bootChronium
    mainWindow = new BrowserWindow({width: 600, height: 300});
    mainWindow.setResizable(true);
    mainWindow.loadURL('file://' + __dirname + '/public/index.html');
    mainWindow.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});

const {PythonShell} = require('python-shell');
const {ipcMain} = require('electron');
// IPC通信のレンダラープロセスからのリクエストに対してレスポンスを返す。
ipcMain.on('push-button', (event, arg) => {
    // パッケージ用
    // var path = process.resourcesPath + '/app/python/test.py';

    // 開発用
    var path = __dirname + '/python/test.py';

    var pyshell = new PythonShell(path, {pythonPath : 'python'});
    pyshell.send(arg.param);
    pyshell.on('message', function (data) {
        console.log('response: ' + data);
        // レスポンスを返す
        event.returnValue = data;
    });
});
