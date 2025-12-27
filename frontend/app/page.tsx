"use client";

import { useEffect, useState } from "react";
import { socket } from "../src/lib/socket";
import Table from "../components/Table";

export default function Home() {
    const [connected, setConnected] = useState(false);
    const [gameState, setGameState] = useState<any>(null);

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            setConnected(true);
        });

        socket.on("GAME_STATE", (state) => {
            setGameState(state);
        });

        socket.on("GAME_RESET", () => {
            setGameState(null);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, []);

    const joinGame = () => {
        socket.emit("JOIN_GAME", { name: "Player" });
    };

    return (
        <main className="min-h-screen bg-green-800 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-white mb-4">
                Game Engine 28
            </h1>

            {!gameState && (
                <button
                    onClick={joinGame}
                    disabled={!connected}
                    className="px-4 py-2 bg-black text-white rounded mb-4"
                >
                    Join Game
                </button>
            )}

            {gameState && (
                <div className="w-full max-w-5xl">
                    <Table gameState={gameState} />
                </div>
            )}
        </main>
    );
}
