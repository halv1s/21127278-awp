import { FC } from 'react';
import { IPhoto } from '../utils/types';

interface Props {
  photo: IPhoto;
}

const PhotoPreview: FC<Props> = ({ photo }) => {
  return (
    <div className="group flex flex-col gap-2 w-full sm:max-w-72 md:max-w-80">
      <img
        className="w-full aspect-square object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
        src={photo.thumb}
        alt={photo.desc}
      />
      <div className="flex items-center gap-2 group-hover:translate-y-4 transition-all duration-300">
        <img
          className="w-7 h-7 object-cover rounded-full border border-slate-500"
          src={photo.authorAvatar}
        />
        <p className="text-lg text-slate-400 cursor-default line-clamp-1">
          {photo.authorName}
        </p>
      </div>
    </div>
  );
};

export default PhotoPreview;
