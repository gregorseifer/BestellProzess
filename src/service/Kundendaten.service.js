const { request } = require ('http');

requestRest(1);

function requestRest(id) {
    var options = {
        host: 'localhost',
        port: 3000,
        path: '/customers/' + id,
        method: 'GET'
      };
      
    request(options, (res) => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data',  (chunk) => {
        console.log('BODY: ' + chunk);
    });
    }).end();
};