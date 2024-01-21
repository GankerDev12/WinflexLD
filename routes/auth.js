const { Router } = require('express');
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');


router.post('/register', createUser);

router.post('/', loginUser);

router.get('/renew', renewToken);

module.exports = router;
