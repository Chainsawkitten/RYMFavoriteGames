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
            document.getElementById('results').innerHTML = request.responseText;
        }
    };
    request.open("GET", "votes.txt", true);
    request.send();
}
