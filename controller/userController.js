const asyncHandler = require('../middleware/asyncHandler');
const userModel = require('../model/userModel');

const createUser = asyncHandler(async(req, res) => {
    const {firstName, lastName, email} = req.body;

    const newuser = await userModel.create({
        firstName:firstName,
        lastName:lastName,
        email:email
    });

    res.status(200).send(`User is created: ${newuser}`);
})

const fetchUsers = asyncHandler(async(req, res) => {
    const users = await userModel.findAll();

    res.status(200).send(users);
})


module.exports = {
    createUser,
    fetchUsers
}