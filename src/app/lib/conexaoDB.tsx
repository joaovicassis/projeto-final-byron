//Para ler arquivos com nextjs
import {promises as fs} from 'fs';

// Agora espera caminho absoluto
async function retornaBD(arquivo: string): Promise<Array<any>>
{
    const dados = await fs.readFile(arquivo,'utf-8');
    return JSON.parse(dados);
}

async function armazenaBD(arquivo: string, dados: any)
{
    await fs.writeFile(arquivo, JSON.stringify(dados,null,2));
}

const ConexaoBD = {
    retornaBD,
    armazenaBD
}

export default ConexaoBD;