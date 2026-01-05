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
        const token = sessionStorage.getItem('token')
        config.headers.Authorization = `${token}`
        return config
    }
)