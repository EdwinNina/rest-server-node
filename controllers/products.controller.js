const { Product, Category } = require("../models")
 
const get_products = async (req = request, res = response) => {
   const {limit = 5, from = 0} = req.query
   const query = {status: true}

   const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).populate(['user','category']).limit(limit).skip(from)
   ])

   res.status(200).json({
      total,
      products
   })
}

const get_product = async (req = request, res = response) => {
   const { id } = req.params

   const product = await Product.findById(id)

   res.status(200).json({ product })
}

const save_product = async (req = request, res = response) => {
   const { name, description, price, category } = req.body

   const exists_category = await Category.findById(category)

   if(!exists_category){
      return res.status(400).json({
         msg: 'Does not exist the category with id ' + category
      })
   }

   const data = {
      name: name.toUpperCase(),
      description,
      price,
      user: req.user._id,
      category
   }

   const product = new Product(data)
   await product.save()

   res.status(200).json({ product })
}

const update_product = async (req = request, res = response) => {
   const { id } = req.params
   const {name, description, price, category } = req.body

   const exists_category = await Category.findById(category)

   if(!exists_category){
      return res.status(400).json({
         msg: 'Does not exist the category with id ' + category
      })
   }

   const data = {
      name: name.toUpperCase(),
      description,
      price,
      user: req.user._id,
      category
   }

   const product = await Product.findByIdAndUpdate(id, data, { new : true })

   res.status(200).json({ product })
}

const delete_product = async (req = request, res = response) => {
   const { id } = req.params

   const product = await Product.findByIdAndUpdate(id, { status: false }, { new : true })

   res.status(200).json({ product })
}

module.exports = {
   get_products,
   get_product,
   save_product,
   update_product,
   delete_product
}