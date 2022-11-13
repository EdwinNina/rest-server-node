const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
   name: {
      type: String,
      required: true,
   },
   status: {
      type: Boolean,
      default: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   price: {
      type: Schema.Types.Decimal128,
      default: 0.0
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
   },
   description: { type: String },
   available: {
      type: Boolean,
      default: true
   },
   img: { type: String }
})

module.exports = model('Product', ProductSchema)