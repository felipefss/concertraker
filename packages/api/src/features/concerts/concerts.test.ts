import { afterEach, beforeEach, describe, expect, jest, test } from 'bun:test';
import { Hono } from 'hono';
import { ConcertsHandler } from './concerts.handler';
import { ConcertsInMemoryRepository } from './repository/concerts.repository.in-memory';

let concertsRepository: ConcertsInMemoryRepository;
let concertsHandler: ConcertsHandler;
let app: Hono;

const now = new Date('2025-05-10');

const MOCK_CONCERT_ID = 1;
const MOCK_USER_ID = 1;

const concertMock = {
  artist: 'John Doe',
  createdAt: now,
  date: '2025-11-02',
  deletedAt: null,
  id: MOCK_CONCERT_ID,
  location: 'Brasilia',
  notes: 'Good show',
  updatedAt: now,
  userId: MOCK_USER_ID,
  venue: 'Arena',
};

describe('Concerts feature', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(now);
    concertsRepository = new ConcertsInMemoryRepository();
    concertsHandler = new ConcertsHandler(concertsRepository);

    app = new Hono();
    app.get('/concerts/:id?', ...concertsHandler.getConcerts());
    app.post('/concerts', ...concertsHandler.createConcert());
    app.put('/concerts', ...concertsHandler.updateConcert());
    app.delete('/concerts/:id', ...concertsHandler.deleteConcert());
  });

  afterEach(() => {
    jest.setSystemTime();
  });

  test('POST /concerts', async () => {
    const { artist, date, location, notes, venue } = concertMock;

    const res = await app.request('/concerts', {
      body: JSON.stringify({ data: { artist, date, location, notes, venue } }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ id: MOCK_CONCERT_ID });
  });

  test('GET /concerts', async () => {
    await concertsRepository.createConcert(concertMock);

    const res = await app.request('/concerts');
    const concerts = await res.json();

    expect(res.status).toBe(200);
    expect(concerts).toEqual({
      concerts: [JSON.parse(JSON.stringify(concertMock))],
    });
  });

  test('GET /concerts/{id}', async () => {
    await concertsRepository.createConcert(concertMock);

    const res = await app.request(`/concerts/${MOCK_CONCERT_ID}`);
    const concert = await res.json();

    expect(res.status).toBe(200);
    expect(concert).toEqual({
      concert: JSON.parse(JSON.stringify(concertMock)),
    });
  });

  test('PUT /concerts', async () => {
    await concertsRepository.createConcert(concertMock);
    const { date, id, location, notes, venue } = concertMock;

    const res = await app.request('/concerts', {
      body: JSON.stringify({
        data: {
          artist: 'Jane Doe',
          date,
          id,
          location,
          notes,
          venue,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });

    const persistedConcert = await concertsRepository.getConcert(
      MOCK_USER_ID,
      MOCK_CONCERT_ID,
    );

    expect(res.status).toBe(200);
    expect(persistedConcert).toEqual({
      ...concertMock,
      artist: 'Jane Doe',
    });
  });
});
