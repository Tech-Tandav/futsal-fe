import axios from "axios";

export const authInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BASEURL || "https://api.book.nicnepal.org/api/v1/"
})