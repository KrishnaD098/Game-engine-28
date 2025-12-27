"use client";

import Image from "next/image";
import { getCardImage } from "../src/lib/cardUtils";

export default function Card({ card }: { card: any }) {
    return (
        <Image
            src={getCardImage(card)}
            alt="card"
            width={80}
            height={120}
            className="rounded shadow"
        />
    );
}
