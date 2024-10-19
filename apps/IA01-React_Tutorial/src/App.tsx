import Square from "./components/Square";
import { GameStatus, IPlayer } from "./utils/types";
import { useTicTacToe } from "./utils/hooks";

function App() {
    const {
        board,
        currentTurn,
        gameStatus,
        history,
        winningCells,
        handleMove,
        resetGame,
    } = useTicTacToe();

    const content = (() => {
        if (gameStatus !== GameStatus.OnGoing) {
            return gameStatus === GameStatus.Draw
                ? "Draw"
                : `Player ${gameStatus === GameStatus.X_Win ? IPlayer.X : IPlayer.O} won!`;
        }

        return `${currentTurn} turn`;
    })();

    return (
        <div className="h-screen grid place-content-center gap-2">
            <p className="text-lg">{content}</p>

            <div className="grid grid-cols-3 gap-1">
                {board.map((line, row) =>
                    line.map((cell, col) => (
                        <Square
                            key={`${row}-${col}`}
                            renderContent={cell}
                            isHighlighted={winningCells.some(
                                (cell) => cell[0] === row && cell[1] === col
                            )}
                            onClick={() => handleMove(cell, row, col)}
                        />
                    ))
                )}
            </div>

            <button
                onClick={resetGame}
                className="mt-4 bg-sky-700 hover:bg-sky-600 transition-colors text-white rounded px-4 py-2"
            >
                Reset Game
            </button>
        </div>
    );
}

export default App;
