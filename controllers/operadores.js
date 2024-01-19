const { response } = require('express');
const Operador = require('../models/Operador');

const getOperadores = async (req, res = response) => {
    const operadores = await Operador.find()
        .populate('user', ' name');

    res.json({
        ok: true,
        operadores
    });
}

const crearOperador = async (req, res = response) => {
    const operador = new Operador(req.body);

    try {
        let operadorb = await Operador.findOne({ nombre: operador.nombre });
        if (operadorb) {
            return res.status(400).json({
                ok: false,
                msg: 'Este operador ya esta creado'
            })
        }

        operador.user = req.uid;

        const operadorGuardado = await operador.save();

        res.json({
            ok: true,
            operador: operadorGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarOperador = async (req, res = response) => {
    const operadorId = req.params.id;
    const uid = req.uid;

    try {
        const operador = await Operador.findById(operadorId);
        if (!operador) {
            return res.status(404).json({
                ok: false,
                msg: 'Operador no encontrado con ese id'
            });
        }
        const nuevoOperador = {
            ...req.body,
            user: uid
        }
        const OperadorActualizado = await Operador.findByIdAndUpdate(operadorId, nuevoOperador)
            .populate('user', 'name');
        res.json({
            ok: true,
            operador: OperadorActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const eliminarOperador = async (req, res = response) => {
    const operadorId = req.params.id;
    const uid = req.uid;

    try {
        const operador = await Operador.findById(operadorId);
        if (!operador) {
            return res.status(404).json({
                ok: false,
                msg: 'Operador no encontrado con ese id'
            });
        }
        await Operador.findByIdAndDelete(operadorId)

        res.json({
            ok: true,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    getOperadores,
    crearOperador,
    actualizarOperador,
    eliminarOperador
}