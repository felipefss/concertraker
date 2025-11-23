import type { AxiosInstance } from 'axios';
import type { ConcertFormValues } from '../-models/ConcertModel';

export function insertConcert(api: AxiosInstance, data: ConcertFormValues) {
  return api.post('/concerts', data);
}
