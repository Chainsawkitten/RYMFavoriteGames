/**
 * Sort helper function for sorting games by score (descending).
 * Arguments:
 *  a - Game A.
 *  b - Game B.
 */
function sortScoreDescending(a, b) {
    return b.score - a.score;
}

/**
 * Sort helper function for sorting games by name (ascending).
 * Arguments:
 *  a - Game A.
 *  b - Game B.
 */
function sortNameAscending(a, b) {
    if (a.name.toLowerCase() == b.name.toLowerCase())
        return 0;
    else if (a.name.toLowerCase() < b.name.toLowerCase())
        return -1;
    else
        return 1;
}

/**
 * Sort helper function for sorting games by number of votes (descending).
 * Arguments:
 *  a - Game A.
 *  b - Game B.
 */
function sortVotesDescending(a, b) {
    return b.votes.length - a.votes.length;
}
