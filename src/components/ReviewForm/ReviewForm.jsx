import { useState } from 'react';

const ReviewForm = ({ handleAddReview }) => {
  const [commentData, setCommentData] = useState({ comment: '', rating: '5' });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddReview(commentData);
    setCommentData({ comment: '', rating: '5' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your review:</label>
      <textarea
        required
        name='comment'
        id='text-input'
        value={commentData.comment}
        onChange={handleChange}
      />

      <label htmlFor='rating-options'>Your Rating:</label>
      <select
        name='rating'
        id='rating-options'
        value={commentData.rating}
        onChange={handleChange}
      >
        <option value='1'>1 Star</option>
        <option value='2'>2 Stars</option>
        <option value='3'>3 Stars</option>
        <option value='4'>4 Stars</option>
        <option value='5'>5 Stars</option>
     </select>

      <button type='submit'>Submit Review</button>
    </form>
  );
};

export default ReviewForm;
