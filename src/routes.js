const express = require('express');
const app = express();
const { PrismaClient} = require('@prisma/client');
const PostController = require('./Controllers/PostController');
const UserControllers=require('./Controllers/UserControllers');

const GeneralUserController = require('./Controllers/GeneralUserController');
const TokensControllers = require('./Controllers/TokensControllers');
const routes = express.Router()

const prisma = new PrismaClient()


//posts ROUTES
routes.get('/devotionals/', PostController.findDevotionals)
routes.get('/plans', PostController.findPlans);
routes.post('/posts', PostController.store);
routes.put('/posts/:id', PostController.change);
routes.delete('/posts/:id', PostController.delete);


//Users routes
routes.get('/users/', UserControllers.index);
routes.post('/users/', UserControllers.store);
routes.put('/users/:id', UserControllers.change);
routes.delete('users/:id', UserControllers.delete);

//GeneralUsers routes
routes.post('/generalUser', GeneralUserController.store)
routes.put('/generalUser/:id', GeneralUserController.change);
routes.delete('/generalUser/id', GeneralUserController.delete);


//All Tokens routes
routes.post('/tokens', TokensControllers.storeTokens);
routes.get('/tokens', TokensControllers.getTokens);




module.exports = routes;