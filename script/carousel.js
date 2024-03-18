const carousel = document.querySelector('#carousel')
const journeyList = document.querySelector('.journey-list');
const cards = Array.from(journeyList.children);
const leftArrow = document.querySelector('#left-arrow');
const rightArrow = document.querySelector('#right-arrow');
const navDates = document.querySelector('.carousel-nav');
const dates = Array.from(navDates.children);
const frenchMap = document.querySelector('#map')
const cities = Array.from(frenchMap.children).slice(1)

const getCardsWidth = () => cards[0].getBoundingClientRect().width;
// Function and not static expression to be dynamically calculated each time called
// Otherwise when resizing the carousel, cards would keep the initial loading size

//Place cards side by side
const setCardPosition = (card, index) => {
  card.style.left = `${index*getCardsWidth()}px`
};

// Remove arrow at the beginning and at the end of the carousel
const displayArrows = (targetIndex) => {
  if (targetIndex === cards.length -1) {
      rightArrow.style.visibility = 'hidden'
      rightArrow.style.opacity = 0
      leftArrow.style.visibility = 'visible'
      leftArrow.style.opacity = 1
    } else if (targetIndex === 0) {
      rightArrow.style.visibility = 'visible'
      rightArrow.style.opacity = 1
      leftArrow.style.visibility = 'hidden'
      leftArrow.style.opacity = 0
    } else {
      rightArrow.style.visibility = 'visible'
      rightArrow.style.opacity = 1
      leftArrow.style.visibility = 'visible'
      leftArrow.style.opacity = 1
    }
}

// Move to a target card
const moveToCard = (targetIndex) => {
  const currentCard = journeyList.querySelector('.current-card');
  const targetCard = cards[targetIndex]

  if (targetCard) {
    const currentDate = navDates.querySelector('.current-date')
    const currentCity = frenchMap.querySelector('.current-city')

    journeyList.style.transform = `translateX(-${targetCard.style.left})`

    currentCard.classList.remove('current-card')
    targetCard.classList.add('current-card')
    
    currentDate.classList.remove('current-date')
    dates[targetIndex].classList.add('current-date')

    currentCity.classList.remove('current-city')
    cities[targetIndex].classList.add('current-city')

    displayArrows(targetIndex)
  }
}

// Move to a card with arrows
carousel.addEventListener('click', e => {
  const targetArrow = e.target.closest('button');
  if (!targetArrow) return
  const currentIndex = cards.indexOf(journeyList.querySelector('.current-card'))
  if (targetArrow === leftArrow) {
    const targetIndex = currentIndex - 1;
    moveToCard(targetIndex);
  } else {
    const targetIndex = currentIndex + 1;
    moveToCard(targetIndex);
  }
})

// Move to a card with  dates
navDates.addEventListener('click', e => {
  const targetDate = e.target.closest('button');
  if (!targetDate) return
  const targetIndex = dates.indexOf(targetDate);
  moveToCard(targetIndex);
})

// Move to a card with places 
frenchMap.addEventListener('click', e => {
  const targetCity = e.target.closest('ellipse');
  if (!targetCity) return;
  const targetIndex = cities.indexOf(targetCity);
  moveToCard(targetIndex);
  console.log(window.innerWidth)
  if (window.innerWidth <= 1000) {
    carousel.scrollIntoView()
  };
})
//Resize cards on carousel size modification (gets triggered on page load too)
const carouselResizeObserver = new ResizeObserver(() => {
  cards.forEach(setCardPosition)
  // Move to current card to avoid displaying the gap between 2 cards
  const currentIndex = cards.indexOf(journeyList.querySelector('.current-card'))
  journeyList.style.transition = 'none'
  moveToCard(currentIndex)
  setTimeout(() => journeyList.style.transition = null, 1)
})

carouselResizeObserver.observe(carousel)
// Open the page on the last element
moveToCard(cards.length-1)