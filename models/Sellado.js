const { Schema, model } = require('mongoose');

const SelladoSchema = Schema({
    fecha: {
        type: Date
    },
    maquina: {
        type: Schema.Types.ObjectId,
        ref: 'Maquina',
    },
    turno: {
        type: String,
        enum: ['Dia', 'Noche']
    },
    operador: [{
        type: Schema.Types.ObjectId,
        ref: 'Operador'
    }],
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    unidades: {
        type: Number
    },
    kilos: {
        type: Number
    },
    scrap: {
        type: Number
    },
    troquel: {
        type: Number
    },
    scrapTroquel: {
        type: Number
    },
    porcentajeScrap: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Sellado', SelladoSchema);