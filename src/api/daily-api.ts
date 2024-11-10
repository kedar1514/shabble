import { API_GAME_STATUS, API_HINT, API_CHECK_GUESS } from "@/constants";
import { axiosSecure } from "./axios";
import { checkGuessResponse, GameStatusResponse, getHintResponse } from "@/types";
    
export const getGameStatus = async (date: string, boardSize: number): Promise<GameStatusResponse> => {
    try {
        const response = await axiosSecure.get(`${API_GAME_STATUS}?date=${date}&boardSize=${boardSize}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching game settings:', error);
        throw error;
    }
}

export const getHint = async (puzzleId: number, x: number, y: number): Promise<getHintResponse> => {
    try {
        const response = await axiosSecure.get(`${API_HINT}?puzzleId=${puzzleId}&x=${x}&y=${y}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching hint:', error);
        throw error;
    }
}

export const checkGuess = async (puzzleId: number, guess: string[][], attempts: number): Promise<checkGuessResponse> => {
    try {
        const response = await axiosSecure.post(`${API_CHECK_GUESS}`, { puzzleId, guess, attempts });
        return response.data;
    } catch (error) {
        console.error('Error checking guess:', error);
        throw error;
    }
}