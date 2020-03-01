const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

const ratingStar = require('../public/javascripts/ratingStar')
const showSort = require('../public/javascripts/showSort')

// read all page
router.get('/', (req, res) => {

  const search_keyword = req.query.search_keyword || ''
  const sortField = req.query.sortField || 'rating'
  const sortOrder = req.query.sortOrder || 'desc'
  const showSortText = showSort(req.query.sortField, req.query.sortOrder)

  // avoid special characters
  const specialCharacters = /[\\^$*+?.():=![\]{}<>'"-/%]/
  if (specialCharacters.test(search_keyword)) {
    return res.redirect('/restaurants')
  }

  const _regex = new RegExp(search_keyword, "i");
  Restaurant.find({ $or: [{ name: { $regex: _regex } }, { category: { $regex: _regex } }] })
    .sort({ [sortField]: sortOrder })
    .lean()
    .then(restaurants => {

      restaurants.forEach(restaurant => {
        restaurant.ratingHTML = ratingStar(restaurant.rating)
      })

      return res.render('index', { restaurants, search_keyword, showSortText })
    })
    .catch(err => {
      return console.error(err)
    })
})
// read create page
router.get('/new', (req, res) => {
  return res.render('new')
})
// create
router.post('/', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: Number(req.body.rating).toFixed(1),
    description: req.body.description
  })

  restaurant.save(err => {
    if (err) {
      return console.error(err)
    }
    return res.redirect('/restaurants')
  })
})
// read one page
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .then(restaurant => {
      return res.render('detail', { restaurant })
    })
    .catch(err => {
      return console.error(err)
    })
})
// read update page
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .then(restaurant => {
      return res.render('edit', { restaurant })
    })
    .catch(err => {
      return console.error(err)
    })
})
// updete
router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = Number(req.body.rating).toFixed(1)
      restaurant.description = req.body.description
      restaurant.updated_time = Date()

      restaurant.save(err => {
        if (err) {
          return console.error(err)
        }
        return res.redirect(`/restaurants/${req.params.id}`)
      })
    })
    .catch(err => {
      return console.error(err)
    })
})
// delete
router.delete('/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      restaurant.remove(err => {
        if (err) {
          return console.error(err)
        }
        return res.redirect('/restaurants')
      })
    })
    .catch(err => {
      return console.error(err)
    })
})

module.exports = router
