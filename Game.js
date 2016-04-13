/**
 * A game to be voted for.
 * Arguments:
 *  name - Name of the game.
 */
function Game(name) {
    this.name = name;
    this.score = 0;
    this.voters = [];
    this.votes = [];
}

/**
 * Add a vote for the game.
 * Arguments:
 *  vote - The vote.
 *  username - User who voted for it.
 */
Game.prototype.addVote = function(vote, username) {
    this.voters.push(username);
    this.votes.push(vote);
};
