const mongoose = require('mongoose');
const carSchema=new mongoose.Schema({
   catid:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required: true},
    cartitle:{type:String,require:true},
    shortdescription:{type:String,require:true},
    carimage1:{type:String,require:true},
    carimage2:{type:String,require:true},
    postdate:{type:Date,require:true},
    price:{type:String,require:true},
    variant:{type:String,require:true},
  driverstatus:{type:String,require:true},
registrationyear:{type:Number,require:true},
carvehicleno:{type:String,require:true},
ownername:{type:String,required:true},
ownermobile:{type:String,required:true},
available:{type:Boolean,default:true},
})
module.exports = mongoose.model('CarPost', carSchema);