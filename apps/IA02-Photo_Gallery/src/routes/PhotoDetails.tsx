import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { IPhoto, QueryKey } from '../utils/types';
import Loading from '../components/Loading';
import { useState } from 'react';
import localPhotoRawJson from '../utils/localCache/photos.json';

const PhotoDetailsScreen = () => {
  const { id } = useParams();

  const [isRateLimited, setIsRateLimited] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [`photo-${id}`],
    queryFn: async () => {
      let cachedPhotos: IPhoto[] = [];

      const cachedData = queryClient.getQueryData([QueryKey.Photos]) as {
        pages: {
          data: IPhoto[];
        }[];
      };

      if (cachedData) {
        cachedPhotos = cachedData.pages.reduce((acc, cur) => {
          return [...acc, ...cur.data];
        }, [] as IPhoto[]);
      } else {
        cachedPhotos = localPhotoRawJson.map((localPhoto) => ({
          id: localPhoto.id,
          url: localPhoto.urls.full,
          thumb: localPhoto.urls.thumb,
          authorName: localPhoto.user.name,
          authorAvatar: localPhoto.user.profile_image.medium,
          desc: localPhoto.description || localPhoto.alt_description,
        }));
      }

      const cachedPhoto = cachedPhotos.find((photo) => photo.id === id);

      if (cachedPhoto) {
        console.log('--> cache hit');
        return cachedPhoto;
      } else {
        console.log('--> cache missed');
      }

      const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
      });

      const photo = await res.json();

      if (res.status === 403) {
        setIsRateLimited(true);
      } else if (res.status >= 200 && res.status <= 299) {
        return {
          id: photo.id,
          url: photo.urls.full,
          thumb: photo.urls.thumb,
          authorName: photo.user.name,
          authorAvatar: photo.user.profile_image.medium,
          desc: photo.description || photo.alt_description,
        };
      }

      return null;
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen grid place-content-center">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen grid place-content-center">
        <p className="text-2xl">
          {isRateLimited ? 'Rate limited' : 'Photo not found!'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 flex flex-col items-center gap-4 md:gap-8">
      <h2 className="text-2xl text-center text-pretty">{data.desc}</h2>
      <img src={data.url} className="max-h-96 rounded-lg" />
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-semibold">
          by <span className="text-sky-700">{data.authorName}</span>
        </p>
        <img src={data.authorAvatar} className="w-16 h-16 rounded-full" />
      </div>
    </div>
  );
};

export default PhotoDetailsScreen;
