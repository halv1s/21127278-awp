import { useQuery } from '@tanstack/react-query';
import { IPhoto, QueryKey } from '../utils/types';
import localPhotos from '../utils/localCache/photos.json';
import Loading from '../components/Loading';
import PhotoPreview from '../components/PhotoPreview';
import { useState } from 'react';

function RootScreen() {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.Photos],
    queryFn: async () => {
      // Simulate a loading delay from 1 -> 2 secs
      const delay = Math.floor(Math.random() * 1000) + 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));

      const photos: IPhoto[] = [];
      localPhotos.forEach((localPhoto) => {
        photos.push({
          id: localPhoto.id,
          url: localPhoto.urls.full,
          thumb: localPhoto.urls.thumb,
          authorName: localPhoto.user.name,
          authorAvatar: localPhoto.user.profile_image.medium,
          desc: localPhoto.description || localPhoto.alt_description,
        });
      });
      return photos;
    },
  });

  const [isBackdropShown, setIsBackdropShown] = useState(false);

  if (isLoading || data === undefined) {
    return (
      <div className="h-screen grid place-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 flex justify-center px-4 py-8 md:px-8 md:py-12">
      <div
        className={`fixed inset-0 w-screen h-screen bg-black/70 z-10 transition-opacity duration-500 ${
          isBackdropShown ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((photo) => (
          <div
            key={photo.id}
            onMouseEnter={() => setIsBackdropShown(true)}
            onMouseLeave={() => setIsBackdropShown(false)}
            className="hover:z-20"
          >
            <PhotoPreview photo={photo} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default RootScreen;
