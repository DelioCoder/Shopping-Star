const cartCtrl = {};

const User = require('../models/User');
const Product = require('../models/Product');

cartCtrl.getMyproducts = async(req, res) =>{

    const products = await User.find();

    res.send(products);

}

cartCtrl.insertProducts = async(req, res) => {

    const user = await User.findById(req.params.id);

    user.cart.name = req.body.name;
    user.cart.price= req.body.price,
    user.cart.image= req.body.image,
    user.cart.brand= req.body.brand,
    user.cart.category= req.body.category,
    user.cart.description= req.body.description

    await user.save();

    res.json({message: 'Product saved :D'})

}

module.exports = cartCtrl;