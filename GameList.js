/**
 * A list of all the games.
 */
function GameList() {
    this.games = [];
}

/**
 * Add a vote.
 * Adds the game to the game list if it doesn't already exist.
 * Arguments:
 *  gameName - Name of the game to vote for.
 *  vote - The place in the user's list.
 */
GameList.prototype.addVote = function(gameName, vote) {
    // See if the game already exists.
    var index;
    var found = false;
    for (index = 0; index < this.games.length; ++index) {
        if (gameName.toLowerCase() == this.games[index].name.toLowerCase()) {
            found = true;
            break;
        }
    }
    
    // If it didn't already exist, add it.
    if (!found) {
        index = this.games.length;
        this.games[index] = new Game(gameName);
    }
    
    this.games[index].addVote(vote);
};
