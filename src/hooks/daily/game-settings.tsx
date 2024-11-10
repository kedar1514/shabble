import { useState, useEffect } from 'react';
import { getGameStatus } from '@/api/daily-api';
import { DEFAULT_BOARD_SIZE, MAX_HINTS } from '@/constants';
import { GameStatusResponse } from '@/types';
import { coordinatesToBoard } from '@/lib';

interface GameSettings {
  puzzleId: number;
  date: string;
  boardSize: keyof typeof MAX_HINTS;
  hints: number;
  board: string[][];
  gameStatus: "playing" | "guessing" | "won" | "lost" | "guess-loading";
}

export function useGameSettings() {
  const [settings, setSettings] = useState<GameSettings>({
    puzzleId: 0,
    date: new Date().toISOString().split('T')[0],
    boardSize: DEFAULT_BOARD_SIZE,
    hints: 0,
    board: [],
    gameStatus: "playing"
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


  return {
    settings,
    updateSettings,
    isLoading,
    error
  };
}
