// make login db connection
const db = require("../config/database");
// const sequelize = require('sequelize');

// create user model

// id (Primary Key)
// username
// email
// password
// role (admin, user)

// DataTypes
const { DataTypes } = require("sequelize");

const User = db.define(
    "user",
    {
        // make user primary key
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "Username is required",
                },
                len: {
                    args: [3, 20],
                    msg: "Username must be between 3 to 20 characters",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "Email is required",
                },
                isEmail: {
                    msg: "Please provide a valid email",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Password is required",
                },
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        freezeTableName: true,
    }
);

// sync model with database

// get user for verify login
const getUser = async (username) => {
    try {
        const user = await User.findOne({
            where: {
                username,
            },
        });
        return user;
    } catch (err) {
        throw err;
    }
};

// GET ALL USERS
const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (err) {
        throw err;
    }
};

// get user by id
const getUserById = async (id) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: id,
            },
        });
        return user;
    } catch (err) {
        throw err;
    }
};

// create new user
const createUser = async (username, email, password, role) => {
    try {
        const user = await User.create({
            username,
            email,
            password,
            role,
        });
        return user;
    } catch (err) {
        throw err;
    }
};


// User.sync({ alter: true });

module.exports = {
    User,
    getUser,
    getAllUsers,
    createUser,
    // login,
};
