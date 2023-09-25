const Card_pin = require('../model/cards')
const savePin = async (req, res)=>{
    const {name, pin } = req.body
    if (!name || !pin )
    return res
      .status(400)
      .json({ message: "name and pin are require" });
      const duplicate = await Card_pin.findOne({ code: pin }).exec()
      if(duplicate) return res.sendStatus(409);
      const result = await Card_pin.create({
        name:name , 
        code: pin,
      }); 

      res.json({"success ": `new ${result.name} was created `})
}

module.exports= savePin