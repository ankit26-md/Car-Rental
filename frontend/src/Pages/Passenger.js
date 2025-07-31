import React, { useState, useEffect } from 'react';
import './Passenger.css';
import Navbar from '../Components/Navbar';
function Passenger() {
  const [passengers, setPassengers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const API_URL = 'http://localhost:5001/customers';
  const fetchPassengers = () => {
    fetch(`${API_URL}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setPassengers(data.passengers);
        setTotalPages(data.pages);
      })
      .catch((err) => console.error('Error fetching passengers:', err));
  };

  useEffect(() => {
    fetchPassengers();
  }, [page]);

  const handleBlock = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/block/${id}`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to block');
      const updated = await res.json();
      setPassengers((prev) =>
        prev.map((p) => (p._id === id ? { ...p, block: updated.block } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnblock = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/unblock/${id}`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to unblock');
      const updated = await res.json();
      setPassengers((prev) =>
        prev.map((p) => (p._id === id ? { ...p, block: updated.block } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

return (
<>
<Navbar />
<div className="passenger-container">
<h1>Passenger Details</h1>
<table className="main-1">
<thead>
 <tr>
<th>Email</th>
<th>Password</th>
<th>Full Name</th>
<th>Mobile No</th>
<th>Date of Birth</th>
<th>Address</th>
<th>Location</th>
<th>Block</th>
</tr>
</thead>
<tbody>
{passengers.map((passenger) => (
<tr key={passenger._id}>
<td>{passenger.emailid}</td>
<td>{passenger.password}</td>
<td>{passenger.fullname}</td>
<td>{passenger.mobileno}</td>
<td>{new Date(passenger.dateofbirth).toLocaleDateString()}</td>
<td>{passenger.address}</td>
<td>{passenger.locationId?.locationname || passenger.locationId}</td>
<td>{passenger.block ? (
<button onClick={() => handleUnblock(passenger._id)}>Unblock</button>
) : (
<button onClick={() => handleBlock(passenger._id)}>Block</button>
)}
</td>
</tr>
))}
</tbody>
</table>
<div className="pagination-1">
<button onClick={handlePrevious} disabled={page === 1}>Previous</button>
<span>Page {page} of {totalPages}</span>
<button onClick={handleNext} disabled={page === totalPages}>Next
</button>
</div>
</div>
</>
);
}
export default Passenger;