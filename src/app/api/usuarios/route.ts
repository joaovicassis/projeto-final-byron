import { readFile, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

const filePath = path.resolve(process.cwd(), "src/app/lib/usuarios.json");

export async function GET() {
  const data = await readFile(filePath, "utf-8");
  const usuarios = JSON.parse(data);
  return NextResponse.json(usuarios);
}

export async function POST(request: Request) {
  const { nome, email, senha } = await request.json();
  const data = await readFile(filePath, "utf-8");
  const usuarios = JSON.parse(data);

  const novoUsuario = { id: uuidv4(), nome, email, senha };
  usuarios.push(novoUsuario);

  await writeFile(filePath, JSON.stringify(usuarios, null, 2));
  return NextResponse.json(novoUsuario, { status: 201 });
}
