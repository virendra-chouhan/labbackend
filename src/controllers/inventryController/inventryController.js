require('dotenv').config()
const express = require('express');
const InventryRouter = express.Router();


// Handle POST Requests
require('./inventryPostReqHandler');
// Handle GET Requests
require('./inventryGetReqHandler');

// accessories request

require('./accessoriesReqHandler')


///////////////
// Handle POST Requests
InventryRouter
    .post('/add_laptop', addLaptop)
    .post('/update_laptop', update_laptop)
    .post('/allocate_laptop', allocate_laptop)
    .post('/remove_laptop', remove_laptop)
    .post("/get_laptop_by_id", get_laptop_by_id)
    .post('/unallocate_laptop', unAllocate_laptop)
    .post('/add_accessories',add_accessories)
    .post('/delete_accessories',delete_accessories);


///////////////
// Handle GET Requests
InventryRouter
    .get("/get_all_laptop_by_mobileNumber", get_all_laptop_by_mobileNumber)
    .get('/get_all_laptop', get_all_laptop)
    .get("/get_all_laptop_id", get_all_laptop_id)
    .get('/get_laptop_and_user_for_allocation', get_laptop_and_user_for_allocation)
    .get("/get_accesories",get_accesories);








module.exports = InventryRouter;