/**
 * Plugin that gives admin for everyone that enters room
 * for Headless Haxball Manager (HHM).
 */

 let room = HBInit();
 room.pluginSpec = {
   name: `hr/admin-for-everyone`,
   author: `skuty`,
   version: `1.0.0`,
 };
  
 function onPlayerJoin(player) {
     room.setPlayerAdmin(player.id, true);
 }
  
 room.onRoomLink = function onRoomLink() {
   room.onPlayerJoin = onPlayerJoin;
 }