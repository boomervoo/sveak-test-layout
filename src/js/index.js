import '../scss/style.scss';
import '../scss/variables.scss';
import '../components/menu/menu.scss';
import '../components/layout/layout.scss';
import '../components/content/content.scss';
import '../components/footer/footer.scss';
import '../components/card/card.scss';
import '../components/burger/burger.scss';

function hideIncompleteCardRows() {
  const container = document.querySelector('.content'); 
  const cards = container.querySelectorAll('.card');

  if (cards.length === 0) return;


  cards.forEach((card) => (card.style.display = ''));



  let cardsPerRow = 0;
  const firstCardRect = cards[0].getBoundingClientRect();

  for (let i = 1; i < cards.length; i++) {
    const currentCardRect = cards[i].getBoundingClientRect();
    if (currentCardRect.top > firstCardRect.top) {
      cardsPerRow = i;
      break;
    }
  }


  if (cardsPerRow === 0) cardsPerRow = cards.length;


  const fullRows = Math.floor(cards.length / cardsPerRow);
  const cardsInFullRows = fullRows * cardsPerRow;
  const remainingCards = cards.length - cardsInFullRows;

  if (remainingCards > 0) {
    for (let i = cardsInFullRows; i < cards.length; i++) {
      cards[i].style.display = 'none';
    }
  }
}


let resizeTimeout;
function debouncedHide() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(hideIncompleteCardRows, 100);
}

window.addEventListener('load', hideIncompleteCardRows);
window.addEventListener('resize', debouncedHide);
