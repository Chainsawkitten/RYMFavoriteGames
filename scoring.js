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
 * Calculate the average score of all games.
 * Arguments:
 *  games - List of all games.
 */
function calculateAverage(games) {
    var sum = 0;
    var votes = 0;
    
    for (var game = 0; game < games.length; ++game) {
        var score = 0;
        for (var vote = 0; vote < games[game].votes.length; ++vote) {
            score += 51 - games[game].votes[vote];
            votes++;
        }
        score /= games[game].votes.length;
        sum += score;
    }
    
    bayesianAverage = sum / games.length;
    bayesianM = votes / games.length;
}

/**
 * Scores the games using the bayesian estimate.
 * Arguments:
 *  games - List of games to score.
 */
function scoreBayesian(games) {
    for (var game = 0; game < games.length; ++game) {
        for (var vote = 0; vote < games[game].votes.length; ++vote) {
            games[game].score += 51 - games[game].votes[vote];
        }
        
        games[game].score = (games[game].score + bayesianAverage * bayesianM) / (games[game].votes.length + bayesianM);
    }
    
    return games;
}

/**
 * Sorting function used in scoreIRV.
 * Arguments:
 *  a - Game A.
 *  b - Game B.
 */
function sortIRV(a, b) {
    if (a.score != 0 || b.score != 0)
        return b.score - a.score;
    return b.tempScore - a.tempScore;
}

/**
 * Scores the games using instant-runoff voting.
 * Arguments:
 *  games - List of games to score.
 *  users - Users and their votes.
 */
function scoreIRV(games, users) {
    // Clear previous scores.
    for (var i = 0; i < games.length; ++i) {
        games[i].score = 0;
    }
    
    // Perform instant-runoff voting.
    var allScored = false;
    for (var turn = 0; !allScored; ++turn) {
        // Clear previous scores.
        for (var i = 0; i < games.length; ++i) {
            games[i].tempScore = 0;
        }
        
        // Loop through all users' votes and index them.
        for (var i = 0; i < users.length; ++i) {
            users[i].indexVotes = [];
            
            for (var vote = 0; vote < users[i].votes.length; ++vote) {
                for (var game = 0; game < games.length; ++game) {
                    if (games[game].name.toLowerCase() == users[i].votes[vote].toLowerCase()) {
                        users[i].indexVotes.push(game);
                        break;
                    }
                }
            }
        }
        
        // Score games based on votes.
        for (var i = 0; i < users.length; ++i) {
            // Loop through the user's votes until we found a valid one (that hasn't been discarded).
            for (var vote = 0; vote < users[i].indexVotes.length; ++vote) {
                if (games[users[i].indexVotes[vote]].score == 0) {
                    games[users[i].indexVotes[vote]].tempScore++;
                    break;
                }
            }
        }
        
        // Sort array based on temporarily assigned scores.
        games.sort(sortIRV);
        
        // Discard lowest rated games.
        var discardScore = games[games.length - 1].tempScore;
        for (var i = games.length - 1; i >= 0 && games[i].score == 0 && games[i].tempScore <= discardScore; --i) {
            games[i].score = turn + 1;
        }
        
        // See if all games have been given a score.
        allScored = true;
        for (var i = 0; i < games.length; ++i) {
            if (games[i].score == 0) {
                allScored = false;
                break;
            }
        }
    }
    
    return games;
}