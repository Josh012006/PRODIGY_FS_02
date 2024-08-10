"use client"

import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";







function SideBar ({children} : {children: ReactNode}) {

    const link = usePathname();

    const [sidebar, setSidebar] = useState('hidden');


    const handleLogout = async () => {
        try {
            
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`);

            if(response.status === 200) {
                console.log("Successfully logged out!")
                window.location.href = '/';
            }

            else {
                throw Error("An error comming from the server for the logout process!");
            }

        } catch (error) {
            console.log("An error while trying to logout ", error);
            window.location.reload();
        }
    }


    return (
        <>
            {!link.includes('/login') && <div className="grid grid-cols-5">
                <div  className={`lg:block bg-dark-teal-green min-h-screen h-full w-full absolute top-0 left-0 lg:relative z-10 col-span-5 lg:col-span-1 text-white ${sidebar}`}>
                    <span className="lg:hidden"><i className="text-2xl m-5 fa-solid fa-xmark cursor-pointer" aria-hidden="true" onClick={() => {setSidebar("hidden")}}></i></span>
                    <h1 className="font-bold text-center text-xl lg:text-2xl p-3 lg:my-6">My EMS</h1>
                    <div className="w-11/12 mx-auto border-2 border-white"></div>
                    <nav className="flex flex-col text-xl py-5">
                        <Link href="/" className="p-3 hover:bg-teal-green" onClick={() => {setSidebar("hidden")}}><i className="fa-solid fa-address-book text-white" aria-hidden="true"></i> &nbsp;&nbsp;List of employees</Link>
                        <Link href="/dashboard/add" className="p-3 hover:bg-teal-green" onClick={() => {setSidebar("hidden")}}><i className="fa-solid fa-user-plus text-white" aria-hidden="true"></i> &nbsp;&nbsp;Add employee</Link>
                        <Link href="" className="p-3 hover:bg-teal-green" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket text-white" aria-hidden="true"></i> &nbsp;&nbsp;Logout</Link>
                    </nav>
                </div>
                <div className="col-span-5 lg:col-span-4">
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