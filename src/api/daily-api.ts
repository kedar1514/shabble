import { API_DAILY_PUZZLE } from "@/constants/api/api-constants";

export const getDailyPuzzle = async (boardSize: number) => {
    try {
        const response = await fetch(`${API_DAILY_PUZZLE}?boardSize=${boardSize}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching daily puzzle:', error);
        throw error;
    }
}