import { getAuth } from '@clerk/express';
import { zValidator } from '@hono/zod-validator';
import type { Request, Response } from 'express';
import { createFactory } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import logger from '@/lib/logger';
import authMiddleware from '../../middlewares/auth';
import { concertCreateSchema, concertUpdateSchema } from './concerts.schema';
import type { ConcertsRepository } from './repository/concerts.repository';

// type Env = {
//   Variables: {
//     userId: number;
//   };
// };

export class ConcertsHandler {
  // private readonly factory = createFactory<Env>();

  constructor(private readonly repository: ConcertsRepository) {}

  createConcert(req: Request, res: Response) {}
  // createConcert() {
  //   return this.factory.createHandlers(
  //     authMiddleware,
  //     zValidator('json', concertCreateSchema),
  //     async (c) => {
  //       const data = c.req.valid('json');
  //       const userId = c.get('userId');

  //       try {
  //         const insertedId = await this.repository.createConcert({
  //           ...data,
  //           userId,
  //         });

  //         return c.json({ id: insertedId }, 201);
  //       } catch (cause) {
  //         console.error(cause);
  //         throw new HTTPException(500, { cause });
  //       }
  //     },
  //   );
  // }

  // getConcerts() {
  //   return this.factory.createHandlers(authMiddleware, async (c) => {
  //     const id = c.req.param('id');
  //     const userId = c.get('userId');

  //     try {
  //       if (id) {
  //         const parsedId = Number(id);

  //         if (Number.isNaN(parsedId)) {
  //           return c.json({ error: 'Invalid id' }, 400);
  //         }

  //         const concert = await this.repository.getConcert(userId, parsedId);

  //         if (!concert) {
  //           return c.notFound();
  //         }

  //         return c.json({ concert });
  //       }

  //       const concerts = await this.repository.getConcerts(userId);

  //       return c.json({ concerts });
  //     } catch (cause) {
  //       console.error(cause);
  //       throw new HTTPException(500, { cause });
  //     }
  //   });
  // }

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
