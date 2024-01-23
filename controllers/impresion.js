const { response } = require('express');
const Impresion = require('../models/Impresion');

const getImpresiones = async (req, res = response) => {
    const impresiones = await Impresion.find()
        .populate('user', 'name')
        .populate('producto', 'descripcion')
        .populate('maquina', 'nombre')
        .populate('operador', 'nombre');

    res.json({
        ok: true,
        impresiones
    });
}

const crearImpresion = async (req, res = response) => {
    const impresion = new Impresion(req.body);
    impresion.user = req.uid;

    try {
        const impresionGuardada = await impresion.save();
        res.json({
            ok: true,
            impresion: impresionGuardada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarImpresion = async (req, res = response) => {
    const impresionId = req.params.id;
    const uid = req.uid;

    try {
        const impresion = await Impresion.findById(impresionId);
        if (!impresion) {
            return res.status(404).json({
                ok: false,
                msg: 'Impresion no encontrada'
            });
        }
        const nuevaImpresion = {
            ...req.body,
            user: uid
        }
        const impresionActualizada = await Impresion.findByIdAndUpdate(impresionId, nuevaImpresion)
            .populate('user', 'name');
        res.json({
            ok: true,
            impresion: impresionActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const eliminarImpresion = async (req, res = response) => {
    const impresionId = req.params.id;
    const uid = req.uid;

    try {
        const impresion = await Impresion.findById(impresionId);
        if (!impresion) {
            return res.status(404).json({
                ok: false,
                msg: 'Impresion no encontrada'
            });
        }
        await Extrusion.findByIdAndDelete(impresionId)

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
    getImpresiones,
    crearImpresion,
    actualizarImpresion,
    eliminarImpresion
}