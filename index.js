import chalk from 'chalk';
import fs from 'fs';
import { argv } from 'process';
import { validaLink } from './http-valid.js';

const fileName = argv[2];

function extraiLinks(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    let temp;
    let arrayResultados = [];

    while((temp = regex.exec(texto)) !== null){
        arrayResultados.push({['['+temp[1]+']']: temp[2]});
    }

    const arrayLinks = arrayResultados
    .map(Objeto => Object
    .values(Objeto)
    .join()
    );
    return validaLink(arrayLinks);
}

export function fileError(e){
    console.log(chalk.red(e.message));
}

export async function openFile(file){
    const fileEncoding = 'utf-8';
    try{
        const texto = await fs.promises.readFile(file,fileEncoding);
        return extraiLinks(texto);
    }catch(erro){
        fileError(erro);
    }
}

openFile(fileName);