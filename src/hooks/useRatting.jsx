import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useRatting = () => {
    const axiosPublic = useAxiosPublic();

    const {data: ratting = [], isPending: rattingLoading} = useQuery({
        queryKey: ['ratting'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/ratting');
            return res.data;
        }
    })
    return [ratting, rattingLoading]
};

export default useRatting;