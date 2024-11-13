require('dotenv').config();
const User = require('@modules/Users/Model/UsersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('@modules/Roles/Model/RolesModel');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

exports.login = async (email, password) => {
    try {
        const user = await User.findOne({
            where: { email },
            include: {
                model: Role,
                attributes: ['id', 'role_name']
            }
        });


        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign(
                { userId: user.id, email: user.email, roleID: user.Role?.id, roleName: user.Role?.role_name},
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN } // Options
            );

            const { password, role_id, ...userInfoWithoutPassword } = user.toJSON();


            return { success: true, message: 'Success', token, userInfo: userInfoWithoutPassword };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    } catch (error) {
        console.error('Error in login service:', error);
        return { success: false, message: 'Internal server error' };
    }
};
