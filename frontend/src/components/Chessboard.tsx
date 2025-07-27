import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

const Chessboard = ({chess,board,socket,setBoard}:{chess:any,board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][],socket:WebSocket,setBoard:any}) => {
  const [from,setFrom]=useState<null|Square>(null)
  const [to,setTo]=useState<null|Square>(null)
  return (
    <div className="text-shadow-fuchsia-200">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            const squareRepresentation = String.fromCharCode (97 + (j%8)) + ""+ (8 - i) as Square 
            return <div onClick={()=>{
              if(!from){
                setFrom(squareRepresentation)
              }
              else {
                setTo(square?.square??null)
                socket.send(JSON.stringify({
                  type:MOVE,
                  payload:{
                    move:{
                      from,
                      to:squareRepresentation
                    }
                  }
                }))
                setFrom(null)
                chess.move({
                    from,
                    to:squareRepresentation
                  })
                  setBoard(chess.board())
                console.log(from,squareRepresentation);
              }
            }}
              key={j}
              className={`h-16 w-16 flex items-center justify-center border ${(i+j)%2 ? "bg-green-500" : "bg-white"
              }`}
            >
              <div className="w-full flex justify-center">
                {square ? square.type : ""}
              </div>
            </div>
    })}
        </div>
      ))}
    </div>
  )
}

export default Chessboard;