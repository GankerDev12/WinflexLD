/*
Rutas de Productos
host + /api/totalSellados
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTotalSellado, crearTotalSellado, actualizarTotalSellado, eliminarTotalSellado } = require('../controllers/totalSellado');

const router = Router();

//En todas las peticiones se valida el JWT
router.use(validarJWT);

// Listado de totales de impresiones
router.get('/', getTotalSellado);

// Crear un nuevo total de impresion
router.post('/',
    [
        check('producto', 'El producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearTotalSellado);

// Actualizar total impresion
router.put('/:id', actualizarTotalSellado);

// Borrar total impresion
router.delete('/:id', eliminarTotalSellado);

module.exports = router;