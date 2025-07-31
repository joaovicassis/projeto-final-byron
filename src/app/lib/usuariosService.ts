import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const usuariosFile = path.resolve(process.cwd(), "src/app/lib/usuarios.json");

export interface Usuario {
  id: string;
  nome: string;
  senha: string;
}

export async function getUsuarios(): Promise<Usuario[]> {
  const data = await fs.readFile(usuariosFile, "utf-8");
  return JSON.parse(data);
}

export async function adicionarUsuario(usuario: Omit<Usuario, "id">): Promise<Usuario> {
  const usuarios = await getUsuarios();
  const novoUsuario = { id: uuidv4(), ...usuario };
  usuarios.push(novoUsuario);
  await fs.writeFile(usuariosFile, JSON.stringify(usuarios, null, 2));
  return novoUsuario;
}


