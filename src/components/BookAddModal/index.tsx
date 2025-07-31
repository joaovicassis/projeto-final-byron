import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface BookFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookFormModal({ isOpen, onClose }: BookFormModalProps) {
    const inputStyle = "p-2 border border-zinc-200 rounded-md bg-white"
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <div>
                        <DialogTitle className="flex justify-center pb-4">Novo Livro</DialogTitle>
                    </div>
                </DialogHeader>
                <form className="bg-green-50 border rounded-2xl border-green-50 p-4">
                    <div className="grid grid-cols-2 gap-2">

                        {/*titulo*/}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title">Título</label>
                            <input className={inputStyle} type="text" id="title" />
                        </div>

                        {/*Autor*/}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="author">Autor</label>
                            <input className={inputStyle} type="text" id="title" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">

                        {/*genero*/}
                        <div className="flex flex-col gap-1 pt-4">
                            <label htmlFor="genre">Gênero</label>
                            <input className={inputStyle} type="text" id="title" />
                        </div>

                        {/*Data de lançamento*/}
                        <div className="flex flex-col gap-1 pt-4">
                            <label htmlFor="releaseDate">Data de lançamento</label>
                            <input className={inputStyle} type="text" id="title" />
                        </div>
                    </div>

                    {/*sinopse*/}
                    <div className="flex flex-col gap-1 pt-4">
                        <label htmlFor="synopsis">Sinopse</label>
                        <textarea className={inputStyle} id="synopsis" />
                    </div>

                    {/*sinopse*/}
                    <div className="flex flex-col gap-1 pt-4">
                        <label htmlFor="coverImage">Capa do livro</label>
                        <input type="text" className={inputStyle} id="coverImage" placeholder="/img.svg?height=200&widht=600" />
                    </div>

                    {/* PDF do livro */}
                    <div className="flex flex-col gap-1 pt-4">
                        <label htmlFor="bookPdf">Arquivo PDF do livro</label>
                        <input type="file"id="bookPdf"accept="application/pdf" className="file:mr-2 file:py-2 file:px-4 file:rounded file:border file:border-zinc-200 file:bg-zinc-100 file:text-sm file:text-zinc-700"
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}