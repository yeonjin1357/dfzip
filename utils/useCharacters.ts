// utils/data/useCharacters.ts
import { useState, useEffect } from "react";
import { searchCharacters, fetchCharacterAvatars } from "@/lib/api";
import { saveCharacter } from "@/utils/saveCharacter";

interface Character {
  characterId: string;
  characterName: string;
  jobGrowName: string;
  fame: number;
  serverId: string;
  avatars?: any;
  avatarsImgSrc: string;
}

export const useCharacters = (server: string | null, name: string | null) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!server || !name) return;
      setAllImagesLoaded(false); // 새로운 검색이 시작되면 로드 상태를 초기화

      const responseHandler = async (data: any) => {
        // 데이터가 rows 배열을 포함하는지 확인합니다.
        const rows = data.rows || data; // API가 rows 배열 대신 직접 캐릭터 목록을 반환할 수 있으므로 대비
        if (Array.isArray(rows)) {
          const charactersWithAvatars = await Promise.all(
            rows.map(async (char: any) => {
              const avatars = await fetchCharacterAvatars(char.serverId, char.characterId);
              const avatarsImgSrc = `https://img-api.neople.co.kr/df/servers/${char.serverId}/characters/${char.characterId}?zoom=1`;
              return { ...char, avatars, avatarsImgSrc };
            })
          );
          setCharacters(charactersWithAvatars);
          saveCharacter(charactersWithAvatars);
        } else {
          console.error("Unexpected data format:", data);
        }
      };

      if (server === "adven") {
        const response = await fetch(`/api/character?server=adven&adventureName=${name}`, {
          method: "GET",
        });
        const data = await response.json();
        if (response.ok) {
          await responseHandler(data);
        } else {
          console.error("Failed to fetch characters:", data.message);
        }
      } else {
        const basicData = await searchCharacters(server, name);
        await responseHandler(basicData);
      }
    };

    fetchCharacters();
  }, [server, name]);

  useEffect(() => {
    if (characters.length > 0) {
      const images = characters.map((char) => new Image());
      images.forEach((img, index) => {
        img.onload = () => {
          if (images.every((img) => img.complete)) {
            setAllImagesLoaded(true);
          }
        };
        img.src = characters[index].avatarsImgSrc;
      });
    }
  }, [characters]);

  return { characters, allImagesLoaded };
};
