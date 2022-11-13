
const check_admin_role = (req, res, next) => {

   if(!req.user){
      return res.status(500).json({
         msg: 'Token has not been validated'
      })
   }

   const {role, name } = req.user

   if(role !== 'ADMIN_ROLE'){
      return res.status(401).json({
         msg: `The user ${name} has not a Admin Role to do this operation`
      })
   }

   next()
}

module.exports = {check_admin_role}