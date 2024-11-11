import { prisma } from "./db/connect";

export { prisma };

import { 
    coordinatesToBoard,
    getPuzzleNumber
 } from "./utils/puzzle";

export {
    coordinatesToBoard,
    getPuzzleNumber
}

import { validateHintParams } from "./validation/hint-validation";
import { validateGuessCheckParams } from "./validation/guess-check-validation";
import { validateStatusParams } from "./validation/settings-validation";

export { 
    validateHintParams, 
    validateGuessCheckParams,
    validateStatusParams
};