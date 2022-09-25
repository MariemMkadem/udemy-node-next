import express from 'express';

//controllers
import { register } from '../controllers/auth';
const router = express.Router();

router.get('/register', register)

module.exports = router;