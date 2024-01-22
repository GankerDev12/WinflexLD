const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    op: [{
        type: String,
    }],
    np: [{
        type: String
    }],
    tipoMaterial: {
        type: String
    },
    extrusion: {
        type: String
    },
    descripcion: {
        type: String
    },
    medidas: {
        type: String
    }
    ,
    kgSolicitados: {
        type: Number
    },
    fabricante: {
        type: Schema.Types.ObjectId,
        ref: 'Fabricante'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Producto', ProductoSchema);