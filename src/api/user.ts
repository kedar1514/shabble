import { axiosOpen } from "./axios";
import { API_NEW_USER } from "@/constants";

export const getUserId = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        try {
            const response = await axiosOpen.put(API_NEW_USER);
            localStorage.setItem("userId", response.data.userId);
            return response.data.userId;
        } catch (error) {
            console.error("Failed to get userId:", error);
            throw error;
        }
    }
    return userId;
}