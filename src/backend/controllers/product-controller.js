const productCtrl = {};

const Product = require('../models/Product');

const { verificarToken } = require("../middlewares/autenticacion");

productCtrl.getProducts = async (req, res) =>{

    const products = await Product.find();

    res.json(products);

}

productCtrl.createProduct = async (req, res) => {

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });

    const newProduct = await product.save();

    if(newProduct){
        return res.status(201).send({ message:'New Product created :D', data: newProduct })
    }
    return res.status(500).send({message: 'Error in creating product.'})
}

productCtrl.getProduct = async (req, res) => {

    const product = await Product.findById(req.params.id);

    res.send(product);

}

productCtrl.updateProduct = async (req, res) => {

    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedProduct });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });

}

productCtrl.deleteProduct = async (req, res) =>{

    await Product.findByIdAndDelete(req.params.id);

    res.json({message: 'Product Deleted'})

}

module.exports = productCtrl;