import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { show, updateCocktail } from '../../services/cocktailService';
import CocktailForm from '../CocktailForm/CocktailForm';

const CocktailEdit = () => {
  const { cocktailId } = useParams();
  const { user } = useContext(UserContext);
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const result = await show(cocktailId); 
        setCocktail(result);
      } catch (err) {
        setError('Failed to load cocktail');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id && cocktailId) {
      fetchCocktail();
    }
  }, [user, cocktailId]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateCocktail(user._id, cocktailId, updatedData);
     
    } catch (err) {
      console.error('Failed to update cocktail', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!cocktail) return <p>No cocktail found.</p>;

  return <CocktailForm cocktail={cocktail} handleSubmit={handleUpdate} />;
};

export default CocktailEdit;
