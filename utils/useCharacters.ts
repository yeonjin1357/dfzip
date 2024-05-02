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

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!server || !name) return;

      if (server === "adven") {
        const response = await fetch(`/api/character?server=adven&adventureName=${name}`, {
          method: "GET",
        });
        const data = await response.json();
        if (response.ok) {
          setCharacters(data);
        } else {
          console.error("Failed to fetch characters:", data.message);
        }
      } else {
        const basicData = await searchCharacters(server, name);
        const charactersWithAvatars = await Promise.all(
          basicData.rows.map(async (char: any) => {
            const avatars = await fetchCharacterAvatars(char.serverId, char.characterId);
            const avatarsImgSrc = `https://img-api.neople.co.kr/df/servers/${char.serverId}/characters/${char.characterId}?zoom=1`;
            return { ...char, avatars, avatarsImgSrc };
          })
        );
        setCharacters(charactersWithAvatars);
        saveCharacter(charactersWithAvatars);
      }
    };

    fetchCharacters();
  }, [server, name]);

  return characters;
};
