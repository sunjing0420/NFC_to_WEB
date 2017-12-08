var port = 1337;
var http = require('http');
var server = http.createServer(function(request,response){});
server.listen(port,function(){
	console.log("Port "+port+" is open");
});
var serverWebSocket = require('websocket').server;
var wsServer = new serverWebSocket({
	httpServer:server
});
var connection;
wsServer.on('request', function(request){
  connection = request.accept(null,request.origin);
});


var serialport = require("serialport");
var SerialPort = serialport;

var serialPort = new SerialPort("/dev/cu.usbmodem1421", {
  baudrate: 9600,
  //baudrate: 115200,
  parser: serialport.parsers.readline("\n")
});

serialPort.on("open", function () {
console.log('Serial Port Open');
console.log('=================');



serialPort.on('data', function(data) {


  console.log(data.toString());
  var point = data.toString();

  //connection.send(JSON.stringify(point));
  connection.send(point);
  //console.log('Card UID: ',data.toString());
  //var UID = data.toString().split("UID");
  // console.log('New string: '+UID);
  // if(UID.length>1){
  //   console.log(UID[1]);
  //   connection.send(JSON.stringify({message:UID[1]}));
  // }

  });
});
