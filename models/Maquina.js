const { Schema, model } = require('mongoose');

const MaquinaSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    planta: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

MaquinaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = model('Maquina', MaquinaSchema);