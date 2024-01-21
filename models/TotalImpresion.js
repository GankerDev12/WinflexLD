const { Schema, model } = require('mongoose');

const TotalImpresion = Schema({
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    totalKgsEntrada: {
        type: Number
    },
    totalKgsSalida: {
        type: Number
    },
    totalPorcentajeScrap: {
        type: Number
    }

})


module.exports = model('TotalImpresion', TotalImpresionSchema);