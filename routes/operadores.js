/*
    Rutas de Fabricantes
    host + /api/fabricantes
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getOperadores, crearOperador, actualizarOperador, eliminarOperador } = require('../controllers/operadores');

const router = Router();

//En todas las peticiones se valida el JWT
router.use(validarJWT);

// Listado de operadores
router.get('/', getOperadores);

// Crear un nuevo operador
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearOperador);

// Actualizar operador
router.put('/:id', actualizarOperador);

// Borrar operador
router.delete('/:id', eliminarOperador);

module.exports = router;