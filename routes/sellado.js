/*
Rutas de Productos
host + /api/sellado
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getSellados, crearSellado, actualizarSellado, eliminarSellado } = require('../controllers/sellado');

const router = Router();

//En todas las peticiones se valida el JWT
router.use(validarJWT);

// Listado de sellados
router.get('/', getSellados);

// Crear un nuevo sellado
router.post('/',
    [
        check('turno', 'El turno es obligatorio').not().isEmpty(),
        check('operador', 'El operador es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearSellado);

// Actualizar sellado
router.put('/:id', actualizarSellado);

// Borrar sellado
router.delete('/:id', eliminarSellado);

module.exports = router;