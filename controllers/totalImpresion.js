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
        const totalImpresionGuardada = await TotalImpresion.save();
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
    const productoId = req.params.id;
    const uid = req.uid;

    try {
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado con ese id'
            });
        }
        const nuevoProducto = {
            ...req.body,
            user: uid
        }
        const productoActualizado = await Producto.findByIdAndUpdate(productoId, nuevoProducto)
            .populate('user', 'name');
        res.json({
            ok: true,
            producto: productoActualizado
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
    const productoId = req.params.id;
    const uid = req.uid;

    try {
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado con ese id'
            });
        }
        await Producto.findByIdAndDelete(productoId)

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
    getTotalImpresiones,
    crearTotalImpresion,
    actualizarTotalImpresion,
    eliminarTotalImpresion
}