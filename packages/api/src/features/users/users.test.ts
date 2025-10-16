import { beforeEach, describe, expect, test } from 'bun:test';

import { InMemoryUsersRepository } from './repository/users.repository.in-memory';

let usersRepository: InMemoryUsersRepository;

describe('Users feature', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
  });

  test('should create a user', async () => {
    await usersRepository.createUser({
      id: '1234',
      first_name: 'John',
      last_name: 'Doe',
      image_url: 'https://example.com/image.jpg',
    });

    expect(usersRepository.users.length).toBe(1);
    expect(usersRepository.users[0]).toMatchObject({
      id: 1,
      clerkId: '1234',
      firstName: 'John',
      lastName: 'Doe',
      imageUrl: 'https://example.com/image.jpg',
    });
  });
});
