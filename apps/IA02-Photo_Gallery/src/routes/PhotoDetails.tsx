import { useParams } from 'react-router-dom';

const PhotoDetailsScreen = () => {
  const { id } = useParams();

  return <div>Photo ID: {id}</div>;
};

export default PhotoDetailsScreen;
