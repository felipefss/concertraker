import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queries } from '@/constants';
import { useApi } from '@/hooks/useApi';
import type { ConcertFormValues } from '../-models/ConcertModel';
import { insertConcert } from '../-queryFns/mutations';

type OnOpenChange = (open: boolean) => void;

export function useInsertConcert(onOpenChange: OnOpenChange) {
  const api = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ConcertFormValues) => insertConcert(api, data),
    onError: (error) => {
      console.error(error);
      toast.error('Something went wrong', {
        closeButton: true,
        description: 'Please try again and/or check logs',
        position: 'top-right',
        richColors: true,
      });
    },
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
