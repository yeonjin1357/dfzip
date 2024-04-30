import axios from "axios";

const api = axios.create({
  baseURL: "https://api.neople.co.kr/df/",
  headers: {
    "API-KEY": "JEgWbNw09w3YM5rOS6pAfczydSty9shk",
  },
});

// 서버 정보 조회
export const fetchServers = async () => {
  const response = await api.get("servers");
  return response.data;
};

// 캐릭터 검색
export const searchCharacters = async (serverId: string, characterName: string) => {
  const response = await api.get(`servers/${serverId}/characters`, {
    params: { characterName },
  });
  return response.data;
};

// 캐릭터 기본 정보 조회
export const fetchCharacterBasicInfo = async (serverId: string, characterId: string) => {
  const response = await api.get(`servers/${serverId}/characters/${characterId}`);
  return response.data;
};

export default api;
