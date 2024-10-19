import { Link, Outlet } from 'react-router-dom';

const RootScreen = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-sky-500 p-4">
        <Link to="/" className="text-white font-semibold text-2xl">
          Photo Gallery
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default RootScreen;
