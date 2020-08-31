// const router = require('express').Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const secrets = require('../config/secrets');

// const Users = require('../database/db-model');


// router.post('/register', (req, res) => {
//     const credentials = req.body;

//     if(Users.isValid(credentials)) {
//       const hash = bcrypt.hashSync(credentials.password, 10)
//       credentials.password = hash;
      
//       Users.add(credentials)
//         .then(user => {
//           res.status(201).json({data: user})
//         })
//         .catch(err => res.status(500).json({message: err.message}))

//     } else {
//       res.status(400).json({message: 'Please enter a valid username and password'})
//     }
// });

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   if(Users.isValid(req.body)) {
//       Users.findBy({username})
//       .then(([user]) => {
//           if(user && bcrypt.compareSync(password, user.password)) {
//               const token = generateToken(user);
//               res.status(200).json({message: 'You are now logged in', token})
//           } else {
//               res.status(401).json({message: 'Please enter the correct username and password'})
//           }
//       })
//       .catch(err => {
//           res.status(500).json({message: err.message})
//       })
//   } else {
//       res.status(400).json({message: 'please provide a username and password'})
//   }
// });

// function generateToken(user) {
//   const payload = {
//     subject: user.id,
//     username: user.username
//   };

//   const options = {
//     expiresIn: '1h'
//   };


//   return jwt.sign(payload, secrets.jwtSecret, options);
// }

// module.exports = router;


const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const Users = require('../database/db-model');


router.post('/register', (req, res) => {
    const credentials = req.body;

    if(Users.isValid(credentials)) {
      const hash = bcrypt.hashSync(credentials.password, 10)
      credentials.password = hash;
      
      Users.add(credentials)
        .then(user => {
            const token = generateToken(user)
          res.status(201).json({
              newUser: user,
              token: token,
              message: 'You have registered successfully'
            })
        })
        .catch(err => res.status(500).json({message: err.message}))

    } else {
      res.status(400).json({message: 'Please enter a valid username and password'})
    }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if(Users.isValid(req.body)) {
      Users.findBy({username})
      .then(([user]) => {
          if(user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user);
              res.status(200).json({message: 'You are now logged in', token: token})
          } else {
              res.status(401).json({message: 'Please enter the correct username and password'})
          }
      })
      .catch(err => {
          res.status(500).json({message: err.message})
      })
  } else {
      res.status(400).json({message: 'please provide a username and password'})
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


  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
