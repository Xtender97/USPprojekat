const User = require("../models/User");
const sequelize = require("../database/databaseConnection");
const Sequelize = require("sequelize");
const bcrypt = require('bcryptjs');


exports.login = function (req, res) {
    const errorHandler = (err) => {
        return res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
    const email = req.body.email;
    const password = req.body.password;
    var fetchedUser;
    User.findOne({ where: { email: email } })// after added types table add options to get type of user as a string
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: `User with ${email} doesn't exist.`, error: null });

            } else {
                fetchedUser = user;
                return bcrypt.compare(password, user.password)
                    .then(result => {
                        if (!result) {
                            return res.status(401).json({ message: `Wrong password`, error: null });
                        }
                        const tokenDuration = 3600 * 12; // 12h
                        const token = jwt.sign({
                            id: fetchedUser.id,
                            email: fetchedUser.email,
                            type: fetchedUser.type
                        }, process.env.JWT_KEY, { expiresIn: tokenDuration }); // token expires in 1h, maybe need to be changed 

                        res.status(200).json({
                            message: "Successfull login!",
                            token: token,
                            userID: fetchedUser.id,
                            expiresIn: tokenDuration,
                            type: fetchedUser.type
                        })
                    }).catch(errorHandler);
            }
        }).catch(errorHandler);
}

exports.register = function (req, res) {
    const errorHandler = (err) => {
        return res.status(500).json({
            message: "Internal server error (500)",
            error: err
        })
    }
    const password = req.body.sifra;
    var user;
    bcrypt.hash(password, 10)
        .then(hash => {
            user = {
                ime: req.body.ime,
                prezime: req.body.prezime,
                email: req.body.email,
                sifra: hash
            };

            return User.findOne({
                where: {
                    email: req.body.email
                }
            });
        }).then(data => {
            if (data) {
                return res.status(400).json({
                    message: `User with email ${req.body.email} already exists!`,
                    err: null
                })
            }
            else {
                User.create(user).then(user => {
                    console.log("Registered user:");
                    console.log(user);
                    res.status(201);
                    res.json({ message: "Successfully registered " + user.ime + " " + user.prezime + "!" })

                }).catch(errorHandler)
            }
        }).catch(errorHandler);
}
