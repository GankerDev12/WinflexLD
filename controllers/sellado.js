const { response } = require('express');
const Sellado = require('../models/Sellado');

const getSellados = async (req, res = response) => {
    const sellados = await Sellado.find()
        .populate('user', ' name')
        .populate('producto', 'descripcion')
        .populate('maquina', 'nombre')
        .populate('operador', 'nombre');

    res.json({
        ok: true,
        sellados
    });
}

const crearSellado = async (req, res = response) => {
    const sellado = new Sellado(req.body);
    sellado.user = req.uid;

    try {
        const selladoGuardado = await sellado.save();
        res.json({
            ok: true,
            sellado: selladoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarSellado = async (req, res = response) => {
    const selladoId = req.params.id;
    const uid = req.uid;

    try {
        const sellado = await Sellado.findById(selladoId);
        if (!sellado) {
            return res.status(404).json({
                ok: false,
                msg: 'Sellado no encontrada'
            });
        }
        const nuevoSellado = {
            ...req.body,
            user: uid
        }
        const selladoActualizado = await Sellado.findByIdAndUpdate(selladoId, nuevoSellado)
            .populate('user', 'name');
        res.json({
            ok: true,
            sellado: selladoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const eliminarSellado = async (req, res = response) => {
    const selladoId = req.params.id;
    const uid = req.uid;

    try {
        const sellado = await Sellado.findById(selladoId);
        if (!sellado) {
            return res.status(404).json({
                ok: false,
                msg: 'Sellado no encontrada'
            });
        }
        await Sellado.findByIdAndDelete(selladoId)

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
    getSellados,
    crearSellado,
    actualizarSellado,
    eliminarSellado
}