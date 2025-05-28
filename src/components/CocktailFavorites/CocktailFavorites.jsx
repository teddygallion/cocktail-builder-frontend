import React from 'react';
import { Link } from 'react-router-dom';

const CocktailFavorites = ({ favorites, handleRemoveFavorite }) => {
  console.log("Current favorites:", favorites);  
  return (
    <ul>
      {favorites.map((fav, index) => (
        <li key={index}>
          <Link to={`/cocktails/${fav._id}`}>
            <img src={fav.image} alt={fav.drinkName} width="100" />
            <p>{fav.drinkName}</p>
          </Link>
          <button onClick={() => handleRemoveFavorite(fav._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default CocktailFavorites;
