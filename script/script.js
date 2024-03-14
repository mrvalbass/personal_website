const carousel = document.querySelector('#carousel')
const journeyList = document.querySelector('.journey-list');
const cards = Array.from(journeyList.children);
const leftArrow = document.querySelector('#left-arrow');
const rightArrow = document.querySelector('#right-arrow');
const navDates = document.querySelector('.carousel-nav');
const dates = Array.from(navDates.children);
const frenchMap = document.querySelector('#map')
const cities = Array.from(frenchMap.children).slice(1)

const cardWidth= cards[0].getBoundingClientRect().width;

//Place slides side by side
const setCardPosition = (card, index) => {
  card.style.left = `${index*cardWidth}px`
};

cards.forEach(setCardPosition);

window.addEventListener('resize', () => {
  cards.forEach(setCardPosition)
  moveToCard(cards.length-1)
})

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

// Move to a card associated with a date
navDates.addEventListener('click', e => {
  const targetDate = e.target.closest('button');
  if (!targetDate) return
  const targetIndex = dates.indexOf(targetDate);
  moveToCard(targetIndex);
})

// Move to a card associated with a place 
frenchMap.addEventListener('click', e => {
  const targetCity = e.target.closest('ellipse');
  if (!targetCity) return
  const targetIndex = cities.indexOf(targetCity);
  moveToCard(targetIndex);
})

// Open the page on the last element
moveToCard(cards.length-1)