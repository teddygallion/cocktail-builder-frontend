import React from 'react';

const CocktailFavorites = ({ favorites, handleRemoveFavorite }) => {
  console.log("Current favorites:", favorites);  
  return (
    <ul>
      {favorites.map((fav, index) => (
        <li key={index}>
          <img src={fav.image} alt={fav.drinkName} width="100" />
          <p>{fav.drinkName}</p>
          <button onClick={() => handleRemoveFavorite(fav._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default CocktailFavorites;
