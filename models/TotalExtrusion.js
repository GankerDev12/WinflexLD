const { Schema, model } = require('mongoose');

const TotalExtrusionSchema = Schema({
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    totalKilosExtruidos: {
        type: Number
    },
    totalScrap: {
        type: Number
    },
    totalrefill: {
        type: Number
    },
    totalProduccion: {
        type: Number
    },
    totalPorcentajeScrap: {
        type: Number
    },
    estadoOP: {
        type: String
    }
});

module.exports = model('TotalExtrusion', TotalExtrusionSchema);