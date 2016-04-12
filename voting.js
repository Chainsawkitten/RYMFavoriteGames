/**
 * Display the results on the web page.
 * Arguments:
 *  games - The list of games to display.
 */
function displayResults(games) {
    var html = '';
    
    for (var i = 0; i < games.length; ++i) {
        html += '<div class="game">' + games[i].name + '</div>\n';
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
            gameList.addVote(users[user].votes[game]);
        }
    }
    
    return gameList;
}

/**
 * main()
 */
window.onload = main;

function main() {
    "use strict";
    
    // Read votes from file and display them.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            displayResults(buildGameList(getVotes(request.responseText)).games);
        }
    };
    request.open("GET", "votes.txt", true);
    request.send();
}
