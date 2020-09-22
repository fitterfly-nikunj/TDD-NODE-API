const db = require("../models");
const User = db.user;
const {response} = require('../Helpers');
exports.getUser = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return response(res, 404, 'Invalid request!');
    }
    const user = await User.findByPk(userId);
    if (!user) {
        return response(res, 404, 'User not found!');
    }
    return response(res, 200, null, user);
};
exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    return response(res, 200, null, users);

};

exports.createUser = async (req, res) => {
    const user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    });
    return response(res, 200, null, user);
};

exports.updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return response(res, 404, null, 'User not found');
    }
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save();

    return response(res, 200, null, user);
};

exports.deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return response(res, 404, null, 'User not found');
    }
    user.destroy();

    return response(res, 200, null);
};