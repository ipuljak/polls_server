const express = require('express')
  , router = express.Router();

router.get('/new_poll', (req, res) => {
  res.send({
    success: 'this call was successful'
  });
});

module.exports = router;