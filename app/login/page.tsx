"use client"

import ErrorAlert from "@/components/ErrorAlert";
import Loader from "@/components/Loader";
import Admin from "@/interfaces/admin";
import { FormEvent, useState } from "react";


import axios from "axios";





function LoginPage() {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setError('');
            setLoading(true);

            const formData = new FormData(e.target as HTMLFormElement);

            const user: Admin ={
                email: formData.get('email') as string,
                password: formData.get('password') as string
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, JSON.stringify(user), {validateStatus: (status) => status >= 200});

            if(response.status === 200) {
                setLoading(false);
                window.location.href = '/';
            }
            else if(response.status === 401) {
                setLoading(false);
                setError("Invalid credentials");
            }
            else if(response.status === 500) {
                throw new Error('Internal server error');
            }


        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("Internal server error! Please try again later.");
        }
        
    }


    return (
        <div>
            <h1 className="text-center font-bold text-xl lg:text-3xl mt-28">Login</h1>
            {error && <ErrorAlert>{error}</ErrorAlert>}
            {loading && <div className="mx-auto flex my-5">
                <Loader color="#028585" size={40} />
            </div>}
            <form id="login" className="flex flex-col w-11/12 lg:w-1/4 mx-auto my-10 bg-soft-mint rounded-lg p-6" onSubmit = {handleLogin}>
                <label htmlFor="email" className="text-sm lg:text-lg my-2">Email</label>
                <input type="email" name="email" id="email" className="p-2 border border-gray-300 rounded-lg mb-3" required />
                <label htmlFor="password" className="text-sm lg:text-lg my-2">Password</label>
                <input type="password" name="password" id="password" className="p-2 border border-gray-300 rounded-lg mb-3" required />
                <button type="submit" form="login" className="bg-teal-green hover:bg-sea-green text-white p-2 rounded-lg my-5">Login</button>
            </form>
        </div>
    );
}


export default LoginPage;