export type Book = {
  id: string
  title: string
  author: string
  genre: string
  releaseDate: string
  synopsis: string
  coverImage: string
}

export const books: Book[] = [
  {
    id: "0",
    title: "1984",
    author: "George Orwell",
    genre: "Distopia",
    releaseDate: "08/06/1949",
    synopsis: "Um romance distópico que retrata um regime totalitário que manipula e vigia todos os aspectos da vida humana.",
    coverImage: "/livros/1984.png"
  },
  {
    id: "1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    genre: "Romance",
    releaseDate: "01/01/1899",
    synopsis: "A obra narra a história de Bentinho e seu relacionamento com Capitu, marcada por amor, ciúmes e desconfiança.",
    coverImage: "/livros/domCasmurro.png"
  },
  {
    id: "2",
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    releaseDate: "29/07/1954",
    synopsis: "A primeira parte da trilogia épica em que Frodo parte em uma jornada para destruir o Um Anel e salvar a Terra-média.",
    coverImage: "/livros/senhorDosAneis.png"
  },
  {
    id: "3",
    title: "Turma da Mônica",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    releaseDate: "29/07/1954",
    synopsis: "A primeira parte da trilogia épica em que Frodo parte em uma jornada para destruir o Um Anel e salvar a Terra-média.",
    coverImage: "/livros/kamasutra.png"
  }
]
