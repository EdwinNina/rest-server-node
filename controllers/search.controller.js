const { request, response } = require("express");
const { User, Category, Product } = require("../models");
const { ObjectId } = require('mongoose').Types;

const search_users = async (term, res) => {
   const is_mongo_id = ObjectId.isValid(term)

   if(is_mongo_id){
      const data = await User.findById(term)
      return res.status(200).json({
         results: data ? [ data ] : []
      })
   }

   const regex = new RegExp(term, 'i')

   const data = await User.find({
      $or: [{ name: regex}, { email: regex }],
      $and: [{ status: true }]
   })

   res.status(200).json({ results: data })
}

const search_categories = async (term, res) => {
   const is_mongo_id = ObjectId.isValid(term)

   if(is_mongo_id){
      const data = await Category.findById(term)
      return res.status(200).json({
         results: data ? [ data ] : []
      })
   }

   const regex = new RegExp(term, 'i')

   const data = await Category.find({ name: regex, status: true })

   res.status(200).json({ results: data })
}

const search_products = async (term, res) => {
   const is_mongo_id = ObjectId.isValid(term)

   if(is_mongo_id){
      const data = await Product.findById(term)
      return res.status(200).json({
         results: data ? [ data ] : []
      })
   }

   const regex = new RegExp(term, 'i')

   const data = await Product.find({
      $or: [{ name: regex}, { description: regex }, { price: regex }],
      $and: [{ status: true }]
   })

   res.status(200).json({ results: data })
}

const search_data = async (req = request, res = response) => {
   const { collection, term } = req.params

   switch (collection) {
      case 'users':
         search_users(term, res)
      break;
      case 'categories':
         search_categories(term, res)
      break;
      case 'products':
         search_products(term, res)
      break;
      default:
         res.status(500).json({
            msg: 'There was an error while processing the request'
         })
      break;
   }
}

module.exports = search_data