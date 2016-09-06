/**
 * Created by Sebastian on 2016-09-06.
 */

function drawUserStats(userId) {

    var userInfo = new XMLHttpRequest();
    userInfo.onload = function () {

        var info = JSON.parse(userInfo.responseText).payload;

        var createdAt = new Date(info.created_at);
        var nick = info.nickname;

        var userStats = new XMLHttpRequest();
        userStats.onload = function () {

            var stats = JSON.parse(userStats.responseText);

            var matchesPlayed = stats.lifetime.m1;
            var winRate = stats.lifetime.k6;
            var headshotPercentage = stats.lifetime.k8;
            var kdr = stats.lifetime.k5;

            var div = document.createElement('div');
            div.innerHTML = '<hr /><table>' +
                '<tr><td>Member since</td><td>' + createdAt.getDate() + '/' + (createdAt.getMonth()+1) + ' ' + createdAt.getFullYear() + '</td></tr>' +
                    '<tr><td>Matches Played</td><td>' + matchesPlayed + '</td></tr>' +
                    '<tr><td>Win rate</td><td>' + winRate + '</td></tr>' +
                    '<tr><td>HS %</td><td>' + headshotPercentage + '</td></tr>' +
                    '<tr><td>KDR</td><td>' + kdr + '</td></tr>' +
                    '</table>';
            div.className = "lobbyStats";

            var playerHTMLList = document.getElementsByClassName("match-team-member match-team-member--team");
            Array.prototype.forEach.call(playerHTMLList, function (playerHTML) {
                if (nick === playerHTML.getElementsByClassName("match-team-member__details__name")[0].getElementsByTagName("strong")[0].innerHTML) {
                    playerHTML.appendChild(div);
                }
            });

        };

        userStats.open('GET', "https://api.faceit.com/stats/api/v1/stats/users/" + userId + "/games/csgo");
        userStats.send();

    };

    userInfo.open('GET', "https://api.faceit.com/api/users/" + userId);
    userInfo.send();

}

function drawLobbyStats() {

    var matchData = new XMLHttpRequest();
    matchData.onload = function () {

        var json = JSON.parse(matchData.responseText);
        json[0].teams[0].players.forEach(function (player) {
            drawUserStats(player.playerId);
        });

        json[0].teams[1].players.forEach(function (player) {
            drawUserStats(player.playerId);
        });
    };

    var matchID = window.location.pathname.split("/").pop();
    matchData.open('GET', "https://api.faceit.com/stats/api/v1/stats/matches/" + matchID);
    matchData.send();
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

var draw = function () {

    var elem = document.getElementsByClassName("match-team-member__details__name")[4];
    if (typeof elem !== 'undefined') {
        if (elem.textContent.length > 0) {
            drawLobbyStats();
            document.removeEventListener('DOMSubtreeModified', draw, false);
        }
    }
};

document.addEventListener('DOMSubtreeModified', draw, false);


