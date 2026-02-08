import axios from "axios";

export const instance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BASEURL
}) 

instance.interceptors.request.use((config)=>{
    if (config.data instanceof FormData){
        delete config.headers["Content-Type"]
    }
    return config
})

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token){
            config.headers.Authorization = `Token ${token}`
        }
        return config
    }
)



// "use client";
// import axios from "axios";
// import { getSession } from "next-auth/react";

// console.log(process.env.NEXT_PUBLIC_BASEURL);

// export const authenticatedInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASEURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// authenticatedInstance.interceptors.request.use(async (config) => {
//   const session = await getSession();
//   const token = session?.accessToken;

//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }

//   return config;
// });