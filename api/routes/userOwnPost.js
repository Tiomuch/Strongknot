const db = require('../routes/forDB')

const authGetPost = (mainTask, table, lastTask) => {
  return async (req, res, next) => {
    const element = await db(table).where({id: req.params.id}).first()

    if(!(req.user.eval(mainTask) === element.eval(lastTask))){
      res.status(401)
      return res.send('Not allowed')
    }

    next()
  }
}

module.exports = authGetPost
