import type { AxiosInstance } from 'axios';
import type { Concert } from '../-models/ConcertModel';

export const getConcerts = async (api: AxiosInstance): Promise<Concert[]> => {
  try {
    const response = await api.get<{ concerts: Concert[] }>('/concerts');

    return response.data.concerts;
  } catch (error) {
    throw new Error('Failed to fetch concerts', error as ErrorOptions);
  }
};
