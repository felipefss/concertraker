import type { Request, Response } from 'express';
import z from 'zod';
import type { UsersRepository } from './repository/users.repository';
import { userCreateSchema } from './users.schema';
import type { CreateUserPayload, EmptyObject } from './users.types';

export class UsersHandler {
  constructor(private readonly repository: UsersRepository) {}

  async createUser(
    req: Request<EmptyObject, EmptyObject, CreateUserPayload>,
    res: Response,
  ) {
    const validator = userCreateSchema.safeParse(req.body);

    if (!validator.success) {
      return res.status(400).json(z.treeifyError(validator.error));
    }

    const { data } = validator.data;

    try {
      const insertedId = await this.repository.createUser(data);

      res.status(201).json({ id: insertedId });
    } catch (cause) {
      console.error(cause);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
