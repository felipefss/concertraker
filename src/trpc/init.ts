import { auth, clerkClient } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { type DB, db } from '@/db';
import { user } from '@/db/schema';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return { db, ...opts, auth: await auth() };
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({});

const throwUnauthorized = () => {
  throw new TRPCError({ code: 'UNAUTHORIZED' });
};

const getStoredUserId = async (clerkUserId: string, db: DB) => {
  const client = await clerkClient();
  const clerkUser = await client.users.getUser(clerkUserId);
  const clerkUserEmail = clerkUser.emailAddresses[0]?.emailAddress;

  if (!clerkUserEmail) {
    return throwUnauthorized();
  }

  const dbUser = await db.query.user.findFirst({
    where: eq(user.email, clerkUserEmail),
  });

  if (!dbUser) {
    return throwUnauthorized();
  }

  return dbUser.id;
};

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    return throwUnauthorized();
  }

  const userId = await getStoredUserId(ctx.auth.userId, ctx.db);

  return next({
    ctx: {
      auth: ctx.auth,
      userId,
    },
  });
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
