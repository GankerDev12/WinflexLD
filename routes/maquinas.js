/*
    Rutas de Maquinas
    host + /api/maquinas
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMaquinas, crearMaquina, actualizarMaquina, eliminarMaquina } = require('../controllers/maquinas');

const router = Router();

//En todas las peticiones se valida el JWT
router.use(validarJWT);

// Listado de maquinas
router.get('/', getMaquinas);

// Crear una nueva maquina
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('planta', 'Ubicación en planta es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearMaquina);

// Actualizar maquina
router.put('/:id', actualizarMaquina);

// Borrar maquina
router.delete('/:id', eliminarMaquina);

module.exports = router;