import { GameState } from "../types";

export function sanitizeGameState(
    gameState: GameState,
    socketId: string
) {
    return {
        ...gameState,
        players: gameState.players.map(player => {
            if (player.id === socketId) {
                // ✅ Player sees own hand
                return player;
            }

            // ❌ Other players' cards hidden
            return {
                ...player,
                hand: player.hand.map(() => ({ hidden: true }))
            };
        })
    };
}