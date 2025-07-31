const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Passenger = require('../models/custome');
//get all customer
exports.getAllCustom = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;      
        const limit = parseInt(req.query.limit) || 5;  
    const skip = (page - 1) * limit;

    const total = await Passenger.countDocuments(); 

    const passengers = await Passenger.find()
      .skip(skip)
      .limit(limit)
      .populate('locationId', 'locationname');

    res.json({
      passengers,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get all customer by id
exports.getCustomById = async (req, res) => {
    try {
        const cus = await Passenger.findById(req.params.id);
        if (!cus) {
            return res.status(404).json({ message: 'Passenger not found' });
        }
        res.json(cus);
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};
//add customer
exports.addCustom = async(req,res)=>{
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
const citems = new Passenger({
  emailid,
  password:hashedPassword,
  fullname,
  mobileno,
  address,
  dateofbirth,
  locationId,
  role
});
const c = await citems.save();
        if (!c) {
            return res.status(404).json({ message: 'Passenger detail not inserted' });
        }
        res.json(c);
    }
//update customer
exports.updateCustom= async (req, res) => {
        try {
            const cr = req.params.id;
            const updatedCustom = await Passenger.findByIdAndUpdate(
                cr,
{ $set: { emailid: req.body.emailid ,
  password: req.body.password ,
 fullname: req.body.fullname,
 mobileno: req.body.mobileno ,
 address: req.body.address,
dateofbirth: req.body.dateofbirth,
 locationId:req.body.locationId,
}},
{ new: true } 
            );
            if (!updatedCustom) {
                return res.status(404).json({ message: 'Passenger detail not found' });
            }
            res.status(200).json(updatedCustom);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
//delete customer
exports.deleteCustom = async (req, res) => {
        try {
            const deletedCustom = await Passenger.findByIdAndDelete(req.params.id);
            if (!deletedCustom) {
                return res.status(404).json({ message: 'Passenger detail not found' });
            }
            res.status(200).json({ message: 'Passenger detail deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
//login for customer
exports.passengerLogin = async (req, res) => { 
  try {
    const { emailid, password } = req.body;

    if (!emailid || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const passenger = await Passenger.findOne({ emailid });
    if (!passenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }

    if (passenger.block) {
      return res.status(403).json({ message: 'You are blocked. Contact admin.' });
    }

    const isMatch = await bcrypt.compare(password, passenger.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password not matched' });
    }

    const token = jwt.sign(
      { id: passenger._id, role: passenger.role },
      "your_secret_key",
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      passenger: {
        _id: passenger._id,
        fullname: passenger.fullname,
        emailid: passenger.emailid,
        mobile: passenger.mobileno,
      },
      message: 'Login success',
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: err.message });
  }
};
//blocking customer
exports.blockPassenger= async (req,res)=>{
  try{
   const updatedpassenger = await Passenger.findByIdAndUpdate(req.params.id,
      {$set:{
        block:true
      }},{new:true});
      if(!updatedpassenger){
       return res.status(404).json({
      message:'Passenger not found'
    })
  }
  res.status(200).json(updatedpassenger)
  }catch(error){
    return res.status(400).json({
      success:false,
      msg:error.message
    })
  }
}
//unblocking passenger
exports.unblockPassenger=async (req,res)=>{
   
try{
   const updatedpassenger = await Passenger.findByIdAndUpdate(req.params.id,
      {$set:{
        block:false
      }},{new:true});
      if(!updatedpassenger){
       return res.status(404).json({
      message:'Passenger not found'
    })
  }
  res.status(200).json(updatedpassenger)
  }catch(error){
    return res.status(400).json({
      message:'not found'
    })
  }
}