const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config()
const db = require('../routes/forDB')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try{
        const user = await db('users').where({id: payload.userID}).select('id', 'first_name', 'last_name', 'email', 'password', 'activated')

        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e)
      }
    })
  )
}
