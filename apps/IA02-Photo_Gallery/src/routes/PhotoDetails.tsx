import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { IPhoto, QueryKey } from '../utils/types';
import Loading from '../components/Loading';

const PhotoDetailsScreen = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [`photo-${id}`],
    queryFn: async () => {
      const cachedPhotos =
        (queryClient.getQueryData([QueryKey.Photos]) as IPhoto[]) || [];
      const cachedPhoto = cachedPhotos.find((photo) => photo.id === id);
      if (cachedPhoto) {
        return cachedPhoto;
      }

      // TODO: use api to get the specific photo

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
        <p className="text-2xl">Photo not found!</p>
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
