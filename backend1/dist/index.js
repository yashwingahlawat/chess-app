"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManage = new GameManager_1.GameManage();
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    gameManage.addUser(ws);
    ws.on('close', () => {
        gameManage.removeUser(ws);
    });
    ws.send('somethingok');
});
