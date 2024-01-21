/*
Rutas de Productos
host + /api/productos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');

const router = Router();

//En todas las peticiones se valida el JWT
router.use(validarJWT);

// Listado de operadores
router.get('/', getProductos);

// Crear un nuevo operador
router.post('/',
    [
        check('descripcion', 'La descripción es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearProducto);

// Actualizar operador
router.put('/:id', actualizarProducto);

// Borrar operador
router.delete('/:id', eliminarProducto);

module.exports = router;