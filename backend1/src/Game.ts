import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game{
    public player1:WebSocket
    public player2:WebSocket
    private board:Chess
    private startTime:Date
    constructor(player1:WebSocket,player2:WebSocket){
        this.player1=player1
        this.player2=player2
        this.startTime=new Date
        this.board=new Chess()
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:'white'
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:'black'
            }
        }))
    }
    makeMove(socket:WebSocket,move:{
        from:string,
        to:string
    }){
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
            this.board.move(move)
        } catch (error) {
            console.log(error);
            return error
        }
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                winner:this.board.turn()==='w'?'black':'white'
            }))
            this.player2.send(JSON.stringify({
                type:GAME_OVER,
                winner:this.board.turn()==='w'?'black':'white'
            }))
            return
        }
        console.log('enter here');
        if(moveCount%2){
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        else{
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
    }
}