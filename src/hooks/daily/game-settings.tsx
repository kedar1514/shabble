import { useState, useEffect } from 'react';
import { checkGuess, getGameStatus, getHint } from '@/api/daily-api';
import { DEFAULT_BOARD_SIZE, MAX_HINTS } from '@/constants';
import { GameStatusResponse } from '@/types';
import { coordinatesToBoard } from '@/lib';

interface GameSettings {
  puzzleId: number;
  date: string;
  boardSize: keyof typeof MAX_HINTS;
  hints: number;
  board: string[][];
  guess: string[][];
  guessTileCount: number;
  gameStatus: "playing" | "guessing" | "won" | "lost" | "guess-loading";
  stars: number;
}

export function useGameSettings() {
  const [settings, setSettings] = useState<GameSettings>({
    puzzleId: 0,
    date: new Date().toISOString().split('T')[0],
    boardSize: DEFAULT_BOARD_SIZE,
    board: Array.from({ length: DEFAULT_BOARD_SIZE }, () => Array(DEFAULT_BOARD_SIZE).fill('')),
    guess: Array.from({ length: DEFAULT_BOARD_SIZE }, () => Array(DEFAULT_BOARD_SIZE).fill('')),
    guessTileCount: 0,
    hints: 0,
    gameStatus: "playing",
    stars: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  console.log("settings",settings);
  useEffect(() => {
    async function fetchGameSettings() {
      setIsLoading(true);
      setError(null);
      try {
        const data: GameStatusResponse = await getGameStatus(settings.date, settings.boardSize);
        setSettings(prev => ({
          ...prev,
          puzzleId: data.puzzleId,
          hints: data.hintCount,
          board: coordinatesToBoard(data.hintCoordinates, settings.boardSize),
          gameStatus: data.gameStatus
        }));
        if(data.gameStatus === "won"){
          setSettings(prev => ({
            ...prev,
            guess: coordinatesToBoard(data.solutionCoordinates || [], settings.boardSize),
            stars: data.stars || 0
          }));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch game settings'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchGameSettings();
  }, [settings.date, settings.boardSize]);

  const updateSettings = (updates: Partial<GameSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const takeHint = async (x: number, y: number) => {
    if (settings.board[x][y] !== '' || settings.hints >= MAX_HINTS[settings.boardSize]) return;
    
    try {
      updateSettings({ hints: settings.hints + 1 });
      const data = await getHint(settings.puzzleId, x, y);
      const newBoard = [...settings.board];
      newBoard[x][y] = data.adjacentCount.toString();
      updateSettings({ board: newBoard });
      return true;
    } catch (error) {
      console.error('Error fetching hint:', error);
      updateSettings({ hints: settings.hints - 1 });
      return false;
    }
  };

  const makeGuess = async () => {
    try {
      updateSettings({ gameStatus: "guess-loading" });
      const [response,] = await Promise.all([
        checkGuess(settings.puzzleId, settings.guess, settings.hints),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);

      if (response.isCorrect) {
        updateSettings({ 
          board: settings.guess, 
          gameStatus: "won", 
          stars: response.stars 
        });
        return { success: true, won: true };
      }

      updateSettings({ 
        hints: response.hintCount, 
        gameStatus: response.gameStatus,
      });
      
      return { success: true, won: false };
    } catch (error) {
      console.error('Error checking guess:', error);
      return { success: false, won: false };
    }
  };

  const updateGuess = (x: number, y: number, value: string) => {
    const newGuess = [...settings.guess];
    newGuess[x][y] = value;
    updateSettings({ guess: newGuess });
  };


  return {
    settings,
    updateSettings,
    takeHint,
    makeGuess,
    updateGuess,
    isLoading,
    error
  };
}
