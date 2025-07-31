import React, { useState, useEffect } from 'react';
import './Vehicleowners.css';
import Navbar from '../Components/Navbar';

function VehicleOwners() {
  const [owners, setOwners] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const API_URL = 'http://localhost:5001/vehicles';
  const fetchOwners = () => {
    fetch(`${API_URL}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setOwners(data.owns || []); 
        setTotalPages(data.pages || 1);
      })
      .catch((err) => console.error('Error fetching Vehicle owner detail:', err));
  };

  useEffect(() => {
    fetchOwners();
  }, [page]);

  const handleBlock = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/ownerblock/${id}`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to block');
      const updated = await res.json();
      setOwners((prev) =>
        prev.map((p) => (p._id === id ? { ...p, block: updated.block } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleUnblock = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/ownerunblock/${id}`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to unblock');
      const updated = await res.json();
      setOwners((prev) =>
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
<div className="owner-container">
<h1>Vehicle Owner Details</h1>
<table className="main-2">
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
{owners && owners.length > 0 ? (
owners.map((owner) => (
<tr key={owner._id}>
<td>{owner.emailid}</td>
<td>{owner.password}</td>
<td>{owner.fullname}</td>
<td>{owner.mobileno}</td>
<td>{new Date(owner.dateofbirth).toLocaleDateString()}</td>
<td>{owner.address}</td>
<td>{owner.locationId?.locationname || owner.locationId}</td>
<td>{owner.block ? (<button onClick={() => handleUnblock(owner._id)}>Unblock</button>) : (
<button onClick={() => handleBlock(owner._id)}>Block</button>)}</td></tr>))) : (
<tr><td colSpan="8" style={{ textAlign: 'center' }}> No owners found.</td></tr>
)}
</tbody>
</table>
<div className="pagination-2">
<button onClick={handlePrevious} disabled={page === 1}>Previous</button>
<span>Page {page} of {totalPages}</span>
<button onClick={handleNext} disabled={page === totalPages}>Next</button>
</div>
</div>
</>
);
}
export default VehicleOwners;