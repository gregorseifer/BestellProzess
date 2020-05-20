import fs from 'fs';

export const logAbbruch = async (
    prename: string,
    surname: string,
    product: string,
) => {
    const data = `Abbruch: ${prename} ${surname}: ${product}`;
    fs.appendFile('abbruch.log', data, 'utf8', (err) => {
        console.error(JSON.stringify(err));
    });
};
