window.onload = function () {
  const result = document.getElementById('Result');
  const stone = document.getElementById('sub1');
  const paper = document.getElementById('sub2');
  const scissor = document.getElementById('sub3');

  const userCountDisplay = document.getElementById('userc');
  const compCountDisplay = document.getElementById('compc');

  let userScore = 0;
  let compScore = 0;

  // Add event listeners to the choices
  stone.addEventListener('click', () => playRound('stone'));
  paper.addEventListener('click', () => playRound('paper'));
  scissor.addEventListener('click', () => playRound('scissor'));

  function playRound(userChoice) {
    const compChoice = getComputerChoice();
    const outcome = determineWinner(userChoice, compChoice);
    updateScores(outcome);
    displayResult(userChoice, compChoice, outcome);
  }

  function getComputerChoice() {
    const choices = ['stone', 'paper', 'scissor'];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function determineWinner(user, comp) {
    if (user === comp) return 'draw';

    if (
      (user === 'stone' && comp === 'scissor') ||
      (user === 'scissor' && comp === 'paper') ||
      (user === 'paper' && comp === 'stone')
    ) {
      return 'user';
    } else {
      return 'comp';
    }
  }

  function updateScores(winner) {
    if (winner === 'user') userScore++;
    else if (winner === 'comp') compScore++;

    userCountDisplay.textContent = userScore;
    compCountDisplay.textContent = compScore;
  }

  function displayResult(userChoice, compChoice, winner) {
    // Clear initial message if present
    if (
      result.children.length === 1 &&
      result.children[0].tagName === 'P' &&
      result.children[0].textContent.includes('Results will appear here')
    ) {
      result.innerHTML = '';
    }

    let message = '';

    if (winner === 'user') {
      message = "You win! 🎉";
    } else if (winner === 'comp') {
      message = "Computer wins! 💻";
    } else {
      message = "It's a draw. 🤝";
    }

    const p = document.createElement('p');
    p.innerHTML = `🧑 You chose <b>${capitalize(userChoice)}</b> | 🤖 Computer chose <b>${capitalize(compChoice)}</b><br><strong>Result:</strong> ${message}`;
    p.style.margin = '1rem 0';
    p.style.padding = '1rem';
    p.style.backgroundColor = '#ffffff22';
    p.style.borderRadius = '10px';
    p.style.color = 'white';

    result.appendChild(p);
    result.scrollTop = result.scrollHeight; // Auto-scroll to bottom
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};
