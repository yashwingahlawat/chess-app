import { WebSocketServer } from 'ws';
import { GameManage } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });

const gameManage=new GameManage()
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  gameManage.addUser(ws)
  ws.on('close',()=>{
    gameManage.removeUser(ws)
  })

  ws.send('somethingok');
});
