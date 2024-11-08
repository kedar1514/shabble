import { API_DAILY_PUZZLE } from "@/constants";
import { axiosSecure } from "./axios";

export const getDailyPuzzle = async (boardSize: number) => {
    try {
        const response = await axiosSecure.get(`${API_DAILY_PUZZLE}?boardSize=${boardSize}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching daily puzzle:', error);
        throw error;
    }
}