const LoginServices = require('../Services/LoginServices');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const result = await LoginServices.login(email, password);

        const { success, message, ...rest } = result;

        if (success) {
            return res.status(200).json({ ...rest });
        } else {
            return res.status(401).json({ message: message });
        }

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
