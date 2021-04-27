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
   name: `announce-match-events`,
   author: `skuty`,
   version: `1.0.0`,
 };

function getSpectatorsAsString() {
    var result = '';

    room.getPlayerList()
        .find((player) => player.team == 0)
        .forEach(teamMember => { result = result + ', ' + teamMember.Name } );

     return result;
}

function getRedTeamMembersAsString() {
    var result = '';

    room.getPlayerList()
        .find((player) => player.team == 1)
        .forEach(teamMember => { result = result + ', ' + teamMember.Name } );

     return result;
 }

 function getBlueTeamMembersAsString() {
    var result = '';

    room.getPlayerList()
        .find((player) => player.team == 2)
        .forEach(teamMember => { result = result + ', ' + teamMember.Name } );

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
    room.sendAnnouncement('KrukMatch started - Good Luck and Have Fun Krukers!', null, 0x00FF00);
    room.sendAnnouncement('RED team: ' + getRedTeamMembersAsString(), null, 0x00FF00);
    room.sendAnnouncement('BLUE team: ' + getBlueTeamMembersAsString(), null, 0x00FF00);
    room.sendAnnouncement('Fans in the stands:: ' + getSpectatorsAsString(), null, 0x00FF00);
 }

 function onTeamGoal(team) {
    var teamName = '';

    if (team == 1) {
        teamName = 'RED';
    };

    if (team == 2) {
        teamName = 'BLUE';
    }
  
    room.sendAnnouncement(teamName + ' has scored!', null, 0x00FF00);
 }

 function onTeamVictory(scores) {
    room.sendAnnouncement('KrukMatch ended - Good Game Krukers!', null, 0x00FF00);
    room.sendAnnouncement(getWinnersTeamAsString(scores) + ' won after ' + scores.time + ' tough seconds !', null, 0x00FF00);
    room.sendAnnouncement('RED ' + scores.red + ' : ' + scores.blue + ' BLUE', null, 0x00FF00);
    room.sendAnnouncement('RED team: ' + getRedTeamMembersAsString(), null, 0x00FF00);
    room.sendAnnouncement('RED team: ' + getBlueTeamMembersAsString(), null, 0x00FF00);
    room.sendAnnouncement('See you on the next KrukMatch!', null, 0x00FF00);
 }

 room.onRoomLink = function onRoomLink() {
    room.onGameStart = onGameStart;
    room.onTeamVictory = onTeamVictory;
    room.onTeamGoal = onTeamGoal;
 }
