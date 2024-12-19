function filtrarOcorrencias(paragrafos){
    return Object.keys(paragrafos).filter(chave => paragrafos[chave] > 1)
}

function montaSaidaArquivo(listaPalavras){
    let textoFinal = '';
    listaPalavras.forEach((paragrafos, indice) => {
        const duplicadas = filtrarOcorrencias(paragrafos).join(', ');
        textoFinal += `Palavras duplicadas no parágrafo ${indice + 1}: ${duplicadas} \n`;
    })

    return textoFinal;
}

export { montaSaidaArquivo };