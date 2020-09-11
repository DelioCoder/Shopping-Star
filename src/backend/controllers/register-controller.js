const registerCtrl = {};

const User = require('../models/User');
/*
registerCtrl.getUsers = async (req, res) => {
    
    const users = await User.find();

    res.json(users);
}
*/
registerCtrl.createUser = async (req, res) => {

    const { name, username, email, password } = req.body;

    const newUser = new User();

    newUser.name = name;
    newUser.username = username;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);

    await newUser.save();

    res.json({message: 'User Saved'})

}



module.exports = registerCtrl;