/**
 * Display the results on the web page.
 * Arguments:
 *  games - The list of games to display.
 */
function displayResults(games) {
    var html = '';
    
    for (var i = 0; i < games.length; ++i) {
        html += '<div class="game">' + (i + 1) + '. ' + games[i].name + ' Votes: ' + games[i].votes.length + ' Score: ' + games[i].score + '</div>\n';
    }
    
    document.getElementById('results').innerHTML = html;
}

/**
 * Get votes from text file.
 * Arguments:
 *  fileContents - Contents of the vote file.
 */
function getVotes(fileContents) {
    var users = [];
    
    var contents = fileContents.split("\n");
    for (var i = 0; i < contents.length; ++i) {
        if (contents[i].charAt(0) == '{') {
            users.push(new User(contents[i].substring(1)));
        } else {
            users[users.length - 1].vote(contents[i]);
        }
    }
    
    return users;
}

/**
 * Builds a game list from user votes.
 * Arguments:
 *  users - A list of users.
 */
function buildGameList(users) {
    var gameList = new GameList();
    
    for (var user = 0; user < users.length; ++user) {
        for (var game = 0; game < users[user].votes.length; ++game) {
            gameList.addVote(users[user].votes[game], game + 1);
        }
    }
    
    return gameList;
}

/**
 * Get and display all the games.
 * Arguments:
 *  scoreFunction - Function to use to score games.
 *  sortFunction - Function to use to sort games.
 */
function getAndDisplayGames(scoreFunction, sortFunction) {
    // Display loading message.
    document.getElementById('results').innerHTML = "Working...";
    
    // Read votes from file and display them.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            // Get users and their votes.
            var users = getVotes(request.responseText);
            
            // Build game list.
            var gameList = buildGameList(users);
            
            // Score games according to scoring formula.
            var games = scoreFunction(gameList.games);
            
            // Sort games.
            games = games.sort(sortFunction);
            
            // Display the results.
            displayResults(games);
        }
    };
    request.open("GET", "votes.txt", true);
    request.send();
}

/**
 * Update game list.
 */
function updateGames() {
    var sortingFunction;
    switch (document.getElementById('sortBy').value) {
        case 'name':
            sortingFunction = sortNameAscending;
            break;
        case 'score':
        default:
            sortingFunction = sortScoreDescending;
    }
    
    getAndDisplayGames(scoreSum, sortingFunction);
}

/**
 * main()
 */
window.onload = main;

function main() {
    "use strict";
    
    document.getElementById('scoringFormula').onchange = updateGames;
    document.getElementById('sortBy').onchange = updateGames;
    
    updateGames();
}
