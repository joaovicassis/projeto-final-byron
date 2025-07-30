"use server";

import ConexaoBD from './conexaoDB';
import path from 'path';
import { revalidatePath } from 'next/cache';

// O tipo Book, que pode ser usado em toda a aplicação
export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  releaseDate: string;
  synopsis: string;
  coverImage: string;
};

// Encontra o caminho absoluto para o nosso arquivo JSON de banco de dados
// Garanta que o seu arquivo de dados se chama 'livros.json'
const dbFilePath = path.resolve(process.cwd(), 'src/app/lib/livros.json');

/**
 * Busca todos os livros do nosso banco de dados de arquivo.
 * @returns Uma Promise com o array de livros.
 */
export const getLivros = async (): Promise<Book[]> => {
  try {
    return ConexaoBD.retornaBD(dbFilePath);
  } catch (error) {
    console.error("Arquivo de livros não encontrado ou vazio, retornando array vazio.", error);
    return []; // Retorna um array vazio se o arquivo não existir para evitar erros
  }
};

/**
 * Deleta um livro do banco de dados pelo seu ID.
 * @param id O ID do livro a ser deletado.
 */
export const deletarLivro = async (id: string): Promise<void> => {
  try {
    // 1. Pega a lista atual de livros
    const livrosAtuais = await getLivros();

    // 2. Cria uma nova lista, filtrando e removendo o livro com o ID correspondente
    const novosLivros = livrosAtuais.filter(livro => livro.id !== id);

    // 3. Salva a nova lista (sem o livro deletado) de volta no arquivo JSON
    await ConexaoBD.armazenaBD(dbFilePath, novosLivros);

    // 4. Invalida o cache da página inicial, para que os dados sejam recarregados na próxima visita.
    revalidatePath('/');

  } catch (error) {
    console.error("Erro ao deletar livro no servidor:", error);
    // Lança o erro para que o cliente possa tratá-lo se necessário
    throw new Error("Falha ao deletar o livro.");
  }
};