import Square from './components/Square';
import { CellStatus, GameStatus, IPlayer } from './utils/types';
import { useTicTacToe } from './utils/hooks';
import { useState } from 'react';

function App() {
  const {
    board,
    currentTurn,
    gameStatus,
    historyBoard,
    historyMoves,
    winningCells,
    handleMove,
    resetGame,
    undo,
  } = useTicTacToe();

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const content = (() => {
    if (gameStatus !== GameStatus.OnGoing) {
      return gameStatus === GameStatus.Draw
        ? 'Draw'
        : `Player ${gameStatus === GameStatus.X_Win ? IPlayer.X : IPlayer.O} won!`;
    }

    return `${currentTurn} turn`;
  })();

  const sortedMoves = [...historyMoves];
  if (sortOrder === 'desc') {
    sortedMoves.reverse();
  }

  return (
    <section className="min-h-screen p-4 grid place-content-center">
      <div className="relative">
        <div className="grid place-content-center gap-2">
          <p className="text-lg">{content}</p>

          <div className="grid grid-cols-3 gap-1">
            {board.map((line, row) =>
              line.map((cell, col) => (
                <Square
                  key={`${row}-${col}`}
                  renderContent={cell}
                  status={
                    winningCells.some(
                      (cell) => cell[0] === row && cell[1] === col,
                    )
                      ? CellStatus.Highlighted
                      : CellStatus.Normal
                  }
                  onClick={() => handleMove(cell, row, col)}
                />
              )),
            )}
          </div>

          <button
            onClick={resetGame}
            className="mt-4 bg-sky-700 hover:bg-sky-600 transition-colors text-white rounded px-4 py-2"
          >
            Reset Game
          </button>
        </div>

        <div className="mt-12 md:mt-0 md:absolute md:top-0 md:right-full md:mr-8 flex flex-col gap-2 w-full">
          <p className="text-lg">History</p>

          <div className="flex flex-col items-center gap-2 w-full">
            <button
              onClick={undo}
              className="w-full bg-sky-500 hover:bg-slate-400 transition-colors text-white rounded px-4 py-2"
            >
              Undo
            </button>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="w-full bg-slate-500 hover:bg-slate-400 transition-colors text-white rounded px-4 py-2"
            >
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>

          {historyMoves.length > 0 && (
            <>
              <div className="flex flex-col gap-1">
                {sortedMoves.map((move, index) => (
                  <div className="flex items-center">
                    <p className="w-8 text-slate-500">
                      #
                      {sortOrder === 'asc'
                        ? index
                        : sortedMoves.length - index - 1}
                      :
                    </p>
                    <p>
                      {move[0]}, {move[1]}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-12 md:mt-0 md:absolute md:top-0 md:left-full md:ml-8 flex flex-col gap-2 w-full">
          <p className="text-lg">Previous Board</p>

          {historyBoard.length > 0 && (
            <>
              <div className="grid grid-cols-3 gap-1">
                {historyBoard[historyBoard.length - 1].map((line, row) =>
                  line.map((cell, col) => (
                    <Square
                      key={`${row}-${col}`}
                      renderContent={cell}
                      contentColor="slate-400"
                      status={CellStatus.Disabled}
                    />
                  )),
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
