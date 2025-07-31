import React, { useState, useEffect } from 'react';
import './Categories.css';
import Navbar from '../Components/Navbar';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editId, setEditId] = useState(null);
  const API_URL = 'http://localhost:5001/cats'; 
  // Fetch all categories
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);
  // Add a new category
  const handleAddCategory = () => {
    if (categoryName.trim() === '') return;
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ catname: categoryName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories([...categories, data]);
        setCategoryName('');
      })
      .catch((err) => console.error('Error adding category:', err));
  };
  // Delete a category
  const handleRemove = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCategories(categories.filter((cat) => cat._id !== id));
      })
      .catch((err) => console.error('Error deleting category:', err));
  };
  // Start editing
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setCategoryName(cat.catname);
  };
  // Update category
  const handleUpdate = () => {
    if (!editId || categoryName.trim() === '') return;

    fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({catname: categoryName })
    })
      .then((res) => res.json())
      .then((updatedCat) => {
        setCategories(categories.map((cat) => (cat._id === editId ? updatedCat : cat)));
        setEditId(null);
        setCategoryName('');
      })
      .catch((err) => console.error('Error updating category:', err));
  };

  return (
    <>
<Navbar />
<div className="categories-container">
<h1>Manage Categories</h1>
<div className="input-group-1">
<input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter category name" />
<button className='add-button' onClick={editId ? handleUpdate : handleAddCategory}>{editId ? 'Update' : 'Add'}</button>
</div>
<table className="main-category">
<thead>
<tr>
<th>Category Name</th>
<th>Remove</th>
<th>Edit</th>
</tr>
</thead>
<tbody>
{categories.map((cat) => (
<tr key={cat._id}>
<td><b>{cat.catname}</b></td>
<td><button onClick={() => handleRemove(cat._id)}>Remove</button></td>
<td><button onClick={() => handleEdit(cat)}>Edit</button></td>
</tr>
))}
</tbody>
</table>
</div>
</>
);
}
export default Categories;