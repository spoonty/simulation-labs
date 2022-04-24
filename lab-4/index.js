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

const calcMean = (p, x) => {
    let M = 0;

    for (let i = 0; i < p.length; i++) {
        M += p[i] * x[i];
    }

    return M;
}

const calcVariance = (p, x, M) => {
    let D = 0;

    for (let i = 0; i < p.length; i++) {
        D += p[i] * Math.pow(x[i] - M, 2);
    }

    return D;
}

const calcChiSquare = (statistic, N, p) => {
    let chiSquare = 0;

    for (let i = 0; i < p.length; i++) {
        chiSquare += Math.pow(statistic[i], 2) / (N * p[i]);
    }

    return chiSquare - N;
}

const calcResults = (p, statistic, N) => {
    let x = [1, 2, 3, 4, 5, 6];

    let p_ = statistic.map(x => x / N);

    let M = calcMean(p, x); // mathematical expression (mean)
    let D = calcVariance(p, x, M) // variance

    let M_ = calcMean(p_, x); // empiric expectation (mean)
    let D_ = calcVariance(p_, x, M_); // empiric variance

    let absErrorM = Math.abs(M_ - M); // absolute error mean
    let absErrorD = Math.abs(D_ - D); // absolute error variance

    let relErrorM = absErrorM / Math.abs(M); // relative error mean
    let relErrorD = absErrorD / Math.abs(D); // relative error variance

    let chiSquare = calcChiSquare(statistic, N, p); // chi-square

    const bool = chiSquare > 9.488;

    document.querySelector('.statistic').classList.remove('hidden');

    document.querySelector('.average-val').innerHTML = M_.toFixed(3);
    document.querySelector('.average-error-val').innerHTML = Math.floor(relErrorM * 100);

    document.querySelector('.variance-val').innerHTML = D_.toFixed(3);
    document.querySelector('.variance-error-val').innerHTML = Math.floor(relErrorD * 100);

    document.querySelector('.chi-squared-res').innerHTML = chiSquare.toFixed(3);
    document.querySelector('.chi-squared-bool').innerHTML = bool;
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelectorAll('.input-field');
    const startBtn = document.querySelector('.start-btn');

    //input.forEach(el => { el.value = "" });

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
            calcResults(array, statistic, N);
        }
        else alert("Sum of numbers more than 1");
    })
})