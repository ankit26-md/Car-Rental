import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import './Hist.css';

function Hist() {
  const [bookings, setBookings] = useState([]);
  const [passengerId, setPassengerId] = useState('');
  const [reviewForms, setReviewForms] = useState({});
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('passenger');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPassengerId(parsed._id || parsed.id);
      } catch (err) {
        console.error('Error parsing passenger:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (!passengerId) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5001/cars?passengerid=${passengerId}`);
        const data = await res.json();
        setBookings(data.orders || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, [passengerId]);

  useEffect(() => {
    if (!passengerId || bookings.length === 0) return;

    const fetchReviews = async () => {
      setLoadingReviews(true);
      try {
        const res = await fetch(`http://localhost:5001/reviews?passangerid=${passengerId}`);
        const data = await res.json();

        const revMap = {};
        data.revs.forEach(r => {
          revMap[r.carid?._id || r.carid] = r;
        });

        const forms = {};
        bookings.forEach(b => {
          const review = revMap[b.carid?._id];
          forms[b._id] = review
            ? {
                id: review._id,
                reviewrate: review.reviewrate,
                reviewmessage: review.reviewmessage,
              }
            : { reviewrate: 0, reviewmessage: '' };
        });
        setReviewForms(forms);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [passengerId, bookings]);

  const handleReviewChange = (bookingId, field, value) => {
    setReviewForms(prev => ({
      ...prev,
      [bookingId]: {
        ...prev[bookingId],
        [field]: value,
      },
    }));
  };

  const submitReview = async (booking) => {
    const form = reviewForms[booking._id];
    if (!form) return alert('No review data found');

    if (form.reviewrate < 1 || form.reviewrate > 5) return alert('Rating must be between 1 and 5');
    if (!form.reviewmessage.trim()) return alert('Review message cannot be empty');

    try {
      let res;
      if (form.id) {
        res = await fetch(`http://localhost:5001/reviews/${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            carid: booking.carid._id,
            passangerid: passengerId,
            reviewrate: form.reviewrate,
            reviewmessage: form.reviewmessage,
          }),
        });
      } else {
        res = await fetch(`http://localhost:5001/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            carid: booking.carid._id,
            passangerid: passengerId,
            reviewrate: form.reviewrate,
            reviewmessage: form.reviewmessage,
          }),
        });
      }
      const json = await res.json();
      if (res.ok) {
        alert('Review saved!');
        setReviewForms(prev => ({
          ...prev,
          [booking._id]: {
            ...prev[booking._id],
            id: json._id,
          },
        }));
      } else {
        alert('Failed to save review: ' + (json.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting review');
    }
  };

  const cancelBooking = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/cars/cancel/${id}`, {
        method: 'PUT',
      });
      const result = await res.json();
      if (result.success) {
        setBookings(prev =>
          prev.map(b => (b._id === id ? { ...b, status: 'Cancelled' } : b))
        );
      } else {
        alert('Cancel failed');
      }
    } catch (err) {
      alert('Cancel request failed');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="history-page">
        <h2>📜 Your Booking History</h2>

        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map(b => (
            <div key={b._id} className="booking-box">
              <h3>{b.carid?.cartitle || 'Unknown Car'}</h3>
              <p><b>Category:</b> {b.catid?.catname || 'N/A'}</p>
              <p><b>Date:</b> {new Date(b.bookingdate).toLocaleDateString()}</p>
              <p><b>Route:</b> {b.sourcelocation} → {b.destinationlocation}</p>
              <p><b>Status:</b> <b>{b.status}</b></p>
              {b.status !== 'Cancelled' && (
                <button className="cancel-btn" onClick={() => cancelBooking(b._id)}>
                  Cancel Booking
                </button>
              )}

              <div className="review-section">
                <h4>Review</h4>
                {loadingReviews ? (
                  <p>Loading review...</p>
                ) : (
                  <>
                    <label>
                      Rating (1 to 5):
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={reviewForms[b._id]?.reviewrate || ''}
                        onChange={e => handleReviewChange(b._id, 'reviewrate', parseInt(e.target.value))}
                      />
                    </label>
                    <label>
                      Message:
                      <textarea
                        rows="3"
                        value={reviewForms[b._id]?.reviewmessage || ''}
                        onChange={e => handleReviewChange(b._id, 'reviewmessage', e.target.value)}
                      />
                    </label>
                    <button className="submit-btn" onClick={() => submitReview(b)}>Submit Review</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Hist;
