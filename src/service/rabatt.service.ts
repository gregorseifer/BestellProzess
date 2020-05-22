import { fn_getTimeStamp } from './TimeStamp';
import fs from 'fs';

export const calculateDiscount = (
    preis: number,
    vorname: string,
    nachname: string,
    produkt: string,
    rabatt: number) => {
    if (rabatt === undefined || rabatt === null) rabatt = 10;
    let data = `${fn_getTimeStamp()}Für die Bestellung des Produkts ${produkt} von ${vorname} ${nachname} ` + 
                `wurde ein Rabatt in Hoehe von ${(0.01 * preis * rabatt)} ( = ${rabatt}%) angerechnet. \n\n`;
    fs.appendFile('prozesslog.log', data, 'utf8', (err) => {
        console.error(err)
    });
    console.log(data);
    return preis * (1 - 0.01 * rabatt);
}