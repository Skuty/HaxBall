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
    sendAnnouncement('KrukMatch started - Good Luck and Have Fun Krukers!', null, null, null, null);
    sendAnnouncement('RED team: ' + getRedTeamMembersAsString(), null, null, null, null)
    sendAnnouncement('BLUE team: ' + getBlueTeamMembersAsString(), null, null, null, null)
    sendAnnouncement('Fans in the stands:: ' + getSpectatorsAsString(), null, null, null, null)
 }

 function onTeamGoal(team) {
    var teamName = '';
    
    if (team == 1) {
        teamName = 'RED';
    };

    if (team == 2) {
        teamName = 'BLUE';
    }
  
    sendAnnouncement(teamName + ' has scored!', null, null, null, null);
 }

 function onTeamVictory(scores) {
    sendAnnouncement('KrukMatch ended - Good Game Krukers!', null, null, null, null);
    sendAnnouncement(getWinnersTeamAsString(scores) + ' won after ' + scores.time + ' tough seconds !', null, null, null, null);
    sendAnnouncement('RED ' + scores.red + ' : ' + scores.blue + ' BLUE', null, null, null, null);
    sendAnnouncement('RED team: ' + getRedTeamMembersAsString(), null, null, null, null)
    sendAnnouncement('RED team: ' + getBlueTeamMembersAsString(), null, null, null, null)
    sendAnnouncement('See you on the next KrukMatch!', null, null, null, null);
 }

 room.onRoomLink = function onRoomLink() {
    room.onGameStart = onGameStart;
    room.onTeamVictory = onTeamVictory;
    room.onTeamGoal = onTeamGoal;
 }