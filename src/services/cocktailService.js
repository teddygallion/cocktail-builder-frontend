const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cocktails`;


const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getRandom = async () => {
    try {
      const res = await fetch(`${BASE_URL}/random`);
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

  const show = async (cocktailId) => {
    try {
      const res = await fetch(`${BASE_URL}/${cocktailId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  return res.json(
  )  } catch (error) {
    console.error("error fetching cocktail details:", error);
    }
  };

const create = async (cocktailFormData) => {
  try {
    const token = localStorage.getItem('token');
    
        if (!token) {
      throw new Error('No token found, please log in again.');
    }

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cocktailFormData),
    });

        if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error: ${errorData.message || 'Unknown error'}`);
    }

        const data = await res.json();


    return data; 
  } catch (error) {
    console.error('Error creating cocktail:', error);
        return { error: error.message };    }
};
  
  const deleteCocktail = async (cocktailId) => {
    try {
      const res = await fetch(`${BASE_URL}/${cocktailId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCocktail = async (cocktailId, cocktailFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${cocktailId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cocktailFormData),
      });
      return res.json();
    } catch (error) {
      console.error(error);
    }
  };

  export { 
    index, show, create,
    searchByName, getRandom, 
    deleteCocktail, updateCocktail
  };
  
  