const { Schema, model } = require('mongoose');

const ImpresionSchema = Schema({
    fecha: {
        type: Date
    },
    turno: {
        type: String,
        enum: ['Dia', 'Noche']
    },
    maquina: {
        type: Schema.Types.ObjectId,
        ref: 'Maquina',

    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    operador: [{
        type: Schema.Types.ObjectId,
        ref: 'Operador'
    }],
    kgsEntrada: {
        type: Number
    },
    kgsSalida: {
        type: Number
    },
    scrap: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Impresion', ImpresionSchema);