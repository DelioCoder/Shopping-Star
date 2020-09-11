const { Schema, model } = require('mongoose');

const productSchema = new Schema({

    name:{type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    price: {type: Number,default: 0, required: true},
    category: {type: String, required: true},
    countInStock: {type: Number, default: 0, required: true},
    description: {type: String, required: true},
    rating: {type: Number,default: 0, required: true},
    numReviews: {type: Number,default: 0, required: true},

},{
    timestamps: true // Fecha de creación y fecha de modificación
});


module.exports = model('Product', productSchema);