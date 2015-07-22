/* Import node's http module: */
var http = require("http");
var handleRequest = require('./request-handler')
var urlParse = require('url');
var utils = require('./utils');
// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = "127.0.0.1";


var path = {
  '/classes/messages': function(request, response){
    handleRequest(request, response);
  }
}

var server = http.createServer(function(request, response){
  var parts = urlParse.parse(request.url);

  // console.log(parts.pathname);

  var pathName = path[parts.pathname];
  // console.log(pathName);
  if(pathName){
    pathName(request, response);
  }else{
    // console.log('returned 404')
    utils.sendResponse(response, 404);
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
