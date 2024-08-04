"use client"

import { usePathname } from "next/navigation";
import { ReactNode } from "react";







function SideBar ({children} : {children: ReactNode}) {

    const link = usePathname();

    console.log(link);

    return (
        <>
            {!link.includes('/login') && <div className="bg-gray-800 h-screen w-full">
                {children}
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