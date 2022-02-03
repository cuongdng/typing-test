const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
    'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    'The way to get started is to quit talking and begin doing.',
    "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    'If life were predictable it would cease to be life, and be without flavor. ',
    "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    "Life is what happens when you're busy making other plans.",
];

var myStorage = window.localStorage;

let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const scoreBoard = document.getElementById('score-board');
const clearBtn = document.getElementById('clear-score');

renderScore();

document.getElementById('start').addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;

    const spanWords = words.map((word) => `<span>${word}</span>`);

    quoteElement.innerHTML = spanWords.join(' ');
    quoteElement.childNodes[0].className = 'highlight';

    messageElement.innerText = '';

    typedValueElement.value = '';

    typedValueElement.disabled = false;
    startTime = new Date().getTime();
    typedValueElement.focus();
    typedValueElement.addEventListener('input', handler);
});

function handler() {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;
    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATULATIONS! You finished in ${
            elapsedTime / 1000
        } seconds!\n WPM = ${Math.round(
            words.length * (60 / (elapsedTime / 1000))
        )}`;
        messageElement.innerText = message;
        this.removeEventListener('input', handler);
        typedValueElement.disabled = true;
        typedValueElement.value = '';
        addScore(Math.round(words.length * (60 / (elapsedTime / 1000))));
        renderScore();
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        quoteElement.children[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = '';
    } else {
        typedValueElement.className = 'error';
    }
}

clearBtn.addEventListener('click', () => {
    clearScore();
    renderScore();
});

function addScore(wpm) {
    let d = new Date();
    currentTime = d.toLocaleString();
    myStorage.setItem(wpm, currentTime);
}

function clearScore() {
    myStorage.clear();
}

function renderScore() {
    scoreBoard.innerHTML = `
    <table>
        <tr>
            <th>Result</th>
            <th>Time</th>
        </tr>
    </table>
    `;
    const tableElement = scoreBoard.querySelector('table');
    for (var element = 0; element < myStorage.length; element++) {
        let child = document.createElement('tr');
        child.innerHTML = `
                <td>${myStorage.key(element)} WPM</td>
                <td>${myStorage.getItem(myStorage.key(element))}</td>
        `;
        tableElement.appendChild(child);
    }
}
