//LIST ALL FUNCTION FOR ALL CARDS
var allCards = [];
// allCards["  9E 10 A4 00"] =	function(){$('body').css({'background-color':'tomato'});}
// allCards[" 2F 3B 9C 00"] = function(){$('body').css({'background-color':'skyblue'});}
allCards["3"] = function(){$('body').css({'background-color':'skyblue'});}


 var WebSocket = require('ws')

var connection = new WebSocket('ws://localhost:1337');
  connection.onopen = function(){
  console.log("open connection");
}

connection.onmessage = function(message){

  console.log(message.data);

  try {
       var json = JSON.parse(message.data);
       console.log(json);
   } catch (e) {
       alert("BAD JSON");
 return;
   }
   var cardID = json.message.replace(/(\r\n|\n|\r)/gm,"");
   console.log(allCards[cardID]);
   if(allCards[cardID]!=undefined){
     allCards[cardID]();
   }
}
connection.onerror = function(error){
  alert("PROBLEM WITH SERVER");
}
