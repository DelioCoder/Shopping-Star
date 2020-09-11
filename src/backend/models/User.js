const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name:{type: String, required: true},
    username:{type: String, required: true},
    email:{type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    isAdmin:{type: Boolean, required: true, default: false},
    cart:{
        name:{type: String, default:''},
        image: {type: String, default:''},
        brand: {type: String, default:''},
        price: {type: Number,default: 0},
        category: {type: String, default:''},
        description: {type: String, default:''}
    }
    
},{
    timestamps: true // Fecha de creación y fecha de modificación
});

userSchema.methods.generateHash = (password) => {//Encriptar una contraseña
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};


module.exports = model('User', userSchema);