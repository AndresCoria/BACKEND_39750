const passport = require('passport')
const local = require('passport-local')
const GitHubStrategy = require('passport-github2')
const { userModel } = require('../dao/mongoDb/model/users.model')
const { hasData, compareData } = require('../utils/usersHash')


const LocalStrategy = local.Strategy

//register
const initPassportMid = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const userDB = await userModel.findOne({ email })
        if (userDB) {
          return done(null, false)
        }
        const hashPassword = await hasData (password)
        const newUser = { ...req.body, password: hashPassword }
        const newUserDB = await userModel.create(newUser)
        done(null, newUserDB)
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id)
    done(null, user)
  })

  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        const user = await userModel.findOne({ email })
        if (!user) {
          return done(null, false)
        }
        const passwordOk = await compareData(password, user.password)
        if (!passwordOk) {
          return done(null, false)
        }
        return done(null, user)
      }
    )
  )
}
const initPassportGitHub = () => {
    //github
passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: "Iv1.4aa3fbf9a93ae5d2",
      clientSecret: "b9275cd78dcbe025433dfc050172c929e3ae3aa2",
      callbackURL: "http://localhost:8080/api/usersMongo/githubcallback",
    },
    async (accessToken, refreshtoken, profile, done) => {
      console.log('profile', profile);
      try {
        let user = await userModel.findOne({email: profile._json.email})
        if(!user){
          let newUser = {
            first_name: profile.username,
            last_name: profile.username,
            email: profile._json.email,
            password: ''
          }
          let result = await userModel.create(newUser)
          if(profile._json.email === 'andrescoria1984@gmail.com'){
            result.role = 'admin'
          }
          return done(null, result)
        }
        return done(null, user)
      } catch (error) {
        console.log(error)
      }
    }
  ))
  passport.serializeUser((user, done) => {
      done(null, user);
  })
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id)
    done(null, user)
  })
}

module.exports = {
  initPassportMid,
  initPassportGitHub
}