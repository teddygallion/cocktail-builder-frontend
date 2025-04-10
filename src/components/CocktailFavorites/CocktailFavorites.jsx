import React from 'react';

const CocktailFavorites = ({ favorites }) => (
    <ul>
      {favorites.map(fav => (
        <li key={fav.id}>
          <img src={fav.image} alt={fav.name} width="100" />
          <p>{fav.name}</p>
        </li>
      ))}
    </ul>
  );
  

export default CocktailFavorites;