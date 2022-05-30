const timeDisplay = document.querySelector(".time span")
const imageDisplay = document.querySelector(".weather-img")
const probsDisplay = [
    document.querySelector("#sunny-modeling"),
    document.querySelector("#cloudy-modeling"),
    document.querySelector("#overcast-modeling")
]

let application, time = 0, nextTime = 0, state = 0, N = 1

const matrix = [
    [-0.4, 0.3, 0.1],
    [0.4, -0.8, 0.4],
    [0.1, 0.4, -0.5]
]

const weather = [
    { img: "img/sunny.png", freq: 1 },
    { img: "img/cloudy.png", freq: 0 },
    { img: "img/overcast.png", freq: 0 },
]

document.querySelector('.start').addEventListener('click', () => {
    calcNextTime()
    application = setInterval(startApplicaiton, 500)
})

document.querySelector('.stop').addEventListener('click', () => {
    clearInterval(application)
})

// считаем время следующего перехода
const calcNextTime = () => {
    let t = Math.log(Math.random()) / matrix[state][state]
    nextTime += Math.ceil(t)
}

const startApplicaiton = () => {
    timeDisplay.innerHTML = ++time % 24

    if (time > nextTime) {
        calcNextTime()

        // считаем состояние
        let prob = 0, rand = Math.random()
        for (let i = 0; i < 3; i++) {
            if (i !== state) {
                prob += -matrix[state][i] / matrix[state][state]

                if (prob > rand) {
                    state = i
                    imageDisplay.src = weather[state].img
                    break
                }
            }
        }

        // обновляем данные
        weather[state].freq++
        N++
        probsDisplay.forEach((w, idx) => w.innerHTML = (weather[idx].freq / N).toFixed(2))
    }
}