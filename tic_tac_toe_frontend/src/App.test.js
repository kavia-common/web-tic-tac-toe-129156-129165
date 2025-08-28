import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('allows players to play and detects a win', () => {
  render(<App />);
  const cells = screen.getAllByRole('gridcell');
  // X moves
  fireEvent.click(cells[0]); // X
  // O moves
  fireEvent.click(cells[3]); // O
  // X moves
  fireEvent.click(cells[1]); // X
  // O moves
  fireEvent.click(cells[4]); // O
  // X moves to win
  fireEvent.click(cells[2]); // X

  expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
});

test('reset button starts a new game', () => {
  render(<App />);
  const cells = screen.getAllByRole('gridcell');
  fireEvent.click(cells[0]); // X
  fireEvent.click(screen.getByRole('button', { name: /New Game/i }));
  expect(cells[0].textContent).toBe('');
});
