const GoogleStrategy = require('passport-google-oauth2').Strategy
const passport = require('passport')
const db = require('../routes/forDB')
const bcrypt = require('bcryptjs')
require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (user, done) => {
  const person = await db('users').where({id: user}).first()
  done(null, person)
})

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process. env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },

  async (accessToken, refreshToken, profile, done) => {
      const person = await db('users').where({email: profile.email}).first()

      if (person) {
        return done(null, person)
      }

      const salt = bcrypt.genSaltSync(10)
      const pass = profile.id

      await db('users').insert({
        first_name: profile.given_name,
        last_name: profile.family_name,
        email: profile.email,
        password: bcrypt.hashSync(pass, salt),
        activated: true
      })

      const person1 = await db('users').where({email: profile.email}).first()
      return done(null, person1)
    }
  )
)
