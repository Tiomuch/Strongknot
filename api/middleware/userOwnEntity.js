const db = require('../routes/forDB')

const authGetEntity = (mainTask, table, lastTask, id) => {
  return async (req, res, next) => {
    const element = await db(table).select('*').where(id, '=', req.params.id).first()

    if (!element) {
      res.status(403)
      return res.json({
        message: 'None'
      })
    }

    if(Number(req.user[0][mainTask]) !== Number(element[lastTask])){
      res.status(403)
      return res.json({
        message: 'Not allowed'
      })
    }

    next()
  }
}

module.exports = authGetEntity
