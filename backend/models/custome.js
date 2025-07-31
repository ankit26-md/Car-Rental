const mongoose = require('mongoose');

const custSchema = new mongoose.Schema({
  emailid: { type: String, required: true },
  password: { type: String, required: true },
  mobileno: { type: String, required: true },
  fullname: { type: String, required: true },
  address: { type: String, required: true },
  dateofbirth: { type: Date, required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  block:{
  type:Boolean,
  default:false,
},
  role: { type: String, enum: ['passenger'], required: true },
}
, { timestamps: true });

module.exports = mongoose.model('Passenger', custSchema);
