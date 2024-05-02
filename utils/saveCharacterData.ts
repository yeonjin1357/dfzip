export const saveCharacterData = async (characters: any) => {
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
      // console.log("Save response:", data);
    })
  );
};
