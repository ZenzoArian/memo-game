const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 100;
let choose = "";
let fout = 0;
let goed = 0;
let punt = false;
let won = false;
ConWon()

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
  score = score - 5;
  fout = fout + 1;
  scoreShow()
  chooseShow()
  goedShow()
  foutShow()
  totalShow()
  ConWon()
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
  score = score + 10;
  fout = fout - 1;
  goed = goed + 1;
  punt = true;
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
    punt = false;
    chooseShow()
  }, 600);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function foutShow() {
  let foutShow = document.getElementById('foutShow');
  foutShow.innerHTML = fout
}

function goedShow() {
  let goedShow = document.getElementById('goedShow');
  goedShow.innerHTML = goed
}

function scoreShow() {
  let scoreShow = document.getElementById('scoreShow');
  scoreShow.innerHTML = score
}

function totalShow() {
  let totalShow = document.getElementById('totalShow');
  totalShow.innerHTML = goed + fout
}

function chooseShow() {
  let chooseShow = document.getElementById('chooseShow');
  if (punt == true) {
    choose = "Good job!";
  } else if (punt == false) {
    choose = "try again";
  }
  chooseShow.innerHTML = choose
}



function ConWon() {
  if (goed == 6) {
    won = true;
  }
  if (won == true) {
    document.getElementById("Gone").style.visibility = "";
  }
  if (won == false) {
    document.getElementById("Gone").style.visibility = "hidden";
  }
}
