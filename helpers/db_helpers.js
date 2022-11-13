const { Category, Product } = require('../models')
const Role = require('../models/Roles')
const User = require('../models/users')

const check_role = async (role) => {
   const role_exists = await Role.findOne({ role })

   if(!role_exists){
      throw new Error('The role does not exist in the database')
   }
}

const check_email_exists = async (email) => {
   const verificarEmail = await User.findOne({ email });

   if(verificarEmail){
      throw new Error('The email already exists in the database')
   }
}

const check_user_exists = async (id) => {
   const verify_user = await User.findById(id)

   if(!verify_user){
      throw new Error('Does not exist a user with id ' + id)
   }
}

const check_category_exists = async(id) => {
   const category = await Category.findById(id)

   if(!category){
      return res.status(400).json({
         msg: 'Does not exist the category with id ' + id
      })
   }
}

const check_product_exists = async(id) => {
   const product = await Product.findById(id)

   if(!product){
      return res.status(400).json({
         msg: 'Does not exist the product with id ' + id
      })
   }
}

const allowed_collections = (collections, collection) => {
   if(!collections.includes(collection)){
      throw new Error(`The collection ${collection} does not exist in the collection ${collections}`)
   }
}

module.exports = {
   check_role,
   check_email_exists,
   check_user_exists,
   check_category_exists,
   check_product_exists,
   allowed_collections
}