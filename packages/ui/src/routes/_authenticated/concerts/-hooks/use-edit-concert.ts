import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type OnOpenChange, queries } from '@/constants';
import buildErrorToast from '@/helpers/build-error-toast';
import { useApi } from '@/hooks/useApi';
import type { Concert } from '../-models/ConcertModel';
import { editConcert } from '../-queryFns/mutations';

export function useEditConcert(onOpenChange: OnOpenChange) {
  const api = useApi();
  const queryClient = useQueryClient();
  const onError = buildErrorToast(
    'Error updating concert',
    'Please try again and/or check logs',
  );

  const mutation = useMutation({
    mutationFn: (data: Concert) => editConcert(api, data),
    onError,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queries.GET_CONCERTS] });
      onOpenChange(false);
    },
  });

  return mutation;
}
