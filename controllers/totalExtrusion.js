const { response } = require('express');
const TotalExtrusion = require('../models/TotalExtrusion');

const getTotalExtrusiones = async (req, res = response) => {
    const totalExtrusiones = await TotalExtrusion.find()
        .populate('user', ' name');

    res.json({
        ok: true,
        totalExtrusiones
    });
}

const crearTotalExtrusion = async (req, res = response) => {
    const totalExtrusiones = new TotalExtrusion(req.body);
    totalExtrusiones.user = req.uid;

    try {
        const totalExtrusionGuardada = await TotalExtrusion.save();
        res.json({
            ok: true,
            totalExtrusion: totalExtrusionGuardada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarTotalExtrusion = async (req, res = response) => {
    const totalExtrusionId = req.params.id;
    const uid = req.uid;

    try {
        const totalExtrusion = await TotalExtrusion.findById(totalExtrusionId);
        if (!totalExtrusion) {
            return res.status(404).json({
                ok: false,
                msg: 'Total extrusion no encontrada'
            });
        }
        const nuevoTotalExtrusion = {
            ...req.body,
            user: uid
        }
        const totalExtrusionActualizada = await TotalExtrusion.findByIdAndUpdate(totalExtrusionId, nuevoTotalExtrusion)
            .populate('user', 'name');
        res.json({
            ok: true,
            totalExtrusion: totalExtrusionActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const eliminarTotalExtrusion = async (req, res = response) => {
    const totalExtrusionId = req.params.id;
    const uid = req.uid;

    try {
        const totalExtrusion = await TotalExtrusion.findById(totalExtrusionId);
        if (!totalExtrusion) {
            return res.status(404).json({
                ok: false,
                msg: 'Total extrusion no encontrada'
            });
        }
        await TotalExtrusion.findByIdAndDelete(totalExtrusionId)

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
    getTotalExtrusiones,
    crearTotalExtrusion,
    actualizarTotalExtrusion,
    eliminarTotalExtrusion
}