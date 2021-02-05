const authRole = () => {
  return async (req, res, next) => {
    if(!(req.user[0].role === 'admin')){
      res.status(401)
      return res.json({
        message: 'Not allowed'
      })
    }

    next()
  }
}

module.exports = authRole
