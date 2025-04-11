import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import CocktailList from './components/CocktailList/CocktailList';
import CocktailDetails from './components/CocktailDetails/CocktailDetails.jsx';
import CocktailForm from './components/CocktailForm/CocktailForm';
import CocktailEdit from "./components/CocktailEdit/CocktailEdit"
import CocktailFavorites from './components/CocktailFavorites/CocktailFavorites.jsx';
import * as cocktailService from './services/cocktailService';
import * as userService from './services/userService';

function App() {
  const { user } = useContext(UserContext);
  const [cocktails, setCocktails] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const handleAddCocktail = async (cocktailFormData) => {
    const newCocktail = await cocktailService.create(cocktailFormData);
    setCocktails([newCocktail, ...cocktails]);
    navigate('/cocktails/favorites');
  };

  const handleUpdateCocktail = async (cocktailId, cocktailFormData) => {
    console.log('cocktailId', cocktailId, 'cocktailFormData', cocktailFormData);
    const updatedCocktail = await cocktailService.updateCocktail(cocktailId, cocktailFormData); 
    setCocktails(cocktails.map((cocktail) => (cocktail._id === cocktailId ? updatedCocktail : cocktail)));  
    navigate(`/cocktails/${cocktailId}`);
  };

  const handleDeleteCocktail = async (cocktailId) => {
    const deletedCocktail = await cocktailService.deleteCocktail(cocktailId);
    setCocktails(cocktails.filter((cocktail) => cocktail._id !== deletedCocktail._id));
    navigate('/cocktails/favorites');
  };

  const handleGetFavorites = async () => {
    try {
      const userFavorites = await userService.getFavorites(user._id);
      console.log('Fetched favorites:', userFavorites);
      setFavorites(userFavorites);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setFavorites([]); 
    }
  };

const handleRemoveFavorite = async (cocktailId) => {
  try {
    const updatedFavorites = await userService.removeFromFavorites(user._id, cocktailId);
    if (updatedFavorites) {
      console.log("Updated favorites:", updatedFavorites.favorites); 
      setFavorites(updatedFavorites.favorites);
    } else {
      console.error("Failed to update favorites");
    }
  } catch (error) {
    console.error("Error removing cocktail from favorites", error);
  }
};

  useEffect(() => {
    if (user) {
      handleGetFavorites();
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {
          user ? (
          <>
          <Route path='/cocktails' element={<CocktailList cocktails={cocktails}/>} />
          <Route path='/cocktails/new' element={<CocktailForm handleAddCocktail={handleAddCocktail} />} />
          <Route path='/cocktails/:cocktailId' element={<CocktailDetails handleDeleteCocktail={handleDeleteCocktail} />} />
          <Route path='/favorites' element={<CocktailFavorites favorites={favorites} handleRemoveFavorite={handleRemoveFavorite} />} />
          <Route path='/cocktails/:cocktailId/edit' element={<CocktailEdit handleUpdateCocktail={handleUpdateCocktail} />}/>
          </>
          ) : (
         <>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        </>
          )
        }
      </Routes>
    </>
  );
}

export default App;
