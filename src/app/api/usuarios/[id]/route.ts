import { readFile, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const filePath = path.resolve(process.cwd(), "src/app/lib/usuarios.json");

// PUT: Atualiza nome e senha de um usuário
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { nome, senha } = await request.json();

  const data = await readFile(filePath, "utf-8");
  const usuarios = JSON.parse(data);

  const index = usuarios.findIndex((u: any) => u.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
  }

  const usuarioAntigo = usuarios[index];

  const usuarioAtualizado = {
    ...usuarioAntigo,
    nome: nome ?? usuarioAntigo.nome,
    senha: senha ?? usuarioAntigo.senha,
  };

  usuarios[index] = usuarioAtualizado;

  await writeFile(filePath, JSON.stringify(usuarios, null, 2));

  return NextResponse.json(usuarioAtualizado, { status: 200 });
}

// DELETE: Remove o usuário pelo ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const data = await readFile(filePath, "utf-8");
  const usuarios = JSON.parse(data);

  const novoArray = usuarios.filter((u: any) => u.id !== id);

  if (novoArray.length === usuarios.length) {
    return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
  }

  await writeFile(filePath, JSON.stringify(novoArray, null, 2));

  return NextResponse.json({ message: "Usuário excluído com sucesso" }, { status: 200 });
}
