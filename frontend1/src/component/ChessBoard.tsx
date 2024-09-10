import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const Chessboard = ({
  board,socket,setBoard,chess
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket:WebSocket;
  setBoard:any;
  chess:any;
}) => {
  const [from,setFrom] = useState<null |Square>(null);
  const [validMoves, setValidMoves] = useState<null | Square[]>(null);
  const [isMate,setIsMate] = useState(false);
  
  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square,j) => {
              const squareRepresentation = String.fromCharCode(97 + ( j % 8)) + "" + (8-i) as Square;
              const isHighlighted = validMoves?.includes(squareRepresentation);
              
              return (
                <div
                onClick={()=>{
                  if(!from){
                    if(chess.isCheckmate()){
                      setIsMate(true);
                    }
                    setFrom(squareRepresentation);
                    const moves = chess.moves({ square: squareRepresentation, verbose: true }).map((move:any) => move.to as Square);
                    setValidMoves(moves);

                  }else{
                    socket.send(JSON.stringify({
                      type:MOVE,
                      payload:{
                        move:{
                          from,
                          to:squareRepresentation
                        }
                      }
                    }))
                    setFrom(null);
                    setValidMoves(null);
                    chess.move({
                        from,
                        to:squareRepresentation
                    });
                    setBoard(chess.board());
                    console.log({
                      from,
                      to:squareRepresentation
                    })
                  }
                }}
                  key={j}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? "bg-emerald-300" : "bg-stone-500"
                  } ${isHighlighted ? "bg-slate-600" : ""}`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? <img className="w-6 rotate-17" src={`/${square?.color ==="b"? square?.type : `${square?.type?.toUpperCase()} copy` }.png`} alt="" />:null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="text-white">
      {isMate? "You won":null}
      HELLO
      </div>
    </div>
  );
};
