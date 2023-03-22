const express = require('express');
const app = express();
const { PrismaClient} = require('@prisma/client');
const PostController = require('./Controllers/PostController');
const UserControllers=require('./Controllers/UserControllers');
const authController = require('./Controllers/AuthController/auth.js')
const GeneralUserController = require('./Controllers/GeneralUserController');
const TokensControllers = require('./Controllers/TokensControllers');
const Favoritecontroller = require('./Controllers/Favoritecontroller');
const VerseOfDayController =require('./Controllers/VerseOfDayController')
const routes = express.Router()

const prisma = new PrismaClient()


//posts ROUTES
routes.get('/devotionals/', PostController.findDevotionals)
routes.get('/verseoftheday/',PostController.findVerses)
routes.get('/posts/:categories', PostController.findByCategory)
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
routes.put('/generaluser/:id', GeneralUserController.change)
//All Tokens routes
routes.post('/tokens', TokensControllers.storeTokens);
routes.get('/tokens', TokensControllers.getTokens);

//login route
routes.post('/login', authController.login)

//favorites Routes
routes.get('/favorites/:id', Favoritecontroller.index);
routes.post('/favorites', Favoritecontroller.store);
routes.delete('/favorites/:id', Favoritecontroller.delete);


//Verse of Day Routes
routes.post('/verseofday/', VerseOfDayController.store)
routes.get('/verseofday/', VerseOfDayController.getVerses)



module.exports = routes;