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

        var leaugeField = document.getElementsByClassName("stat__detail__value")[3].getElementsByTagName("span")[0];
        var rankField = document.getElementsByClassName("stat__detail__value")[4].getElementsByTagName("span")[0];
        var pointsField = document.getElementsByClassName("stat__detail__value")[5].getElementsByTagName("span")[0];

        leaugeField.innerHTML = leagueOut;
        rankField.innerHTML = rankOut;
        pointsField.innerHTML = pointsOut;

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

    var elem = document.getElementsByClassName("stat__detail__value")[3];
    if (typeof elem !== 'undefined') {
        if (elem.textContent.length > 0) {
            updateStats();
            document.removeEventListener('DOMSubtreeModified', draw, false);
        }
    }
};

document.addEventListener('DOMSubtreeModified', draw, false);