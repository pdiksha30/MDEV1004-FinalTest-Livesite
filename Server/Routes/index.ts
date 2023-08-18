import express from 'express';
let router = express.Router();
import passport from 'passport';

/* Get the Recepie Controller */
import { DisplayRecepieList, DisplayRecepieByID, AddRecepie, UpdateRecepie, DeleteRecepie, ProcessRegistration, ProcessLogin, ProcessLogout  } from '../Controllers/recepie';

router.get('/list', passport.authenticate('jwt', {session: false}), (req, res, next) => DisplayRecepieList(req, res, next));

router.get('/find/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => DisplayRecepieByID(req, res, next));

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => AddRecepie(req, res, next));

router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => UpdateRecepie(req, res, next));

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => DeleteRecepie(req, res, next));

// Authentication routes
router.post('/register', (req, res, next) => ProcessRegistration(req, res, next));

router.post('/login', (req, res, next) => ProcessLogin(req, res, next));

router.get('/logout', (req, res, next) => ProcessLogout(req, res, next));

export default router;
