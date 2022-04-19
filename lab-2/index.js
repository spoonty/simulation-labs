const magicBall = [
    { answer: 'It is certain', p: 0.03},
    { answer: 'It is decidedly so', p: 0.1},
    { answer: 'Without a doubt', p: 0.025},
    { answer: 'Yes - definitely', p: 0.05},
    { answer: 'You may rely on it', p: 0.05},
    { answer: 'As I see it, yes', p: 0.05},
    { answer: 'Most likely', p: 0.07},
    { answer: 'Outlook good', p: 0.02},
    { answer: 'Signs point to yes', p: 0.05},
    { answer: 'Yes', p: 0.05},
    { answer: 'Reply hazy, try again', p: 0.01},
    { answer: 'Ask again later', p: 0.1},
    { answer: 'Better not tell you now', p: 0.1},
    { answer: 'Cannot predict now', p: 0.08},
    { answer: 'Concentrate and ask again', p: 0.05},
    { answer: 'Don’t count on it', p: 0.025},
    { answer: 'My reply is no', p: 0.03},
    { answer: 'My sources say no', p: 0.05},
    { answer: 'Outlook not so good', p: 0.04},
    { answer: 'Very doubtful', p: 0.02}
]

const askAQuestion = () => {
    const a = Math.random();
    let current = 0;

    for (let el of magicBall) {
        if (a < current + el.p) {
            return el.answer;
        }
        current += el.p
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".question-input");
    const button = document.querySelector(".answer-btn");
    const answer = document.querySelector(".answer-field");
    let question = "";

    input.value = "";
    input.addEventListener('input', event => {
        question = event.target.value;
        answer.classList.add('hidden');
        if (question.length > 0) {
            button.classList.remove('not-available');
        }
        else {
            button.classList.add('not-available');
        }
    })

    button.addEventListener('click', () => {
        if (!button.className.includes('not-available')) {
            answer.classList.remove('hidden');
            answer.innerHTML = askAQuestion();
        }
    })
})