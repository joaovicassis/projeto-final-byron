// app/lib/authService.ts

export type User = {
  id: string;
  username: string;
  password: string;
};

// Simulação de "banco de dados" no LocalStorage
const USERS_KEY = "users";

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function criarConta(username: string, password: string): Promise<User> {
  const users = getUsers();
  if (users.find(u => u.username === username)) {
    throw new Error("Usuário já existe");
  }
  const novoUsuario: User = {
    id: Date.now().toString(),
    username,
    password, // No mundo real: nunca salve senhas assim!
  };
  users.push(novoUsuario);
  saveUsers(users);
  return novoUsuario;
}

export async function fazerLogin(username: string, password: string): Promise<User> {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error("Usuário ou senha inválidos");
  return user;
}
