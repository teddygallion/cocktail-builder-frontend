const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reviews`
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const createReview = async ({ cocktail, comment, rating }) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ cocktail, comment, rating }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create review');
    return data.review;
  } catch (error) {
    console.error('createReview error:', error);
    throw error;
  }
};

const getReview = async (reviewId) => {
  try {
    const response = await fetch(`${BASE_URL}/${reviewId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch review');
    return data.review;
  } catch (error) {
    console.error('getReview error:', error);
    throw error;
  }
};


const updateReview = async (reviewId, { comment, rating }) => {
  try {
    const response = await fetch(`${BASE_URL}/${reviewId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ comment, rating }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update review');
    return data.review;
  } catch (error) {
    console.error('updateReview error:', error);
    throw error;
  }
};


const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`${BASE_URL}/${reviewId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete review');
    return data.message;
  } catch (error) {
    console.error('deleteReview error:', error);
    throw error;
  }
};

export {
  createReview, 
  getReview, 
  updateReview, 
  deleteReview,
}