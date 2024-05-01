"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchCharacterBasicInfo, fetchCharacterTimeline, fetchCharacterStatus /* other imports */ } from "@/lib/api";

interface CharacterDetails {
  basicInfo: object;
  timeline: object;
  status: object;
}

const CharacterPage = () => {
  const searchParams = useSearchParams();
  const serverId = searchParams.get("server");
  const characterId = searchParams.get("id");
  const [characterDetails, setCharacterDetails] = useState<CharacterDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (serverId && characterId) {
        const basicInfo = await fetchCharacterBasicInfo(serverId, characterId);
        console.log("Basic Info:", basicInfo); // 기본 정보 로그 출력
        const timeline = await fetchCharacterTimeline(serverId, characterId);
        console.log("Timeline:", timeline); // 타임라인 정보 로그 출력
        const status = await fetchCharacterStatus(serverId, characterId);
        console.log("Status:", status); // 능력치 정보 로그 출력
        // More fetch calls...
        setCharacterDetails({ basicInfo, timeline, status });
      }
    };
    fetchData();
  }, [serverId, characterId]);

  return <div>{/* Render character details based on fetched data */}</div>;
};

export default CharacterPage;
