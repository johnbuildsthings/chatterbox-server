var fs = require('fs');
var jsonFile = require('jsonfile');
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};



exports.sendResponse = function(response, message, statusCode){
  message = message || null;
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(message));
}

exports.collectData = function(request, callback){
  var collection = "";

  request.on('data', function(chunk){
    collection += chunk;
  });
  request.on('end', function(){
    callback(collection);

  });
};

