const UsersServices = require('../Services/UsersServices');
const { setToCache, deleteFromCache } = require('@services/redisServices')

const createUser = async (req, res) => {
    try {
        const user = await UsersServices.createUser(req.body);
        deleteFromCache('/api/users'+ ":" + req?._parsedUrl?.query)
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UsersServices.getAllUsers();
        setToCache(`${req?.baseUrl}:${req?._parsedUrl?.query}`, users)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await UsersServices.getUserById(req.params.id);
        if (user) {
            setToCache(req?.baseUrl +":"+ + req?._parsedUrl?.query, user)
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await UsersServices.updateUser(req.params.id, req.body);
        if (user) {
            deleteFromCache('/api/users'+ ":" + req?._parsedUrl?.query)
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = await UsersServices.deleteUser(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
