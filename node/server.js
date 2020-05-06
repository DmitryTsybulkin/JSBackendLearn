var http = require('http');
var fs = require('fs');
var url = require('url');
var chat = require('./chat');


var server = new http.Server();

server.listen(8080, 'localhost');


function sendFile(filename, response) {
    var fileStream = fs.createReadStream(filename);
    // When server error
    fileStream.on('error', function (e) {
        response.statusCode = 500;
        response.end('Server error: ' + e);
    })
        .pipe(response)
        .on('close', function () {
            fileStream.destroy();
        });
}

server.on('request', function (request, response) {
    var address = url.parse(request.url).pathname;
    if(address === '/') {
        sendFile('./node/index.html', response);
    } else if (address === '/subscribe') {
        chat.subscribe(request, response);
    } else if (address === '/publish') {
        var body = '';
        request
            .on('readable', function () {
                var readed = request.read();
                if (readed !== null && readed !== 'null') body += readed;
                console.log(body);
                if (body.length > 1e4) {
                    response.statusCode = 413;
                    response.end('Too big message');
                }
            }) // source
            .on('end', function () {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    response.statusCode = 400;
                    response.end('Bad request: ' + e);
                    return;
                }
                chat.publish(body.message);
                response.end('ok');
            }); // sink
    } else {
        response.statusCode = 404;
        response.end("Not Found");
    }

});

