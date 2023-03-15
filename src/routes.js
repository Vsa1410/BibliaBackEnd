const express = require('express');
const app = express();
const { PrismaClient} = require('@prisma/client');
const PostController = require('./Controllers/PostController');
const UserControllers=require('./Controllers/UserControllers');
const authController = require('./Controllers/AuthController/auth.js')
const GeneralUserController = require('./Controllers/GeneralUserController');
const TokensControllers = require('./Controllers/TokensControllers');
const routes = express.Router()

const prisma = new PrismaClient()


//posts ROUTES
routes.get('/devotionals/', PostController.findDevotionals)
routes.get('/verseoftheday/',PostController.findVerses)
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
routes.post('/generaluser', GeneralUserController.store);
routes.get('/generaluser/:id', GeneralUserController.findUserInformation)

//All Tokens routes
routes.post('/tokens', TokensControllers.storeTokens);
routes.get('/tokens', TokensControllers.getTokens);

//login route
routes.post('/login', authController.login)




module.exports = routes;