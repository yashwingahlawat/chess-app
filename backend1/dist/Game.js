"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.startTime = new Date;
        this.board = new chess_js_1.Chess();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: 'white'
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: 'black'
            }
        }));
    }
    makeMove(socket, move) {
        const moveCount = this.board.history().length;
        if (moveCount % 2 === 0 && socket !== this.player1) {
            console.log('Not player1 turn');
            return;
        }
        if (moveCount % 2 === 1 && socket !== this.player2) {
            console.log('Not player2 turn');
            return;
        }
        try {
            console.log('move board');
            this.board.move(move);
        }
        catch (error) {
            console.log(error);
            return error;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                winner: this.board.turn() === 'w' ? 'black' : 'white'
            }));
            this.player2.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                winner: this.board.turn() === 'w' ? 'black' : 'white'
            }));
            return;
        }
        console.log('enter here');
        if (moveCount % 2) {
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
    }
}
exports.Game = Game;
