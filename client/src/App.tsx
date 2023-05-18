import "./App.css";
import { useEffect, useState } from "react";
import { Chess } from "chess.ts";
import { Chessboard } from "react-chessboard";

function App() {
  const [game, setGame] = useState<Chess>(new Chess());

  //makes sure black piece moves right after white pieces
  useEffect(() => {
    if (game.turn() === "b") {
      makeRandomMove();
    }
  }, [game]);

  //makes sure game state is mutated safely
  function safeGameMutate(previousGame: (game: Chess) => void): void {
    setGame((g: Chess) => {
      const newGame = new Chess(g.fen());
      previousGame(newGame);
      return newGame;
    });
  }

  //makes random move for black piece AI
  function makeRandomMove() {
    const possibleMoves = game.moves();
    // Exit if the game is over
    if (game.gameOver()) return;

    // Select a random move
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const randomMove = possibleMoves[randomIndex];

    // Play the random move
    safeGameMutate((game: Chess) => {
      game.move(randomMove);
    });
  }

  //performs move onDrop of chess piece
  function onDrop(sourceSquare: string, targetSquare: string): boolean {
    let move = null;

    safeGameMutate((game) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
    });

    if (move === null) return false;

    return true;
  }
  //returns the rendered chessboard with the current gamepieces and with the onPieceDrop function
  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}

export default App;
