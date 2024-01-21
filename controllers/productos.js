const { response } = require('express');
const Producto = require('../models/Producto');

const getProductos = async (req, res = response) => {
    const productos = await Producto.find()
        .populate('user', ' name');

    res.json({
        ok: true,
        productos
    });
}

const crearProducto = async (req, res = response) => {
    const producto = new Producto(req.body);

    try {
        let productob = await Producto.findOne({ op: producto.op, np: producto.np });
        if (operadorb) {
            return res.status(400).json({
                ok: false,
                msg: 'Este producto ya esta creado'
            })
        }

        producto.user = req.uid;

        const productoGuardado = await producto.save();

        res.json({
            ok: true,
            producto: productoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarProducto = async (req, res = response) => {
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
        const productoActualizado = await Operador.findByIdAndUpdate(operadorId, nuevoProducto)
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

const eliminarProducto = async (req, res = response) => {
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
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}