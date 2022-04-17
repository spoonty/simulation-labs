const askAQuestion = () => {
    const p = 0.5;
    const a = Math.random();

    return a < p ? 'YES' : 'NO';
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