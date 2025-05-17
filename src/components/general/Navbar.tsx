import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <header className="absolute top-0 left-0 z-10 bg-transparent text-white font-medium text-sm w-full flex justify-between items-center px-10 pt-2 box-border">
            <img src="./logo.svg" alt="" className='w-[80px]' />

            <div className="flex items-center gap-[50px]">
                <nav className="flex items-center gap-[50px]">
                    <Link href="/" className="text-white no-underline">Home</Link>
                    <Link href="/disenar" className="text-white no-underline">Diseñar</Link>
                    <Link href="/descubrir" className="text-white no-underline">Descubrir</Link>
                    <Link href="/proveedores" className="text-white no-underline">Proveedores</Link>
                </nav>

                <img src="./user.svg" alt="Perfil" className="w-[30px] h-[30px] object-contain" />
            </div>
        </header>
    )
}

export default Navbar