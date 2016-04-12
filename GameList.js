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
 */
GameList.prototype.addVote = function(gameName) {
    // See if the game already exists.
    var index;
    var found = false;
    for (index = 0; index < this.games.length; ++index) {
        if (gameName == this.games[index].name) {
            found = true;
            break;
        }
    }
    
    // If it didn't already exist, add it.
    if (!found) {
        index = this.games.length;
        this.games[index] = new Game(gameName);
    }
    
    // TODO: Do other voting stuff.
};
