import axios from "axios";
import { API_URL } from "../config/apiURL.config";
import { encrypt } from "../service/encrypt.service";

export const signup = async (username, email, password) => {
    try {

        const en_username = encrypt(username);
        const en_email = encrypt(email);
        const en_password = encrypt(password);

        console.log(`Encrypted Data: ${en_username}, ${en_email}, ${en_password}`);

        const response = await axios.post(
            `${API_URL}/signup`, 
            { 
                username: en_username, 
                email: en_email,
                password: en_password
            },
            { header: { "Content-Type": "application/json"} }
        )
        
        const [data, status] = response.data
        if (status === 201) 
            return response.data;

    }catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
}

export const signin = async (email, password) => {
    try {

        const en_email = encrypt(email);
        const en_password = encrypt(password);

        console.log(`Encrypted Data: ${en_email}, ${en_password}`);

        const response = await axios.post(
            `${API_URL}/signin`, 
            { 
                email: en_email,
                password: en_password
            },
            { header: { "Content-Type": "application/json"} }
        )

        if (response.status === 200) {
            const [data, status] = response.data;

            console.log('data:', data);
            console.log('token:', data.token);
            console.log('user:', data.user);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return true;
        }

    } catch (error) {
        console.error("Error during login:", error);

        if (error.response && error.response.data) {
            const errorMessage = error.response.data.detail || "Unknown error";
            alert(errorMessage);
        } else {
            alert("Network error or server not responding.");
        }

        return false;
    }
}
