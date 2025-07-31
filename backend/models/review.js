const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
carid: {type:mongoose.Schema.Types.ObjectId,ref:'CarPost', required: true, },
passangerid: {type: mongoose.Schema.Types.ObjectId,ref:'Passenger',required: true,},
reviewmessage: {type: String,required: true},
reviewrate: {type: Number,required: true,min: 1,max: 5,},
postdate: {type: Date,default: Date.now},
},
  { timestamps: true }
);
module.exports = mongoose.model('Review', reviewSchema);