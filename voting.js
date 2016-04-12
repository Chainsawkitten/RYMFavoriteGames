/**
 * Display the results on the web page.
 * Arguments:
 *  games - The list of games to display.
 */
function displayResults(games) {
    var div = document.getElementById('results');
    div.innerHTML = "";
    
    for (var i = 0; i < games.length; ++i) {
        div.innerHTML += '<div class="game">' + games[i].name + '</div>\n';
    }
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
            users[users.length - 1].votes.push(contents[i]);
        }
    }
    
    return users;
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
            displayResults(getVotes(request.responseText));
        }
    };
    request.open("GET", "votes.txt", true);
    request.send();
}
