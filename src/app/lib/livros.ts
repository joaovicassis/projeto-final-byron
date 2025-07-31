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
    author: "Maurício de Souza",
    genre: "Fantasia",
    releaseDate: "29/07/1954",
    synopsis: "As divertidas aventuras da Turma da Mônica ganham vida neste livro repleto de amizade, travessuras e lições valiosas. Mônica, Cebolinha, Magali, Cascão e seus amigos vivem no Bairro do Limoeiro, onde cada dia é uma nova descoberta. Entre planos infalíveis, coelhadas e muita diversão, a turma mostra o valor da amizade, da imaginação e do respeito às diferenças.",
    coverImage: "/livros/turmaDaMonica.png"
  },
  {
  id: "4",
  title: "A Revolução dos Bichos",
  author: "George Orwell",
  genre: "Fábula política",
  releaseDate: "17/08/1945",
  synopsis: "Animais de uma fazenda se rebelam contra seus donos humanos em uma alegoria da Revolução Russa.",
  coverImage: "/livros/aRevolucaoDosBichos.png"
},
{
  id: "5",
  title: "O Pequeno Príncipe",
  author: "Antoine de Saint-Exupéry",
  genre: "Fábula",
  releaseDate: "06/04/1943",
  synopsis: "Um piloto encontra um pequeno príncipe vindo de outro planeta e descobre importantes lições de vida.",
  coverImage: "/livros/pequenoPrincipe.png"
},
{
  id: "6",
  title: "A Menina que Roubava Livros",
  author: "Markus Zusak",
  genre: "Drama",
  releaseDate: "2005-09-01",
  synopsis: "Durante a Segunda Guerra Mundial, uma jovem encontra consolo nos livros enquanto o mundo desmorona ao seu redor.",
  coverImage: "/livros/aMeninaQueRoubava.png"
},
{
  id: "7",
  title: "O Código Da Vinci",
  author: "Dan Brown",
  genre: "Suspense",
  releaseDate: "18/03/2003",
  synopsis: "Um simbologista e uma criptóloga desvendam mistérios ocultos por trás de uma sociedade secreta.",
  coverImage: "/livros/oCodigoDaVinci.png"
},
{
  id: "8",
  title: "Harry Potter e a Pedra Filosofal",
  author: "J.K. Rowling",
  genre: "Fantasia",
  releaseDate: "26/06/1997",
  synopsis: "Um garoto descobre que é um bruxo e vai estudar em Hogwarts, onde viverá aventuras mágicas inesquecíveis.",
  coverImage: "/livros/hp.png"
}
]
