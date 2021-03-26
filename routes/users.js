const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post(
  '/',
  [
    //Validation Checks
    check('name', 'Please add name').not().isEmpty(), //field, msg if error, checks
    check('email', 'Please include a valid email address').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //check for validation errors
      return res.status(400).json({ errors: errors.array() }); //returns error in json format as array of errors
    }

    const { name, email, password } = req.body;

    try {
      // let user = await User.findOne({email: email}) // since ES6 we can use just email as both have same names
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      // hashed passwrod
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // res.send('User saved');
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000, //usually 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
