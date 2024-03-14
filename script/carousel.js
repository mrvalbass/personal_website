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

//Place cards side by side
const setCardPosition = (card, index) => {
  card.style.left = `${index*cardWidth}px`
};

cards.forEach(setCardPosition);

//Resize cards on carousel size modification
const resizeObserver = new ResizeObserver(() =>cards.forEach(setCardPosition))
resizeObserver.observe(journeyList)

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

    if (targetIndex === cards.length -1) {
      rightArrow.style.visibility = 'hidden'
      leftArrow.style.visibility = 'visible'
    } else if (targetIndex === 0) {
      rightArrow.style.visibility = 'visible'
      leftArrow.style.visibility = 'hidden'
    } else {
      rightArrow.style.visibility = 'visible'
      leftArrow.style.visibility = 'visible'
    }
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
  if (!targetCity) return;
  const targetIndex = cities.indexOf(targetCity);
  moveToCard(targetIndex);
  console.log(window.innerWidth)
  if (window.innerWidth <= 1000) {
    carousel.scrollIntoView()
  };
})

// Open the page on the last element
moveToCard(cards.length-1)