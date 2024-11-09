import { API_DAILY_PUZZLE, API_HINT, API_CHECK_GUESS } from "@/constants";
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

export const getHint = async (date: string, boardSize: number, x: number, y: number) => {
    try {
        const response = await axiosSecure.get(`${API_HINT}?date=${date}&boardSize=${boardSize}&x=${x}&y=${y}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching hint:', error);
        throw error;
    }
}

export const checkGuess = async (date: string, boardSize: number, guess: string[][], attempts: number) => {
    try {
        const response = await axiosSecure.post(`${API_CHECK_GUESS}`, { date, boardSize, guess, attempts });
        return response.data;
    } catch (error) {
        console.error('Error checking guess:', error);
        throw error;
    }
}