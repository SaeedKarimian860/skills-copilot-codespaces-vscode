// Create web server
// Load modules
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var comments = {};

// Create server
http.createServer(function(req, res){
  // Get URL
  var url_parts = url.parse(req.url);
  var pathname = url_parts.pathname;

  // Log
  console.log('Request for ' + pathname + ' received.');

  // Route
  if (pathname == '/post') {
    var reqData = '';
    req.on('data', function(chunk){
      reqData += chunk;
    });
    req.on('end', function(){
      var postData = qs.parse(reqData);
      var date = new Date();
      var time = date.getTime();
      comments[time] = postData.comment;
      res.end();
    });
  } else if (pathname == '/get') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    var items = '';
    for (var key in comments) {
      items += '<li>' + comments[key] + '</li>';
    }
    res.write('<ul>' + items + '</ul>');
    res.end();