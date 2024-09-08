import Button from '@/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <p className="text-2xl my-4 ">
        Oops! The page you&apos;re looking for can&apos;t be found.
      </p>
      <Button>
        <Link href="/" className="px-4 py-2 text-white rounded">
          Go back to the homepage
        </Link>
      </Button>
    </div>
  );
}
