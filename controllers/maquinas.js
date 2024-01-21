const { response } = require('express');
const Maquina = require('../models/Maquina');

const getMaquinas = async (req, res = response) => {
    const maquinas = await Maquina.find()
        .populate('user', ' name');

    res.json({
        ok: true,
        maquinas
    });
}

const crearMaquina = async (req, res = response) => {
    const maquina = new Maquina(req.body);

    try {
        let maquinab = await Maquina.findOne({ nombre: maquina.nombre });
        if (maquinab) {
            return res.status(400).json({
                ok: false,
                msg: 'Esta maquina ya esta creada'
            })
        }

        maquina.user = req.uid;

        const maquinaGuardada = await maquina.save();

        res.json({
            ok: true,
            maquina: maquinaGuardada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarMaquina = async (req, res = response) => {
    const maquinaId = req.params.id;
    const uid = req.uid;

    try {
        const maquina = await Maquina.findById(maquinaId);
        if (!maquina) {
            return res.status(404).json({
                ok: false,
                msg: 'Maquina no encontrada con ese id'
            });
        }
        const nuevaMaquina = {
            ...req.body,
            user: uid
        }
        const maquinaActualizada = await Maquina.findByIdAndUpdate(maquinaId, nuevaMaquina)
            .populate('user', 'name');
        res.json({
            ok: true,
            maquina: maquinaActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const eliminarMaquina = async (req, res = response) => {
    const maquinaId = req.params.id;
    const uid = req.uid;

    try {
        const maquina = await Maquina.findById(maquinaId);
        if (!maquina) {
            return res.status(404).json({
                ok: false,
                msg: 'Maquina no encontrada con ese id'
            });
        }
        await Maquina.findByIdAndDelete(maquinaId)

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
    getMaquinas,
    crearMaquina,
    actualizarMaquina,
    eliminarMaquina
}