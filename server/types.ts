export type GamePhase =
    | "WAITING"
    | "DEAL_INITIAL"
    | "BIDDING"
    | "DEAL_REMAINING"
    | "PLAYING"
    | "SCORING";

export type Suit = "♠" | "♥" | "♦" | "♣";

export type Rank = "J" | "9" | "A" | "10" | "K" | "Q" | "8" | "7";

export interface Card {
    suit: Suit;
    rank: Rank;
    points: number;
}

export interface Player {
    id: string;
    name: string;
    hand: Card[];
    canDismiss?: boolean;
    hasPassed?: boolean;
}

export interface GameState {
    phase: GamePhase;
    players: Player[];
    deck: Card[];
    bids: {
        playerId: string;
        value: number;
    }[];
    currentBid: number;
    currentBidder: string | null;
    biddingTurnIndex: number;
    trump: Suit | null;
}

