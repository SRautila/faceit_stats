/**
 * Created by Sebastian on 2016-08-24.
 */

function updateStats() {

    var userStats = new XMLHttpRequest();
    userStats.onload = function () {

        var json = JSON.parse(userStats.responseText);
        var leagues = json.payload.leagues;

        var leagueOut = leagues[0].rank_label + " / " + leagues[1].rank_label;
        var rankOut = leagues[0].ladder.user_rank.rank + " / " + leagues[1].ladder.user_rank.rank;
        var pointsOut = leagues[0].ladder.user_rank.points + " / " + leagues[1].ladder.user_rank.points;

        var leaugeRow = document.getElementsByClassName("game-card__row")[1];
        leaugeRow.innerHTML = '<div class="league-cta league-cta--card row"> ' +
            '<div class="col-sm-4">  <div class="stat"> <div class="stat__detail"> <div class="stat__detail__value"> <!----><span>' + leagueOut + '</span><!----> <!----> </div> <div class="stat__detail__label">League</div> </div> </div> </div> ' +
            '<div class="col-sm-4"> <div class="stat"> <div class="stat__detail"> <div class="stat__detail__value"> <!----><span>' + rankOut + '</span><!----> <!----> </div> <div class="stat__detail__label">League Rank</div> </div> </div> </div> ' +
            '<div class="col-sm-4"> <div class="stat"> <div class="stat__detail"> <div class="stat__detail__value"> <!----><span>' + pointsOut + '</span><!----> <!----> </div> <div class="stat__detail__label">League points</div> </div> </div> </div> ' +
            '</div>';

    };

    var userFind = new XMLHttpRequest();
    userFind.onload = function () {

        var json = JSON.parse(userFind.responseText);
        json.payload.forEach(function (user) {

            if (user.name = userName) {
                var statsData = user.guid + "/games/csgo/league?region=EU";
                userStats.open('GET', "https://api.faceit.com/api/users/" + statsData);
                userStats.send();
            }
        });
    };

    var userName = document.getElementsByClassName("page-title__content__title__primary page-title__content__title__primary--text-transform-none")[0].textContent;
    var userData = "q=" + userName + "&rows=1&sortBy=nickname&start=0";
    userFind.open('GET', "https://api.faceit.com/search/v1/players?" + userData);
    userFind.send();

}

var draw = function () {

    var elem = document.getElementsByClassName("game-card game-card--featured")[0];
    if (typeof elem !== 'undefined') {
                var leagueDrawnTag = document.getElementById("FS-league-drawn");
        if (!leagueDrawnTag) {
            leagueDrawnTag = document.createElement('div');
            leagueDrawnTag.id = "FS-league-drawn";
            elem.appendChild(leagueDrawnTag);
            console.log('drawleague called');
            updateStats();
        }
    }
};

document.addEventListener('DOMSubtreeModified', draw, false);
