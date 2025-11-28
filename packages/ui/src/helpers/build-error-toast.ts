import { toast } from 'sonner';

export default function buildErrorToast(
  toastMessage: string,
  toastDescription: string,
) {
  return (errorMessage: Error) => {
    console.error(errorMessage);
    toast.error(toastMessage, {
      closeButton: true,
      description: toastDescription,
      position: 'top-right',
      richColors: true,
    });
  };
}
