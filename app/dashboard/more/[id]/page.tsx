"use client"

import Loader from "@/components/Loader";
import Employee from "@/interfaces/employee";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";





function DetailsPage() {

    const id = useParams().id;

    console.log(id);

    const [employee, setEmployee] = useState<Employee | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEmployee() {
            try {
                
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/get/${id}`, { validateStatus: (status) => status >=200 });

                if (response.status === 200) {
                    console.log(response.data);
                    setEmployee(response.data as Employee);
                }
                else if(response.status === 404) {
                    console.log('Employee not found!');
                    window.location.href = "/";
                }
                else {
                    throw Error("An error occurred while fetching employee's info!");
                }

                setLoading(false);


            } catch (error) {
                console.log("An error occurred while fetching employee's info!");
                window.location.reload();
            }
        }

        fetchEmployee();
    }, []);


    return (
        <div>
            <h1 className="text-center font-bold text-xl lg:text-3xl mt-28">Details</h1>
            {loading && <div className="mx-auto flex my-5">
                <Loader color="#028585" size={40} />
            </div>}
        </div>
    );
}


export default DetailsPage;