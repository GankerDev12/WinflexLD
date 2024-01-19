const { response } = require('express');
const Fabricante = require('../models/Fabricante');

const getFabricantes = async (req, res = response) => {
    const fabricantes = await Fabricante.find()
        .populate('user', ' name');

    res.json({
        ok: true,
        fabricantes
    });
}

const crearFabricante = async (req, res = response) => {
    const fabricante = new Fabricante(req.body);

    try {
        let fabricanteb = await Fabricante.findOne({ nombre: fabricante.nombre });
        if (fabricanteb) {
            return res.status(400).json({
                ok: false,
                msg: 'Este fabricante ya esta creado'
            })
        }

        fabricante.user = req.uid;

        const fabricanteGuardado = await fabricante.save();

        res.json({
            ok: true,
            fabricante: fabricanteGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarFabricante = async (req, res = response) => {
    const fabricanteId = req.params.id;
    const uid = req.uid;

    try {
        const fabricante = await Fabricante.findById(fabricanteId);
        if (!fabricante) {
            return res.status(404).json({
                ok: false,
                msg: 'Fabricante no encontrado con ese id'
            });
        }
        const nuevoFabricante = {
            ...req.body,
            user: uid
        }
        const fabricanteActualizado = await Fabricante.findByIdAndUpdate(fabricanteId, nuevoFabricante)
            .populate('user', 'name');
        res.json({
            ok: true,
            fabricante: fabricanteActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const eliminarFabricante = async (req, res = response) => {
    const fabricanteId = req.params.id;
    const uid = req.uid;

    try {
        const fabricante = await Fabricante.findById(fabricanteId);
        if (!fabricante) {
            return res.status(404).json({
                ok: false,
                msg: 'Fabricante no encontrado con ese id'
            });
        }
        await Fabricante.findByIdAndDelete(fabricanteId)

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
    getFabricantes,
    crearFabricante,
    actualizarFabricante,
    eliminarFabricante
}