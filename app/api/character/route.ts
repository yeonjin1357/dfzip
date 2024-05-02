// app/routes/api/character/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Character from "@/models/character";

// GET 요청을 처리하는 함수입니다. 클라이언트로부터 캐릭터 검색 요청을 받아 데이터베이스에서 해당 캐릭터를 검색합니다.
export async function GET(req: NextRequest) {
  await connectDB(); // MongoDB 데이터베이스에 연결합니다.

  // 요청 URL에서 필요한 쿼리 파라미터를 추출합니다.
  const server = req.nextUrl.searchParams.get("server");
  const name = req.nextUrl.searchParams.get("name");
  const adventureName = req.nextUrl.searchParams.get("adventureName");

  // 모험단 이름으로 검색하는 경우
  if (server === "adven" && adventureName) {
    try {
      // 정확한 일치를 위한 정규 표현식을 사용합니다.
      const regex = new RegExp(`^${adventureName}$`, "i");
      const characters = await Character.find({ "avatars.adventureName": regex });
      return NextResponse.json(characters, { status: 200 });
    } catch (error) {
      console.error("Failed to fetch characters:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
    // 캐릭터 이름으로 검색하는 경우
  } else if (server && name) {
    try {
      const regex = new RegExp(`^${name}`, "i");
      const characters = await Character.find({ serverId: server, characterName: regex });
      return NextResponse.json({ rows: characters }, { status: 200 });
    } catch (error) {
      console.error("Failed to fetch characters:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
    // 요청이 잘못된 경우
  } else {
    return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
  }
}

// POST 요청을 처리하는 함수입니다. 캐릭터 데이터를 데이터베이스에 저장합니다.
export async function POST(req: NextRequest) {
  await connectDB(); // MongoDB 데이터베이스에 연결합니다.
  const { characters } = await req.json(); // 요청 본문에서 캐릭터 데이터를 추출합니다.

  try {
    // 캐릭터 데이터를 데이터베이스에 저장하거나 업데이트합니다. 모든 작업이 완료되면 결과를 반환합니다.
    const updatedCharacters = await Promise.all(
      characters.map(async (characterData: any) => {
        const character = await Character.findOneAndUpdate({ characterId: characterData.characterId }, characterData, { new: true, upsert: true });
        return character;
      })
    );

    return NextResponse.json({ success: true, data: updatedCharacters }, { status: 201 });
  } catch (error) {
    console.error("Failed to save character data:", error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ success: false, error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
