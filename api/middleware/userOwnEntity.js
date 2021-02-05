const db = require('../routes/forDB')
const Role = require('../middleware/checkRole')

const checkRole = (user, permission) => {
  return Role[user.role][permission] === true
}

const checkOwnEntity = (obj, user, element) => {
  let ans
  ans = (user[obj.mainTask] === element[obj.lastTask]) && (Role[user.role][obj.permission] === true)
  return ans
}

const authGetEntity = (array) => {
  return async (req, res, next) => {
    const element = await db(array[0].table).where({id: req.params.id}).first()

    if(checkRole(req.user[0], array[1].permission) === true || checkOwnEntity(array[0], req.user[0], element)){
      next()
    } else {
      res.status(401)
      return res.json({
        message: 'Not allowed'
      })
    }
  }
}

module.exports = authGetEntity
