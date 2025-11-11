import type { Concert } from '../-models/ConcertModel';

export const getConcerts = async (): Promise<Concert[]> => {
  try {
    const data = await fetch('http://localhost:3000/concerts');

    const parsedData: { concerts: Concert[] } = await data.json();

    return parsedData.concerts;
  } catch (error) {
    throw new Error('Failed to fetch concerts', error as ErrorOptions);
  }
};
