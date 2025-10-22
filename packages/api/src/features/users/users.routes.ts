import { Hono } from 'hono';
import { UsersDrizzleRepository } from './repository/users.repository.drizzle';
import { UsersHandler } from './users.handler';

const app = new Hono();

const usersRepository = new UsersDrizzleRepository();
const usersHandler = new UsersHandler(usersRepository);

app.post('/', ...usersHandler.createUser());

export default app;
