import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
  return (
    <div className="h-screen grid place-content-center text-center gap-4">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p>Page not found</p>
      <Link to="/" className="text-sky-500 underline">
        Back to home
      </Link>
    </div>
  );
};

export default NotFoundScreen;
