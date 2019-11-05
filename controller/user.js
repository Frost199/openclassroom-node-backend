const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwt_token_secret = 'a2f5c815c03053b089ace56bc6b4e57704d23ebff7e0aa837995fc8f531be1835f76cc1087c922a4c9d197b4d4cafc6c';

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => {
                    res.status(201).json({
                        message: 'User added successfully!'
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
        });
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (!user)
                return res.status(401).json({
                    message: new Error('User not found!')
                });
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid)
                        return res.status(401).json({
                            error: new Error('Incorrect password')
                        });

                    const token = jwt.sign(
                        {userId: user._id},
                        jwt_token_secret,
                        {expiresIn: '24h'}
                    );

                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};
