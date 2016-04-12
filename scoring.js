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