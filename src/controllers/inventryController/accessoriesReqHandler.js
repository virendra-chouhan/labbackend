const { response } = require('express');
const ACCESSORIES = require('../../models/accesoriesModel');

module.exports = add_accessories = async (req, res) => {

    let request = req.body;

    console.log(request);

    if(!(request.laptopId)){
         request.laptopId = "-"
    }

    if (request.accessoriesId) {

        try {

            const rs = await new ACCESSORIES(request).save();

            console.log(rs)
            res.status(201).send(rs)

        } catch (error) {

            res.status(208).send(error);
        }

    } else {

        res.status(406).send("accessoriesId required")

    }


};

module.exports = get_accesories = async (req,res)=>{


   const result = await ACCESSORIES.find();

   if(result.length >= 1){


    res.status(200).json(result);
   }else{

    res.status(404).send('not found')
   }




};

module.exports = delete_accessories = async (req,res)=>{


    const result = await ACCESSORIES.deleteOne({_id:req.body._id});

    // console.log(result);

    if(result.deletedCount >= 1){

        res.status(200).send("deleted");
    }else{

        res.status(404).send("not found");
    }


}