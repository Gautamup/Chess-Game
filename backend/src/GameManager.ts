import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./message";
import {Game} from "./Game"
// interface Game {
//     id: number,
//     name: string,
//     player1: WebSocket,
//     player2: WebSocket,
// }
export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private Users: WebSocket[];
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.Users = [];
    }
    addUser(socket: WebSocket) {
        this.Users.push(socket);    
        this.addHandler(socket);
    }
    removeUser(socket: WebSocket) {
        this.Users = this.Users.filter(user => user !== socket);
        // stop game user left
    }
    private addHandler(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            if (message.type == INIT_GAME) {
                if (this.pendingUser) {
                    // start game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = socket;
                }
            }

            if(message.type == MOVE){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                    if(game){
                        game.makeMove(socket ,message.payload.move);
                    }
                
            }
        })
    }
}