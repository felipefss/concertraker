import type { AxiosInstance } from 'axios';
import type { Concert, ConcertFormValues } from '../-models/ConcertModel';

export function insertConcert(api: AxiosInstance, data: ConcertFormValues) {
  return api.post('/concerts', data);
}

export function editConcert(api: AxiosInstance, data: Concert) {
  return api.put(`/concerts`, data);
}

export function deleteConcert(api: AxiosInstance, id: string) {
  return api.delete(`/concerts/${id}`);
}
