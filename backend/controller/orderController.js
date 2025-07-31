const Order = require('../models/order');
const CarPost = require('../models/postcar');  
// GET: All Orders 
exports.getAllOrder = async (req, res) => {
  try {
    const { page = 1, limit = 5, passengerid } = req.query;
    const skip = (page - 1) * limit;

    const filter = passengerid ? { passengerid } : {};

    const total = await Order.countDocuments(filter);

    const orders = await Order.find(filter)
      .populate({
        path: 'carid',
        select: 'cartitle' 
      })
      .populate({
        path: 'passengerid',
        select: 'fullname' 
      })
      .populate('catid') 
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      orders,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET: Single Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('carid')
      .populate('catid')
      .populate('passengerid');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Add new order
exports.addOrder = async (req, res) => {
  try {
    const {
      passengerid,
      carid,
      catid,
      bookingdate,
      sourcelocation,
      destinationlocation,
      pickuptime,
      droptime,
      paymentMethod,
      
    } = req.body;

    if (!passengerid || !carid || !catid || !bookingdate || !sourcelocation || !destinationlocation || !pickuptime || !droptime || !paymentMethod ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newOrder = new Order({
      passengerid,
      carid,
      catid,
      bookingdate,
      sourcelocation,
      destinationlocation,
      pickuptime,
      droptime,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: Update order 
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          bookingdate: req.body.bookingdate,
          sourcelocation: req.body.sourcelocation,
          destinationlocation: req.body.destinationlocation,
          pickuptime: req.body.pickuptime,
          droptime: req.body.droptime,
          paymentMethod: req.body.paymentMethod,
        },
      },
      { new: true }
    ).populate('carid catid passengerid');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE: Delete order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: Cancel Booking 
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    ).populate('carid catid passengerid');

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Cancellation failed' });
  }
};
