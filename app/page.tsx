"use client"

import Loader from "@/components/Loader";
import Employee from "@/interfaces/employee";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";




function HomePage () {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/getAll`, { validateStatus: (status) => status >=200 });

        if (response.status === 200) {
          setEmployees(response.data as Employee[]);
        } else {
          throw Error("An error occured while fetching employees");
        }

        setLoading(false);

      } catch (error) {
        console.log("An error while fetching employees ", error);
        window.location.reload();
      }
    }

    fetchEmployees();
  }, []);

  return (
    <>
      <h1 className="text-center text-xl lg:text-3xl font-bold my-4 lg:my-10">List of employees</h1>
      {!loading && employees.length === 0 && <p className="text-center my-36 italic">No employees found</p>}
      {loading && <div className="mx-auto flex my-5">
          <Loader color="#028585" size={40} />
      </div>}
      {employees.length > 0 && <table className="w-full text-center bg-soft-mint">
        <thead>
          <tr className="bg-medium-aquamarine border-y-2 border-black">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="border-y-2 border-black">
              <td className="py-2">{employee.name}</td>
              <td className="py-2">{employee.email}</td>
              <td className="py-2">
                <Link href={`/dashboard/more/${employee._id}`} className="text-white bg-dark-teal-green hover:bg-sea-green p-2 rounded-md">More</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </>
  )
}


export default HomePage;