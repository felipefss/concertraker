import { beforeEach, describe, expect, test } from 'bun:test';
import { Hono } from 'hono';
import { InMemoryUsersRepository } from './repository/users.repository.in-memory';
import { UsersHandler } from './users.handler';

let usersRepository: InMemoryUsersRepository;
let usersHandler: UsersHandler;

const app = new Hono();

describe('Users feature', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    usersHandler = new UsersHandler(usersRepository);
    app.post('/users', ...usersHandler.createUser());
  });

  test('POST /users', async () => {
    const res = await app.request('/users', {
      body: JSON.stringify({
        data: {
          first_name: 'John',
          id: '1234',
          image_url: 'https://example.com/image.jpg',
          last_name: 'Doe',
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ id: 1 });
  });
});
