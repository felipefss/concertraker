import { beforeEach, describe, expect, test } from 'bun:test';
import { UsersUseCase } from './users.use-case';
import { InMemoryUsersRepository } from './repository/users.repository.in-memory';

let usersRepository: InMemoryUsersRepository;
let useCase: UsersUseCase;

// TODO: should test the endpoint, hence the DB integration with Neon testing

describe('Users feature', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    useCase = new UsersUseCase(usersRepository);
  });

  test('should create a user', async () => {
    await useCase.create({
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
