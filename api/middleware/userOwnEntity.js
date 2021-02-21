const db = require('../routes/forDB')

const authGetEntity = (mainTask, table, lastTask) => {
  return async (req, res, next) => {
    const element = await db(table).where({id: req.params.id}).first()

    if(req.user[0][mainTask] !== element[lastTask]){
      res.status(403)
      return res.json({
        message: 'Not allowed'
      })
    }

    next()
  }
}

module.exports = authGetEntity
