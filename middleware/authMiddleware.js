const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const asyncHandler = require('../middleware/asyncHandler');
const { UnknownConstraintError } = require('sequelize');

const JWT_TOKEN = process.env.JWT_SECRET;

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Access denied!');
    }

    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.user = await userModel.findByPk(decoded.user.id);
        next();
    } catch (err) {
        res.status(401);
        throw new Error('Not autorized!');
    }
})

const admin = asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        res.status(400);
        throw new Error('not authorized as admin!');
    }

    next();
})

module.exports = { protect, admin };