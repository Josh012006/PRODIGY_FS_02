"use client"

import ErrorAlert from "@/components/ErrorAlert";
import Loader from "@/components/Loader";
import Employee from "@/interfaces/employee";
import { useParams } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";



import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import "dayjs/locale/fr";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);



// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import path from "path";



// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)




function UpdatePage() {

    const id = useParams().id;

    console.log(id);

    const [employee, setEmployee] = useState<Employee | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [file, setFile] = useState<any>(null);

    const [dateOfBirth, setDateOfBirth] = useState<any>(dayjs());
    const [startDate, setStartDate] = useState<any>(dayjs());

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
                console.log("An error occurred while fetching employee's info!", error);
                setLoading(false);
            }
        }

        fetchEmployee();
    }, [id]);

    useEffect(() => {
        // ! initialize values file, date of birth and start date
        setStartDate(dayjs(employee?.startDate));
        setDateOfBirth(dayjs(employee?.dateOfBirth));

        if(employee?.picture) {
            const filePath = path.resolve(__dirname + "employees/" + employee?.picture as string);
            setFile(filePath);
        }

    }, [employee]);



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            setLoading(true);
            setError('');
            
            const formData = new FormData(e.target as HTMLFormElement);

            formData.append('dateOfBirth', dateOfBirth?.format("DD/MM/YYYY"));
            formData.append('startDate', startDate?.format("DD/MM/YYYY"));
            formData.append('file', file[0]);
            formData.append('oldFile', employee?.picture as string);
            formData.append('id', employee?._id as string);

            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/update`, formData, { validateStatus: (status) => status >= 200 });

            if(response.status === 200) {
                console.log("Employee updated successfully");
                setLoading(false);
                window.location.href = '/';
            }

            else if(response.status === 500) {
                throw Error("An error occurred. Please try again!");
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("An error occurred. Please try again!");
        }
    }

    return (
        <div>
            <h1 className="text-center font-bold text-xl lg:text-3xl mt-10 lg:mt-28 mb-10">Update employee&apos;s info</h1>
            {error && <ErrorAlert>{error}</ErrorAlert>}
            {loading && <div className="mx-auto flex my-5">
                <Loader color="#028585" size={40} />
            </div>}
            {!loading && !employee && <div className="text-center my-10 italic">
                No such employee. Please try again.
            </div>}
            {employee && <form onSubmit={handleSubmit} className="flex flex-col p-3">
                <div className="flex flex-col px-4 w-11/12 lg:w-2/4 mx-auto">
                    <label className="my-3 font-bold text-center">Profile Picture</label>
                    <FilePond
                        files={file}
                        onupdatefiles={(fileItems) => {
                            setFile(fileItems.map((fileItem) => fileItem.file));
                        }}
                        allowMultiple={false}
                        maxFiles={1}
                        required
                        name="file" /* sets the file input name, it's filepond by default */
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
                <br/>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col px-4">
                        <label htmlFor="name" className="font-bold my-3">Name</label>
                        <input type="text" id="name" name="name" defaultValue={employee.name} className="border-2 rounded-md border-black p-3" placeholder="John Doe" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="email" className="font-bold my-3">Email</label>
                        <input type="email" id="email" name="email" defaultValue={employee.email} className="border-2 rounded-md border-black p-3" placeholder="john.doe@gmail.com" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="address" className="font-bold my-3">Address</label>
                        <input type="text" id="address" name="address" defaultValue={employee.address} className="border-2 rounded-md border-black p-3" placeholder="Employee's address" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="phone" className="font-bold my-3">Phone number</label>
                        <input type="tel" id="phone" name="phone" defaultValue={employee.phone} className="border-2 rounded-md border-black p-3" placeholder="Employee's phone number" />
                    </div>
                    <div className='flex flex-col px-4'>
                        <p className="my-3 text-center"><span className="font-bold">Date of birth:</span> {dateOfBirth?.format("DD/MM/YYYY")}</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                            <DateCalendar className='bg-white rounded-lg' value={dateOfBirth} onChange={(newValue) => setDateOfBirth(newValue)} maxDate={dayjs()} />
                        </LocalizationProvider>
                    </div>
                    <div className='flex flex-col px-4'>
                        <p className="my-3 text-center"><span className="font-bold">Start Date:</span> {startDate?.format("DD/MM/YYYY")}</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                            <DateCalendar className='bg-white rounded-lg' value={startDate} onChange={(newValue) => setStartDate(newValue)} />
                        </LocalizationProvider>
                    </div>
                </div>
                <br />
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col px-4">
                        <label htmlFor="SSN" className="font-bold my-3">Social Security number</label>
                        <input type="text" id="SSN" defaultValue={employee.socialSecurityNumber} name="SSN" className="border-2 rounded-md border-black p-3" placeholder="0123456789" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="position" className="font-bold my-3">Employee&apos;s position</label>
                        <input type="text" id="position" defaultValue={employee.position} name="position" className="border-2 rounded-md border-black p-3" placeholder="Employee's position" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="department" className="font-bold my-3">Employee&apos;s department</label>
                        <input type="text" id="department" defaultValue={employee.department} name="department" className="border-2 rounded-md border-black p-3" placeholder="Employee's department" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="contract" className="font-bold my-3">Contract Type</label>
                        <input type="text" id="contract" defaultValue={employee.contractType} name="contract" className="border-2 rounded-md border-black p-3" placeholder="CDI for example" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="salary" className="font-bold my-3">Salary in dollar US</label>
                        <input type="number" id="salary" name="salary" defaultValue={employee.salary} className="border-2 rounded-md border-black p-3" placeholder="Employee's salary" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="workTime" className="font-bold my-3">Work Time</label>
                        <input type="text" id="workTime" name="workTime" defaultValue={employee.workTime} className="border-2 rounded-md border-black p-3" placeholder="Full time" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="employeeNumber" className="font-bold my-3">Employee Number</label>
                        <input type="text" id="employeeNumber" name="employeeNumber" defaultValue={employee.employeeNumber} className="border-2 rounded-md border-black p-3" placeholder="Employee's number" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="bank" className="font-bold my-3">Bank</label>
                        <input type="text" id="bank" name="bank" defaultValue={employee.bank} className="border-2 rounded-md border-black p-3" placeholder="Employee's bank" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="bankAccount" className="font-bold my-3">Bank Account</label>
                        <input type="text" id="bankAccount" name="bankAccount" defaultValue={employee.bankAccount} className="border-2 rounded-md border-black p-3" placeholder="Employee's bank account" />
                    </div>
                    <div className="flex flex-col px-4">
                        <label htmlFor="education" className="font-bold my-3">Education Level</label>
                        <input type="text" id="education" name="education" defaultValue={employee.educationLevel} className="border-2 rounded-md border-black p-3" placeholder="Employee's education level" />
                    </div>
                </div>
                <br />
                <br />
                <div className="flex justify-center my-3">
                    <button type="submit" className="bg-dark-teal-green text-white p-2 rounded-md w-32">Modify</button>
                </div>
            </form>}
        </div>
    );
}




export default UpdatePage;