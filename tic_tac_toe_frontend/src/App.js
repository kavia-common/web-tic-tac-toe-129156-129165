import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * A minimal, modern, light-themed Tic Tac Toe game.
 * - Centered 3x3 grid
 * - Player turn indication
 * - Win/draw detection
 * - Reset/New Game button
 * Uses colors:
 *   Primary (#d21919), Accent (#f52d0a), Secondary (#e60f0f)
 */

// Helpers
const initialBoard = Array(9).fill(null);
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

// PUBLIC_INTERFACE
export default function App() {
  /** Game state */
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  /** Derived outcome */
  const winner = useMemo(() => calculateWinner(board), [board]);
  const isDraw = useMemo(() => !winner && board.every((c) => c !== null), [board, winner]);

  /** Status messaging */
  const currentPlayer = xIsNext ? 'X' : 'O';
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "It's a draw!"
    : `Next: ${currentPlayer}`;

  /** Handle a square click */
  // PUBLIC_INTERFACE
  const handleMove = (idx) => {
    if (board[idx] || winner) return; // ignore if occupied or game over
    const next = board.slice();
    next[idx] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext((p) => !p);
  };

  /** Reset/New game */
  // PUBLIC_INTERFACE
  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  return (
    <div className="ttt-app">
      <header className="ttt-header">
        <h1 className="ttt-title" aria-label="Tic Tac Toe">
          Tic Tac Toe
        </h1>
        <p className={`ttt-turn ${winner || isDraw ? 'ttt-muted' : ''}`} aria-live="polite">
          {winner || isDraw ? 'Game Over' : `Player Turn: ${currentPlayer}`}
        </p>
      </header>

      <main className="ttt-main">
        <section className="ttt-grid" role="grid" aria-label="Tic Tac Toe board">
          {board.map((cell, idx) => (
            <button
              key={idx}
              role="gridcell"
              aria-label={`Cell ${idx + 1} ${cell ? `with ${cell}` : 'empty'}`}
              className={`ttt-cell ${cell ? 'filled' : ''}`}
              onClick={() => handleMove(idx)}
              disabled={Boolean(cell) || Boolean(winner)}
            >
              {cell}
            </button>
          ))}
        </section>

        <section className="ttt-status" aria-live="polite">
          <span className={`ttt-badge ${winner ? 'win' : isDraw ? 'draw' : 'next'}`}>{status}</span>
        </section>
      </main>

      <footer className="ttt-footer">
        <button className="ttt-button" onClick={resetGame} aria-label="Start a new game">
          New Game
        </button>
      </footer>
    </div>
  );
}

/** Determine the winner from a board state */
function calculateWinner(squares) {
  for (const [a, b, c] of winningCombos) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) return v;
  }
  return null;
}
