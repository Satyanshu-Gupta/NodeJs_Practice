const User = require('../../Users/Model/UsersModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = await User.create({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
    });

    return user;
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};
