import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import PhotoPreview from '../components/PhotoPreview';
import localPhotos from '../utils/localCache/photos.json';
import { IPhoto, QueryKey } from '../utils/types';

const cachedPhotos: IPhoto[] = localPhotos.map((localPhoto) => ({
  id: localPhoto.id,
  url: localPhoto.urls.full,
  thumb: localPhoto.urls.thumb,
  authorName: localPhoto.user.name,
  authorAvatar: localPhoto.user.profile_image.medium,
  desc: localPhoto.description || localPhoto.alt_description,
}));

const photosPerPage = 30;

function PhotosScreen() {
  const [isCachedPhotosShown, setIsCachedPhotoShown] = useState(false);

  const { status, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QueryKey.Photos],
    queryFn: async ({
      pageParam,
    }): Promise<{
      data: Array<IPhoto>;
      previousId: number | null;
      nextId: number | null;
    }> => {
      const res = await fetch(
        `https://api.unsplash.com/photos?page=${pageParam}&per_page=${photosPerPage}`,
        {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
          },
        },
      );

      if (res.status === 403) {
        return {
          data: [],
          previousId: pageParam > 1 ? pageParam - 1 : null,
          nextId: null,
        };
      }

      const rawData: typeof localPhotos = await res.json();

      const photos: IPhoto[] = [];

      rawData.forEach((photo) => {
        photos.push({
          id: photo.id,
          url: photo.urls.full,
          thumb: photo.urls.thumb,
          authorName: photo.user.name,
          authorAvatar: photo.user.profile_image.medium,
          desc: photo.description || photo.alt_description,
        });
      });

      return {
        data: photos,
        previousId: pageParam > 1 ? pageParam - 1 : null,
        nextId: pageParam + 1,
      };
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.previousId,
    getNextPageParam: (lastPage) => lastPage.nextId,
    retry: 0,
  });

  const [isBackdropShown, setIsBackdropShown] = useState(false);

  if (status === 'pending') {
    return (
      <div className="h-screen grid place-content-center">
        <Loading />
      </div>
    );
  }

  if (data === undefined) {
    return (
      <div className="h-screen grid place-content-center">
        <p className="text-2xl">No photos are available</p>
      </div>
    );
  }

  const photos = data.pages.reduce((acc, cur) => {
    return [...acc, ...cur.data];
  }, [] as IPhoto[]);

  return (
    <section className="flex justify-center px-4 py-8 md:px-8 md:py-12">
      <div
        className={`fixed inset-0 w-screen h-screen bg-black/70 z-10 transition-opacity duration-500 ${
          isBackdropShown ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <InfiniteScroll
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 no-scrollbar"
        style={{
          overflow: 'visible',
        }}
        dataLength={photos.length}
        hasMore={hasNextPage}
        loader={
          <div className="col-span-3 grid place-content-center">
            <Loading />
          </div>
        }
        next={fetchNextPage}
      >
        {photos.map((photo) => (
          <Link
            key={photo.id}
            to={`/photos/${photo.id}`}
            onMouseEnter={() => setIsBackdropShown(true)}
            onMouseLeave={() => setIsBackdropShown(false)}
            className="hover:z-20"
          >
            <PhotoPreview photo={photo} />
          </Link>
        ))}

        {!hasNextPage && (
          <div className="col-span-3 flex flex-col items-center gap-4">
            <div className="text-center text-xl text-slate-700">
              <p>Unsplash API has rate limited my access key</p>
              <p>This is a demo project, I have only 50req/hour</p>
            </div>

            <button
              className="bg-sky-700 hover:bg-sky-600 disabled:bg-slate-500 transition-colors rounded-lg text-lg text-white px-6 py-2"
              disabled={isCachedPhotosShown}
              onClick={() => setIsCachedPhotoShown(true)}
            >
              {isCachedPhotosShown
                ? 'Cached photos rendered below'
                : 'Render cached photos'}
            </button>
          </div>
        )}

        {isCachedPhotosShown &&
          cachedPhotos.map((photo) => (
            <Link
              key={photo.id}
              to={`/photos/${photo.id}`}
              onMouseEnter={() => setIsBackdropShown(true)}
              onMouseLeave={() => setIsBackdropShown(false)}
              className="hover:z-20"
            >
              <PhotoPreview photo={photo} />
            </Link>
          ))}
      </InfiniteScroll>
    </section>
  );
}

export default PhotosScreen;
