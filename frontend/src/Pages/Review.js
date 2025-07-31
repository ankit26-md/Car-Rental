import React, { useState, useEffect } from 'react';
import './Review.css';
import Navbar from '../Components/Navbar';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [postdate, setPostDate] = useState('');
  const [reviewmessage, setReviewMessage] = useState('');
  const [reviewrate, setReviewRate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const API_URL = 'http://localhost:5001/reviews';
  // Fetch reviews with pagination
  const fetchReviews = () => {
    fetch(`${API_URL}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.revs);
        setTotalPages(data.pages);
      })
      .catch((err) => console.error('Error fetching reviews:', err));
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
    setPostDate(review.postdate);
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
<Navbar />
<div className="review-container">
<h1>Manage Reviews</h1>
{editId && (
<div className="input-group-2">
<input type="date" value={postdate} onChange={(e) => setPostDate(e.target.value)}/>
<input type="text" value={reviewmessage} onChange={(e) => setReviewMessage(e.target.value)} placeholder="Review message"/>
<input type="text" value={reviewrate} onChange={(e) => setReviewRate(e.target.value)} placeholder="Review rate"/>
<button onClick={handleUpdate}>Update Review</button>
</div>
)}
<table className="main-3">
<thead>
<tr>
<th>Post Date</th>
<th>Review</th>
<th>Review Rate</th>
<th>Remove</th>
<th>Edit</th>
</tr>
</thead>
<tbody>
{reviews.map((review) => (
<tr key={review._id}>
<td>{review.postdate}</td>
<td>{review.reviewmessage}</td>
<td>{review.reviewrate}</td>
<td>
<button onClick={() => handleRemove(review._id)}>Remove</button>
</td>
<td><button onClick={() => handleEdit(review)}>Edit</button></td>
</tr>
))}
</tbody>
</table>
<div className="pagination-3">
<button onClick={handlePrevious} disabled={page === 1}>Previous</button>
<span>Page {page} of {totalPages}</span>
<button onClick={handleNext} disabled={page === totalPages}>Next</button>
</div>
</div>
</>
);
}
export default Review;