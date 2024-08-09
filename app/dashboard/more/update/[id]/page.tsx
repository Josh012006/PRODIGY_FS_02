"use client"

import Loader from "@/components/Loader";
import Employee from "@/interfaces/employee";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";




function UpdatePage() {

    const id = useParams().id;

    console.log(id);

    const [employee, setEmployee] = useState<Employee | null>(null);

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(false);

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
                setLoading(false);
            }
        }

        fetchEmployee();
    }, [id]);

    return (
        <div>
            <h1 className="text-center font-bold text-xl lg:text-3xl mt-10 lg:mt-28 mb-10">Update employee&apos;s info</h1>
            {loading && <div className="mx-auto flex my-5">
                <Loader color="#028585" size={40} />
            </div>}
            {!loading && !employee && <div className="text-center my-10 italic">
                No such employee. Please try again.
            </div>}
        </div>
    );
}




export default UpdatePage;