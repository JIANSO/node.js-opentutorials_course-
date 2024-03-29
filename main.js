var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log('queryData >>' + queryData.id);
    if(_url == '/'){
      //_url = '/index.html';
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return
    }
    /*whenever a page opens, nodejs reads file and shows contents */
      response.writeHead(200);
      fs.readFile(`data/${queryData.id}`, 'utf-8', function(err,data){
          var description = data;

          var template  = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>

          `;
            response.end(template);
      });


     //console.log(__dirname + _url);
     //response.end(fs.readFileSync(__dirname + _url));
     //response.end(template);
});
app.listen(3000);
