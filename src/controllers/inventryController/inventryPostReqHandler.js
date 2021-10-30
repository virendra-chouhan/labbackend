const LAPTOP = require('../../models/laptopModal');
// const USER = require('../../models/userModel');

module.exports = addLaptop = async (req, res) => {
    const FindLaptop = await LAPTOP.find({ laptopId: req.body.laptopId }).countDocuments()
    if (FindLaptop >= 1) {

        res.status(208).send("already available");
    } else {
        const laptopData = new LAPTOP(req.body);
        const dbRes = await laptopData.save();
        if (dbRes) {

            res.status("201").send("document created");
            //  console.log(laptopData)
        } else {
            res.status(400);
        }
    }
}

module.exports = allocate_laptop = async (req, res) => {

    const { laptopId, userId } = req.body;

    const FindLaptop = await LAPTOP.find({ laptopId: laptopId })
    var date = new Date();
    /////////
    //    Date
    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }
    var month = pad2(date.getMonth() + 1);//months (0-11)
    var day = pad2(date.getDate());//day (1-31)
    var Dyear = date.getFullYear();
    var formattedDate = day + "/" + month + "/" + Dyear;
    // ///////////

    if (FindLaptop.length >= 1) {
        const result = await LAPTOP.updateOne({ laptopId: laptopId },
            {
                $push: {
                    allocation: {
                        _id: userId,
                        allocationDate: formattedDate
                    }
                },
                $set: { "allocate": true }
            });

        console.log(result.nModified === 1);
        if (result.nModified === 1) {

            res.status(200).send(`allocation succesfull `)
        }

    } else {

        res.status(404).send(`laptop not found ${laptopId}`)
    }

};

module.exports = unAllocate_laptop = async (req, res) => {

    const laptopId = req.body.laptopId;

    if (laptopId.includes("LP-")) {
        console.log("ok")


        const result = await LAPTOP.updateOne({ laptopId: req.body.laptopId }, { $set: { "allocate": false } });

        if (result.nModified === 1 || result.n === 1) {
            res.status(200).send("update")

        } else {

            res.status(404).send("not found")
        }
    } else {
        res.status(406).send("wrong laptop ID")
        // console.log("ok55")

    }


};

module.exports = update_laptop = async (req, res) => {

    console.log(req.body)

    const laptopId = req.body.laptopId;

    if (laptopId.includes("LP-")) {
        console.log("ok")

        /////////
        //    Date
        var date = new Date();
        async function  pad2(n) {
            return (n < 10 ? '0' : '') + n;
        }
        var month =await pad2(date.getMonth() + 1);//months (0-11)
        var day =await pad2(date.getDate());//day (1-31)
        var Dyear = date.getFullYear();
        var formattedDate = day + "/" + month + "/" + Dyear;
        // ///////////

        var objForUpdate = {};
             objForUpdate.date = formattedDate;
        if (req.body.ram.trim()) objForUpdate.ram = req.body.ram;
        if (req.body.os.trim()) objForUpdate.os = req.body.os;
        if (req.body.ssd.trim()) objForUpdate.ssd = req.body.ssd;
        if (req.body.hhd.trim()) objForUpdate.hhd = req.body.hhd;
        if (req.body.active === true || req.body.active === false) {
            objForUpdate.active = req.body.active
            if (req.body.active === false) {

                objForUpdate.allocate = false;
                objForUpdate.goingForRepair = false;
            }
        };
        if(req.body.active === true){
           
            objForUpdate.active = true;
            objForUpdate.goingForRepair=false;
         

        }
        if(req.body.goingForRepair === true){
            
            objForUpdate.active = false;
            objForUpdate.allocate = false;
            objForUpdate.goingForRepair = true;

        }
        console.log(objForUpdate)
        const result = await LAPTOP.updateOne({ laptopId: laptopId }, {
            $push: {
                updateLaptop:
                    objForUpdate

            },
            $set: objForUpdate
        })

        if (result.nModified === 1) {

            res.status(200).send("ok")


        } else {


            res.status(404).send('laptop not found')
        }






    } else {
        res.status(406).send("wrong laptop ID")
        // console.log("ok

    }




};


module.exports = remove_laptop = async (req, res) => {


    const result = await LAPTOP.deleteOne({ laptopId: req.body.laptopId });

    if (result.deletedCount >= 0) {

        res.status(200).send("Delete succefull")
    } else {

        res.status(404).send("Not Found")


    }






}

module.exports = get_laptop_by_id = async (req, res) => {

    console.log(req.body)
    if (req.body.laptopId === null || req.body.laptopId === undefined || req.body.laptopId === '') {
        res.status(406).send("invalid request");
    } else {

        // find({ laptopId: req.body.laptopId })
        let FindLaptop = await LAPTOP.aggregate([
            { $match: { laptopId: req.body.laptopId } },

            {
                $unwind: {
                    path: '$allocation'
                }
            }
            ,
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'allocation._id',
                    foreignField: '_id',
                    as: 'allocations'
                }

            },
            { $unwind: '$allocations' },

            ///////

            {
                $group: {
                    _id: '$_id',
                    root: { $mergeObjects: '$$ROOT' },


                    allocations: {
                        // $push: '$allocation',
                        $push: '$allocations'

                    },
                    allocation: {
                        $push: '$allocation'
                    },



                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$root', '$$ROOT']
                    }
                }
            },
            {
                $project: {
                    root: 0
                }
            }

        ])

        if (FindLaptop.length >= 1) {

            // console.log(FindLaptop[0].allocation = FindLaptop[0].allocations)
            FindLaptop[0].allocation.map((itemI, I) => {
                // console.log(itemI)
                FindLaptop[0].allocations.map((itemJ, J) => {
                    // console.log(itemJ)
                    if (itemI._id === itemJ._id) {


                        var obj1 = FindLaptop[0].allocations[J];
                        var obj2 = FindLaptop[0].allocation[I];

                        FindLaptop[0].allocation[I] = { ...obj1, ...obj2 }


                    }

                })
            })
            delete FindLaptop[0]['allocations'];






        }

        if (FindLaptop.length === 0) {

            FindLaptop = await LAPTOP.find({ laptopId: req.body.laptopId })
        }


        if (FindLaptop.length >= 1) {
            res.json(FindLaptop);

        } else {

            // res.json(FindLaptop);
            res.status(404).send("laptop not found");
        }
    }
};

// add_accessories//////////////////////



