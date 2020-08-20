const express = require('express');
const router = express.Router();
const User = require('../user/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secrets');
const {hashRounds} = require('../config/rounds');

router.post('/register', (req, res) => {
    const credentials = req.body;

    if(User.isValid(credentials)){
        const hash = bcrypt.hashSync(credentials.password, hashRounds)
        credentials.password = hash;

        User.addUser(credentials)
            .then(user => {
                res.status(201).json(credentials)
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    } else {
        res.status(400).json({message: 'Please enter a valid username and password'})
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if(User.isValid(req.body)){
        User.findBy({username})
            .then(([user]) => {
                if(user && bcrypt.compareSync(password, user.password)){
                    const token = generateToken(user)
                    res.status(200).json({message: 'You are now logged in', token})
                } else {
                    res.status(401).json({message: 'Username or password not valid'})
                }
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    } else {
        res.status(400).json({message: 'Please enter a username and password'})
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;