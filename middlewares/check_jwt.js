const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users')

const check_jwt = async (req = request, res = response, next) => {
   try {
      const token = req.header('Authorization')
      if(!token){
         return res.status(401).json({
            msg: 'there is not a token'
         })
      }
      const {uid} = jwt.verify(token, process.env.SECRET_KEY)

      //Get the authenticated user
      const user = await User.findById(uid)

      if(!user){
         return res.status(404).json({
            msg: 'User not found'
         })
      }

      if(!user.status){
         return res.status(401).json({
            msg: 'User is not available for this operation'
         })
      }
      req.user = user

      next()
   } catch (error) {
      res.status(403).json({
         msg: 'Token not valid'
      })
   }
}

module.exports = {
   check_jwt
}