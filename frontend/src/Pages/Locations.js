import React, { useState, useEffect } from 'react';
import './Location.css';
import Navbar from '../Components/Navbar';
function Locations() {
  const [locations, setLocations] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; 
  const API_URL = 'http://localhost:5001/locations';
  const fetchLocations = () => {
    fetch(`${API_URL}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.locations);
        setTotalPages(data.pages);
      })
      .catch((err) => console.error('Error fetching locations:', err));
  };
  useEffect(() => {
    fetchLocations();
  }, [page]);
  const handleAddLocation = () => {
    if (locationName.trim() === '') return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locationname: locationName }),
    })
      .then((res) => res.json())
      .then(() => {
        setLocationName('');
        fetchLocations(); 
      })
      .catch((err) => console.error('Error adding location:', err));
  };
  const handleRemove = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchLocations())
      .catch((err) => console.error('Error deleting location:', err));
  };
  const handleEdit = (loc) => {
    setEditId(loc._id);
    setLocationName(loc.locationname);
  };
  const handleUpdate = () => {
    if (!editId || locationName.trim() === '') return;
    fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locationname: locationName }),
    })
      .then((res) => res.json())
      .then(() => {
        setEditId(null);
        setLocationName('');
        fetchLocations();
      })
      .catch((err) => console.error('Error updating location:', err));
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
<div className="location-container">
<h1>Manage Locations</h1>
<div className="input-group">
<input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder="Enter location name"/>
<button onClick={editId ? handleUpdate : handleAddLocation}>{editId ? 'Update' : 'Add'}</button>
</div>
<table className="main">
<thead>
<tr>
<th>Location Name</th>
<th>Remove</th>
<th>Edit</th>
</tr>
</thead>
<tbody>
{locations.map((loc) => (
<tr key={loc._id}>
<td>{loc.locationname}</td>
<td><button onClick={() => handleRemove(loc._id)}>Remove</button> </td>
<td><button onClick={() => handleEdit(loc)}>Edit</button></td>
</tr>
))}
</tbody>
</table>
<div className="pagination">
<button onClick={handlePrevious} disabled={page === 1}>Previous</button>
<span>Page {page} of {totalPages}</span>
<button onClick={handleNext} disabled={page === totalPages}>Next</button>
</div>
</div>
</>
);
}
export default Locations;
