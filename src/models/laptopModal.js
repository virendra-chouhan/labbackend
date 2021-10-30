const mongoose = require('mongoose');

const allocation1 = mongoose.Schema({
  _id: {
    type: String,

  },
  allocationDate: String

});

const updateLaptop1 = mongoose.Schema({

  active: Boolean,
  os: String,
  ram: String,
  ssd: String,
  hhd: String,
  date:String,
  goingForRepair:String



})


const laptopSchema = mongoose.Schema({

  laptopId: {
    type: String,
    unique: true,

  },

  bill: String,
  brand: String,
  color: String,
  graphicCard: String,
  os:String,
  laptopName: String,
  model: String,
  price: String,
  processor: String,
  purchaseAddress: String,
  purchaseDate: String, 
  generation:String,
  ram: String,
  ssd: String,
  hhd: String,
  screenSize: String,
  active: Boolean,
  allocate: Boolean,
  goingForRepair:Boolean,
  allocation: [allocation1],
  updateLaptop: [updateLaptop1]


});

const LAPTOP = mongoose.model('laptop', laptopSchema);

module.exports = LAPTOP;