import { request } from 'http';
import { Kunde } from '../entity/types'

export const findOne = async (prename: string, surname: string) =>{
    let options = {
        host: 'localhost',
        port: 3000,
        path: `/customers?prename=${prename}&surname=${surname}`,
        method: 'GET',
    };
    let result: Kunde | undefined;
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
