import type { Request, Response } from 'express';
import z from 'zod';
import logger from '@/lib/logger';
import { concertCreateSchema, concertUpdateSchema } from './concerts.schema';
import type { CreateConcertPayload, EmptyObject } from './concerts.types';
import type { ConcertsRepository } from './repository/concerts.repository';

export class ConcertsHandler {
  constructor(private readonly repository: ConcertsRepository) {}

  async createConcert(
    req: Request<EmptyObject, EmptyObject, CreateConcertPayload>,
    res: Response,
  ) {
    const validator = concertCreateSchema.safeParse(req.body);

    if (!validator.success) {
      return res.status(400).json(z.treeifyError(validator.error));
    }

    const data = validator.data;
    const userId = req.userId as number;

    try {
      const insertedId = await this.repository.createConcert({
        ...data,
        userId,
      });

      res.status(201).json({ id: insertedId });
    } catch (cause) {
      logger.error(cause);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getConcerts(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const userId = req.userId as number;

    try {
      if (id) {
        const parsedId = Number(id);

        if (Number.isNaN(parsedId)) {
          return res.status(400).json({ error: 'Invalid id' });
        }

        const concert = await this.repository.getConcert(userId, parsedId);

        if (!concert) {
          return res.sendStatus(404);
        }

        return res.json({ concert });
      }

      const concerts = await this.repository.getConcerts(userId);

      return res.json({ concerts });
    } catch (cause) {
      if (cause instanceof Error) {
        console.error(cause);
        logger.error(cause.message);
      } else {
        logger.error('Unknown error');
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  updateConcert(req: Request, res: Response) {
    const validator = concertUpdateSchema.safeParse(req.body);

    if (!validator.success) {
      return res.status(400).json(z.treeifyError(validator.error));
    }

    const data = validator.data;
    const userId = req.userId as number;

    try {
      this.repository.updateConcert({ ...data, userId });

      return res.sendStatus(200);
    } catch (cause) {
      logger.error(cause);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  deleteConcert(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId as number;

    try {
      const parsedId = Number(id);

      if (Number.isNaN(parsedId)) {
        return res.status(400).json({ error: 'Invalid id' });
      }

      this.repository.deleteConcert(userId, parsedId);

      return res.sendStatus(200);
    } catch (cause) {
      logger.error(cause);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
