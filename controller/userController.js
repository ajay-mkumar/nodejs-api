const asyncHandler = require('../middleware/asyncHandler');
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_TOKEN = process.env.JWT_SECRET;

const createUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await userModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
    });

    res.status(200).send(`User is created: ${newuser}`);
})

const fetchUsers = asyncHandler(async (req, res) => {
    const users = await userModel.findAll();

    res.status(200).send(users);
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        where:
        {
            email: email
        }
    });
    
    if (!user) {
        return res.status(404).send('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).status('Please provide valid password');
    }

    const token = jwt.sign({ user }, JWT_TOKEN, { expiresIn: '1h' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 36000000
    })
    res.json({ message: 'user logged in' });
})

const updateUser = asyncHandler(async(req, res) => {
    const userId = req.user.id;

    const {firstName, lastName, email, isAdmin} = req.body;

    const user = await userModel.findByPk(userId);
    if (!user) {
        return res.status(404).send('User not found');
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (isAdmin) user.isAdmin = isAdmin;

    await user.save();

    res.status(200).send(`User ${user} updated successfully`);
})

const logout = (req, res) => {
    res.clearCookie('token');

    res.send('user logged out successfully')
}


module.exports = {
    createUser,
    fetchUsers,
    authUser,
    updateUser,
    logout
}