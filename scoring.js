/**
 * Scores the games by simply summing all the individual votes.
 * Arguments:
 *  games - List of games to score.
 */
function scoreSum(games) {
    for (var game = 0; game < games.length; ++game) {
        for (var vote = 0; vote < games[game].votes.length; ++vote) {
            games[game].score += 51 - games[game].votes[vote];
        }
    }
    
    return games;
}

/**
 * Scores the games by summing all votes and multiplying by the amount of votes.
 * Arguments:
 *  games - List of games to score.
 */
function scoreSumCount(games) {
    for (var game = 0; game < games.length; ++game) {
        for (var vote = 0; vote < games[game].votes.length; ++vote) {
            games[game].score += 51 - games[game].votes[vote];
        }
        games[game].score *= games[game].votes.length;
    }
    
    return games;
}

/**
 * Scores the games by taking the average of the votes.
 * Arguments:
 *  games - List of games to score.
 */
function scoreAverage(games) {
    for (var game = 0; game < games.length; ++game) {
        for (var vote = 0; vote < games[game].votes.length; ++vote) {
            games[game].score += 51 - games[game].votes[vote];
        }
        games[game].score /= games[game].votes.length;
    }
    
    return games;
}

/**
 * Scores the games using instant-runoff voting.
 * Arguments:
 *  games - List of games to score.
 */
function scoreIRV(games) {
    var processedGames = [];
    
    // Perform instant-runoff voting.
    while (games.length > 0) {
        // Todo: Actually perform instant-runoff voting.
        processedGames.push(games[0]);
        games.splice(0, 1);
    }
    
    // Give games scores based on their position in the list.
    for (var i = 0; i < processedGames.length; ++i) {
        processedGames[i].score = processedGames.length - i;
    }
    
    return processedGames;
}