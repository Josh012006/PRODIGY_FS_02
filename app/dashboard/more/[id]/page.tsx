"use client"

import Loader from "@/components/Loader";
import Employee from "@/interfaces/employee";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";





function DetailsPage() {

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

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };



    const handleUpdate = () => {
        window.location.href = `/dashboard/more/update/${id}`;
    }

    const handleDeletion = async () => {
        try {
            window.scrollTo({
                top: 300,
                behavior: 'smooth'
            });

            setLoading1(true);

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/delete/${id}`, { validateStatus: (status) => status >=200 });

            if (response.status === 200) {
                console.log('Employee deleted successfully!');
                setLoading1(false);
                window.location.href = "/";
            }
            else {
                throw Error("An error occurred while deleting employee!");
            }

        } catch (error) {
            setLoading1(false);
            console.log("An error occurred while deleting employee! ", error);
            window.location.reload();
        }
    }


    return (
        <div>
            <h1 className="text-center font-bold text-xl lg:text-3xl mt-10 lg:mt-28 mb-10">Details</h1>
            {loading && <div className="mx-auto flex my-5">
                <Loader color="#028585" size={40} />
            </div>}
            {!loading && !employee && <div className="text-center my-10 italic">
                No such employee. Please try again.
            </div>}
            {employee && <><h2 className="font-bold my-3 text-center text-xl lg:text-2xl">Profile picture</h2>
            {employee && <><Image src={`/employees/${employee?.picture}`} alt="Employee's identity" width={300} height={300} className="mx-auto my-10 rounded-lg border-2 border-black" />
            <h2 className="font-bold my-3 text-center text-xl lg:text-2xl">Personal information</h2>
            <div className="my-5 grid grid-cols-1 lg:grid-cols-2 px-6">
                <p><span className="font-bold">Name: </span>{employee?.name}</p>
                <p><span className="font-bold">Email: </span>{employee?.email}</p>
                <p><span className="font-bold">Phone: </span>{employee?.phone}</p>
                <p><span className="font-bold">Address: </span>{employee?.address}</p>
                <p><span className="font-bold">Date of birth: </span>{new Date(employee?.dateOfBirth).toLocaleDateString('fr-FR', options)}</p>
                <p><span className="font-bold">Social security number: </span>{employee?.socialSecurityNumber}</p>
            </div>
            <br />
            <h2 className="font-bold my-3 text-center text-xl lg:text-2xl">Professional information</h2>
            <div className="my-5 grid grid-cols-1 lg:grid-cols-2 px-6">
                <p><span className="font-bold">Position: </span>{employee?.position}</p>
                <p><span className="font-bold">Department: </span>{employee?.department}</p>
                <p><span className="font-bold">Start date: </span>{new Date(employee?.startDate).toLocaleDateString('fr-FR', options)}</p>
                <p><span className="font-bold">Contract type: </span>{employee?.contractType}</p>
                <p><span className="font-bold">Salary: </span>{employee?.salary} $US</p>
                <p><span className="font-bold">Work time: </span>{employee?.workTime}</p>
                <p><span className="font-bold">Employee number: </span>{employee?.employeeNumber}</p>
                <p><span className="font-bold">Bank account: </span>{employee?.bankAccount}</p>
                <p><span className="font-bold">Bank: </span>{employee?.bank}</p>
                <p><span className="font-bold">Education level: </span>{employee?.educationLevel}</p>
            </div></>}
            <div className="flex flex-col lg:flex-row items-center justify-center">
                <button type="button" className="bg-dark-teal-green hover:bg-sea-green text-white p-2 rounded-md w-32 my-5 lg:mx-16" onClick={handleUpdate}>Modify</button>
                <button type="button" className="bg-dark-teal-green hover:bg-sea-green text-white p-2 rounded-md w-32 my-5 lg:mx-16" onClick={handleDeletion}>Delete</button>
            </div></>}
            {loading1 && <div className="mx-auto flex my-5">
                <Loader color="#028585" size={40} />
            </div>}
        </div>
    );
}


export default DetailsPage;