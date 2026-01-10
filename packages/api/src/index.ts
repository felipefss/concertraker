import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import concerts from './features/concerts';
import users from './features/users';
import morgan from './middlewares/morgan';

const app = express();
const router = app.router;
const port = 3000;

const corsOptions = {
  origin: '*',
};

app.use(morgan);
app.use(bodyParser.json());

app.options('/api', cors(corsOptions));

// Set the base path
app.use('/api', cors(corsOptions), router);

router.use('/users', users);
router.use('/concerts', concerts);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
