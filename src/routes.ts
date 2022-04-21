import express from 'express';

// import PointsController from './controllers/PointsController';

import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';
import ContactController from './controllers/ContactsController';

import middlewaresJWT from './middlewares/passportJWT';

// const { UserController } = require('./controllers/UserController');

const routes = express.Router();

const sessionController = new SessionController();
const userController = new UserController();
const contactController = new ContactController();

// ROOT ROUTE
routes.get("/", (request, response) => {
  return response.redirect("/api-docs");
});

// ROUTE SESSION
routes.post('/sessions', sessionController.create);

// ROUTE USE
routes.get('/user', userController.index);
routes.post('/user', userController.create);

// ROUTE USE
routes.get('/contacts', middlewaresJWT, contactController.index);
routes.get('/contacts/:id', middlewaresJWT, contactController.show);
routes.post('/contacts', middlewaresJWT, contactController.create);
routes.put('/contacts/:id', middlewaresJWT, contactController.update);
routes.delete('/contacts/:id', middlewaresJWT, contactController.delete);

export default routes;