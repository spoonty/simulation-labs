const X = 10;

const teams = [
    { team: "Chelsea", lambda: 5, points: 0, won: 0, lost: 0 },
    { team: "Liverpool", lambda: 4.8, points: 0, won: 0, lost: 0 },
    { team: "Arsenal", lambda: 4.5, points: 0, won: 0, lost: 0 },
    { team: "Man City", lambda: 4.1, points: 0, won: 0, lost: 0 },
    { team: "Tottenham", lambda: 4, points: 0, won: 0, lost: 0 },
    { team: "Man Utd", lambda: 3.9, points: 0, won: 0, lost: 0 },
    { team: "West Brom", lambda: 3.6, points: 0, won: 0, lost: 0 },
    { team: "Everton", lambda: 3.5, points: 0, won: 0, lost: 0 },
    { team: "Southampton", lambda: 3.4, points: 0, won: 0, lost: 0 },
    { team: "Bournemouth", lambda: 3, points: 0, won: 0, lost: 0 },
]

const matches = (
    () => {
        let matches = [];

        for (let i = 0; i < teams.length - 1; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                matches.push({
                    firstTeam: teams[i],
                    secondTeam: teams[j]
                })
            }
        }

        return matches;
    }
)();

const calcFactorial = n => n <= 1 ? 1 : n * calcFactorial(n - 1);

const calcProbabilities = (lambda) => {
    let probs = [];

    for (let x = 0; x < X - 1; x++) {
        probs.push(Math.pow(lambda, x) * Math.exp(-lambda) / calcFactorial(x));
    }

    probs.push(1 - probs.reduce((prev, cur) => prev + cur, 0));

    return probs;
}

const calcGoals = (team) => {
    let a = Math.random();
    let current = 0;

    for (let i = 0; i < X; i++) {
        if (a < current + team.probs[i]) {
            return i;
        }
        current += team.probs[i];
    }
}

const playMatches = () => {
    for (let team of teams) {
        team.probs = calcProbabilities(team.lambda);
    }

    for (let match of matches) {
        match.firstTeamGoals = calcGoals(match.firstTeam);
        match.secondTeamGoals = calcGoals(match.secondTeam);

        if (match.firstTeamGoals === match.secondTeamGoals) {
            match.firstTeam.points++;
            match.firstTeam.won++;
            match.secondTeam.points++;
            match.secondTeam.won++;
        }
        else if (match.firstTeamGoals > match.secondTeamGoals) {
            match.firstTeam.points += 3;
            match.firstTeam.won++;
            match.secondTeam.lost++;
        }
        else {
            match.secondTeam.points += 3;
            match.secondTeam.won++;
            match.firstTeam.lost++;
        }
    }
}

const playBtn = document.querySelector('.play-button');

const resultTable = document.querySelector('.result-table-body');
const resultTableRowTemplate = document.querySelector('.result-table-row');

const matchesTable = document.querySelector('.matches-table-body');
const matchesTableRowTemplate = document.querySelector('.matches-table-row');

const playActions = () => {
    while (resultTable.children.length > 1) {
        resultTable.removeChild(resultTable.lastChild);
    }
    while (matchesTable.children.length > 1) {
        matchesTable.removeChild(matchesTable.lastChild);
    }
    teams.forEach(team => team.points = team.won = team.lost = 0);

    playMatches();
    teams.sort((a, b) => b.points - a.points);

    teams.forEach((team, index) => {
        const resultTableRowItem = resultTableRowTemplate.cloneNode(true);
        resultTableRowItem.classList.remove('hidden');
        resultTableRowItem.children[0].innerHTML = index.toString();
        resultTableRowItem.children[1].innerHTML = team.team;
        resultTableRowItem.children[2].innerHTML = team.points;
        resultTableRowItem.children[3].innerHTML = team.won;
        resultTableRowItem.children[4].innerHTML = team.lost;
        resultTable.appendChild(resultTableRowItem);
    })

    matches.forEach(match => {
        const matchesTableRowItem = matchesTableRowTemplate.cloneNode(true);
        matchesTableRowItem.classList.remove('hidden');
        matchesTableRowItem.children[0].innerHTML = match.firstTeam.team;
        matchesTableRowItem.children[1].innerHTML = match.firstTeamGoals.toString();
        matchesTableRowItem.children[2].innerHTML = match.secondTeam.team;
        matchesTableRowItem.children[3].innerHTML = match.secondTeamGoals.toString();
        matchesTable.appendChild(matchesTableRowItem);
    })
}

playActions();

playBtn.addEventListener("click", () => {
    playActions();
})