import { axiosInstance } from "./BaseUrl";

export const registerUser = async (user) => {
    try {
      const res = await axiosInstance.post('/users/register', user);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("User already exists"); // Pass a specific error message
      }
      throw error; // Pass other errors
    }
  };

export const loginUser = async (userCredentials)=>{
    const res = await axiosInstance.post('/users/login',userCredentials);
    return res.data;
}