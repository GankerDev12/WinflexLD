const { Schema, model } = require('mongoose');

const ExtrusionSchema = Schema({
    fecha: {
        type: Date
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
        ref: 'Maquina'
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    operador: [{
        type: Schema.Types.ObjectId,
        ref: 'Operador'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

ExtrusionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = model('Extrusion', ExtrusionSchema);