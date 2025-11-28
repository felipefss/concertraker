import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type OnOpenChange, queries } from '@/constants';
import buildErrorToast from '@/helpers/build-error-toast';
import { useApi } from '@/hooks/useApi';
import type { ConcertFormValues } from '../-models/ConcertModel';
import { insertConcert } from '../-queryFns/mutations';

export function useInsertConcert(onOpenChange: OnOpenChange) {
  const api = useApi();
  const queryClient = useQueryClient();
  const onError = buildErrorToast(
    'Error inserting new concert',
    'Please try again and/or check logs',
  );

  const mutation = useMutation({
    mutationFn: (data: ConcertFormValues) => insertConcert(api, data),
    onError,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queries.GET_CONCERTS] });
      onOpenChange(false);
      toast.success('Concert added', {
        closeButton: true,
        position: 'top-right',
        richColors: true,
      });
    },
  });

  return mutation;
}
