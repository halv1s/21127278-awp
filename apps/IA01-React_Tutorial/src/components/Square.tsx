import { FC } from "react";
import { ISquare } from "../utils/types";

interface Props {
    renderContent: ISquare;
    isHighlighted?: boolean;
    onClick: () => void;
}

const Square: FC<Props> = ({
    renderContent,
    isHighlighted = false,
    onClick,
}) => {
    return (
        <button
            className={`w-12 h-12 rounded border-2  ${isHighlighted ? "border-emerald-500" : "border-sky-700"} text-2xl grid place-content-center hover:bg-sky-200 transition-colors`}
            onClick={onClick}
        >
            {renderContent === ISquare.X && (
                <div className="relative">
                    <div className="absolute w-0.5 h-6 rotate-45 bg-slate-700" />
                    <div className="w-0.5 h-6 -rotate-45 bg-slate-700" />
                </div>
            )}

            {renderContent === ISquare.O && (
                <div className="w-6 h-6 rounded-full border-2 border-slate-700" />
            )}
        </button>
    );
};

export default Square;
