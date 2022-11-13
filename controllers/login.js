const bcrypt = require('bcryptjs');

const generate_jwt = require('../helpers/generate_jwt');
const User = require('../models/users');

const login_user = async (req, res) => {
   try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if(!user){
         return res.status(400).json({
            msg: 'User not found'
         })
      }

      if(!user.status){
         return res.status(400).json({
            msg: 'User not active'
         })
      }

      const isValidPassword = bcrypt.compareSync(password, user.password)

      if(!isValidPassword){
         return res.status(400).json({
            msg: 'Password is incorrect or invalid'
         })
      }

      // Generate JWT
      const jwt = await generate_jwt(user.id)
      user.jwt = jwt

      res.json({
         user,
         jwt
      })
   } catch (error) {
      res.status(500).json({
         mgs: 'There was an error to authenticate the user. Please try again'
      })
   }
}

module.exports = {
   login_user
}