const express = require('express')
const router = express.Router()

// homepage
router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

module.exports = router
