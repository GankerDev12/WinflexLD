const { Schema, model } = require('mongoose');

const TotalSelladoSchema = Schema({
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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('TotalSellado', TotalSelladoSchema);