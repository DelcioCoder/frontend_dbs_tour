import Link from "next/link";


interface PaginationProps {
    currentPage: number;
    nextPage: string | null;
    basePath: string;

}


export function Pagination({ currentPage, nextPage, basePath }: PaginationProps) {
    return (
        <div className="container mx-auto px-4 py-4 flex justify-between">
            {currentPage > 1 ? (
                <Link
                    href={`${basePath}?page=${currentPage - 1}`}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                    Anterior
                </Link>
            ) : (
                <span />
            )}
            {nextPage ? (
                <Link
                    href={`${basePath}?page=${nextPage}`}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                    Próxima
                </Link>
            ) : null}
        </div>
    )
}