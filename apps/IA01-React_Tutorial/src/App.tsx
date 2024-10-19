import Square from "./components/Square";
import { CellStatus, GameStatus, IPlayer } from "./utils/types";
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
        undo,
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
        <section className="h-screen grid place-content-center">
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
                                            (cell) =>
                                                cell[0] === row &&
                                                cell[1] === col
                                        )
                                            ? CellStatus.Highlighted
                                            : CellStatus.Normal
                                    }
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

                <div className="mt-8 md:mt-0 md:absolute md:top-0 md:left-full md:ml-8 flex flex-col gap-2 w-full">
                    <p className="text-lg">History</p>

                    {history.length > 0 && (
                        <>
                            <div className="grid grid-cols-3 gap-1">
                                {history[history.length - 1].map((line, row) =>
                                    line.map((cell, col) => (
                                        <Square
                                            key={`${row}-${col}`}
                                            renderContent={cell}
                                            contentColor="slate-400"
                                            status={CellStatus.Disabled}
                                        />
                                    ))
                                )}
                            </div>

                            <button
                                onClick={undo}
                                className="mt-4 bg-slate-500 hover:bg-slate-400 transition-colors text-white rounded px-4 py-2"
                            >
                                Undo
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default App;
