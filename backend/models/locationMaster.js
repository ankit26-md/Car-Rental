const mongoose=require('mongoose')
const locSchema= new mongoose.Schema({
    locationname: { type: String, required: true },
})
module.exports = mongoose.model('Location', locSchema);
 