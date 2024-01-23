const { response } = require('express');
const TotalSellado = require('../models/TotalSellado');

const getTotalSellado = async (req, res = response) => {
    const totalSellado = await TotalSellado.find()
        .populate('user', ' name');

    res.json({
        ok: true,
        totalSellado
    });
}

const crearTotalSellado = async (req, res = response) => {
    const totalSellado = new TotalSellado(req.body);
    totalSellado.user = req.uid;

    try {
        const totalSelladoGuardada = await totalSellado.save();
        res.json({
            ok: true,
            totalSellado: totalSelladoGuardada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarTotalSellado = async (req, res = response) => {
    const totalSelladoId = req.params.id;
    const uid = req.uid;

    try {
        const totalSellado = await TotalSellado.findById(totalSelladoId);
        if (!totalSellado) {
            return res.status(404).json({
                ok: false,
                msg: 'Total sellado no encontrado con ese id'
            });
        }
        const nuevoTotalSellado = {
            ...req.body,
            user: uid
        }
        const totalSelladoActualizado = await TotalSellado.findByIdAndUpdate(totalSelladoId, nuevoTotalSellado)
            .populate('user', 'name');
        res.json({
            ok: true,
            totalImpresion: totalSelladoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const eliminarTotalSellado = async (req, res = response) => {
    const totalSelladoId = req.params.id;
    const uid = req.uid;

    try {
        const totalSellado = await TotalSellado.findById(totalSelladoId);
        if (!totalSellado) {
            return res.status(404).json({
                ok: false,
                msg: 'Total sellado no encontrado con ese id'
            });
        }
        await TotalSellado.findByIdAndDelete(totalSelladoId)

        res.json({
            ok: true
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
    getTotalSellado,
    crearTotalSellado,
    actualizarTotalSellado,
    eliminarTotalSellado
}