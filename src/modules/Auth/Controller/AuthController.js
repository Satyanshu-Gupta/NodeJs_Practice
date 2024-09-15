const AuthServices = require('../Services/AuthServices');

exports.registerUser = async (req, res) => {
    
    try {
        const { username, name, email, password, role_id } = req.body;

        if (!username || !email || !password || !name || !role_id) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existingUser = await AuthServices.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = await AuthServices.registerUser({ username, email, password, name, role_id });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                role_id: user.role_id
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
