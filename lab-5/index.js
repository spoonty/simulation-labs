const X = 10;

const teams = [
    { team: "Chelsea", lambda: 5, points: 0 },
    { team: "Liverpool", lambda: 4.8, points: 0 },
    { team: "Arsenal", lambda: 4.5, points: 0 },
    { team: "Man City", lambda: 4.1, points: 0 },
    { team: "Tottenham", lambda: 4, points: 0 },
    { team: "Man Utd", lambda: 3.9, points: 0 },
    { team: "West Brom", lambda: 3.6, points: 0 },
    { team: "Everton", lambda: 3.5, points: 0 },
    { team: "Southampton", lambda: 3.4, points: 0 },
    { team: "Bournemouth", lambda: 3, points: 0 },
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
            match.secondTeam.points++;
        }
        else if (match.firstTeamGoals > match.secondTeamGoals) {
            match.firstTeam.points += 3;
        }
        else {
            match.secondTeam.points += 3;
        }
    }
}

playMatches();