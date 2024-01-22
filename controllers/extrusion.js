const { response } = require('express');
const Extrusion = require('../models/Extrusion');

const getExtrusiones = async (req, res = response) => {
    const extrusiones = await Extrusion.find()
        .populate('user', ' name');

    res.json({
        ok: true,
        extrusiones
    });
}

const crearExtrusion = async (req, res = response) => {
    const extrusion = new Extrusion(req.body);
    extrusion.user = req.uid;

    try {
        const extrusionGuardada = await extrusion.save();
        res.json({
            ok: true,
            extrusion: extrusionGuardada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarExtrusion = async (req, res = response) => {
    const extrusionId = req.params.id;
    const uid = req.uid;

    try {
        const extrusion = await Extrusion.findById(extrusionId);
        if (!extrusion) {
            return res.status(404).json({
                ok: false,
                msg: 'Extrusion no encontrada'
            });
        }
        const nuevaExtrusion = {
            ...req.body,
            user: uid
        }
        const extrusionActualizada = await Extrusion.findByIdAndUpdate(extrusionId, nuevaExtrusion)
            .populate('user', 'name');
        res.json({
            ok: true,
            extrusion: extrusionActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const eliminarExtrusion = async (req, res = response) => {
    const extrusionID = req.params.id;
    const uid = req.uid;

    try {
        const extrusion = await Extrusion.findById(extrusionID);
        if (!extrusion) {
            return res.status(404).json({
                ok: false,
                msg: 'Extrusion no encontrada'
            });
        }
        await Extrusion.findByIdAndDelete(extrusionID)

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
    getExtrusiones,
    crearExtrusion,
    actualizarExtrusion,
    eliminarExtrusion
}