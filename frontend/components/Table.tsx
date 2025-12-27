"use client";

import Card from "./Card";

export default function Table({ gameState }: { gameState: any }) {
    if (!gameState || gameState.players.length < 4) {
        return <p className="text-white">Waiting for players…</p>;
    }

    const players = gameState.players;

    return (
        <div className="relative w-full h-[600px] bg-green-700 rounded-xl">

            {/* TOP PLAYER */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
                {players[1].hand.map((card: any, i: number) => (
                    <Card key={i} card={card} />
                ))}
            </div>

            {/* LEFT PLAYER */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex gap-2 rotate-90">
                {players[0].hand.map((card: any, i: number) => (
                    <Card key={i} card={card} />
                ))}
            </div>

            {/* RIGHT PLAYER */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2 rotate-90">
                {players[2].hand.map((card: any, i: number) => (
                    <Card key={i} card={card} />
                ))}
            </div>

            {/* BOTTOM PLAYER (YOU) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {players[3].hand.map((card: any, i: number) => (
                    <Card key={i} card={card} />
                ))}
            </div>
        </div>
    );
}