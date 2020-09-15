const express = require('express');
const router = express.Router();

//post_request -> submitting data,like registering a user

// ===== SIGNATURES ==============================
// @route       POST api/users
// @desc        Register a user
// @access      Public

router.post('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;
