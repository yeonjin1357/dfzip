"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Select from "react-select";

import classes from "./page.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [server, setServer] = useState({ value: "all", label: "전체" });
  const router = useRouter();

  const handleSearch = async (event: any) => {
    event.preventDefault();
    router.push(`/search?server=${server.value}&name=${input}`);
  };

  const serverOptions = [
    { value: "all", label: "전체" },
    { value: "adven", label: "모험단" },
    { value: "cain", label: "카인" },
    { value: "diregie", label: "디레지에" },
    { value: "bakal", label: "바칼" },
    { value: "hilder", label: "힐더" },
    { value: "siroco", label: "시로코" },
    { value: "prey", label: "프레이" },
    { value: "casillas", label: "카시야스" },
    { value: "anton", label: "안톤" },
  ];

  return (
    <div className={classes.wrap}>
      <div className={classes.banner}></div>
      <div className={classes.main_box}>
        <div className={classes.logo}>
          <Image src="/images/logow.svg" width={240} height={0} alt="로고 이미지"></Image>
        </div>
        <form onSubmit={handleSearch} className={classes.search_box}>
          <Select options={serverOptions} value={server} onChange={setServer} className={classes.select} />
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="캐릭터 이름 입력" />
          <button type="submit">
            <Image src="/icons/search_icon.svg" width={30} height={0} alt="로고 이미지"></Image>
          </button>
        </form>
      </div>
    </div>
  );
}
