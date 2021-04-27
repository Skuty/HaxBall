/**
 * Plugin that announces to chat events: 
 * - match start
 * - team members
 * - goal scored
 * - match ended
 * - match result
 * for Headless Haxball Manager (HHM).
 */

 let room = HBInit();
 room.pluginSpec = {
   name: `announce-match-events-1.0.3`,
   author: `skuty`,
   version: `1.0.3`,
 };

function getSpectatorsAsString() {
    var result = '';

    var players = room.getPlayerList().find((player) => player.team == 0);

    if (players == null) return;

    for (i = 0; i < players.length; i++) {
        result = result + ', ' + players[i].Name;
    }

     return result;
}

function getRedTeamMembersAsString() {
    var result = '';

    var players = room.getPlayerList().find((player) => player.team == 1);

    if (players == null) return;

    for (i = 0; i < players.length; i++) {
        result = result + ', ' + players[i].Name;
    }

     return result;
 }

 function getBlueTeamMembersAsString() {
    var result = '';

    var players = room.getPlayerList().find((player) => player.team == 2);

    if (players == null) return;

    for (i = 0; i < players.length; i++) {
        result = result + ', ' + players[i].Name;
    }
        
     return result;
 } 

 function getWinnersTeamAsString(scores) {
    var result = '';

    if (scores.red > scores.blue) {
        result = 'RED';
    };

    if (scores.blue > scores.red) {
        result = 'BLUE';
    }

    if (scores.blue == scores.red) {
        result = 'RED|BLUE';
    }

    return result;
 }

 function onGameStart(byPlayer) {
    room.sendChat('KrukMatch started - Good Luck and Have Fun Krukers!');
    console.log('KrukMatch started - Good Luck and Have Fun Krukers!');
    room.sendChat('RED team: ' + getRedTeamMembersAsString(), null);
    room.sendChat('BLUE team: ' + getBlueTeamMembersAsString(), null);
    room.sendChat('Fans in the stands:: ' + getSpectatorsAsString(), null);
 }

 function onTeamGoal(team) {
    var teamName = '';

    if (team == 1) {
        teamName = 'RED';
    };

    if (team == 2) {
        teamName = 'BLUE';
    }
  
    room.sendChat('Goal for ' + teamName + '!!!', null);
 }

 function onTeamVictory(scores) {
    room.sendChat('KrukMatch ended - Good Game Krukers!', null);
    room.sendChat(getWinnersTeamAsString(scores) + ' won after ' + scores.time + ' tough seconds !', null);
    room.sendChat('RED ' + scores.red + ' : ' + scores.blue + ' BLUE', null);
    room.sendChat('RED team: ' + getRedTeamMembersAsString(), null);
    room.sendChat('RED team: ' + getBlueTeamMembersAsString(), null);
    room.sendChat('See you on the next KrukMatch!', null);
 }

 room.onRoomLink = function onRoomLink() {
    room.onGameStart = onGameStart;
    room.onTeamVictory = onTeamVictory;
    room.onTeamGoal = onTeamGoal;
 }
