/**
 * A game to be voted for.
 * Arguments:
 *  name - Name of the game.
 */
function Game(name) {
    this.name = name;
    this.score = 0;
    this.votes = [];
}

/**
 * Add a vote for the game.
 * Arguments:
 *  vote - The vote.
 */
Game.prototype.addVote = function(vote) {
    this.votes.push(vote);
};
