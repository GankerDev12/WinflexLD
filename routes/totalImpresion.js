/*
Rutas de Productos
host + /api/totalimpresiones
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTotalImpresiones, crearTotalImpresion, actualizarTotalImpresion, eliminarTotalImpresion } = require('../controllers/totalImpresion');

const router = Router();

//En todas las peticiones se valida el JWT
router.use(validarJWT);

// Listado de totales de impresiones
router.get('/', getTotalImpresiones);

// Crear un nuevo total de impresion
router.post('/',
    [
        check('producto', 'El producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearTotalImpresion);

// Actualizar total impresion
router.put('/:id', actualizarTotalImpresion);

// Borrar total impresion
router.delete('/:id', eliminarTotalImpresion);

module.exports = router;