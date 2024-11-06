import { fetchBoard } from "@/services/puzzle";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const boardSize = parseInt(searchParams.get('boardSize') || '5');

    const board = await fetchBoard(boardSize);

    return NextResponse.json({ board });
}