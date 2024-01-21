const { Schema, model } = require('mongoose');

const TotalExtrusionSchema = Schema({
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    totalUnidades: {
        type: Number
    },
    totalKilos: {
        type: Number
    },
    totalScrap: {
        type: Number
    },
    totalTroquel: {
        type: Number
    },
    totalScrapTroquel: {
        type: Number
    },
    totalPorcentajeScrap: {
        type: Number
    }
});

module.exports = model('TotalExtrusion', TotalExtrusionSchema);