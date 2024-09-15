const User = require('../Model/UsersModel');

const createUser = async (userData) => {
    return await User.create(userData);
};

const getAllUsers = async () => {
    return await User.findAll({
        attributes: { exclude: ['password'] },
    });
};

const getUserById = async (id) => {
    return await User.findByPk(id);
};

const updateUser = async (id, userData) => {
    const [updated] = await User.update(userData, {
        where: { id }
    });
    if (updated) {
        return await User.findByPk(id);
    }
    return null;
};

const deleteUser = async (id) => {
    return await User.destroy({
        where: { id }
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
