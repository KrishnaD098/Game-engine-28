import { GameState } from "./types";

export const gameState: GameState = {
    phase: "WAITING",
    players: [],
    deck: [],
    bids: [],
    currentBid: 0,
    currentBidder: null,
    biddingTurnIndex: 0,
    trump: null
};

export function resetGame() {
    gameState.phase = "WAITING";
    gameState.players = [];
    gameState.deck = [];
    gameState.bids = [];
    gameState.currentBid = 0;
    gameState.currentBidder = null;
    gameState.biddingTurnIndex = 0;
    gameState.trump = null;
}