const { Schema, model } = require('mongoose');

const cheeseSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    price:{
        type : Number,
        default: true,
        required: true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'categorias',
        required:[true,'La categoría del producto es necesaria']
    },
    descripción:{
        type: String,
        required: [true, 'la descripcion es obligatorio'],
        unique: true
    },
    avalaible:{
        type: Boolean,
        required: true
    }
});



module.exports = model( 'cheese', cheeseSchema );
