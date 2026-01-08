import axios from "axios";

export const authInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BASEURL || "http://202.79.51.253:7070/api/v1/"
})