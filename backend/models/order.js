const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  passengerid: { type: mongoose.Schema.Types.ObjectId, ref: 'Passenger', required: true },
  carid: { type: mongoose.Schema.Types.ObjectId, ref: 'CarPost', required: true },
  catid: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  bookingdate: { type: Date, required: true },
  sourcelocation: String,
  destinationlocation: String,
  pickuptime: String,
  droptime: String,
  paymentMethod: String,
  status: { type: String, default: 'Confirmed' }
});
module.exports = mongoose.model('OrderCar', orderSchema);