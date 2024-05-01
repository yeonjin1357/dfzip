"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { searchCharacters, fetchCharacterAvatars, fetchCharacterFame } from "@/lib/api";
import serverNames from "@/utils/data/serverName";
import classes from "./page.module.css";

interface Charcter {
  characterId: string;
  characterName: string;
  jobGrowName: string;
  fame: number;
  serverId: string;
  avatars?: any;
  avatarsImgSrc: any;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const server = searchParams.get("server");
  const name = searchParams.get("name");
  const [characters, setCharacters] = useState<Charcter[]>([]);

  useEffect(() => {
    if (server && name) {
      const fetchCharacters = async () => {
        if (server === "adven") {
          // 모험단 이름으로 필터링된 결과를 가져옴
          const allData = await searchCharacters("all", ""); // 모든 서버에서 모든 캐릭터를 불러옴
          console.log(allData);
        } else {
          const basicData = await searchCharacters(server as string, name as string);
          const charactersWithAvatars = await Promise.all(
            basicData.rows.map(async (char: any) => {
              const avatars = await fetchCharacterAvatars(char.serverId, char.characterId);
              const avatarsImgSrc = `https://img-api.neople.co.kr/df/servers/${char.serverId}/characters/${char.characterId}?zoom=1`;
              return { ...char, avatars, avatarsImgSrc };
            })
          );
          setCharacters(charactersWithAvatars); // 'rows'에 검색 결과가 들어 있다고 가정합니다.
          console.log(charactersWithAvatars);
        }
      };
      fetchCharacters();
    }
  }, [server, name]);

  return (
    <div className={classes.wrap}>
      <ul className={classes.character_list}>
        {characters.map((char) => (
          <li key={char.characterId}>
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

export default SearchPage;
