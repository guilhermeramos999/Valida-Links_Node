import chalk from "chalk";
import fetch from "node-fetch";
import { fileError } from "./index.js";

export async function validaLink(arrayLinks){
    try{
        const arrayStatus = Promise
        .all(arrayLinks
            .map(async url =>{
                const res = await fetch(url);
                console.log(`${url}\nStatus:${res.status == 200 ? chalk.green(res.status): chalk.red(res.status)}`);
            }));
        return arrayStatus;
    }catch(erro){
        fileError(erro);
    }
}