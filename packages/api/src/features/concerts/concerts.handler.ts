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

  // updateConcert() {
  //   return this.factory.createHandlers(
  //     authMiddleware,
  //     zValidator('json', concertUpdateSchema),
  //     async (c) => {
  //       const data = c.req.valid('json');
  //       const userId = c.get('userId');

  //       try {
  //         await this.repository.updateConcert({ ...data, userId });
  //       } catch (cause) {
  //         console.error(cause);
  //         throw new HTTPException(500, { cause });
  //       }

  //       return c.json({}, 200);
  //     },
  //   );
  // }

  // deleteConcert() {
  //   return this.factory.createHandlers(authMiddleware, async (c) => {
  //     const id = c.req.param('id');
  //     const userId = c.get('userId');

  //     try {
  //       const parsedId = Number(id);

  //       if (Number.isNaN(parsedId)) {
  //         return c.json({ error: 'Invalid id' }, 400);
  //       }

  //       await this.repository.deleteConcert(userId, parsedId);
  //     } catch (cause) {
  //       console.error(cause);
  //       throw new HTTPException(500, { cause });
  //     }

  //     return c.json({}, 200);
  //   });
  // }
}
