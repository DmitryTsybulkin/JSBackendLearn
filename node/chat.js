
var clients = [];

exports.subscribe = function (req, res) {
    console.log('subscribed');
    clients.push(res);
    // when client close connection
    res.on('close', function () {
        clients.splice(clients.indexOf(res), 1);
    })
};

exports.publish = function (msg) {
    clients.forEach(res => res.end(msg));
    clients = [];
};