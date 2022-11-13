const { User, Product } = require("../models");

const check_exists_collection = async (collection, id) => {
   let model = ''

   switch (collection) {
      case 'users':
         model = await User.findById(id)
         if(!model){
            return res.status(400).json({
               msg: 'User not found with id' + id
            })
         }
      break;
      case 'products':
         model = await Product.findById(id)
         if(!model){
            return res.status(400).json({
               msg: 'User not found with id' + id
            })
         }
      break;
      default:
         res.status(500).json({
            msg: 'There was an error uploading the image'
         })
      break;
   }
   return model;
}

module.exports = check_exists_collection