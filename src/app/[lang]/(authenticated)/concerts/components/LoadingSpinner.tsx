import { LoaderCircle } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex w-full h-60 justify-center items-center">
      <LoaderCircle className="animate-spin" color="teal" size={60} />
    </div>
  );
}
