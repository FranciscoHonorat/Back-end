import fs from 'fs';
import path from 'path';
import trataErro from './erros/funcoesErros.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultado')
    .action((options) => {
        const { texto, destino } = options; // colocar uma variavel entre chaves, significa que estamos desestruturando o objeto.

        if(!texto || !destino){
            console.error(chalk.red('Você precisa informar o caminho do texto e o caminho do destino'));
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try{
            processaArquiv(caminhoTexto, caminhoDestino);
            console.log(chalk.green('Texto processado com sucesso'));
        }catch(erro){
            console.log('Ocorreu um erro', erro);
        }

    })

program.parse();

function processaArquiv(texto, destino){
    fs.readFile(texto, 'utf-8', (erro, texto) =>{
        try{
            if(erro) throw erro;
            const resultado = contaPalavras(texto);
            criarESalvarArquivos(resultado, destino )
        } catch(erro){
            trataErro(erro);
        }
    })
}

async function criarESalvarArquivos(listaPalavras, endereco){
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    try{
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado');
    } catch(erro){
        throw erro;
    }
}

// function criarESalvarArquivos(listaPalavras, endereco){
//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras = JSON.stringify(listaPalavras);
    
//     fs.promises.writeFile(arquivoNovo, textoPalavras)
//         .then(() => {
//             console.log('arquivo criado');
//         })
//         .catch(() => {
//             throw erro
//         })
//         .finally(() => {
//             console.log('Operação finalizada');
//         })
    

// }