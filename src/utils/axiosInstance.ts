import axios from "axios";

export const instance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BASEURL || "http://202.79.51.253:7070/api/"
}) 

instance.interceptors.request.use((config)=>{
    if (config.data instanceof FormData){
        delete config.headers["Content-Type"]
    }
    return config
})

instance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token')
        config.headers.Authorization = `${token}`
        return config
    }
)