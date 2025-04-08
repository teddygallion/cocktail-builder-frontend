import React, { useState } from 'react';

const unitOptions = ['oz', 'tsp', 'tbsp', 'ml', 'dash', 'drop', 'cup', 'part'];

export default function CocktailForm() {
  const [cocktailName, setCocktailName] = useState('');
  const [directions, setDirections] = useState('');
  const [ingredients, setIngredients] = useState([
    { name: '', amount: '', unit: 'oz' },
  ]);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: 'oz' }]);
  };

  const removeIngredient = (index) => {
    const filtered = ingredients.filter((_, i) => i !== index);
    setIngredients(filtered);
  };
 const joinIngredients = (index) => {
  const ingredient = ingredients[index];
  console.log(`${ingredient.name} : ${ingredient.amount} ${ingredient.unit}`);
};

  return (
    <form>
      <div>
        <label>Cocktail Name</label>
        <input
          type="text"
          value={cocktailName}
          onChange={(e) => setCocktailName(e.target.value)}
        />
      </div>

      <div>
        <label>Directions</label>
        <textarea
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
        />
      </div>

      <div>
        <label>Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Ingredient"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, 'name', e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Amount"
              value={ingredient.amount}
              onChange={(e) =>
                handleIngredientChange(index, 'amount', e.target.value)
              }
            />
            <select
              value={ingredient.unit}
              onChange={(e) =>
                handleIngredientChange(index, 'unit', e.target.value)
              }
            >
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
             <button type ="button" onClick={() => joinIngredients(index)}> press ME! </button>
            <button type="button" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button">
          Add Ingredient
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
