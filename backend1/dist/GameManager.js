"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManage = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManage {
    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user != socket);
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, socket); // ✅ correct order
                    this.pendingUser = null;
                    this.games.push(game);
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type == messages_1.MOVE) {
                console.log('inside move');
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    console.log('makes move');
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}
exports.GameManage = GameManage;
