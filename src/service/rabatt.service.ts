import { fn_getTimeStamp } from './TimeStamp';
import fs from 'fs';

export const calculateDiscount = (
    preis: number,
    vorname: string,
    nachname: string,
    produkt: string,) => {
    let data = `${fn_getTimeStamp()}Für die Bestellung des Produkts ${produkt} von ${vorname} ${nachname} ` + 
                `wurde ein Rabatt in Hoehe von ${(preis * 0.1)} angerechnet. \n\n`;
    fs.appendFile('prozesslog.log', data, 'utf8', (err) => {
        console.error(err)
    });
    console.log(data);
    return preis * 0.9;
}