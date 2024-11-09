import { getAdjacentCount, getCurrentBoard } from "@/services";
import { NextResponse } from "next/server";
import { validateHintParams } from "@/lib";

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const userId = request.headers.get('userId');

        const { isValid, errors, data } = validateHintParams(searchParams, userId);
        if (!isValid) {
            return NextResponse.json({ errors }, { status: 400 });
        }
        console.log("data in hint route", data);

        const { date, boardSize, x, y } = data;

        const currentBoard = await getCurrentBoard(date, boardSize);
        const adjacentCount = getAdjacentCount(currentBoard, boardSize, x, y);

        return NextResponse.json({ adjacentCount });
    } catch (error) {
        console.error("Error fetching hint:", error);
        return NextResponse.json({ error: "Error fetching hint" }, { status: 500 });
    }

}