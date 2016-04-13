/**
 * Display the results on the web page.
 * Arguments:
 *  games - The list of games to display.
 *  show - How many games to show.
 */
function displayResults(games, show) {
    var html = '';
    
    for (var i = 0; i < games.length && i < show; ++i) {
        html += '<div class="game">';
        html += '<div class="left">' + (i + 1) + '</div>';
        html += '<div class="right">';
        html += '<p class="title">' + games[i].name + '</p>';
        html += '<div class="separator"></div>';
        html += '<p class="score">Score: ' + games[i].score + '</p>';
        html += '<p class="votes">Votes: ' + games[i].votes.length + '</p>';
        html += '</div>';
        html += '</div>\n';
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
 *  show - How many games to show.
 */
function getAndDisplayGames(scoreFunction, sortFunction, show) {
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
            displayResults(games, show);
        }
    };
    request.open("GET", "votes.txt", true);
    request.send();
}

/**
 * Update game list.
 */
function updateGames() {
    document.getElementById('sum').style.display = 'none';
    document.getElementById('sumCount').style.display = 'none';
    
    var scoreFunction;
    switch (document.getElementById('scoringFormula').value) {
        case 'sumCount':
            document.getElementById('sumCount').style.display = 'block';
            scoreFunction = scoreSumCount;
            break;
        case 'sum':
        default:
            document.getElementById('sum').style.display = 'block';
            scoreFunction = scoreSum;
    }
    
    var sortingFunction;
    switch (document.getElementById('sortBy').value) {
        case 'name':
            sortingFunction = sortNameAscending;
            break;
        case 'votes':
            sortingFunction = sortVotesDescending;
            break;
        case 'score':
        default:
            sortingFunction = sortScoreDescending;
    }
    
    var show;
    switch (document.getElementById('show').value) {
        case '500':
            show = 500;
            break;
        case 'all':
            show = 1000;
            break;
        case '100':
        default:
            show = 100;
    }
    
    getAndDisplayGames(scoreFunction, sortingFunction, show);
}

/**
 * main()
 */
window.onload = main;

function main() {
    "use strict";
    
    document.getElementById('scoringFormula').onchange = updateGames;
    document.getElementById('sortBy').onchange = updateGames;
    document.getElementById('show').onchange = updateGames;
    
    updateGames();
}
