// import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3333;

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  exposedHeaders: [ 'Authorization', 'X-Total-Count', 'X-Requested-With', 'Content-Type', 'x-acess-token' ],
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, () => { console.info(`Server running port: ${PORT}`) });