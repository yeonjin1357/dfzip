import axios from "axios";

const api = axios.create({
  baseURL: "/api", // 이제 요청은 Next.js 서버를 통해 간접적으로 전송됩니다
  params: {
    // 기본 파라미터로 apikey 추가
    apikey: "JEgWbNw09w3YM5rOS6pAfczydSty9shk",
  },
});

// 서버 정보 조회
export const fetchServers = async () => {
  return (await api.get(`servers`)).data;
};

// 캐릭터 검색
export const searchCharacters = async (serverId: string, characterName: string) => {
  return (
    await api.get(`servers/${serverId}/characters`, {
      params: { characterName },
    })
  ).data;
};

// 캐릭터 기본 정보 조회
export const fetchCharacterBasicInfo = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}`)).data;
};

// 캐릭터 타임라인 정보 조회
export const fetchCharacterTimeline = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/timeline`)).data;
};

// 캐릭터 능력치 정보 조회
export const fetchCharacterStatus = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/status`)).data;
};

// 캐릭터 장착 장비 조회
export const fetchCharacterEquipment = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/equip/equipment`)).data;
};

// 캐릭터 장착 아바타 조회
export const fetchCharacterAvatars = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/equip/avatar`)).data;
};

// 캐릭터 장착 크리쳐 조회
export const fetchCharacterCreatures = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/equip/creature`)).data;
};

// 캐릭터 장착 휘장 조회
export const fetchCharacterFlags = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/equip/flag`)).data;
};

// 캐릭터 장착 탈리스만 조회
export const fetchCharacterTalismans = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/equip/talisman`)).data;
};

// 캐릭터 장비 특성 조회
export const fetchCharacterEquipmentTrait = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/equip/equipment-trait`)).data;
};

// 캐릭터 스킬 스타일 조회
export const fetchCharacterSkillStyle = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/skill/style`)).data;
};

// 캐릭터 버프 스킬 강화 장착 장비 조회
export const fetchCharacterBuffEquipEquipment = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/skill/buff/equip/equipment`)).data;
};

// 캐릭터 버프 스킬 강화 장착 아바타 조회
export const fetchCharacterBuffEquipAvatar = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/skill/buff/equip/avatar`)).data;
};

// 캐릭터 버프 스킬 강화 장착 크리쳐 조회
export const fetchCharacterBuffEquipCreature = async (serverId: string, characterId: string) => {
  return (await api.get(`servers/${serverId}/characters/${characterId}/skill/buff/equip/creature`)).data;
};

// 캐릭터 명성 검색
export const fetchCharacterFame = async (serverId: string) => {
  return (await api.get(`servers/${serverId}/characters-fame`)).data;
};

// 경매장 등록 아이템 검색
export const searchAuctionItems = async (queryParams: any) => {
  return (await api.get(`auction`, { params: queryParams })).data;
};

// 경매장 등록 아이템 조회
export const fetchAuctionItem = async (auctionNo: string) => {
  return (await api.get(`auction/${auctionNo}`)).data;
};

// 경매장 시세 검색
export const searchAuctionSoldItems = async (queryParams: any) => {
  return (await api.get(`auction-sold`, { params: queryParams })).data;
};

// 아바타 마켓 상품 검색
export const searchAvatarMarketItems = async (queryParams: any) => {
  return (await api.get(`avatar-market/sale`, { params: queryParams })).data;
};

// 아바타 마켓 상품 조회
export const fetchAvatarMarketItem = async (goodsNo: string) => {
  return (await api.get(`avatar-market/sale/${goodsNo}`)).data;
};

// 아바타 마켓 상품 시세 검색
export const searchAvatarMarketSoldItems = async (queryParams: any) => {
  return (await api.get(`avatar-market/sold`, { params: queryParams })).data;
};

// 아바타 마켓 상품 시세 조회
export const fetchAvatarMarketSoldItem = async (goodsNo: string) => {
  return (await api.get(`avatar-market/sold/${goodsNo}`)).data;
};

// 아바타 마켓 해시태그 조회
export const fetchAvatarMarketHashtags = async () => {
  return (await api.get(`avatar-market/hashtag`)).data;
};

// 아이템 검색
export const searchItems = async (queryParams: any) => {
  return (await api.get(`items`, { params: queryParams })).data;
};

// 아이템 상세 정보 조회
export const fetchItemDetails = async (itemId: string) => {
  return (await api.get(`items/${itemId}`)).data;
};

// 아이템 상점 판매 정보 조회
export const fetchItemShopInfo = async (itemId: string) => {
  return (await api.get(`items/${itemId}/shop`)).data;
};

// 아이템 해시태그 조회
export const fetchItemHashtags = async () => {
  const response = await api.get(`item-hashtag`);
  return response.data;
};

// 세트 아이템 검색
export const searchSetItems = async () => {
  const response = await api.get(`setitems`);
  return response.data;
};

// 세트 아이템 상세 정보 조회
export const fetchSetItemDetails = async (setItemId: string) => {
  const response = await api.get(`setitems/${setItemId}`);
  return response.data;
};

// 장비 조합 세트 아이템 활성화 정보 조회
export const fetchCustomEquipmentSetItems = async () => {
  const response = await api.get(`custom/equipment/setitems`);
  return response.data;
};

// 직업 정보 조회
export const fetchJobs = async () => {
  const response = await api.get(`jobs`);
  return response.data;
};

// 직업별 스킬 리스트 조회
export const fetchSkillsByJob = async (jobId: string) => {
  const response = await api.get(`skills/${jobId}`);
  return response.data;
};

// 직업별 스킬 상세 정보 조회
export const fetchSkillDetails = async (jobId: string, skillId: string) => {
  const response = await api.get(`skills/${jobId}/${skillId}`);
  return response.data;
};

export default api;
