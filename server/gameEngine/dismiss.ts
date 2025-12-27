import { Card } from "../types";

const NON_POINTER_RANKS = ["K", "Q", "8", "7"];

/**
 * Returns true if all cards are non-pointers
 */
export function isAllNonPointer(cards: Card[]): boolean {
    if (cards.length !== 4) return false;

    return cards.every(card =>
        NON_POINTER_RANKS.includes(card.rank)
    );
}
