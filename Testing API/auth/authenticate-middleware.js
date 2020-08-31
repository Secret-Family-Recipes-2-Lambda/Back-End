const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secrets');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if(token) {
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if(err) {
                    res.status(401).json({message: 'Please log in to access this page'})
                } else {
                    req.decodedToken = decodedToken;
                    next();
                }
            })
        } else {
            throw new Error('The authorization data is invalid')
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

