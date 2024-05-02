// app/character/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { useCharacters } from "@/utils/useCharacters";
import serverNames from "@/utils/data/serverName";
import classes from "./page.module.css";

const SearchPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const server = searchParams.get("server");
  const name = searchParams.get("name");
  const characters = useCharacters(server, name);

  const handleCharacterClick = (serverId: string, characterId: string) => {
    router.push(`/character?server=${serverId}&id=${characterId}`);
  };

  const handleAdventureSearch = (event: React.MouseEvent<HTMLParagraphElement>, adventureName: string) => {
    event.stopPropagation();
    router.push(`/search?server=adven&name=${adventureName}`);
  };

  return (
    <div className={classes.wrap}>
      <ul className={classes.character_list}>
        {characters.map((char) => (
          <li key={char.characterId} onClick={() => handleCharacterClick(char.serverId, char.characterId)}>
            <div className={classes.character}>
              <div className={classes.avatars}>
                <Image src={char.avatarsImgSrc} width={250} height={0} placeholder="blur" blurDataURL={char.avatarsImgSrc} alt="아바타 이미지"></Image>
              </div>
              <div className={classes.info}>
                <div className={classes.fame}>
                  <Image src="/icons/fame.png" width={20} height={0} alt="명성 아이콘"></Image>
                  <p>{char.fame ? char.fame : 0}</p>
                </div>
                <div className={classes.name}>
                  <p>{char.characterName}</p>
                </div>
                <div className={classes.adventure}>
                  <p onClick={(event) => handleAdventureSearch(event, char.avatars?.adventureName)}>{char.avatars?.adventureName}</p>
                </div>
                <div className={classes.sub_info}>
                  <p className={classes.job}>{char.jobGrowName}</p>
                  <p className={classes.server}>{serverNames[char.serverId] || char.serverId}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
