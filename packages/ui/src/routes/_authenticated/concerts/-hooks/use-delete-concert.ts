import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queries } from '@/constants';
import buildErrorToast from '@/helpers/build-error-toast';
import { useApi } from '@/hooks/useApi';
import { deleteConcert } from '../-queryFns/mutations';

export function useDeleteConcert() {
  const api = useApi();
  const queryClient = useQueryClient();
  const onError = buildErrorToast(
    'Error inserting new concert',
    'Please try again and/or check logs',
  );

  const mutation = useMutation({
    mutationFn: (id: string) => deleteConcert(api, id),
    onError,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queries.GET_CONCERTS] });

      toast.success('Concert deleted', {
        closeButton: true,
        position: 'top-right',
        richColors: true,
      });
    },
  });

  return mutation;
}
