var utils = require('./utils');
var fs = require('fs');

var DB = {results: [
  {
    username: 'jim',
    roomname: 'lobby',
    text: 'this is a test',
    objectId: 1
  },
]};

var Message = function(obj){
  this.username = obj.username;
  this.roomname = obj.roomname;
  this.text = obj.text;
  this.objectId;
}

objectId = 1;

actions = {
  'GET': function(request, response){
    utils.sendResponse(response, DB);
  },
  'POST': function(request, response){
    utils.collectData(request, function(data){
      // console.log(data);
      var message = new Message(JSON.parse(data));
      message.objectId = ++objectId;
      DB.results.push(message);
      fs.writeFile('./data.json', message, 'utf8', function(err){console.log(err)});
    });
    utils.sendResponse(response, 201);
  },
  'OPTIONS': function(request, response){
    utils.sendResponse(response);
  }
}

module.exports = function(request, response) {
  // console.log("Serving request type " + request.method + " for url " + request.url);

  
  
  var resp = actions[request.method];
  // console.log(resp);
  if(resp){
    resp(request, response);
  }else{
    utils.sendResponse(response, 404);
  }

};
