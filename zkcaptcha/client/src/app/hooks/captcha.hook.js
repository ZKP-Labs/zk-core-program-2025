import { useEffect, useState } from "react"
import { getChallenge, getChallengeById } from "../api/captcha.api";

export const useGetChallenge = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        const response = await getChallenge();

        try {
            if (response) {
                setData(response);
                setIsLoading(true);
                console.log('Challenge: ', response)
            } else
                setData(null);
        }catch (error) {
            console.error("Failed to fetch customer:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return { data, isLoading, fetchData }
}

export const useGetChallengeById = (id) => {
    const [data_, setData_] = useState();
    const [isLoading_, setIsLoading_] = useState(false);

    const fetchData_ = async () => {
        const response = await getChallengeById(id);

        try {
            if (response) {
                setData_(response);
                setIsLoading_(true);
                console.log('Challenge: ', response)
            } else
                setData(null);
        }catch (error) {
            console.error("Failed to fetch customer:", error);
        } finally {
            setIsLoading_(false);
        }
    }

    useEffect(() => {
        fetchData_()
    }, []);

    return { data_, isLoading_, fetchData_ }
}
