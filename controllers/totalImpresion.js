const { response } = require('express');
const TotalImpresion = require('../models/TotalImpresion');

const getTotalImpresiones = async (req, res = response) => {
    const totalImpresiones = await TotalImpresion.find()
        .populate('user', ' name');

    res.json({
        ok: true,
        totalImpresiones
    });
}

const crearTotalImpresion = async (req, res = response) => {
    const totalImpresion = new TotalImpresion(req.body);
    totalImpresion.user = req.uid;

    try {
        const totalImpresionGuardada = await totalImpresion.save();
        res.json({
            ok: true,
            totalImpresion: totalImpresionGuardada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarTotalImpresion = async (req, res = response) => {
    const totalImpresionId = req.params.id;
    const uid = req.uid;

    try {
        const totalImpresion = await TotalImpresion.findById(totalImpresionId);
        if (!totalImpresion) {
            return res.status(404).json({
                ok: false,
                msg: 'Total impresion no encontrado con ese id'
            });
        }
        const nuevoTotalImpresion = {
            ...req.body,
            user: uid
        }
        const totalImpresionActualizado = await TotalImpresion.findByIdAndUpdate(totalImpresionId, nuevoTotalImpresion)
            .populate('user', 'name');
        res.json({
            ok: true,
            totalImpresion: totalImpresionActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const eliminarTotalImpresion = async (req, res = response) => {
    const totalImpresionId = req.params.id;
    const uid = req.uid;

    try {
        const totalImpresion = await TotalImpresion.findById(totalImpresionId);
        if (!totalImpresion) {
            return res.status(404).json({
                ok: false,
                msg: 'Total impresion no encontrado con ese id'
            });
        }
        await TotalImpresion.findByIdAndDelete(totalImpresionId)

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
    getTotalImpresiones,
    crearTotalImpresion,
    actualizarTotalImpresion,
    eliminarTotalImpresion
}