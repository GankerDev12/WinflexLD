const { Schema, model } = require('mongoose');

const ExtrusionSchema = Schema({
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
        ref: 'Fabricante'
    }
});

module.exports = model('Extrusion', ExtrusionSchema);