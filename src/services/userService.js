const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

 const getFavorites = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/favorites`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`, 
          "Content-Type": "application/json",
        },
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching favorite cocktail:", error);
    }
  };

  const addToFavorites = async (userId, cocktailId) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/favorites`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cocktailId, 
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to add to favorites");
      }
  
      const data = await res.json();
      console.log("Added to favorites:", data);
      return data;
  
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
};
const removeFromFavorites = async (userId, cocktailId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/favorites`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cocktailId })
    });

    if (!res.ok) {
      throw new Error("Failed to remove from favorites");
    }

    const data = await res.json();
    console.log("Removed from favorites:", data);
    return data;
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

const getUserCocktails = async (userId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found, please log in again.');
    }

    const res = await fetch(`${BASE_URL}/${userId}/cocktails`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error: ${errorData.message || 'Unknown error'}`);
    }

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error('Error fetching user cocktails:', error);
    return { error: error.message };
  }
};

export {
  index, getFavorites, 
  addToFavorites, getUserCocktails,
  removeFromFavorites,
};
