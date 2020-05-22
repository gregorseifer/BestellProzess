import fs from 'fs';

export const logAbbruch = async (
    prename: string,
    surname: string,
    product: string,
) => {
    const data = `${Date.now} Abbruch: ${prename} ${surname}: ${product} \n`;
    fs.appendFile('abbruch.log', data, 'utf8', (err) => {
        console.error(JSON.stringify(err));
    });
};
