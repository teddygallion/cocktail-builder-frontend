import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as cocktailService from '../../services/cocktailService';
import * as reviewService from '../../services/reviewService';
import ReviewForm from '../ReviewForm/ReviewForm';

const CocktailDetails = (props) => {
    const [cocktail, setCocktail] = useState(null);
    const { cocktailId } = useParams();
    const { user } = useContext(UserContext);
    console.log('cocktail ID', cocktailId);

    // Handle adding a review
    const handleAddReview = async (reviewFormData) => {
        if (!cocktailId) {
            console.error("cocktailId is missing");
            return;
        }

        if (!user) {
            console.error("User is not logged in");
            return; 
        }
        
        console.log('Submitting review:', {
            cocktail: cocktailId,
            comment: reviewFormData.comment,
            rating: reviewFormData.rating
        });

        try {
            const newReview = await reviewService.createReview({
                cocktail: cocktailId,
                comment: reviewFormData.comment,
                rating: reviewFormData.rating
            });

            setCocktail(prev => ({
                ...prev,
                reviews: [...prev.reviews, newReview]
            }));
        } catch (error) {
            console.error("Failed to add review:", error);
        }
    };

    // Fetch cocktail details and reviews
    useEffect(() => {
        const fetchCocktail = async () => {
            const cocktailData = await cocktailService.show(cocktailId);
            setCocktail(cocktailData);
            console.log("Fetched Cocktail:", cocktailData);  // Debugging line
        }
        fetchCocktail();
    }, [cocktailId]);

    if (!cocktail) return <main>Loading...</main>

    return (
        <main>
            <section>
                <header>
                    <h1>{cocktail.drinkName}</h1>
                    <img src={cocktail.image} alt={cocktail.drinkName} />
                    <p>{cocktail.instructions}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        {cocktail.ingredients.map((ingredient) => (
                            <li key={ingredient._id}>
                                {ingredient.ingredientName}: {ingredient.amount}
                            </li>
                        ))}
                    </ul>
                    {/* Show edit/delete options only for the creator */}
                    {cocktail.creator._id === user._id && (
                        <>
                            <Link to={`/cocktails/${cocktailId}/edit`}>Edit</Link>
                            <button onClick={() => props.handleDeleteCocktail(cocktailId)}>
                                Delete drink
                            </button>
                        </>
                    )}
                </header>
            </section>

            <section>
                <h2>Reviews</h2>
                <ReviewForm handleAddReview={handleAddReview} />

                {/* Render each review */}
                {cocktail.reviews && cocktail.reviews.length > 0 ? (
                    cocktail.reviews.map((review) => {
                        console.log("Review structure:", review);  // Debugging line
                        return (
                            <div key={review._id}>
                                <p>{review.comment}</p>
                                <p>{review.rating} stars</p>
                                <p>{review.author?.username}</p>
                                <p>
                                    {`${review.author?.username} posted on ${new Date(review.createdAt).toLocaleDateString()}`}
                                </p>
                                {/* Only allow deleting if the user is the author of the review */}
                                {review.author?._id === user._id && (
                                    <>
                                        <button onClick={() => props.handleDeleteReview(review._id)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>No reviews yet.</p>
                )}
            </section>
        </main>
    );
};

export default CocktailDetails;
