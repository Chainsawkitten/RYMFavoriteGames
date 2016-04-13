/// Games
var games;

/**
 * Display the results on the web page.
 * Arguments:
 *  games - The list of games to display.
 *  show - How many games to show.
 */
function displayResults(show) {
    var html = '';
    
    for (var i = 0; i < games.length && i < show; ++i) {
        html += '<div class="game">';
        html += '<div class="left">' + (i + 1) + '</div>';
        html += '<div class="right">';
        html += '<p class="title">' + games[i].name + '</p>';
        html += '<div class="separator"></div>';
        html += '<p class="score">Score: ' + games[i].score + '</p>';
        html += '<p class="votes" id="votes' + i + '" onclick="showVotes(' + i + ');">Votes: ' + games[i].votes.length + ' &#9656;</p>';
        html += '</div>';
        html += '</div>\n';
    }
    
    document.getElementById('results').innerHTML = html;
}

/**
 * Show who voted for a game (and how).
 * Arguments:
 *  gameIndex - Index of the game in the game array.
 */
function showVotes(gameIndex) {
    var html = 'Votes: ' + games[gameIndex].votes.length + ' &#9662;';
    
    // Todo: Show all votes.
    
    document.getElementById('votes' + gameIndex).innerHTML = html;
    document.getElementById('votes' + gameIndex).onclick = function() { hideVotes(gameIndex); };
}

/**
 * Show who voted for a game.
 * Arguments:
 *  gameIndex - Index of the game in the game array.
 */
function hideVotes(gameIndex) {
    var html = 'Votes: ' + games[gameIndex].votes.length + ' &#9656;';
    
    document.getElementById('votes' + gameIndex).innerHTML = html;
    document.getElementById('votes' + gameIndex).onclick = function() { showVotes(gameIndex); };
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
            games = scoreFunction(gameList.games);
            
            // Sort games.
            games = games.sort(sortFunction);
            
            // Display the results.
            displayResults(show);
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
    document.getElementById('average').style.display = 'none';
    
    var scoreFunction;
    switch (document.getElementById('scoringFormula').value) {
        case 'sumCount':
            document.getElementById('sumCount').style.display = 'block';
            scoreFunction = scoreSumCount;
            break;
        case 'average':
            document.getElementById('average').style.display = 'block';
            scoreFunction = scoreAverage;
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
