"use client"


import axios from "axios";
import { useEffect } from "react";




function HomePage () {

  useEffect(() => {
    async function authenticate() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth`);
        if (response.status === 401) {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('An unexpected error happened:', error);
        window.location.reload();
      }
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}


export default HomePage;