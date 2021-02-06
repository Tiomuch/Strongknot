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
    let isAllow = false
    for (const rule of array) {
      if((Object.keys(rule).length) > 1){
        const element = await db(array[0].table).where({id: req.params.id}).first()
        isAllow = checkOwnEntity(rule, req.user[0], element)
      } else {
        isAllow = checkRole(req.user[0], rule.permission)
      }

      if(isAllow === true){
        break
      }
    }

    if(isAllow === false){
      res.status(403)
      return res.json({
        message: 'Not allowed'
      })
    }

    next()
  }
}

module.exports = authGetEntity
