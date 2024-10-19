import { FC } from 'react';
import { CellStatus, ISquare } from '../utils/types';

interface Props {
  renderContent: ISquare;
  status: CellStatus;
  contentColor?: string;
  onClick?: () => void;
}

const Square: FC<Props> = ({
  renderContent,
  status,
  contentColor = 'slate-700',
  onClick,
}) => {
  const cellStyleByStatus = (() => {
    let className = '';

    if (status === CellStatus.Normal) {
      className = 'border-sky-700 hover:bg-sky-200';
    }

    if (status === CellStatus.Highlighted) {
      className = 'border-emerald-500';
    }

    if (status === CellStatus.Disabled) {
      className = 'border-slate-300 cursor-default';
    }

    return className;
  })();

  return (
    <button
      className={`w-12 h-12 rounded border-2 grid place-content-center transition-colors  ${cellStyleByStatus}`}
      onClick={onClick}
    >
      {renderContent === ISquare.X && (
        <div className="relative">
          <div className={`absolute w-0.5 h-6 rotate-45 bg-${contentColor}`} />
          <div className={`w-0.5 h-6 -rotate-45 bg-${contentColor}`} />
        </div>
      )}

      {renderContent === ISquare.O && (
        <div
          className={`w-6 h-6 rounded-full border-2 border-${contentColor}`}
        />
      )}
    </button>
  );
};

export default Square;
