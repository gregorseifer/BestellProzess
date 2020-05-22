import { Kunde } from '../entity/types';
import { fn_getTimeStamp } from './TimeStamp';
import fs from 'fs';

export const sendeRechnung = (
    kunde: Kunde,
    produkt: string,
    preis: number,
    menge: string,
    rabatt: number,
) => {
    if (rabatt === undefined || rabatt === null) rabatt = 10;
    let data = `${fn_getTimeStamp()}Rechnung\nVorname: ${kunde.prename}, Nachname: ${kunde.surname}, ID: ${kunde.id}\n` + 
                `Bestellung: ${produkt} x ${menge} Stück\n` +
                `Gesamtpreis: ${preis * 100/(100 - rabatt)}\n` + 
                `Rabatt (${rabatt}%): ${(preis * 100/(100 - rabatt)) - preis}\n` + 
                `zu Zahlen:   ${preis}\n\n`;
    fs.appendFile('prozesslog.log', data, 'utf8', (err) => {
        console.error(err)
    });
    console.log(data);
}
