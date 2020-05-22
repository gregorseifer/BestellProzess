import { Kunde } from '../entity/types';
import { fn_getTimeStamp } from './TimeStamp';
import fs from 'fs';

export const sendeRechnung = (
    kunde: Kunde,
    produkt: string,
    price: string,
) => {
    let data = `${fn_getTimeStamp()}Rechnung\nVorname: ${kunde.prename} Nachname: ${kunde.surname} ID: ${kunde.id}\nProdukt: ${produkt} - ${price}\n\n`;
    fs.appendFile('prozesslog.log', data, 'utf8', (err) => {
        console.error(err)
    });
    console.log(data);
}
