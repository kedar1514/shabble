import { getGameStatus, updateUserProgress, getUserProgress } from "./game/game";

export {
    getGameStatus,
    updateUserProgress,
    getUserProgress
}

import { getCurrentBoard, getAdjacentCount, checkGuess } from "./game/puzzle";
import { createUser } from "./user/user";

export {
    createUser,
    getCurrentBoard, 
    getAdjacentCount,
    checkGuess
};