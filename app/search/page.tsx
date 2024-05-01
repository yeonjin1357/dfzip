"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

import { searchCharacters, fetchCharacterAvatars } from "@/lib/api";
import serverNames from "@/utils/data/serverName";
import classes from "./page.module.css";

interface Charcter {
  characterId: string;
  characterName: string;
  jobGrowName: string;
  fame: number;
  serverId: string;
  avatars?: any;
  avatarsImgSrc: string;
}

const SearchPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const server = searchParams.get("server");
  const name = searchParams.get("name");
  const [characters, setCharacters] = useState<Charcter[]>([]);

  const saveCharacterData = async (characters: any) => {
    await Promise.all(
      characters.map(async (char: any) => {
        const response = await fetch("/api/character", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(char),
        });
        const data = await response.json();
        console.log("Save response:", data);
      })
    );
  };

  useEffect(() => {
    if (server && name) {
      const fetchCharacters = async () => {
        if (server === "adven") {
          // 모험단 이름으로 검색
          const response = await fetch(`/api/character?server=adven&adventureName=${name}`, {
            method: "GET",
          });
          const data = await response.json();
          if (response.ok) {
            setCharacters(data); // 검색 결과를 상태에 저장
          } else {
            console.error("Failed to fetch characters:", data.message);
          }
        } else {
          const basicData = await searchCharacters(server as string, name as string);
          const charactersWithAvatars = await Promise.all(
            basicData.rows.map(async (char: any) => {
              const avatars = await fetchCharacterAvatars(char.serverId, char.characterId);
              const avatarsImgSrc = `https://img-api.neople.co.kr/df/servers/${char.serverId}/characters/${char.characterId}?zoom=1`;
              return { ...char, avatars, avatarsImgSrc };
            })
          );
          console.log(charactersWithAvatars);
          setCharacters(charactersWithAvatars);
          saveCharacterData(charactersWithAvatars);
        }
      };
      fetchCharacters();
    }
  }, [server, name]);

  const handleCharacterClick = (serverId: string, characterId: string) => {
    router.push(`/character?server=${serverId}&id=${characterId}`);
  };

  return (
    <div className={classes.wrap}>
      <ul className={classes.character_list}>
        {characters.map((char) => (
          <li key={char.characterId} onClick={() => handleCharacterClick(char.serverId, char.characterId)}>
            <div className={classes.character}>
              <div className={classes.avatars}>
                <Image src={char.avatarsImgSrc} width={250} height={0} alt="아바타 이미지"></Image>
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
                  <p>{char.avatars?.adventureName}</p>
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
