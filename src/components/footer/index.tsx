import Link from "next/link"

export default function Footer(){
    return (
        <> 
            <footer className="bg-gray-900 text-gray-100" > 
                <div className="conteiner flex flex-col justify-center items-center h-72 " >
                    DBS-TOUR &copy; 2025
                    <Link href="/contact" aria-label="Contacto" className=" underline hover:text-gray-300 "  > Deseja Falar conosco? </Link>
                    Todos os direitos reservados
                </div>
            </footer>
        </>
    )
}