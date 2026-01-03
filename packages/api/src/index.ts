// import { Hono } from 'hono';
// import { logger } from 'hono/logger';
// import { handle } from 'hono/vercel';
// import concerts from './features/concerts';
// import users from './features/users';
// import { timedLog } from './middlewares/logger';

// const app = new Hono().basePath('/api');
// app.use(logger(timedLog));

// app.route('/users', users);
// app.route('/concerts', concerts);

// export default handle(app);

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import concerts from './features/concerts';
import morgan from './middlewares/morgan';

const app = express();
const router = app.router;
const port = 3000;

app.use(morgan);
app.use(cors());
app.use(bodyParser.json());

// Set the base path
app.use('/api', router);

router.use('/concerts', concerts);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
