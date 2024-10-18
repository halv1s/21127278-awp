import { useState } from "react";
import Square from "./components/Square";
import { GameStatus, IPlayer, ISquare } from "./utils/types";
import { winningCombinations } from "./utils/constants";

const checkBoardResult = (newBoard: ISquare[][]) => {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            newBoard[a[0]][a[1]] !== ISquare.Empty &&
            newBoard[a[0]][a[1]] === newBoard[b[0]][b[1]] &&
            newBoard[a[0]][a[1]] === newBoard[c[0]][c[1]]
        ) {
            return {
                result:
                    newBoard[a[0]][a[1]] === ISquare.X
                        ? GameStatus.X_Win
                        : GameStatus.O_Win,
                winningCells: combination,
            };
        }
    }

    const isBoardFull = newBoard.every((row) =>
        row.every((cell) => cell !== ISquare.Empty)
    );

    return {
        result: isBoardFull ? GameStatus.Draw : GameStatus.OnGoing,
        winningCells: [],
    };
};

function App() {
    const [board, setBoard] = useState<ISquare[][]>([
        [ISquare.Empty, ISquare.Empty, ISquare.Empty],
        [ISquare.Empty, ISquare.Empty, ISquare.Empty],
        [ISquare.Empty, ISquare.Empty, ISquare.Empty],
    ]);

    const [currentTurn, setCurrentTurn] = useState(IPlayer.X);

    const [history, setHistory] = useState<(typeof board)[]>([]);

    const [gameStatus, setGameStatus] = useState<GameStatus>(
        GameStatus.OnGoing
    );

    const [winningCells, setWinningCells] = useState<number[][]>([]);

    const handleClick = (cell: ISquare, row: number, col: number) => {
        if (cell !== ISquare.Empty || gameStatus !== GameStatus.OnGoing) return;

        const newBoard = board.map((line, r) =>
            line.map((c, cIndex) =>
                r === row && cIndex === col
                    ? currentTurn === IPlayer.X
                        ? ISquare.X
                        : ISquare.O
                    : c
            )
        );

        setHistory([...history, board]);

        setBoard(newBoard);

        const { result, winningCells } = checkBoardResult(newBoard);
        if (result !== GameStatus.OnGoing) {
            setWinningCells(winningCells);
            setGameStatus(result);
            return;
        }

        setCurrentTurn(currentTurn === IPlayer.X ? IPlayer.O : IPlayer.X);
    };

    const resetGame = () => {
        setBoard([
            [ISquare.Empty, ISquare.Empty, ISquare.Empty],
            [ISquare.Empty, ISquare.Empty, ISquare.Empty],
            [ISquare.Empty, ISquare.Empty, ISquare.Empty],
        ]);
        setCurrentTurn(IPlayer.X);
        setGameStatus(GameStatus.OnGoing);
        setWinningCells([]);
        setHistory([]);
    };

    const content = (() => {
        if (gameStatus !== GameStatus.OnGoing) {
            return gameStatus === GameStatus.Draw
                ? "Draw"
                : `Player ${gameStatus} won!`;
        }

        return `Turn: ${currentTurn}`;
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
                            onClick={() => handleClick(cell, row, col)}
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
