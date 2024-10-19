import { useState } from "react";
import { GameStatus, IPlayer, ISquare } from "./types";

export const useTicTacToe = () => {
    const [board, setBoard] = useState<ISquare[][]>(emptyBoard);

    const [currentTurn, setCurrentTurn] = useState(IPlayer.X);

    const [history, setHistory] = useState<(typeof board)[]>([]);

    const [gameStatus, setGameStatus] = useState<GameStatus>(
        GameStatus.OnGoing
    );

    const [winningCells, setWinningCells] = useState<number[][]>([]);

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

    const handleMove = (cell: ISquare, row: number, col: number) => {
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

    return {
        board,
        currentTurn,
        history,
        gameStatus,
        winningCells,
        handleMove,
        resetGame,
    };
};

const emptyBoard = [
    [ISquare.Empty, ISquare.Empty, ISquare.Empty],
    [ISquare.Empty, ISquare.Empty, ISquare.Empty],
    [ISquare.Empty, ISquare.Empty, ISquare.Empty],
];

export const winningCombinations = [
    // Rows
    [
        [0, 0],
        [0, 1],
        [0, 2],
    ],
    [
        [1, 0],
        [1, 1],
        [1, 2],
    ],
    [
        [2, 0],
        [2, 1],
        [2, 2],
    ],
    // Columns
    [
        [0, 0],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 1],
        [1, 1],
        [2, 1],
    ],
    [
        [0, 2],
        [1, 2],
        [2, 2],
    ],
    // Diagonals
    [
        [0, 0],
        [1, 1],
        [2, 2],
    ],
    [
        [0, 2],
        [1, 1],
        [2, 0],
    ],
];
