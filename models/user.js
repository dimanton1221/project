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

// create user
const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (err) {
        throw err;
    }
};

// User.sync({ alter: true });

module.exports = {
    User,
    getUser,
    createUser,
    // login,
};
