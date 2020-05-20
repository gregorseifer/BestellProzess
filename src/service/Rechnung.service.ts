import { Kunde } from '../entity/types';
import fs from 'fs';

export const sendeRechnung = (
    kunde: Kunde,
    produkt: string,
    price: string,
) => {
    let data = `Rechnung\nVorname: ${kunde.prename} Nachname: ${kunde.surname} ID: ${kunde.id}\nProdukt: ${produkt} - ${price}\n\n`;
    fs.appendFile('rechnung.log', data, 'utf8', (err) => {
        console.error(err)
    });
    console.log(data);
}
