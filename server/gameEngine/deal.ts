import { Card, Player } from "../types";

/**
 * Deals N cards to each player from the deck
 */
export function dealCards(
    players: Player[],
    deck: Card[],
    cardsPerPlayer: number
) {
    for (let round = 0; round < cardsPerPlayer; round++) {
        for (const player of players) {
            const card = deck.shift();
            if (!card) throw new Error("Deck is empty");
            player.hand.push(card);
        }
    }
}
