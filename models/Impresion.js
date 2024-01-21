const { Schema, model } = require('mongoose');

const ImpresionSchema = Schema({
    fecha: {
        type: new Date(),
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
    }
});

module.exports = model('Impresion', ImpresionSchema);