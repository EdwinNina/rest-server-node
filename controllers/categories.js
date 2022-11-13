const { response, request } = require("express");
const { Category } = require("../models");

const get_categories = async (req = request, res = response) => {

   try {
      const {limit = 5, from = 0} = req.query
      const query = {status: true}

      const [total, categories] = await Promise.all([
         Category.countDocuments(query),
         Category.find(query).limit(limit).skip(from).populate('user')
      ])

      res.status(200).json({
         total,
         categories
      })
   } catch (error) {
      res.status(500).json({
         msg: 'There was an error saving the category'
      })
   }

}

const get_category = async (req = request, res = response) => {
   try {
      const { id } = req.params

      const category = await Category.findById(id).populate('user')

      res.status(200).json({ category })

   } catch (error) {
      res.status(500).json({
         msg: 'There was an error to get the category'
      })
   }
}

const save_category = async (req = request, res = response) => {
   try {
      const name = req.body.name.toUpperCase()

      const existsCategory = await Category.findOne({ name })

      if(existsCategory){
         return res.status(400).json({
            msg: `The ${name} category already exists in the database`
         })
      }

      const data = {
         name,
         user: req.user._id
      }
      const category = new Category(data)
      await category.save()

      res.status(201).json({ category })

   } catch (error) {
      console.log(error)
      res.status(500).json({
         msg: 'There was an error saving the category'
      })
   }
}

const update_category = async (req = request, res = response) => {
   const { id } = req.params
   const {status, user, ...data } = req.body

   data.nombre = data.nombre.toUpperCase()
   data.user = req.user._id

   const category = await Category.findByIdAndUpdate(id, data, { new: true })

   res.status(200).json({
      category
   })
}

const delete_category = async (req = request, res = response) => {
   const { id } = req.params

   const category = await Category.findByIdAndUpdate(id, {status: false}, { new: true})

   res.status(200).json({
      category
   })
}

module.exports = {
   get_categories,
   get_category,
   save_category,
   update_category,
   delete_category
}