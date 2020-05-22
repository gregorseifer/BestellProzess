import fs from 'fs';

export const versendeProdukt = (
    vorname: string,
    nachname: string,
    produkt: string,
) => {
    let data = `Produkt ${produkt} versendet an ${vorname} ${nachname}. \n`;
    fs.appendFile('versand.log', data, 'utf8', (err) => {
        console.error(err)
    });
    console.log(data);
}