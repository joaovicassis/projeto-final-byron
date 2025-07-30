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

// Um tipo para os dados do formulário, sem o ID
export type BookFormData = Omit<Book, 'id'>;

// Encontra o caminho absoluto para o nosso arquivo JSON de banco de dados
const dbFilePath = path.resolve(process.cwd(), 'src/app/lib/livros.json');

/**
 * Busca todos os livros do nosso banco de dados de arquivo.
 */
export const getLivros = async (): Promise<Book[]> => {
  try {
    return ConexaoBD.retornaBD(dbFilePath);
  } catch (error) {
    console.error("Arquivo de livros não encontrado ou vazio, retornando array vazio.", error);
    return [];
  }
};

/**
 * Deleta um livro do banco de dados pelo seu ID.
 */
export const deletarLivro = async (id: string): Promise<void> => {
  try {
    const livrosAtuais = await getLivros();
    const novosLivros = livrosAtuais.filter(livro => livro.id !== id);
    await ConexaoBD.armazenaBD(dbFilePath, novosLivros);
    revalidatePath('/');
  } catch (error) {
    console.error("Erro ao deletar livro no servidor:", error);
    throw new Error("Falha ao deletar o livro.");
  }
};

/**
 * Edita um livro existente no banco de dados.
 * @param id O ID do livro a ser editado.
 * @param dadosAtualizados Os novos dados para o livro.
 */
export const editarLivro = async (id: string, dadosAtualizados: BookFormData): Promise<void> => {
  try {
    const livrosAtuais = await getLivros();
    
    const novosLivros = livrosAtuais.map(livro => 
      livro.id === id ? { ...livro, ...dadosAtualizados } : livro
    );

    await ConexaoBD.armazenaBD(dbFilePath, novosLivros);
    revalidatePath('/');
  } catch (error) {
    console.error("Erro ao editar livro no servidor:", error);
    throw new Error("Falha ao editar o livro.");
  }
};