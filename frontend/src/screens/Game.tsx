import Button from "../components/Button"
import Chessboard from "../components/Chessboard"
import useSocket from "../hooks/useSocket"
import { useEffect, useState } from "react"
import { Chess } from "chess.js"
export const INIT_GAME='init_game'
export const MOVE='move'
export const GAME_OVER='game_over'

const Game = () => {
  const socket=useSocket()
  const [chess,setChess]=useState(new Chess())
  const [board,setBoard]=useState(chess.board())
  useEffect(()=>{
    if(!socket) return
    socket.onopen=()=>{
      console.log('Connected to the server')
    }
    socket.onmessage=(event)=>{
      const message=JSON.parse(event.data)
      console.log('Received message:', message)
      switch(message.type){
        case INIT_GAME:
          setChess(new Chess())
          console.log('Game initialized')
          break
        case MOVE:
          const move=message.payload
          chess.move(move)
          setBoard(chess.board())
          console.log('Move received:', message.data)
          break
        case GAME_OVER:
          console.log('Game over:', message.data)
          break
        default:
          console.warn('Unknown message type:', message.type)
      }
    }
    socket.onerror=(error)=>{
      console.error('WebSocket error:', error)
    }
    socket.onclose=()=>{
      console.log('WebSocket connection closed')
    }
  },[socket])
  if(!socket)return <div className="text-white">Connecting...</div>
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className='grid grid-cols-6 gap-4 w-full'>
          <div className="col-span-4 w-full flex justify-center">
            <Chessboard chess={chess} setBoard={setBoard} board={board} socket={socket}/>
          </div>
          <div className="col-span-2 bg-slate-900 w-full flex justify-center">
            <div className="pt-8">
              <Button onClick={()=>socket.send(JSON.stringify({
                  type:INIT_GAME
                }))
              } children='Play Game'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game