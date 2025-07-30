import axios from "axios";
import { API_URL } from "../config/apiURL.config";
import { encrypt } from '../service/encrypt.service';

export const getChallenge = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
            `${API_URL}/challenge`,
            { 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200)
            return response.data;

    }catch (error) {
        console.log(error);
        throw Error();
    }
}

export const getChallengeById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
            `${API_URL}/challenge/${id}`,
            { 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200)
            return response.data;

    }catch (error) {
        console.log(error);
        throw Error();
    }
}

export const verify = async (captchaId, userId, proof, publicSignals) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_URL}/verify`,
            {
                captcha_id: captchaId,
                user_id: userId,
                proof: proof,
                public_signals: publicSignals
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(response.data);

        if (response.status === 200)
            return response.status;

    }catch (error) {
        return error.response.status;
    }
}

export const getPoseidonHash = async (input) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_URL}/poseidon`,
            {
                answer: input
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200)
            return response.data;

        console.log('RE: ', response.data)

    }catch (error) {
        console.log(error);
        throw Error();
    }
}
