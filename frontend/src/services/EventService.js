import { axiosInstance } from "./BaseUrl";
import { Config } from "./Config";


export const postEvent = async (eventData) =>{
    const res = await axiosInstance.post('/events',eventData,Config());
    return res.data;
}