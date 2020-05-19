const { request } = require('http');

const find = async (prename, surname) =>{
    var options = {
        host: 'localhost',
        port: 3000,
        path: `/customers?prename=${prename}&surname=${surname}`,
        method: 'GET'
    };
    let result;
    request(options, (res) => {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data',  (body) => {
            console.log(body);
            result = JSON.parse(body)[0];
            console.log(result);
        });
    }).end();

    return result;
};
