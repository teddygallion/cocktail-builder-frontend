
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cocktails`;


const getRandom = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/random`);
    return res.json();
  } catch (error) {
    console.error("Error fetching random cocktail:", error);
  }
};


const searchByName = async (cocktailName) => {
  try {
    const res = await fetch(`${BASE_URL}/${cocktailName}`);
    return res.json();
  } catch (error) {
    console.error("Error searching for cocktail:", error);
  }
};

export {
  getRandom,
  searchByName
};
