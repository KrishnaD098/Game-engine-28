"use client";

import Card from "./Card";

export default function Table({ gameState }: { gameState: any }) {
    if (!gameState || gameState.players.length < 4) {
        return (
            <div className="text-white text-center">
                Waiting for players…
            </div>
        );
    }

    const [p0, p1, p2, p3] = gameState.players;

    return (
        <div className="relative w-full h-[600px] bg-green-700 rounded-xl">

            {/* TOP PLAYER */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
                {p1.hand.map((card: any, i: number) => (
                    <Card key={i} card={card} small />
                ))}
            </div>

            {/* LEFT PLAYER */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 rotate-90 flex gap-2">
                {p0.hand.map((card: any, i: number) => (
                    <Card key={i} card={card} small />
                ))}
            </div>

            {/* RIGHT PLAYER */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 flex gap-2">
                {p2.hand.map((card: any, i: number) => (
                    <Card key={i} card={card} small />
                ))}
            </div>

            {/* BOTTOM PLAYER (YOU) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {p3.hand.map((card: any, i: number) => (
                    <Card key={i} card={card} />
                ))}
            </div>

            {/* CENTER PLAY AREA */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 border-2 border-white/40 rounded-lg" />
            </div>
        </div>
    );
}
