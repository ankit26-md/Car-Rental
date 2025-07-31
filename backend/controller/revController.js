const Review = require('../models/review');
//get all review
exports.getAllReview = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;     
    const limit = parseInt(req.query.limit) || 5;   
    const skip = (page - 1) * limit;

    const total = await Review.countDocuments(); 
    const revs = await Review.find()
      .skip(skip)
      .limit(limit)
      .populate('carid', 'cartitle')
      .populate('passangerid', 'fullname');

    res.json({
      revs,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get all review by id
exports.getReviewById = async (req, res) => {
    try {
        const rev= await Review.findById(req.params.id);
        if (!rev) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(a);
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};
//add review
exports.addReview = async(req,res)=>{
 const ritems = new Review({
    carid: req.body.carid,
passangerid:req.body.passangerid ,
reviewrate: req.body.reviewrate,
reviewmessage: req.body.reviewmessage,
postdate: req.body.postdate,

});
const revi = await ritems.save();
        if (!revi) {
            return res.status(404).json({ message: 'Review not inserted' });
        }
        res.json(revi);
    }
//update review
exports.updateReview = async (req, res) => {
                try {
                    const en = req.params.id;
                    const updatedReview = await Review.findByIdAndUpdate(
                        en,
        { $set: {
         carid: req.body.carid,
passangerid:req.body.passangerid ,
reviewrate: req.body.reviewrate,
reviewmessage: req.body.reviewmessage,
postdate: req.body.postdate,
        }},
        { new: true } 
                    );
                    if (!updatedReview) {
                        return res.status(404).json({ message: 'Post detail not found' });
                    }
                    res.status(200).json(updatedReview);
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            };
//delete review
exports.deleteReview = async (req, res) => {
                try {
                    const deletedReview = await Review.findByIdAndDelete(req.params.id);
                    if (!deletedReview) {
                        return res.status(404).json({ message: 'Review not found' });
                    }
                    res.status(200).json({ message: 'Review deleted successfully' });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            };