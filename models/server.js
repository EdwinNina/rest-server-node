const express = require('express');
const cors = require('cors');
const {db_connection} = require('../models/config');
const fileUpload = require('express-fileupload');

class Server {
   constructor(){
      this.app = express();
      this.port = process.env.PORT;

      this.connection()
      this.middlewares()
      this.routes()
      this.listen()
   }

   async connection(){
      await db_connection()
   }

   middlewares(){
      this.app.use(express.static('public'))
      this.app.use(cors());
      this.app.use(express.json())
      this.app.use(fileUpload({
         useTempFiles : true,
         tempFileDir : '/tmp/',
         createParentPath: true
      }));
   }

   routes(){
      this.app.use('/api/users', require('../routes/users'));
      this.app.use('/api/auth', require('../routes/login'));
      this.app.use('/api/categories', require('../routes/categories'));
      this.app.use('/api/products', require('../routes/products.route'));
      this.app.use('/api/search', require('../routes/search.route'));
      this.app.use('/api/uploads', require('../routes/upload.routes'));
   }

   listen(){
      this.app.listen(this.port, () => {
         console.log('Server running on port ' + this.port);
      });
   }
}

module.exports = Server;