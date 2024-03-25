const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    op: {
        type: String,
    },
    np: {
        type: String
    },
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
    },
    kgSolicitados: {
        type: Number
    },
    fabricante: {
        type: Schema.Types.ObjectId,
        ref: 'Fabricante',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

ProductoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = model('Producto', ProductoSchema);