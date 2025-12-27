"use client";

import Image from "next/image";
import { getCardImage } from "../src/lib/cardUtils";

export default function Card({ card, small = false }: { card: any; small?: boolean }) {
    return (
        <Image
            src={getCardImage(card)}
            alt="card"
            width={small ? 50 : 80}
            height={small ? 75 : 120}
            className="rounded shadow"
        />
    );
}

