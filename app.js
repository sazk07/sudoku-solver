import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan'

import { indexRouter } from './routes/index.js'
import { usersRouter } from './routes/users.js'

import * as url from 'url'
const __dirname = url.fileURLToPath(new URL(".", import.meta.url))

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export { app }
