const mongoose = require('mongoose');

const accessoriesSchema = mongoose.Schema({

    accessoriesId: {
        type: String,
        unique: true
    },
    laptopId: String,
    type: String,
    price: String,
    model:String,
    name:String,
    description:String

})








const ACCESSORIES = mongoose.model('accessorie', accessoriesSchema);

module.exports = ACCESSORIES;