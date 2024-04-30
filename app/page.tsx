"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import classes from "./page.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    router.push(`/search?server=all&name=${input}`);
  };

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="캐릭터 이름 입력" />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
