import type { UsersRepository } from './repository/users.repository';

export class UsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: Parameters<UsersRepository['create']>[0]) {
    return this.usersRepository.create(data);
  }
}
