/* File Name: Portafolio-Fabian_Soto
Name: Fabian Soto Palacio
ID: 301153142
Date: Octuber 19, 2021 */

import createError, { HttpError } from "http-errors";
import express from 'express';
import path from 'path';
import cookieParser from "cookie-parser";
import logger from 'morgan';
import mongoose from "mongoose";
import passport from "passport";

import mongoStore from "connect-mongo";
import session from "express-session";
import flash from 'connect-flash';

import { isLoggedIn } from "../middleware";
import * as DBConfiguration from './db';

//mongo Atlas, if connection not available then it will attempt to connect to the local MongoDB when is running locally.
const StoreOptions = {
  store: mongoStore.create({
    mongoUrl: ((DBConfiguration.RemoteURI) ? DBConfiguration.RemoteURI : DBConfiguration.LocalURI)
  }),
  secret: DBConfiguration.Secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 600000
  }
}

import indexRouter from '../routes/index';
import businessContactsRouter from '../routes/contact';
import userRouter from '../routes/user';

//Mongo Config
mongoose.connect((DBConfiguration.RemoteURI) ? DBConfiguration.RemoteURI : DBConfiguration.LocalURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log("Connected to MongoDB at " + DBConfiguration.HostName);
});

//instantiate express
const app = express();

// view engine setup
app.set('views', [path.join(__dirname, '../views')]);
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//connect-flash initialization
app.use(flash());

//express session initialization
app.use(session(StoreOptions));

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//router middleware
app.use('/', indexRouter);
app.use('/contact', isLoggedIn, businessContactsRouter);
app.use('/authentication', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
