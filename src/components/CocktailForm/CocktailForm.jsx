import React, { useState, useEffect } from "react";
import styles from "../Form.module.css";
import * as cocktailService from "../../services/cocktailService"; 
import { useNavigate } from "react-router-dom";

const unitOptions = ["oz", "tsp", "tbsp", "ml", "dash", "drop", "cup", "part"];
const glassesArr = ["Highball glass", "Old-fashioned glass", "Cocktail glass", "Copper Mug", "Whiskey Glass", "Collins glass", "Pousse cafe glass", "Champagne flute", "Whiskey sour glass", "Brandy snifter", "White wine glass", "Nick and Nora Glass", "Hurricane glass", "Coffee mug", "Shot glass", "Jar", "Irish coffee cup", "Punch bowl", "Pitcher", "Pint glass", "Cordial glass", "Beer mug", "Margarita/Coupette glass", "Beer pilsner", "Beer Glass", "Parfait glass", "Wine Glass", "Mason jar", "Margarita glass", "Martini Glass", "Balloon Glass", "Coupe Glass"];

const CocktailForm = ({ existingCocktail = null, onSubmitComplete }) => {
  const [cocktailName, setCocktailName] = useState("");
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [directions, setDirections] = useState("");
  const [glass, setGlass] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", amount: "", unit: "oz" }]);
  const navigate = useNavigate();

  useEffect(() => {
    if (existingCocktail) {
      setCocktailName(existingCocktail.drinkName || ""); 
      setDirections(existingCocktail.instructions || "");
      setGlass(existingCocktail.glass || "");

      setIngredients(
        existingCocktail.ingredients?.map((ing) => {
          const [amountVal, unit = "oz"] = ing.amount?.split(" ") || ["", "oz"];
          return {
            name: ing.ingredientName || ing.ingredient?.name || "",
            amount: amountVal,
            unit,
          };
        }) || [{ name: "", amount: "", unit: "oz" }]
      );
    }
  }, [existingCocktail]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/ingredients`);
        const data = await response.json();
        setIngredientOptions(data);
      } catch (err) {
        console.error("Failed to fetch ingredients", err);
      }
    };

    fetchIngredients();
  }, []);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "oz" }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      drinkName: cocktailName,
      instructions: directions,
      glass,
      ingredients: ingredients
        .filter((ing) => ing.name.trim() !== "")
        .map((ing) => {
          const matchedIngredient = ingredientOptions.find(
            (opt) => opt.name.toLowerCase() === ing.name.toLowerCase()
          );

          return {
            ingredient: matchedIngredient?._id,
            ingredientName: ing.name,
            amount: `${ing.amount} ${ing.unit}`.trim(),
          };
        }),
    };

    try {
      const result = existingCocktail && existingCocktail._id
        ? await cocktailService.updateCocktail(existingCocktail._id, formData)
        : await cocktailService.create(formData);

      if (onSubmitComplete) {
        onSubmitComplete(result);
      } else {
        navigate(`/cocktails/${result._id.toString()}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>
          {existingCocktail ? "Edit Cocktail" : "Make Your Own Recipe"}
        </h1>

        <div>
          <label>Cocktail Name</label>
          <input
            type="text"
            value={cocktailName}
            onChange={(e) => setCocktailName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientGroup}>
              <input
                list={`ingredient-options-${index}`}
                placeholder="Ingredient"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                required
              />
              <datalist id={`ingredient-options-${index}`}>
                {ingredientOptions.map((ing, i) => (
                  <option key={i} value={ing.name} />
                ))}
              </datalist>

              <input
                type="number"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                required
              />
              <select
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
              >
                {unitOptions.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>

              <div className={styles.buttonGroup}>
                <button type="button" onClick={() => removeIngredient(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <label>Glassware</label>
          <input
            list="glassware-options"
            value={glass}
            onChange={(e) => setGlass(e.target.value)}
            placeholder="Select or type a glass"
            required
          />
          <datalist id="glassware-options">
            {glassesArr.map((glassOption, index) => (
              <option key={index} value={glassOption} />
            ))}
          </datalist>
        </div>

        <div>
          <label>Directions</label>
          <textarea
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
          <button type="submit">
            {existingCocktail ? "Update Drink" : "Submit Drink"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CocktailForm;
