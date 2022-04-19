const generateEvent = (input) => {
    const a = Math.random();
    let current = 0;

    for (let i = 0; i < input.length; i++) {
        if (a < current + input[i]) {
            return i;
        }
        current += input[i];
    }
}

const startAlgorithm = (input, N) => {
    let statistic = [0, 0, 0, 0, 0];

    for (let i = 0; i < N; i++) {
        const k = generateEvent(input);
        statistic[k]++;
    }

    return statistic;
}

const drawColumn = (statistic, N) => {
    const columns = document.querySelectorAll('.column');

    for (let i = 0; i < statistic.length; i++) {
        columns[i].classList.remove('hidden');

        const p = statistic[i] / N;
        columns[i].firstElementChild.innerHTML = p;

        const height = 300 * p;

        columns[i].style.height = `${height}px`;
        columns[i].style.setProperty('--height', `${height}px`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelectorAll('.input-field');
    const startBtn = document.querySelector('.start-btn');

    input.forEach(el => { el.value = "" });

    startBtn.addEventListener('click', () => {
        let sum = 0;
        let auto = -1;
        let array = [];
        let N = 0;

        input.forEach(el => {
            if (el.id !== 'trials-number' && el.value !== '') {
                sum += parseFloat(el.value);
                array.push(parseFloat(el.value));
            }
            else if (el.id === 'trials-number' && el.value !== '') {
                N = parseInt(el.value);
            }
        })

        if (array.length !== 4 || N === 0) {
            alert('Incorrect input');
            return;
        }

        if (sum <= 1) {
            auto = 1 - sum;
            array.push(auto);
            const statistic = startAlgorithm(array, N);
            drawColumn(statistic, N);
        }
        else alert("Sum of numbers more than 1");
    })
})