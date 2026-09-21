import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-espresso-950 pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900" />
      <div className="persian-pattern absolute inset-0 opacity-15" />

      <div className="relative text-center">
        <p className="font-serif text-8xl text-gold-gradient">404</p>
        <h1 className="mt-4 font-serif text-3xl text-cream-50">Page Not Found</h1>
        <p className="mt-3 text-cream-300">
          The page you are looking for has been moved or no longer exists.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 font-semibold text-espresso-950 shadow-gold transition-transform hover:scale-105"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
