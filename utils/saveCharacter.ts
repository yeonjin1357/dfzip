// utils/data/saveCharacter.ts
export const saveCharacter = async (characters: any[]) => {
  const response = await fetch("/api/character", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ characters }),
  });
  const data = await response.json();
  if (!response.ok) {
    console.error("Failed to save character data:", data);
  }
};
