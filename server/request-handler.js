var utils = require('./utils');
var fs = require('fs');
var jsonFile = require('jsonfile');
var staging = {results: []};

var Message = function(obj){
  this.username = obj.username;
  this.roomname = obj.roomname;
  this.text = obj.text;
  this.objectId;
}

objectId = 1;

actions = {
  'GET': function(request, response){
    jsonFile.readFile('./server/data.json', function(err, obj){
      staging = obj;
    });
    utils.sendResponse(response, staging);
  },
  'POST': function(request, response){
    utils.collectData(request, function(data){
      var message = new Message(JSON.parse(data));
      message.objectId = ++objectId;
      var current  = jsonFile.readFile('./server/data.json', function(err, obj){
        staging.results.push(obj);
      });
      staging.results.unshift(message);

      jsonFile.writeFile('./server/data.json', staging);
    });
    utils.sendResponse(response, 201);
  },
  'OPTIONS': function(request, response){
    utils.sendResponse(response);
  }
}

module.exports = function(request, response) {
  // console.log("Serving request type " + request.method + " for url " + request.url);

  jsonFile.writeFileSync('./data.json', {test: 'test'});
  
  var resp = actions[request.method];
  // console.log(resp);
  if(resp){
    resp(request, response);
  }else{
    utils.sendResponse(response, 404);
  }

};
