import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useShoes = () => {
    const axiosPublic = useAxiosPublic();
   
    const {data: shoes = [], isPending: loading, refetch} = useQuery({
        queryKey: ['shoes'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/shoesCollection');
            return res.data;
        }
    })
 
    return [shoes, loading, refetch]

}

export default useShoes;