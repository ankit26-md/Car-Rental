import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Postcar.css'
import Navi from './Navi';

const API = 'http://localhost:5001/posts';
const CAT_API = 'http://localhost:5001/cats';

function Cars() {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    cartitle: '',
    shortdescription: '',
    postdate: '',
    price: '',
    variant: '',
    driverstatus: '',
    registrationyear: '',
    carvehicleno: '',
    catid: '',
    ownername: '',
    ownermobile: ''
  });

  const [files, setFiles] = useState({ carimage1: null, carimage2: null });

  useEffect(() => {
    axios.get(CAT_API)
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
    fetchCars();
  }, []);

  function fetchCars() {
    axios.get(API)
      .then(res => setCars(res.data))
      .catch(() => setCars([]));
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFile(e, field) {
    setFiles({ ...files, [field]: e.target.files[0] });
  }

  async function handleSubmit() {
    const required = ['catid', 'ownername', 'ownermobile', 'cartitle', 'price', 'carvehicleno'];
    for (let key of required) {
      if (!formData[key]) return alert(`Field "${key}" is required`);
    }

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    if (files.carimage1) data.append('carimage1', files.carimage1);
    if (files.carimage2) data.append('carimage2', files.carimage2);

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, data);
        alert('Car updated');
      } else {
        await axios.post(API, data);
        alert('Car added');
      }
      resetForm();
      fetchCars();
    } catch (err) {
      console.error(err.response || err);
      alert('Failed to save car');
    }
  }

  function handleEdit(car) {
    setEditId(car._id);
    setFormData({
      cartitle: car.cartitle,
      shortdescription: car.shortdescription,
      postdate: car.postdate?.split('T')[0] || '',
      price: car.price,
      variant: car.variant,
      driverstatus: car.driverstatus,
      registrationyear: car.registrationyear,
      carvehicleno: car.carvehicleno,
      catid: car.catid?._id || car.catid,
      ownername: car.ownername || '',
      ownermobile: car.ownermobile || ''
    });
    setFiles({ carimage1: null, carimage2: null });
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this car?')) return;
    await axios.delete(`${API}/${id}`);
    fetchCars();
  }

  function resetForm() {
    setEditId(null);
    setFormData({
      cartitle: '',
      shortdescription: '',
      postdate: '',
      price: '',
      variant: '',
      driverstatus: '',
      registrationyear: '',
      carvehicleno: '',
      catid: '',
      ownername: '',
      ownermobile: ''
    });
    setFiles({ carimage1: null, carimage2: null });
  }

  return (
    <>
    <Navi/>
    <div className="cars-container">
      <h2>{editId ? 'Edit Car' : 'Add New Car'}</h2>
      <div className="cars-form">
        <select name="catid" value={formData.catid} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.catname}</option>
          ))}
        </select>
<input type="text" name="ownername" placeholder="Owner Name" value={formData.ownername} onChange={handleChange}/>
<input type="text" name="ownermobile" placeholder="Owner Mobile" value={formData.ownermobile} onChange={handleChange}/>
<input  name="cartitle"  placeholder="Car Title"  value={formData.cartitle}  onChange={handleChange}/>
<input name="shortdescription" placeholder="Description" value={formData.shortdescription} onChange={handleChange}/>
<input type="date"  name="postdate" value={formData.postdate}  onChange={handleChange}/>
<input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
<input name="variant" placeholder="Variant" value={formData.variant} onChange={handleChange}/>
<input name="driverstatus" placeholder="Driver Status" value={formData.driverstatus} onChange={handleChange}/>
<input type="number" name="registrationyear" placeholder="Year" value={formData.registrationyear} onChange={handleChange}/>
<input name="carvehicleno" placeholder="Vehicle Number" value={formData.carvehicleno} onChange={handleChange}/>
<label> Car Image 1: <input type="file" onChange={e => handleFile(e, 'carimage1')} /></label>
<label> Car Image 2: <input type="file" onChange={e => handleFile(e, 'carimage2')} /></label>
<button onClick={handleSubmit}>{editId ? 'Update Car' : 'Add Car'}</button>
{editId && <button onClick={resetForm}>Cancel</button>}
</div>

      <h2>All Cars</h2>
      <table className="cars-table">
        <thead>
          <tr>
            <th>Category</th><th>Title</th><th>Description</th><th>Image 1</th><th>Image 2</th><th>Price</th>
            <th>Variant</th><th>Driver</th><th>Year</th><th>Vehicle No</th><th>Available</th><th>Owner Name</th><th>Owner Mobile</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.length ? cars.map(car => (
            <tr key={car._id}>
              <td>{car.catid?.catname || '-'}</td>
              <td>{car.cartitle}</td>
              <td>{car.shortdescription}</td>
              <td>{car.carimage1 && <img src={`http://localhost:5001/images/${car.carimage1}`} alt="" width="80" />}</td>
              <td>{car.carimage2 && <img src={`http://localhost:5001/images/${car.carimage2}`} alt="" width="80" />}</td>
              <td>₹{car.price}</td>
              <td>{car.variant}</td>
              <td>{car.driverstatus}</td>
              <td>{car.registrationyear}</td>
              <td>{car.carvehicleno}</td>
              <td>{car.available ? 'Yes' : 'No'}</td>
              <td>{car.ownername}</td>
              <td>{car.ownermobile}</td>
              <td>
                <button onClick={() => handleEdit(car)}>Edit</button>{' '}
                <button onClick={() => handleDelete(car._id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="14">No cars found</td></tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Cars;
