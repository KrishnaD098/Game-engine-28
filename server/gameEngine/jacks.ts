import { Player } from "../types";

export function hasAllFourJacks(team: Player[]): boolean {
    const jacks = team.flatMap(player =>
        player.hand.filter(card => card.rank === "J")
    );

    return jacks.length === 4;
}