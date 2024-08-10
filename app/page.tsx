"use client"

import Loader from "@/components/Loader";
import Employee from "@/interfaces/employee";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";




function HomePage () {

  const [initialEmployees, setInitialEmployees] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchEmployees() {
      try {
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/getAll`, { validateStatus: (status) => status >=200 });

        if (response.status === 200) {
          setInitialEmployees(response.data as Employee[]);
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

  useEffect(() => {
    if (filter === '') {
      setEmployees(initialEmployees);
    } else {
      setEmployees(initialEmployees.filter((employee) => employee.name.toLowerCase().includes(filter.toLowerCase())));
    }
  }, [filter, initialEmployees]);

  return (
    <>
      <h1 className="text-center text-xl lg:text-3xl font-bold my-4 lg:my-10">List of employees</h1>
      {loading && <div className="mx-auto flex my-5">
          <Loader color="#028585" size={40} />
      </div>}
      {!loading && <div className="flex p-5">
        <input className="bg-white rounded-lg h-12 border-2 border-black p-3 w-full" type="text" placeholder="Search an employee..." value={filter} onChange={(e) => {setFilter(e.target.value)}} />
      </div>}
      {!loading && employees.length === 0 && <p className="text-center my-36 italic">No employees found</p>}
      {employees.length > 0 && <p className="text-center my-5 font-bold">Total employees: {employees.length}</p>}
      {employees.length > 0 && <table className="w-full text-center bg-soft-mint">
        <thead>
          <tr className="bg-medium-aquamarine border-y-2 border-black">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Depart.</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="border-y-2 border-black">
              <td className="py-2">{employee.name}</td>
              <td className="py-2 whitespace-normal">{employee.email}</td>
              <td className="py-2">{employee.department}</td>
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