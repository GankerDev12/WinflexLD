/*
Rutas de Productos
host + /api/impresion
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getImpresiones, crearImpresion, actualizarImpresion, eliminarImpresion } = require('../controllers/impresion');

const router = Router();

//En todas las peticiones se valida el JWT
router.use(validarJWT);

// Listado de impresion
router.get('/', getImpresiones);

// Crear una nueva impresion
router.post('/',
    [
        check('turno', 'El turno es obligatorio').not().isEmpty(),
        check('operador', 'El operador es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearImpresion);

// Actualizar impresion
router.put('/:id', actualizarImpresion);

// Borrar impresion
router.delete('/:id', eliminarImpresion);

module.exports = router;