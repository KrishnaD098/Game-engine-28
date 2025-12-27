import { Card, Suit, Rank } from "../types";

const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];
const RANKS: Rank[] = ["J", "9", "A", "10", "K", "Q", "8", "7"];

const POINTS_MAP: Record<Rank, number> = {
    J: 3,
    "9": 2,
    A: 1,
    "10": 1,
    K: 0,
    Q: 0,
    "8": 0,
    "7": 0
};

/**
 * Creates a fresh 32-card deck
 */
export function createDeck(): Card[] {
    const deck: Card[] = [];

    for (const suit of SUITS) {
        for (const rank of RANKS) {
            deck.push({
                suit,
                rank,
                points: POINTS_MAP[rank]
            });
        }
    }

    return deck;
}

/**
 * Fisher-Yates shuffle (fair & unbiased)
 */
export function shuffleDeck(deck: Card[]): Card[] {
    const shuffled = [...deck];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}
