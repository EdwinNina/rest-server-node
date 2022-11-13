const path = require('path');
const { v4: uuidv4 } = require('uuid');

const upload_files_helper = async (files, allowed_extensions, directory = '') => {
   return new Promise( (resolve, reject) => {
      const { file } = files;
      const extension = file.name.split('.').at(-1)
   
      if(!allowed_extensions.includes(extension)){
         return reject(`this extension ${extension} is not allowed`)
      }
      const temp_name = uuidv4() + '.' +extension
      const uploadPath = path.join(__dirname,'../uploads/', directory, temp_name);

      file.mv(uploadPath, function(err) {
         if (err) {
            return reject(err)
         }
         resolve(temp_name)
      });
   })
}

module.exports =  upload_files_helper