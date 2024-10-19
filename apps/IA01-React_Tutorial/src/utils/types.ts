export enum ISquare {
    X,
    O,
    Empty,
}

export enum IPlayer {
    X = "X",
    O = "O",
}

export enum CellStatus {
    Normal,
    Highlighted,
    Disabled,
}

export enum GameStatus {
    OnGoing,
    Draw,
    X_Win,
    O_Win,
}
