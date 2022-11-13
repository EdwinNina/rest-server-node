const User = require('../models/users')
const bcrypt = require('bcryptjs');

const get_users = async (req, res) => {
   const { limit = 5, from = 0 } = req.query;
   const query = { status: true}

   // const users = await User.find().limit(limit).skip(from)
   // const total = await User.countDocuments()

   const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).limit(limit).skip(from)
   ])
   res.json({users, total})
}

const post_users = async (req, res) => {
   try {
      const {name, email, password, role} = req.body;
      const user = new User({ name, email, password, role });

      // encriptar el password
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      await user.save();

      res.json({ user })
   } catch (error) {
      res.status(400).json(error)
   }
}

const put_users = async (req, res) => {
   const { id } = req.params
   const { _id, password, google, ...user} = req.body

   if(password){
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt)
   }

   const updated_user = await User.findByIdAndUpdate(id, user);

   res.json({
      msg: 'Put request',
      updated_user
   })
}

const delete_users = async (req, res) => {
   const { id } = req.params

   const user = await User.findByIdAndUpdate(id, { status: false})

   res.json({
      user
   })
}

module.exports = {
   get_users,
   post_users,
   put_users,
   delete_users
}