import React, { useState, useEffect } from "react";
import Navi from "./Navi";
import "./ViewBookings.css";
function ViewBooking() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

useEffect(() => {
const fetchBookings = async () => {
try {
const res = await fetch(
`http://localhost:5001/cars?page=${page}&limit=5`
);
const data = await res.json();
console.log(data);
setBookings(data.orders || []);
setPages(data.pages || 1);
} catch (err) {
console.error("Error fetching bookings:", err);
setBookings([]);
}
};
fetchBookings();
}, [page]);
const nextPage = () => {
if (page < pages) setPage(page + 1);
};
const prevPage = () => {
if (page > 1) setPage(page - 1);
};
return (
<>
<Navi />
<div className="view-booking-container">
<h1> All Bookings</h1>
<table className="booking-table">
<thead>
<tr>
<th>Car Title</th>
<th>Passenger Name</th>
<th>Booking Date</th>
<th>Source Location</th>
<th>Drop Location</th>
<th>Pick-Up Time</th>
<th>Drop Time</th>
<th>Status</th>
</tr>
</thead>
<tbody>
{bookings.length > 0 ? (
bookings.map((booking) => (
<tr key={booking._id}>
<td>{booking.carid?.cartitle || "N/A"}</td>
<td>{booking.passengerid?.fullname || "N/A"}</td>
<td>{new Date(booking.bookingdate).toLocaleDateString()}</td>
<td>{booking.sourcelocation || "N/A"}</td>
<td>{booking.destinationlocation || "N/A"}</td>
<td>{booking.pickuptime || "N/A"}</td>
<td>{booking.droptime || "N/A"}</td>
<td>{booking.status || "Confirmed"}</td>
</tr>
))
) : (
<tr>
<td colSpan="8">No bookings found.</td>
</tr>
)}
</tbody>
</table>
<div className="pagination-controls">
<button onClick={prevPage} disabled={page <= 1}>Previous</button>
<span>Pages</span>
<button onClick={nextPage} disabled={page >= pages}>Next</button>
</div>
</div>
</>
);
}
export default ViewBooking;