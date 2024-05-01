// app/routes/api/characters.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Character from "@/models/character";

export async function GET(req: NextRequest) {
  await connectDB();
  const server = req.nextUrl.searchParams.get("server");
  const adventureName = req.nextUrl.searchParams.get("adventureName");

  if (server === "adven" && adventureName) {
    try {
      const characters = await Character.find({
        "avatars.adventureName": { $regex: new RegExp(adventureName as string, "i") }, // adventureName으로 내부 객체 검색
      });
      return NextResponse.json(characters, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  const characterData = await req.json();
  console.log(characterData);

  try {
    // findOneAndUpdate를 사용하여 데이터가 이미 존재하면 업데이트, 존재하지 않으면 새로운 데이터 추가
    const character = await Character.findOneAndUpdate(
      { characterId: characterData.characterId }, // 조건: characterId가 일치하는 문서를 찾음
      characterData, // 업데이트할 데이터
      {
        new: true, // 업데이트된 문서를 반환
        upsert: true, // 문서가 없는 경우 새로 생성
        setDefaultsOnInsert: true, // 새로 생성시 기본값 설정
      }
    );
    return NextResponse.json({ success: true, data: character }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
