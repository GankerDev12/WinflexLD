/*
Rutas de Productos
host + /api/totalextrusiones
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTotalExtrusiones, crearTotalExtrusion, actualizarTotalExtrusion, eliminarTotalExtrusion } = require('../controllers/totalExtrusion');

const router = Router();

//En todas las peticiones se valida el JWT
router.use(validarJWT);

// Listado de totales extrusiones
router.get('/', getTotalExtrusiones);

// Crear un nuevo total de extrusion
router.post('/',
    [
        check('descripcion', 'La descripción es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearTotalExtrusion);

// Actualizar un total de extrusion
router.put('/:id', actualizarTotalExtrusion);

// Borrar total extrusion
router.delete('/:id', eliminarTotalExtrusion);

module.exports = router;