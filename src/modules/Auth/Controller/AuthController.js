const AuthServices = require('../Services/AuthServices');

exports.registerUser = async (req, res) => {
    
    try {
        const { username, name, email, password } = req.body;

        if (!username || !email || !password || !name) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existingUser = await AuthServices.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = await AuthServices.registerUser({ username, email, password, name });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
