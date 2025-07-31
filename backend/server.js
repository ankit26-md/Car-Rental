const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const verifyToken = require('./middleware/authMiddleware')
const app = express();
const port = 5001;
 app.use(express.json());
    app.use(cors());
  app.use('/Images', express.static('Images'));
mongoose.connect('mongodb://127.0.0.1:27017/login', {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));
//CATEGORY
const catController = require('./controller/catController');
    app.get('/cats', catController.getAllCategories);
    app.get('/cats/:id', catController.getCategoryById);
    app.post('/cats', catController.createCategory);
    app.put('/cats/:id', catController.updateCategory);
    app.delete('/cats/:id', catController.deleteCategory);
//LOCATION
const locController = require('./controller/locController');
app.get('/locations',locController.getAllLocation);
app.get('/locations/:id',locController.getLocationById);
app.post('/locations',locController.createLocation);
app.put('/locations/:id',locController.updateLocation);
app.delete('/locations/:id',locController.deleteLocation);
//VEHICLE OWNER
const vehController = require('./controller/vehController');
app.get('/vehicles',vehController.getAllVehicle);
app.get('/vehicles/:id',vehController.getVehicleById);
app.post('/vehicles',vehController.addVehicle);
app.put('/vehicles/:id',vehController.updateVehicle);
app.delete('/vehicles/:id',vehController.deleteVehicle);
app.patch('/ownerblock/:id',vehController.ownerBlock)
app.patch('/ownerunblock',vehController.ownerUnblock)
app.post('/ownerlogin',vehController.ownerLogin);

// CUSTOMER
const custController = require('./controller/custController');
app.get('/customers',custController.getAllCustom);
app.get('/customers/:id',custController.getCustomById);
app.post('/customers',custController.addCustom);
app.put('/customers/:id',custController.updateCustom);
app.delete('/customers/:id',custController.deleteCustom);
app.patch('/block/:id',custController.blockPassenger)
app.patch('/unblock/:id',custController.unblockPassenger)
app.post('/passengerlogin',custController.passengerLogin)
// //POST CAR
const postController = require('./controller/postController');
app.get('/posts', postController.getAllCarPosts);
app.post('/posts', postController.uploadCarImages, postController.createCarPost);
app.get('/posts/:id', postController.getCarPostById);
app.put('/posts/:id', postController.updateCarPost);
app.delete('/posts/:id', postController.deleteCarPost);
//ORDER CAR
const orderController = require('./controller/orderController');
app.get('/cars',orderController.getAllOrder);
app.get('/cars/:id',orderController.getOrderById);
app.post('/cars',orderController.addOrder);
app.put('/cars/:id',orderController.updateOrder);
app.delete('/cars/:id',orderController.deleteOrder);
app.put('/cars/cancel/:id', orderController.cancelBooking);

//REVIEW
const revController = require('./controller/revController');
app.get('/reviews',revController.getAllReview);
app.get('/reviews/:id',revController.getReviewById);
app.post('/reviews',revController.addReview);
app.put('/reviews/:id',revController.updateReview);
app.delete('/reviews/:id',revController.deleteReview);
// Admin Registration routes
const adminController = require('./controller/AdminController');
// app.get('/adminregister', registrationController.getAllAdmin);
// app.post('/adminregister', registrationController.registerAdmin);
// app.put('/adminregister/:id', registrationController.updateAdmin);
// app.delete('/adminregister/:id', registrationController.deleteAdmin);
app.post('/adminlogin',adminController.adminLogin);
app.listen(port, () => {console.log(`Server listening on port ${port}`);});
