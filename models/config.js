const mongoose = require('mongoose');

const db_connection = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log('The database is conected');
   } catch (error) {
      throw new Error('Ocurrió un error en la conexion de la base de datos')
   }
}

module.exports = {
   db_connection
};