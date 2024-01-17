/*
    Rutas de usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { crearUsuario, login, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Ingresa un email valido').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
],
    crearUsuario);

router.post('/', [
    check('email', 'Email incorrecto').isEmail(),
    check('password', 'Password es obligatorio').isLength({ min: 1 }),
    validarCampos
],
    login);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;