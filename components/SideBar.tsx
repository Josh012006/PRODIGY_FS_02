"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";







function SideBar ({children} : {children: ReactNode}) {

    const link = usePathname();

    const [sidebar, setSidebar] = useState('hidden');


    return (
        <>
            {!link.includes('/login') && <div className="grid grid-cols-5">
                <div  className={`lg:block bg-gray-800 h-screen w-full absolute top-0 left-0 lg:relative z-10 col-span-5 lg:col-span-1 text-white ${sidebar}`}>
                    <span className="lg:hidden"><i className="text-2xl m-5 fa-solid fa-xmark cursor-pointer" aria-hidden="true" onClick={() => {setSidebar("hidden")}}></i></span>
                    <h1 className="font-bold text-center text-xl lg:text-2xl p-3 lg:my-6">My EMS</h1>
                    <div className="w-11/12 mx-auto border-2 border-white"></div>
                    <nav className="flex flex-col text-xl py-5">
                        <Link href="/" className="p-3 hover:bg-gray-700" onClick={() => {setSidebar("hidden")}}>List of employees</Link>
                        <Link href="/dashboard/add" className="p-3 hover:bg-gray-700" onClick={() => {setSidebar("hidden")}}>Add employee</Link>
                    </nav>
                </div>
                <div className="col-span-5 lg:col-span-4 p-3">
                    <span className="lg:hidden"><i className="text-2xl m-5 p-3 fa-solid fa-bars text-gray-900 cursor-pointer" aria-hidden="true" onClick={() => {setSidebar("block")}}></i></span>
                    {children}
                </div>
            </div>}
            {link.includes('/login') && 
                <>
                    {children}
                </>
            }
        </>
    )
}


export default SideBar;