"use client";

import React, { useState } from "react";
import { searchCharacters } from "../lib/api";

import classes from "./page.module.css";

export default function Home() {
  const [input, setInput] = useState("");

  const handleSearch = async () => {
    const data = await searchCharacters("all", input);
    console.log(data); // 검색 결과를 콘솔에 출력
  };

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="캐릭터 이름 입력" />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
