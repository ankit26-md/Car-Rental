import React, { useState, useEffect } from 'react';
import Navi from './Navi';
import './ViewReview.css'; 

function ViewReview() {
  const [reviews, setReviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [postdate, setPostDate] = useState('');
  const [reviewmessage, setReviewMessage] = useState('');
  const [reviewrate, setReviewRate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const API_URL = 'http://localhost:5001/reviews';

  const fetchReviews = () => {
    fetch(`${API_URL}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.revs && Array.isArray(data.revs)) {
          setReviews(data.revs);
          setTotalPages(data.pages || 1);
        } else {
          setReviews([]);
          setTotalPages(1);
        }
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
        setReviews([]);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

  const handleRemove = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => fetchReviews())
      .catch((err) => console.error('Error deleting review:', err));
  };

  const handleEdit = (review) => {
    setEditId(review._id);
    setPostDate(review.postdate?.slice(0, 10));
    setReviewMessage(review.reviewmessage);
    setReviewRate(review.reviewrate);
  };

  const handleUpdate = () => {
    if (!editId) return;

    const updatedData = {
      postdate,
      reviewmessage,
      reviewrate,
    };

    fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        setEditId(null);
        setPostDate('');
        setReviewMessage('');
        setReviewRate('');
        fetchReviews();
      })
      .catch((err) => console.error('Error updating review:', err));
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      <Navi />
      <div className="review-container">
        <h1>Manage Reviews</h1>

        {editId && (
          <div className="input-group">
            <input
              type="date"
              value={postdate}
              onChange={(e) => setPostDate(e.target.value)}
            />
            <input
              type="text"
              value={reviewmessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              placeholder="Review message"
            />
            <input
              type="text"
              value={reviewrate}
              onChange={(e) => setReviewRate(e.target.value)}
              placeholder="Review rate"
            />
            <button onClick={handleUpdate}>Update Review</button>
          </div>
        )}

        <table className="review-table">
          <thead>
            <tr>
              <th>Passenger</th>
              <th>Car</th>
              <th>Post Date</th>
              <th>Review</th>
              <th>Rate</th>
              <th>Remove</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.passangerid?.fullname || 'Unknown'}</td>
                <td>{review.carid?.cartitle || 'Unknown'}</td>
                <td>{new Date(review.postdate).toLocaleDateString()}</td>
                <td>{review.reviewmessage}</td>
                <td>{review.reviewrate}</td>
                <td><button onClick={() => handleRemove(review._id)}>Remove</button></td>
                <td><button onClick={() => handleEdit(review)}>Edit</button></td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan="7">No reviews found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button onClick={handleNext} disabled={page === totalPages}>Next</button>
        </div>
      </div>
    </>
  );
}

export default ViewReview;
