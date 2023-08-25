import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import createHttpError from 'http-errors';

import apiRoutes from './routes/api.js'

import * as url from 'url'
const __dirname = url.fileURLToPath(new URL(".", import.meta.url))

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', apiRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createHttpError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

export { app }
