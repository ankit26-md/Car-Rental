const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Vehicle = require("../models/vehicleOwner");
//get all vehicle
exports.getAllVehicle = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;     
    const limit = parseInt(req.query.limit) || 5;    
    const skip = (page - 1) * limit;

    const total = await Vehicle.countDocuments(); 
    const owns = await Vehicle.find()
      .skip(skip)
      .limit(limit)
      .populate('locationId', 'locationname')

    res.json({
      owns,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//get all vehicleby id
exports.getVehicleById = async (req, res) => {
  try {
    const vip = await Vehicle.findById(req.params.id);
    if (!vip) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//add vehicle

exports.addVehicle = async(req,res)=>{
 const {
  emailid,
  password,
  fullname,
  mobileno,
  address,
  dateofbirth,
  locationId,
  role
} = req.body;
const hashedPassword=await bcrypt.hash(password,10)
const ritems = new Vehicle({
  emailid,
  password:hashedPassword,
  fullname,
  mobileno,
  address,
  dateofbirth,
  locationId,
  role
});
const r = await ritems.save();
        if (!r) {
            return res.status(404).json({ message: 'Passenger detail not inserted' });
        }
        res.json(r);
    }


//update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const vrh = req.params.id;
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vrh,
      {
        $set: {
          emailid: req.body.emailid,
          password: req.body.password,
          fullname: req.body.fullname,
          mobileno: req.body.mobileno,
          address: req.body.address,
          dateofbirth: req.body.dateofbirth,
          locationId: req.body.locationId,
        },
      },
      { new: true }
    );
    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle detail not found" });
    }
    res.status(200).json(updatedVehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle detail not found" });
    }
    res.status(200).json({ message: "Vehicle detail deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//Login for owner
exports.ownerLogin = async (req, res) => {
  try {
    const { emailid, password } = req.body;

    if (!emailid || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const owners = await Vehicle.findOne({ emailid });
    if (!owners) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
if(owners.block){
  return res.status(403).json({message:'You are block contact admin'})
}
    const isMatch = await bcrypt.compare(password, owners.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password not matched' });
    }

    const token = jwt.sign(
      { id: owners._id, role: owners.role },
      "your_secret_key",
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      owners: {
        id: owners._id,
        username: owners.fullname,
      },
      message: 'Login success',
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: err.message });
  }
};
//blocking owner
exports.ownerBlock=async(req,res)=>{
  try{
    const updateOwner=await Vehicle.findByIdAndUpdate(req.params.id,
      {$set:{
        block:true
      }},{new:true});
    
    if(!updateOwner){
      return res.status(404).json({message:'Owner not found'})
    }
     res.status(200).json(updateOwner) ;
   }catch(err){
    return res.status(400).json({message:'not found'})
   }
}
//unblocking owner
exports.ownerUnblock=async(req,res)=>{
  try{
    const updateOwner=await Vehicle.findByIdAndUpdate(req.params.id,
      {$set:{
        block:false
      }},{new:true});
    
    if(!updateOwner){
      return res.status(404).json({message:'Owner not found'})
    }
     res.status(200).json(updateOwner) ;
   }catch(err){
    return res.status(400).json({message:'not found'})
   }
}