function ratingStar(restaurantRating) {

  const rating = Number(restaurantRating)
  const ratingInteger = Math.floor(rating)
  const ratingDecimal = rating - ratingInteger
  let ratingHTML = ''

  // regular star <i class="far fa-star"></i>
  // solid star <i class="fas fa-star"></i>
  // half star <i class="fas fa-star-half-alt"></i>

  if (rating > 5) {
    return `<i class="fas fa-star"></i>`
  }

  for (let i = 1; i <= ratingInteger; i++) {
    ratingHTML += `<i class="fas fa-star"></i>`
  }

  if (ratingInteger === 5) {
    return ratingHTML
  }

  if (ratingDecimal <= 0.25) {
    ratingHTML += `<i class="far fa-star"></i>`
  } else if (ratingDecimal >= 0.75) {
    ratingHTML += `<i class="fas fa-star"></i>`
  } else {
    ratingHTML += `<i class="fas fa-star-half-alt"></i>`
  }

  for (let i = ratingInteger + 2; i <= 5; i++) {
    ratingHTML += `<i class="far fa-star"></i>`
  }

  return ratingHTML
}

module.exports = ratingStar
