import express from 'express';
import { UsersDrizzleRepository } from './repository/users.repository.drizzle';
import { UsersHandler } from './users.handler';

const usersRepository = new UsersDrizzleRepository();
const usersHandler = new UsersHandler(usersRepository);
const router = express.Router();

// app.post('/', ...usersHandler.createUser());
router.post('/', usersHandler.createUser.bind(usersHandler));

// TODO: Add a DELETE route - event triggered when clerk user is deleted

export default router;
