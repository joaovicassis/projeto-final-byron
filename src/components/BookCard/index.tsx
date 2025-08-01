import { Book } from "@/src/app/lib/livros";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/livros/${book.id}`} className="h-full bg-white">
      <div className="border border-slate-200 rounded-lg overflow-hidden h-full flex flex-col">
        <div className="relative h-68 w-full">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col p-4 gap-2 flex-1">
          <h3 className="text-lg font-bold">{book.title}</h3>
          <p className="line-clamp-3 text-sm text-slate-600">
            {book.synopsis}
          </p>
        </div>
      </div>
    </Link>
  );
}
