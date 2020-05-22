import fs from 'fs';
import { fn_getTimeStamp } from './TimeStamp';

export const logAbbruch = async (
    prename: string,
    surname: string,
    product: string,
) => {
    const data = `${fn_getTimeStamp()}Bestellung wurde vom Mitarbeiter abgelehnt.` + 
                    `\n(Daten: Vorname: ${prename}, Nachname: ${surname}, Produkt: ${product})\n\n`;
    fs.appendFile('prozesslog.log', data, 'utf8', (err) => {
        console.error(JSON.stringify(err));
    });
};
