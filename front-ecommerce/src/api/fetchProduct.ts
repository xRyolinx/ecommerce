import { Product } from "../models/ProductModel";
import axios from "axios";
import { useQuery } from "react-query";

// const ApiUrl = process.env.VITE_BASE_URL;
const ApiUrl = 'http://localhost:5000';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getAllProducts = (search: string = "") => {
    const { data, isLoading, isError } = useQuery<Product[]>({
        queryFn: async () => {
            // simulate time to fetch
            await sleep(1000)

            // no search
            if (!search) {
                return axios.get(`${ApiUrl}/products`).then(res => res.data)
            }

            // with search
            else {
                search = search.replace(/ /g, '%20')
                return axios.get(`${ApiUrl}/products?title=${search}`).then(res => res.data)
            }
        },
        queryKey: ["products", search]
    })

    return { data, isLoading, isError }
};

export const getProduct = (id: string) => {
    const { data, isLoading, isError } = useQuery<Product>({
        queryFn: async () => {
            // simulate time to fetch
            await sleep(1000)

            // get product
            return axios.get(`${ApiUrl}/products/${id}/`).then(res => res.data)
        },
        queryKey: ["product", id]
    })

    return { data, isLoading, isError }
};