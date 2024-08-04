"use client"


import Loader from "@/components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";




function HomePage () {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function authenticate() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth`, {validateStatus: (status) => status >= 200});
        if (response.status === 401) {
          window.location.href = '/login';
        }
        else if(response.status === 200) {
          console.log('User is authenticated');
          setAuth(true);
        }
        else if(response.status === 500) {
          throw new Error('Internal server error');
        }
      } catch (error) {
        console.error('An unexpected error happened:', error);
        window.location.reload();
      }
    }

    authenticate();
  }, []);

  return (
    <>
      {!auth && <div className="flex my-28">
        <Loader size={40} color="#004" />
      </div>}
      {auth && <div>
        <h1>Home Page</h1>
      </div>}
    </>
  )
}


export default HomePage;