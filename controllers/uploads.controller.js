const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL)

const upload_files_helper = require("../helpers/upload_files_helper");
const check_exists_collection = require('../helpers/check_exists_collection');
const { response } = require('express');

const upload_files = async (req, res) => {
   try {
      const allowed_extensions = ['jpg', 'png', 'gif', 'jpeg']

      const file_name = await upload_files_helper(req.files, allowed_extensions)

      res.json({file_name})
   } catch (error) {
      res.status(400).json({error})
   }
}

const upload_model_image = async (req, res) => {
   const { collection, id } = req.params
   const allowed_extensions = ['jpg', 'png', 'gif', 'jpeg']
   const model = await check_exists_collection(collection, id)

   if(model.img){
      const path_image = path.join(__dirname, '../uploads/', collection, model.img )
      if(fs.existsSync(path_image)){
         fs.unlinkSync(path_image)
      }
   }

   model.img = await upload_files_helper(req.files, allowed_extensions, collection)

   await model.save()

   res.json({model})
}

const upload_image_cloudinary = async (req, res) => {
   const { collection, id } = req.params
   const model = await check_exists_collection(collection, id)

   if(model.img){
      const file_array = model.img.split('/').at(-1)
      const [file] = file_array.split('.')
      cloudinary.uploader.destroy(file)
   }

   const { tempFilePath } = req.files.file
   const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

   model.img = secure_url
   await model.save()

   res.json({model})
}

const get_model_image = async (req, res =  response) => {
   const { collection, id } = req.params
   const model = await check_exists_collection(collection, id)

   if(model.img){
      const path_image = path.join(__dirname, '../uploads/', collection, model.img )
      if(fs.existsSync(path_image)){
         return res.sendFile(path_image)
      }
   }

   const path_image = path.join(__dirname, '../assets/no-image.jpg')
   res.sendFile(path_image)
}

module.exports = {
   upload_files,
   upload_model_image,
   get_model_image,
   upload_image_cloudinary
}