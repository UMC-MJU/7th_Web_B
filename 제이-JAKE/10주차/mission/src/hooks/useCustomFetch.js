import { useEffect, useState } from "react";
import axiosInstance from "../apis/axios-instance.js";

// const {data, isLoading, isError} = useCustomFetch('url');

const useCustomFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true);
            try {
                const response = await axiosInstance.get(url);
                setData(response);
            }catch(error){
                setIsError(true);
            }finally{
                setIsloading(false);
            }
        }
        fetchData();

    }, [url]);

    return {data, isLoading, isError};
}

export default useCustomFetch;