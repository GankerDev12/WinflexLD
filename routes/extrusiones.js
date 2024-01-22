/*
Rutas de Productos
host + /api/productos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getExtrusiones, crearExtrusion, actualizarExtrusion, eliminarExtrusion } = require('../controllers/extrusion');

const router = Router();

//En todas las peticiones se valida el JWT
router.use(validarJWT);

// Listado de extrusiones
router.get('/', getExtrusiones);

// Crear una nueva extrusion
router.post('/',
    [
        check('turno', 'El turno es obligatorio').not().isEmpty(),
        check('operador', 'El operador es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearExtrusion);

// Actualizar extrusion
router.put('/:id', actualizarExtrusion);

// Borrar extrusion
router.delete('/:id', eliminarExtrusion);

module.exports = router;