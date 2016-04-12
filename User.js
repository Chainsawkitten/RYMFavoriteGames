/**
 * One user's votes.
 * Arguments:
 *  name - Name of the user.
 */
function User(name) {
    this.name = name;
    this.votes = [];
}

/**
 * Vote for a game.
 * Arguments:
 *  game - Name of the game to vote for.
 */
User.prototype.vote = function(game) {
    this.votes.push(game);
};
