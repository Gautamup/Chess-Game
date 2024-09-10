import { WebSocket } from 'ws';
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from './message';
export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private moveCount = 0;
    private startTime: Date;
    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();

        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }));

        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }));
    }

    makeMove(socket: WebSocket, move: {
        from: string,
        to: string
    }) {


        //Validation the type of move using zod

        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }

        try {
            this.board.move(move);
        } catch (err) {
            console.log(err);
            return;
        }
        //is its users move
        //Is the move vailid
        
        //update the board
        // push the move
        //done using chess.js lib
        
        
        // check if the game is over
        if (this.board.isGameOver()) {
            console.log("Game over");
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "BLACK" : "white"
                }
            }))
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "BLACK" : "white"
                }
            }))
            return;
        } 
        
        if(this.moveCount %2 === 0){
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        this.moveCount++;

        //send the updated board to both player

    }
}