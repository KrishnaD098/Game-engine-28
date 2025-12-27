import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { createDeck, shuffleDeck } from "./gameEngine/deck";
import { dealCards } from "./gameEngine/deal";
import { isAllNonPointer } from "./gameEngine/dismiss";
import { hasAllFourJacks } from "./gameEngine/jacks";
import { sanitizeGameState } from "./gameEngine/sanitize";
import { gameState, resetGame } from "./gameState";
import { isValidBid } from "./gameEngine/bidding";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

const ROOM_ID = "TWENTY_EIGHT_ROOM";

/* ----------------------------------------
   Helper: Send sanitized state to everyone
----------------------------------------- */
function broadcastGameState() {
    gameState.players.forEach(player => {
        const socket = io.sockets.sockets.get(player.id);
        if (!socket) return;

        socket.emit(
            "GAME_STATE",
            sanitizeGameState(gameState, player.id)
        );
    });
}

/* ----------------------------------------
   Helper: Move bidding turn / finish bidding
----------------------------------------- */
function moveToNextBidder() {
    let attempts = 0;

    do {
        gameState.biddingTurnIndex =
            (gameState.biddingTurnIndex + 1) % gameState.players.length;
        attempts++;
    } while (
        gameState.players[gameState.biddingTurnIndex]?.hasPassed === true &&
        attempts < gameState.players.length
        );

    const activePlayers = gameState.players.filter(
        p => p.hasPassed !== true
    );

    // ✅ Everyone passed → dismiss game
    if (activePlayers.length === 0) {
        console.log("All players passed. Game dismissed.");
        resetGame();
        io.to(ROOM_ID).emit("GAME_RESET");
        return;
    }

    // ✅ One bidder left → bidding complete
    if (activePlayers.length === 1 && gameState.currentBidder) {
        console.log("Bidding complete");

        gameState.phase = "DEAL_REMAINING";

        // 🃏 Deal remaining 4 cards
        dealCards(gameState.players, gameState.deck, 4);

        // 👥 Teams: (0 & 2) vs (1 & 3)
        const teamA = [gameState.players[0], gameState.players[2]];
        const teamB = [gameState.players[1], gameState.players[3]];

        // 🔥 Auto-dismiss if all 4 Jacks in one team
        if (hasAllFourJacks(teamA) || hasAllFourJacks(teamB)) {
            console.log("All 4 Jacks in one team → Auto Dismiss");
            resetGame();
            io.to(ROOM_ID).emit("GAME_RESET");
            return;
        }

        gameState.phase = "PLAYING";
        console.log("Remaining cards dealt. Game started.");

        broadcastGameState();
    }
}

/* ----------------------------------------
   Socket.IO
----------------------------------------- */
io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    /* -------- JOIN GAME -------- */
    socket.on("JOIN_GAME", ({ name }) => {
        if (gameState.players.length >= 4) {
            socket.emit("ROOM_FULL");
            return;
        }

        socket.join(ROOM_ID);

        gameState.players.push({
            id: socket.id,
            name,
            hand: []
        });

        // 🔥 When all 4 players join
        if (gameState.players.length === 4) {
            gameState.deck = shuffleDeck(createDeck());
            gameState.phase = "DEAL_INITIAL";

            // Deal initial 4 cards
            dealCards(gameState.players, gameState.deck, 4);

            // Check non-pointer dismiss eligibility
            gameState.players.forEach(player => {
                player.canDismiss = isAllNonPointer(player.hand);
            });

            gameState.phase = "BIDDING";
            gameState.biddingTurnIndex = 0;

            console.log("Initial cards dealt & dismiss eligibility checked");
        }

        broadcastGameState();
    });

    /* -------- DISMISS GAME -------- */
    socket.on("DISMISS_GAME", () => {
        resetGame();
        io.to(ROOM_ID).emit("GAME_RESET");
    });

    /* -------- PLACE BID -------- */
    socket.on("PLACE_BID", ({ value }) => {
        if (gameState.phase !== "BIDDING") return;

        const currentPlayer =
            gameState.players[gameState.biddingTurnIndex];

        if (!currentPlayer || currentPlayer.id !== socket.id) return;

        if (!isValidBid(value, gameState.currentBid)) return;

        gameState.currentBid = value;
        gameState.currentBidder = socket.id;

        gameState.bids.push({
            playerId: socket.id,
            value
        });

        moveToNextBidder();
        broadcastGameState();
    });

    /* -------- PASS BID -------- */
    socket.on("PASS_BID", () => {
        if (gameState.phase !== "BIDDING") return;

        const currentPlayer =
            gameState.players[gameState.biddingTurnIndex];

        if (!currentPlayer || currentPlayer.id !== socket.id) return;

        currentPlayer.hasPassed = true;

        moveToNextBidder();
        broadcastGameState();
    });

    /* -------- DISCONNECT -------- */
    socket.on("disconnect", () => {
        console.log("Player disconnected:", socket.id);

        gameState.players = gameState.players.filter(
            p => p.id !== socket.id
        );

        broadcastGameState();
    });
});

/* ----------------------------------------
   Server Start
----------------------------------------- */
server.listen(4000, () => {
    console.log("Socket server running on port 4000");
});