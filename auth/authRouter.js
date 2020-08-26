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
            .then(newUser => {
                const token = generateToken(newUser)
                res.status(201).json({
                    newUser: newUser,
                    token: token,
                    message: 'You have registered successfully'
                })
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    } else {
        res.status(400).json({message: 'Please enter a valid username and password'})
    }
});


// router.post('/register', (req, res) => {
//     let user = res.body;
//     const hash = bcrypt.hashSync(user.password, hashRounds);
//     user.password = hash;

//     User.addUser(user)
//         .then(newUser => {
//             const token = genToken(newUser);
//             res.status(201).json({
//                 id: newUser.id,
//                 username: newUser.username,
//                 password: newUser.password,
//                 token: token,
//                 message: 'You have successfully registered!'
//             })
//         })
//         .catch(err => res.status(500).json(err.message))
// });


// router.post('login', (req, res) => {
//     let { username, password } = req.body;

//     User.findBy({username})
//         .first()
//         .then(user => {
//             if (user && bcrypt.compareSync(password, user.password)) {
//                 const token = genToken(user);
//                 res.status(200).json({
//                     id: user.id,
//                     username: user.username,
//                     token: token,
//                     message: 'You are now logged in'
//                 })
//             } else {
//                 res.status(401).json({message: 'Please enter a valid username and password'})
//             }
//         })
//         .catch(err => res.status(500).json(err.message))
// });



router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if(User.isValid(req.body)){
        User.findBy({username})
            .then(([user]) => {
                if(user && bcrypt.compareSync(password, user.password)){
                    const token = generateToken(user)
                    res.status(200).json({
                        user: user,
                        message: 'You are now logged in',
                        token: token})
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

    const token = jwt.sign(payload, jwtSecret, options);

    return token;
}

module.exports = router;