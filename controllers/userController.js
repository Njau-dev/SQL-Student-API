const db = require("../models/indexStart")
const createError = require("http-errors")
const { authSchema } = require("../helpers/validationSchema")
const { signAccessToken, signRefreshToken } = require("../helpers/jwtHelpers")


// use the model
const User = db.users
module.exports = {

    // add user
    addUser: async (req, res, next) => {

        try {
            const { email, password } = await authSchema.validateAsync(req.body);
            const exists = await User.findOne({ where: { email } })

            if (exists) {
                throw createError.Conflict(`${email} has already been registered`)
            }

            const newUser = new User({ email, password })
            const savedUser = await newUser.save()

            const accessToken = await signAccessToken(savedUser.user_id)
            res.status(200).send({ accessToken })

        } catch (error) {
            next(error)

        }
    },

    // get all users

    getAllUsers: async (req, res, next) => {

        try {
            let users = await User.findAll({})
            res.status(200).send(users)

        } catch (error) {
            next(error)
        }
    },

    loginUser: async (req, res, next) => {
        try {

            const result = await authSchema.validateAsync(req.body);
            const user = await User.findOne({ where: { email: result.email } });

            if (!user) throw createError.NotFound("User not registered");

            // matching the password
            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch) throw createError.Unauthorized("Username/Password  not valid");

            // if password is matching 
            const accessToken = await signAccessToken(user.user_id, user.role);
            const refreshToken = await signRefreshToken(user.user_id);

            res.send({ accessToken, refreshToken })

        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest("Invalid Username/Password"))
            next(error)

        }
    },

    updateUserRole: async (req, res, next) => {
        try {
            const { userId } = req.params; // User ID from the request parameters
            const { role } = req.body; // New role from the request body

            // Validate the role
            if (!["user", "admin"].includes(role)) {
                throw createError.BadRequest("Invalid role. Role must be either 'user' or 'admin'.");
            }

            // Find the user
            const user = await User.findByPk(userId);
            if (!user) {
                throw createError.NotFound("User not found.");
            }

            // Update the role
            user.role = role;
            await user.save();

            res.status(200).send({ message: `User role updated to '${role}'`, user });
        } catch (error) {
            next(error);
        }
    }
}