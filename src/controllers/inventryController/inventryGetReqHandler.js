const LAPTOP = require('../../models/laptopModal');
const USER = require('../../models/userModel')

module.exports = get_all_laptop_by_mobileNumber = async (req, res) => {

    // const user = await LAPTOP.findOne({"allocation.mobileNumber":req.body.mobileNumber}, {laptopId:0,"allocation.name":0, "model":0,"brand": 0, "ram": 0,    "storage":0,    "processor":0,"generation":0,_id:0, "__v": 0,});
    const result = await LAPTOP.find({ "allocation._id": req.body.email }, { allocation: 0, _id: 0, "__v": 0 });
    const result2 = await USER.findOne({ "_id": req.body.email });
    // const result = await LAPTOP.aggregate([

    //     { $match: { "allocation._id": req.body.email }},

    //     {
    //         $lookup:
    //         {
    //             from: 'users',
    //             pipeline: [
    //                 { "$match": { "_id": req.body.email  }},
    //             ],

    //             as: 'user'
    //         }

    //     },
    //     { $project: { allocation:0 } }
    // ])








    if (result.length >= 1 && result2 != null) {
        res.status(200).json({ user: result2, data: result });


    } else {
        res.status(404).send(`no allocation find for this number ${req.body.mobileNumber}`)
    }
};





module.exports = get_all_laptop = async (req, res) => {
    const result = await LAPTOP.aggregate([


        { $addFields: { allocatedTo: { $last: "$allocation" } } },
        {
            $lookup:
            {
                from: 'users',
                localField: 'allocatedTo._id',
                foreignField: '_id',
                as: 'user'
            }
        },

        { $addFields: { user: { "$arrayElemAt": ["$user", 0] } } },
        {
            $addFields: {
                allocatedTo: { $mergeObjects: ["$user", "$allocatedTo"] }
            }
        },




        { $project: { "allocation": 0, "image": 0, "_id": 0, "__v": 0 ,"user":0,"allocatedTo.__v":0,"bill":0,"price":0,color:0,purchaseAddress:0,screenSize:0,processor:0,purchaseDate:0,"allocatedTo.altMobileNumber":0,"allocatedTo.aadhar":0,"allocatedTo.address":0} }
    ])

    if (result.length >= 1) {
        res.json(result);
    } else {
        res.status(404).send(`not found`)
    }
};



module.exports = get_laptop_and_user_for_allocation = async (req, res) => {

    const laptop = await LAPTOP.find({ $and: [{ active: { $eq: true } }, { allocate: { $eq: false } }] }, { laptopId:1 });
    const user = await USER.find({}, { _id: 1, userName: 1 })

    if (laptop.length >= 1 || user.length >= 1) {

        res.status(200).json({ laptop, user })
    } else {
        // res.status(200).json({laptop,user})


        res.status(404).send("ok")
    }


};

module.exports = get_all_laptop_id = async(req , res)=>{

     const result = await LAPTOP.find({},{laptopId:1 , _id:0})

     if(result.length >=1){

        res.status(200).json(result);
     }else{

        res.status(404).send('not found');
     }




}