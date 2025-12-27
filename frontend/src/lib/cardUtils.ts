export function getCardImage(card: any) {
    // Hidden card (other players)
    if (card.hidden) {
        // You do NOT have a back.svg, so we reuse any card back style
        // OR you can add a custom back image later
        return "/SVG-cards-1.3/7_of_spades.svg";
    }

    // Suit mapping
    const suitMap: Record<string, string> = {
        "♠": "spades",
        "♥": "hearts",
        "♦": "diamonds",
        "♣": "clubs"
    };

    // Rank mapping
    const rankMap: Record<string, string> = {
        "A": "ace",
        "K": "king",
        "Q": "queen",
        "J": "jack",
        "10": "10",
        "9": "9",
        "8": "8",
        "7": "7"
    };

    const suit = suitMap[card.suit];
    const rank = rankMap[card.rank];

    return `/SVG-cards-1.3/${rank}_of_${suit}.svg`;
}
