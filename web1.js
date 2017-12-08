
// var poem = function(){$('body').css({'background-color':'skyblue'});}


var connection = new WebSocket('ws://localhost:1337');
  connection.onopen = function(){
  console.log("open connection");
}

connection.onmessage = function(message){


  try {
       var pointID = message.data;
       console.log(pointID);
   } catch (e) {
       alert("BAD JSON");
 return;
   }
       // if(pointID == 3){
       //  poem();
       // }
  
}
connection.onerror = function(error){
  alert("PROBLEM WITH SERVER");
}
