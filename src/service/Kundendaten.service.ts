import fetch from 'node-fetch';
import { Kunde } from '../entity/types'

export const findOne = async (prename: string, surname: string) => {
    var result: Kunde | undefined;    
    const body = await fetch(
            `http://localhost:3000/customers?prename=${prename}&surname=${surname}`
    )
    .then( res => res.json())
    .then( data =>  data );

    result = body[0];
    return result;
};
