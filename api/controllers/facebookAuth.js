const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const db = require('../routes/forDB')
const bcrypt = require('bcryptjs')
require('dotenv').config()

passport.use(
  new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'name', 'gender', 'email']
    },

  async (accessToken, refreshToken, profile, done) => {
      const person = await db('users').where({email: profile.emails[0].value}).first()

      if (person) {
        return done(null, person)
      }

      const salt = bcrypt.genSaltSync(10)
      const pass = profile.id

      await db('users').insert({
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value,
        password: bcrypt.hashSync(pass, salt),
        activated: true
      })

      const person1 = await db('users').where({email: profile.emails[0].value}).first()
      return done(null, person1)
    }
  )
)
