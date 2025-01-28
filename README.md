# Chess Game

A real-time chess game built using TypeScript, WebSocket, React, and Chess.js. This project allows you to play chess online with a friend, validating moves and ensuring a fair game.

## Features

### Completed Features:
- Start a new chess game and play with a friend.
- Validates moves to prevent illegal actions.
- Displays the winner at the end of the game.

### Upcoming Features:
- Timer for each player's moves.
- Pawn promotion logic.
- Player rating system.
- Deployment to a live server.

## Screenshots

### Home Screen
![Home Screen](screenshots/image1.png)

### Gameplay Screen
![Gameplay Screen](screenshots/image2.png)

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js, TypeScript, WebSocket
- **Game Logic**: Chess.js

## Installation and Running Locally

Follow these steps to set up and run the project locally:

### Prerequisites
- Node.js installed (version 16.x or later recommended)
- TypeScript installed globally (`npm install -g typescript`)
### How to Run Locally

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Gautamup/Chess-Game.git
   cd Chess-Game
   ```

2. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

3. Install frontend dependencies:
   ```bash
   npm install
   ```

4. Navigate to the `backend` folder:
   ```bash
   cd ../backend
   ```

5. Install backend dependencies:
   ```bash
   npm install
   ```

6. Compile TypeScript to JavaScript:
   ```bash
   tsc -b
   ```

7. Navigate to the `dist` folder and start the backend server:
   ```bash
   cd dist
   node index.js
   ```

8. Return to the `frontend` folder and start the development server:
   ```bash
   cd ../../frontend
   npm run dev
   ```

9. Open your browser and navigate to the development server URL (usually `http://localhost:3000`).

## Contribution

Feel free to fork the repository and create a pull request if you would like to contribute to the project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

