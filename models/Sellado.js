const { Schema, model } = require('mongoose');

const SelladoSchema = Schema({
    fecha: {
        type: new Date(),
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
    }
});

module.exports = model('Sellado', SelladoSchema);