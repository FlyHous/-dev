const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

let deck = [];
let playerHand = [];
let dealerHand = [];

function createDeck() {
    deck = [];
    const suits = ['♠', '♥', '♦', '♣'];
    for (let suit of suits) {
        for (let rank in cardValues) {
            deck.push(`${rank}${suit}`);
        }
    }
    deck = shuffle(deck);
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealCard(hand) {
    const card = deck.pop();
    hand.push(card);
    return card;
}

function calculateTotal(hand) {
    let total = 0;
    let aces = 0;
    for (let card of hand) {
        const value = card.substring(0, card.length - 1);
        total += cardValues[value];
        if (value === 'A') aces++;
    }
    while (total > 21 && aces) {
        total -= 10;
        aces--;
    }
    return total;
}

function updateDisplay() {
    const playerCardsDiv = document.getElementById('player-cards');
    const dealerCardsDiv = document.getElementById('dealer-cards');
    const playerTotalSpan = document.getElementById('player-total');
    const dealerTotalSpan = document.getElementById('dealer-total');
    
    playerCardsDiv.innerHTML = playerHand.join(' ');
    dealerCardsDiv.innerHTML = dealerHand.join(' ');
    playerTotalSpan.textContent = calculateTotal(playerHand);
    dealerTotalSpan.textContent = calculateTotal(dealerHand);
}

function displayResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    document.getElementById('restart-button').style.display = 'block';
}

function checkWinner() {
    const playerTotal = calculateTotal(playerHand);
    const dealerTotal = calculateTotal(dealerHand);

    if (playerTotal > 21) {
        displayResult('Oyuncu 21’i geçti, kaybettiniz!');
    } else if (dealerTotal > 21) {
        displayResult('Bilgisayar 21’i geçti, kazandınız!');
    } else if (playerTotal > dealerTotal) {
        displayResult('Kazandınız!');
    } else if (playerTotal < dealerTotal) {
        displayResult('Kaybettiniz!');
    } else {
        displayResult('Beraberlik!');
    }
}

function dealerTurn() {
    while (calculateTotal(dealerHand) < 17) {
        dealCard(dealerHand);
        updateDisplay();
    }
    checkWinner();
}

function startNewGame() {
    playerHand = [];
    dealerHand = [];
    createDeck();
    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(playerHand);
    dealCard(dealerHand);
    updateDisplay();
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('result').textContent = '';
}

document.getElementById('hit-button').addEventListener('click', () => {
    dealCard(playerHand);
    updateDisplay();
    if (calculateTotal(playerHand) > 21) {
        displayResult('Oyuncu 21’i geçti, kaybettiniz!');
    }
});

document.getElementById('stand-button').addEventListener('click', () => {
    dealerTurn();
});

document.getElementById('restart-button').addEventListener('click', startNewGame);

// Başlangıçta oyunu başlat
startNewGame();
