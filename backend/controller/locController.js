const Location = require('../models/locationMaster');
//get all location
exports.getAllLocation = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const total = await Location.countDocuments();
    const locations = await Location.find().skip(skip).limit(limit);

    res.json({
      locations,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get all location by id
exports.getLocationById = async (req, res) => {
    try {
        const loco = await Location.findById(req.params.id);
        if (!loco) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(loco);
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};
//add location
exports.createLocation = async (req, res) => {
    
        const pitems= new Location({
            locationname: req.body.locationname
        });
        const loct = await pitems.save();
        if(!loct){
  return res.status(404).json({ message: 'Location not inserted' });
        }
        res.json(loct);
       
    }
//update location
exports.updateLocation = async (req, res) => {
    try {
        const caty = req.params.id;
        const updatedLocation = await Location.findByIdAndUpdate(
            caty,
            { $set: { locationname: req.body.locationname } },
            { new: true } 
        );
        if (!updatedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(updatedLocation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//delete location
exports.deleteLocation = async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
