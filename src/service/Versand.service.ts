import fs from 'fs';
import { fn_getTimeStamp } from './TimeStamp';

export const versendeProdukt = (
    vorname: string,
    nachname: string,
    produkt: string,
) => {
    let data = `${fn_getTimeStamp()}Produkt ${produkt} versendet an ${vorname} ${nachname}. \n\n`;
    fs.appendFile('prozesslog.log', data, 'utf8', (err) => {
        console.error(err)
    });
    console.log(data);
}