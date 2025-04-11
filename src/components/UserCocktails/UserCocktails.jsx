import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext'; 
import { deleteCocktail } from '../../services/cocktailService';
import { getUserCocktails } from '../../services/userService';

const UserCocktails = () => {
  const { user } = useContext(UserContext); 
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const fetchCocktails = async () => {
      try {
        const result = await getUserCocktails(user._id);
        setCocktails(result.cocktails);       
      } catch (err) {
        setError('Failed to load cocktails');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, [user]);

  const handleDeleteCocktail = async (cocktailId) => {
    try {
      await deleteCocktail(user._id, cocktailId);
      setCocktails(cocktails.filter(cocktail => cocktail._id !== cocktailId));
    } catch (err) {
      setError('Failed to delete cocktail');
      console.error(err);
    }
  };

  if (loading) return <p>Loading cocktails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Cocktails</h2>
      {cocktails.length === 0 ? (
        <p>No cocktails created yet.</p>
      ) : (
        <ul>
          {cocktails.map((cocktail) => (
            <li key={cocktail._id}>
              <h3>{cocktail.drinkName}</h3>
              <p>Glass: {cocktail.glass}</p>
              <p>Ingredients:</p>
              <ul>
                {cocktail.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.ingredientName} - {ingredient.amount}
                  </li>
                ))}
              </ul>
              <p>{cocktail.instructions}</p>

              <Link to={`/cocktails/${cocktail._id}/edit`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDeleteCocktail(cocktail._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserCocktails;
