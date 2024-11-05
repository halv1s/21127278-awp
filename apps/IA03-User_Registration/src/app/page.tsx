import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Link href="/register">
        <button>Register</button>
      </Link>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
