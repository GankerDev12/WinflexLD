const { Schema, model } = require('mongoose');

const ExtrusionSchema = Schema({
    fecha: {
        type: new Date(),
    },
    turno: {
        type: String,
        enum: ['Dia', 'Noche']
    },
    kilosExtruidos: {
        type: Number
    },
    scrap: {
        type: Number
    },
    refill: {
        type: Number
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
    }]
});

module.exports = model('Extrusion', ExtrusionSchema);