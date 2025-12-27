export const MIN_BID = 16;
export const MAX_BID = 28;

/**
 * Validate bid value
 */
export function isValidBid(
    value: number,
    currentBid: number
): boolean {
    return (
        Number.isInteger(value) &&
        value >= MIN_BID &&
        value <= MAX_BID &&
        value > currentBid
    );
}