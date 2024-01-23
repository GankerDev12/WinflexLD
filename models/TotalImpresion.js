const { Schema, model } = require('mongoose');

const TotalImpresionSchema = Schema({
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
    totalScrap: {
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
})


module.exports = model('TotalImpresion', TotalImpresionSchema);