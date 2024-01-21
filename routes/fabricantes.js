/*
    Rutas de Fabricantes
    host + /api/fabricantes
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getFabricantes, crearFabricante, actualizarFabricante, eliminarFabricante } = require('../controllers/fabricantes');

const router = Router();

//En todas las peticiones se valida el JWT
router.use(validarJWT);

// Listado de fabricantes
router.get('/', getFabricantes);

// Crear un nuevo fabricante
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearFabricante);

// Actualizar fabricante
router.put('/:id', actualizarFabricante);

// Borrar fabricante
router.delete('/:id', eliminarFabricante);

module.exports = router;