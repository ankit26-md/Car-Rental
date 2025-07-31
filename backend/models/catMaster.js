const mongoose=require('mongoose')
const catSchema= new mongoose.Schema({
    catname: { type: String, required: true },
})
module.exports = mongoose.model('Category', catSchema);