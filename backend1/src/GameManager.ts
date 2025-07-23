import { WebSocket } from "ws"
import { INIT_GAME,MOVE } from "./messages"
import { Game } from "./Game"

export class GameManage{
    private games:Game[]
    private users:WebSocket[]
    private pendingUser:WebSocket|null
    constructor(){
        this.games=[]
        this.users=[]
        this.pendingUser=null
    }
    addUser(socket:WebSocket){
        this.users.push(socket)
        this.addHandler(socket)
    }
    removeUser(socket:WebSocket){
        this.users=this.users.filter(user=>user!=socket)
    }
    private addHandler(socket:WebSocket){
        socket.on('message',(data)=>{
            const message=JSON.parse(data.toString())
            if(message.type==INIT_GAME){
                if (this.pendingUser) {
                const game = new Game(this.pendingUser, socket); // ✅ correct order
                this.pendingUser = null;
                this.games.push(game);
                }

                else{
                    this.pendingUser=socket
                }
            }
            if(message.type==MOVE){
                console.log('inside move');
                const game=this.games.find(game=>game.player1===socket||game.player2===socket)
                if(game){
                    console.log('makes move');
                    game.makeMove(socket,message.move)
                }
            }
        })
    }
}
